/**
 * mongoose hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
var _ = require('lodash')
var mongoose = require('mongoose')

module.exports = function defineMongooseHook (sails) {
  return {
    defaults: {
      globals: {
        models: true
      },

      // Mongoose-specific config
      mongoose: {
        // The default Mongo connection URI to use when communicating with the Mongo database for every one of
        // this app's models. By default, uses the database: "my_sails_app"
        // For more about the connection string, see: https://docs.mongodb.org/manual/reference/connection-string/
        uri: 'mongodb://localhost:27017/ecommerce',

        // These optional connection options are passed in to mongoose when `.connect()` is called.
        // See http://mongoosejs.com/docs/connections.html for a full list of available options.
        connectionOpts: {}
      }
    },
    /**
     * configure()
     *
     * @type {Function}
     */
    configure: function () {
      // Validate `sails.config.globals.models`
      if (_.isObject(sails.config.globals) && !_.isBoolean(sails.config.globals.models)) {
        throw new Error(
          'If provided, `sails.config.globals.models` must be either `true` or `false`.\n' +
            'If `true`, instantiated Mongoose models will be exposed as global variables.'
        )
      }

      // Validate `sails.config.mongoose.uri`
      if (!_.isString(sails.config.mongoose.uri)) {
        throw new Error(
          'Expected Mongo connection URI (a string) to be provided as `sails.config.mongoose.uri`, but the provided Mongo URI is invalid.\n' +
            'See https://docs.mongodb.org/manual/reference/connection-string/ for help.'
        )
      }

      // Validate `sails.config.mongoose.connectionOpts`
      if (!_.isObject(sails.config.mongoose.connectionOpts) || _.isArray(sails.config.mongoose.connectionOpts)) {
        throw new Error(
          'If provided, `sails.config.mongoose.connectionOpts` must be a dictionary of additional options to pass to Mongoose.\n' +
            'See http://mongoosejs.com/docs/connections.html for a full list of available options.'
        )
      }
    },
    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: function (done) {
      sails.log.info(
        `Initializing custom hook (\`mongoose\`) at ${sails.config.mongoose.uri} with ${JSON.stringify(
          sails.config.mongoose.connectionOpts
        )}`
      )
      try {
        // Expose `sails.mongoose`.
        // (note that it's important to do this _before_ the other stuff below so that it is accessible for use in custom
        //  `constructSchema` interceptor functions, in case any of those are being used)
        sails.mongoose = mongoose
        // Connect to the configured database using Mongoose.
        mongoose.connect(sails.config.mongoose.uri, sails.config.mongoose.connectionOpts)
        var dbConnection = sails.mongoose.connection

        dbConnection.on('error', (err) => {
          // Handle weird (and very unlikely) case where Mongoose emits an error event without sending an Error instance as the event data.
          if (!err) {
            throw new Error('Unrecognized Mongoose connection error (connection emitted error event with no data)')
          } else if (!_.isObject(err) || !_.isString(err.message)) {
            throw new Error(
              'Unrecognized Mongoose connection error (connection emitted error event with non-Error data: `' +
                err +
                '`)'
            )
          }

          if (err.message.match(/ECONNREFUSED/)) {
            var troubleshootingMsg =
              'Could not connect to Mongo database (@`' +
              sails.config.mongoose.uri +
              '`).\nMake sure the Mongo database at that connection URI is running and that the connection URI is correct.\nPlease also verify that any additional connection options (`sails.config.mongoose.connectionOpts`) are valid.\nFor help, see http://mongoosejs.com/docs/connections.html.'
            err.message = troubleshootingMsg
            err.stack = troubleshootingMsg + '\n\nError details:\n==============================\n' + err.stack + '\n'
            err.code = 'ECONNREFUSED'
            return done(err)
          }
          // Otherwise, this is some miscellaneous error we don't recognize, so just send it through.
          return done(err)
        })
        // We also listen for the `open` event, which indicates that we were able to successfully connect to the database.
        dbConnection.once('open', () => {
          // Load model definitions using the module loader.
          // Returned `modules` are case-insensitive, using filename to determine identity.
          // (This calls out to the `moduleloader` hook, which uses `sails-build-dictionary` and `includeall`
          //  to `require` and collate the relevant code for these modules-- also adding the appropriate `globalId`
          //  property.)
          sails.log.verbose('Loading the app\'s models from `%s`...', sails.config.paths.models)
          sails.modules.loadModels(function modulesLoaded (err, modules) {
            if (err) {
              return done(err)
            }

            try {
              // Instantiate Mongoose schemas for each model definition (running custom `constructSchema` functions if provided)
              var schemas = _.reduce(
                modules,
                (memo, def, identity) => {
                  // Validate `schema` from model def (if omitted, default it to `{}`)
                  if (_.isUndefined(def.schema)) {
                    def.schema = {}
                  }
                  if (!_.isObject(def.schema) || _.isArray(def.schema)) {
                    throw new Error(
                      'Invalid `schema` provided in model (`' +
                        identity +
                        '`).  If provided, `schema` must be a dictionary.'
                    )
                  }

                  // If no `constructSchema` interceptor function was provided, just new up a Mongoose Schema by passing in `schema` from the model def.
                  if (_.isUndefined(def.constructSchema)) {
                    memo[identity] = new sails.mongoose.Schema(def.schema)
                  }
                  // If `constructSchema` interceptor function WAS provided, run it to get the Schema instance.
                  else if (_.isFunction(def.constructSchema)) {
                    try {
                      memo[identity] = def.constructSchema(def.schema, sails)
                    } catch (e) {
                      e.message =
                        'Encountered an error when running `constructSchema` interceptor provided for model (`' +
                        identity +
                        '`). Details:\n' +
                        e.message
                      e.stack =
                        'Encountered an error when running `constructSchema` interceptor provided for model (`' +
                        identity +
                        '`). Details:\n' +
                        e.stack
                      throw e
                    }
                  } else {
                    throw new Error(
                      'Invalid `constructSchema` interceptor provided in model (`' +
                        identity +
                        '`).  If provided, `constructSchema` must be a function.'
                    )
                  }

                  return memo
                },
                {}
              )
              // Now generate Model constructors from those schemas and expose references to them as `sails.models[identity]`.
              //
              // We also set `globalId` and `identity` directly on each Mongoose model.
              // (this is for consistency with the standard ORM hook, and improved compatibility with any code in other
              //  community hooks which relies on these properties existing)
              // Set `globalId` and `identity` directly on the Mongoose model
              sails.models = _.reduce(
                schemas,
                (memo, mongooseSchemaInstance, identity) => {
                  memo[identity] = sails.mongoose.model(identity, mongooseSchemaInstance)
                  memo[identity].globalId = modules[identity].globalId
                  memo[identity].identity = identity
                  return memo
                },
                {}
              )
              // If configured to do so, also expose instantiated models as global variables.
              // (using `globalId` to expose these models process-wide)
              if (_.isObject(sails.config.globals) && sails.config.globals.models) {
                _.each(sails.models, function eachInstantiatedModel (Model, identity) {
                  // Expose the Model as a global variable.
                  global[Model.globalId] = Model
                })
              }
              // At this point, we know Mongoose has connected to the database, everything is ready to go, and we can safely trigger `initialize`'s callback.
              return done()
            } catch (e) {
              // </try>
              // If anything unexpected happened, pass the error to `initialize`'s callback.
              return done(e)
            } // </try>
          }) // </sails.modules.loadModels>
        }) // </dbConnection.once('open')>
      } catch (e) {
        // If anything unexpected happened, pass the error to `initialize`'s callback.
        return done(e)
      }
    }
  }
}

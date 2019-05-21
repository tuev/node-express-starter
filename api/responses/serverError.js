/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash')

/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

module.exports = function serverError (data) {
  // Get access to `req` and `res`
  var req = this.req
  var res = this.res
  // Get access to `sails`
  var sails = req._sails

  res.status(500)

  var dontRevealErrorInResponse = process.env.NODE_ENV === 'production'
  if (dontRevealErrorInResponse || _.isUndefined(data)) {
    data = {}
  }
  // Log error to console
  if (!_.isUndefined(data)) {
    sails.log.error('[500] response: \n', data)
  }

  var repsonseMessage = {
    'error': {
      'code': 500,
      'message': data.message ? data.message : 'Internal Error. Please try again later'
    }
  }
  // If the data is an error instance and it doesn't have a custom .toJSON(),
  // use its stack instead (otherwise res.json() will turn it into an empty dictionary).
  if (_.isError(data)) {
    if (!_.isFunction(data.toJSON)) {
      repsonseMessage.error.stack = data.stack
      return res.send(repsonseMessage)
    }
  }
  return res.json(repsonseMessage)
}

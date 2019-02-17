/**
 * Mongoose configuration
 * (sails.config.mongoose)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 */

module.exports.mongoose = {

  uri: 'mongodb://localhost:27017/ecommerce',
  connectionOpts: { useNewUrlParser: true, 
    user: process.env.MONGO_USER ? process.env.MONGO_USER: "" ,
    pass: process.env.MONGO_PASS ? process.env.MONGO_PASS: ""  
  }
  
};

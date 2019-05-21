/**
 * Module dependencies
 */

var util = require('util')
var _ = require('@sailshq/lodash')

/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest (data) {
  // Get access to `req` and `res`
  var req = this.req
  var res = this.res
  // Get access to `sails`
  var sails = req._sails

  res.status(400)

  var dontRevealErrorInResponse = process.env.NODE_ENV === 'production'
  if (dontRevealErrorInResponse || _.isUndefined(data)) {
    data = {}
  }
  // Log error to console
  if (!_.isUndefined(data)) {
    sails.log.error('[400] response: \n', data)
  }

  var repsonseMessage = {
    'error': {
      'code': 400,
      'message': data.message ? data.message : 'Bad Request'
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

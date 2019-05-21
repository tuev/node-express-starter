/**
 * Module dependencies
 */

// n/a

/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 * return res.notFound(err, 'some/specific/notfound/view');
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

module.exports = function notFound (data) {
  // Get access to `req` and `res`
  var req = this.req
  var res = this.res
  // Get access to `sails`
  var sails = req._sails

  res.status(410)

  var dontRevealErrorInResponse = process.env.NODE_ENV === 'production'
  if (dontRevealErrorInResponse || _.isUndefined(data)) {
    data = {}
  }
  // Log error to console
  if (!_.isUndefined(data)) {
    sails.log.error('[410] response: \n', data)
  }

  var repsonseMessage = {
    'error': {
      'code': 410,
      'message': data.message ? data.message : 'Resource is no longer here'
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

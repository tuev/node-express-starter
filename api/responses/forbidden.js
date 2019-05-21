/**
 * Module dependencies
 */

// n/a



/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden (data) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;
  // Get access to `sails`
  var sails = req._sails;
  
  res.status(403);

  var dontRevealErrorInResponse = process.env.NODE_ENV === 'production';
  if (dontRevealErrorInResponse || _.isUndefined(data)) {
    data = {};
  }
  // Log error to console
  if (!_.isUndefined(data)) {
    sails.log.error('[403] response: \n', data);
  }

  var repsonseMessage = {
    "error": {
      "code": 403,
      "message": data.message ? data.message : "Bad Request"
    }
  }

  // If the data is an error instance and it doesn't have a custom .toJSON(),
  // use its stack instead (otherwise res.json() will turn it into an empty dictionary).
  if (_.isError(data)) {
    if (!_.isFunction(data.toJSON)) {
      repsonseMessage.error.stack = data.stack;
      return res.send(repsonseMessage);
    }
}
  return res.json(repsonseMessage);
};
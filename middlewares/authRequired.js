'use strict';
const errorFactory = require('../services/errorFactory');

/**
 * The middleware to authorize requests that should be protected by a login
 * @param  {object}   req  The request object provided by the Express router
 * @param  {object}   res  The response object provided by the Express router
 * @param  {Function} next The callback to move the operation forward
 */

const authRequired = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    next(errorFactory.unauthorized(req));
  }
};

module.exports = authRequired;

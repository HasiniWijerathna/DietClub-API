'use strict';
const tokenFactory = require('../services/tokenFactory');
const errorFactory = require('../services/errorFactory');

/**
 * The middleware to authorize requests that should be protected by a login
 * @param  {object}   req  The request object provided by the Express router
 * @param  {object}   res  The response object provided by the Express router
 * @param  {Function} next The callback to move the operation forward
 */
const authRequired = (req, res, next) => {
  try {
    // TODO: Simplify the RegExp
    const authorizationHeader = req.header('Authorization') || '';
    const token = authorizationHeader
      .match(/[A-Za-z0-9\-_~\+\/]*\.[A-Za-z0-9\-_~\+\/]*\.[A-Za-z0-9\-_~\+\/]*/)[0];
    const decoded = tokenFactory.verifyAuthToken(token);

    // TODO: Check the user eligibility and inject useful information
    req.decodedPayload = decoded;

    next();
  } catch (e) {
    // TODO: Find a way to log this from the universal logger
    console.error(e);

    next(errorFactory.unauthorized(req));
  }
};

module.exports = authRequired;

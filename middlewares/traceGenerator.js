'use strict';
const uuid = require('uuid/v4');

/**
 * Middleware function to generate a unique trace ID per request
 * @param  {Objecy}   req  The request object provided by the Express router
 * @param  {Object}   res  The response object provided by the Express router
 * @param  {Function} next The callback to move the operation forward
 */
const traceGenerator = (req, res, next) => {
  req.traceId = uuid();

  next();
};

module.exports = traceGenerator;

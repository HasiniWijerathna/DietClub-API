'use strict';

/**
 * Middleware function to generate a unique trace ID per request
 * @param  {Objecy}   req  The request object provided by the Express router
 * @param  {Object}   res  The response object provided by the Express router
 * @param  {Function} next The callback to move the operation forward
 */
const tempMiddleware = (req, res, next) => {
 req.blogId = '445';

  next();
};

module.exports = tempMiddleware;

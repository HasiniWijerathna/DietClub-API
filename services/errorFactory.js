'use strict';
/**
 * The common function to create an error object
 * @param  {object} req        The request object provided by the Express router
 * @param  {String} message    The error message
 * @param  {number} statusCode The status code of the error (Default: 500)
 * @return {Error}             The created error object
 */
const createErrorObject = (req, message, statusCode) => {
  const err = new Error(message);
  const errorMessage = {
    message,
    traceId: req.traceId,
  };

  err.status = statusCode;
  err.errorMessage = errorMessage;

  return err;
};

module.exports = {
  /**
   * Create a 'Not Found' error object
   * @param  {Object} req     The request object provided by the Express router
   * @param  {String} message The error message
   *                          (default : 'Not Found')
   * @return {Error}          The created error object
   */
  notFound: (req, message) => {
    return createErrorObject(req, message || 'Not Found', 404);
  },

  /**
   * Create a 'Unauthorized' error object
   * @param  {Object} req     The request object provided by the Express router
   * @param  {String} message The error message
   *                          (default : 'Request unauthorized')
   * @return {Error}          The created error object
   */
  unauthorized: (req, message) => {
    return createErrorObject(req, message || 'Request unauthorized', 401);
  },

  /**
   * Create a 'Forbidden' error object
   * @param  {Object} req     The request object provided by the Express router
   * @param  {String} message The error message
   *                          (default : 'Request forbidden')
   * @return {Error}          The created error object
   */
  forbidden: (req, message) => {
    return createErrorObject(req, message || 'Request forbidden', 403);
  },

  /**
   * Create a 'Bad request' error object
   * @param  {Object} req     The request object provided by the Express router
   * @param  {String} message The error message
   *                          (default : 'Bad request')
   * @return {Error}          The created error object
   */
  badRequest: (req, message) => {
    return createErrorObject(req, message || 'Bad request', 400);
  },
};

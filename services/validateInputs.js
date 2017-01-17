'use strict';
const errorFactory = require('../services/errorFactory');

/**
 * Validate name
 * @param  {object} req  The request object provided by the Express router
 * @param  {String} name The name
 * @return {String}      Relevent error of the incorrect name
 */
const validateName = ( req, name ) => {
  let error = null;

  if (!name || name.length === 0) {
   error = errorFactory.badRequest(req, 'Empty text field exists');
  }

  return error;
};

module.exports = {validateName};

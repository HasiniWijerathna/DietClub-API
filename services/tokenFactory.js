'use strict';
const jwt = require('jsonwebtoken');

const config = require('../config');

/**
 * Create an auth token from the given data
 * @param  {object} data The data to be encoded
 * @return {object}      The encoded JWT string
 */
const issueAuthToken = (data) => {
  const privateKey = config.authToken.privateKey;
  const expiresIn = config.authToken.expiresIn;

  return jwt.sign(data, privateKey, {expiresIn});
};

/**
 * Decodes and verifies the token. Throws an exception if verification fails.
 * @param  {String} token The token string to be verified
 * @return {object}       The decoded object
 */
const verifyAuthToken = (token) => {
  return jwt.verify(token, config.authToken.privateKey);
};

module.exports = {
  issueAuthToken,
  verifyAuthToken,
};

'use strict';
const CryptoJS = require('crypto-js');

const config = require('../config');
/**
 * validate email
 * @param  {String} email The email
 * @return {String}       Relevent error of the incorrect email
 */
const validateEmail = (email) => {
  let error = null;

  if (!email || email.length === 0) {
    error = 'Invalid email';
  } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = 'Invalid email';
  }

  return error;
}
/**
 * Validate user name
 * @param  {String} name The username
 * @return {String}      Relevent error of the incorrect username
 */
const validateName = (name) => {
  let error = null;

  if (!name || name.length === 0) {
    error = 'Invalid name';
  } else if (name.length < 6) {
    error = 'Invalid name';
  }

  return error;
}
/**
 * Validate password
 * @param  {String} password The password
 * @return {String}          Relevent error of the incorrect password
 */
const validatePassword = (password) => {
  let error = null;

  if (!password || password.length === 0) {
    error = 'Invalid password';
  } else if (password.length < 6) {
    error = 'Invalid password';
  }

  return error;
}
/**
 * Retur validate user credentials
 * @param  {Object}  user User object
 * @return {Boolean}      Checks whether the user credentials are valied
 */
const validateUser = (user) => {
  let validateUser = false;

  const nameError = validateName(user.username);
  const emailError = validateEmail(user.email);
  const passwordError = validatePassword(user.password);

  if (!nameError && !emailError && !passwordError) {
    validateUser = true;
  }

  return validateUser;
};

/**
 * Returns the hash password
 * @param  {String} password The password
 * @return {Stirng}          Byte representation of the password
 */
const getPasswordHash = (password) => {
  return CryptoJS.HmacSHA256(password, config.passwordKey).toString(CryptoJS.enc.Hex);
};

module.exports = { validateUser, getPasswordHash };

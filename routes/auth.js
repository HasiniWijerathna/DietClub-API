'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line
const CryptoJS = require('crypto-js');

const config = require('../config');

const models = require('../models/index');

const tokenFactory = require('../services/tokenFactory');
const errorFactory = require('../services/errorFactory');

/**
 * Temp object with users
 * @type {Array}
 */
const users = [{
  username: 'mthahzan',
  password: 'user@123',
}, {
  username: 'mnhaqeel',
  password: 'user@123',
}, {
  username: 'a',
  password: 'a',
}];

/**
 * Checks if the given credentials are correct
 * @param  {String} username The username
 * @param  {String} password The password
 * @return {Boolean}         Flag specifying whether the user exists
 */
const userAvailable = (username, password) => {
  const user = users.filter((user) =>
          user.username === username &&
          user.password === password)[0];

  return user;
};

const validateEmail = (email) => {
  let error = null;

  if (!email || email.length === 0) {
    error = 'Invalid email';
  } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = 'Invalid email';
  }

  return error;
}

const validateName = (name) => {
  let error = null;

  if (!name || name.length === 0) {
    error = 'Invalid name';
  } else if (name.length < 6) {
    error = 'Invalid name';
  }

  return error;
}

const validatePassword = (password) => {
  let error = null;

  if (!password || password.length === 0) {
    error = 'Invalid password';
  } else if (password.length < 6) {
    error = 'Invalid password';
  }

  return error;
}

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
 * @return {object}          [description]
 */
const getPasswordHash = (password) => {
  return CryptoJS.HmacSHA256(password, config.passwordKey).toString(CryptoJS.enc.Hex);
};

/**
 * Registering the '/login' route
 */
router.post('/login', (req, res, next) => {
  if (userAvailable(req.body.username, req.body.password)) {
    const tokenData = {
      username: req.username,
      message: 'Welcome home ',
      admin: false,
    };

    res.send({
      message: `Welcome ${req.body.username}`,
      token: tokenFactory.issueAuthToken(tokenData),
    });
  } else {
    next(errorFactory.unauthorized(req));
  }
});

router.post('/register', (req, res, next) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  if (validateUser(user)) {
    user.password = getPasswordHash(req.body.password);
    models
      .User
      .find({
        where: {
          email: req.body.email
        }
      })
      .then((existingUser) => {
        let promise = null;

        if (existingUser) {
          throw errorFactory.badRequest(req, 'User already exists');
        } else {
          promise = models.User.create(user);
        }

        return promise;
      })
      .then((createdUser) => {
        res.json(createdUser);
      })
      .catch(next);
  } else {
    next(errorFactory.badRequest(req, 'Validation error'));
  }
});

module.exports = router;

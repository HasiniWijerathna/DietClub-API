'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');

const tokenFactory = require('../services/tokenFactory');
const errorFactory = require('../services/errorFactory');
const userService = require('../services/userService');

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

  if (userService.validateUser(user)) {
    user.password = userService.getPasswordHash(req.body.password);
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

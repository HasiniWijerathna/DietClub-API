'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');

const tokenFactory = require('../services/tokenFactory');
const errorFactory = require('../services/errorFactory');
const userService = require('../services/userService');

/**
 * Finds the user with the given credentials
 * @param  {String} username The username
 * @param  {String} password The password
 * @return {Promise}         Flag specifying whether the user exists
 */
const findUser = (username, password) => {
  return models
    .User
    .find({
      where: {
        username,
        password: userService.getPasswordHash(password)
      }
    });
};

/**
 * Registering the '/login' route
 */
router.post('/login', (req, res, next) => {
  findUser(req.body.username, req.body.password)
    .then((user) => {
      if (user) {
        const tokenData = {
          user,
          admin: false
        };

        res.send({
          message: `Welcome ${user.name}`,
          user,
          token: tokenFactory.issueAuthToken(tokenData)
        });
      } else {
        throw errorFactory.unauthorized(req);
      }
    })
    .catch(next);
    // .catch((error) => {
    //   next(error);
    // });
});

/**
 * Registering the '/register' route
 */
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
        const tokenData = {
          user: createdUser,
          admin: false
        };

        res.json({
          user: createdUser,
          message: `Welcome ${createdUser.name}`,
          token: tokenFactory.issueAuthToken(tokenData)
        });
      })
      .catch(next);
  } else {
    next(errorFactory.badRequest(req, 'Validation error'));
  }
});

module.exports = router;

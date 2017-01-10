'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

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

module.exports = router;

'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');
const userIdentifier = require('../middlewares/userIdentifier');
const authRequired = require('../middlewares/authRequired');
const userService = require('../services/userService');
const errorFactory = require('../services/errorFactory');


/**
 * Finds the user with the given credentials
 * @param  {String} userId   The email
 * @param  {String} password The password
 * @return {Promise}         Flag specifying whether the user exists
 */
const findUser = (userId, password) => {
  return models
    .User
    .find({
      where: {
        id: userId,
        password: userService.getPasswordHash(password),
      },
      attributes: {
        exclude: ['password'],
      },
    });
};
router.put('/', userIdentifier, authRequired, (req, res, next) => {
  // Update user with ID 'userId'
  models
  .User
  .find({
    where: {
      id: req.user.id,
    },
  })
  .then((user) => {
    let promise = null;

    if(user) {
      promise = user.updateAttributes({
       name: req.body.name,
       email: req.body.email,
       password: userService.getPasswordHash(req.body.password),
      });
    } else {
      throw errorFactory.badRequest(req, 'Invalied User');
    }
    return promise;
  })
  .then((updatedUser) => {
    res.send(updatedUser);
  })
  .catch(next);
});
router.get('/:userId', (req, res, next) => {
  // Return user with ID 'userId'
  models
  .User
  .find({
     where: {
       id: req.params.userId,
     },
   })
   .then((existingUser) => {
      res.json(existingUser);
   })
   .catch(next);
});

router.post('/', userIdentifier, authRequired, (req, res, next) => {
  // Delete user with ID 'userId'
    findUser(req.user.id, req.body.password)
    .then((user) =>{
      let promise = null;
      if (user) {
        promise = models.User.destroy({
        }, {
          where: {
            id: req.user.id,
          },
        });
      } else {
        throw errorFactory.badRequest(req, 'Incorrect email or password');
      }
      return promise;
    })
      .then((deletedUser) => {
        res.json(deletedUser);
        });
  });

module.exports = router;

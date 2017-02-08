'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

/* GET users listing. */
router.put('/', (req, res) => {
  // Update user with ID 'userId'
  models
  .User
  .find({
    where: {
      id: req.body.id,
    },
  })
  .then((user) => {
    let promise = null;

    if(user) {
      promise = user.updateAttributes({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
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

module.exports = router;

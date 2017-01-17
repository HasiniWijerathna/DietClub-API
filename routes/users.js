'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

/* GET users listing. */
router.get('/', (req, res) => {
  const users = {
    users: [{
      username: 'mthahzan',
    }, {
      username: 'mnhaqeel',
    }],
  };

  res.send(users);
});

router.get('/get', (req, res) => {
  res.send('GET request ');
});

module.exports = router;

'use strict';
const express = require('express');
const router = express.Router(); // eslint-disable-line

const tempMiddleware = require('../middlewares/tempMiddleware');

router.use(tempMiddleware);

router.get('/', (req, res) => {
  res.send(req.blogId + ' BlogId');
});

router.post('/', (req, res) => {
    let userId = req.body.id;
    let token = req.body.token;
    let geo = req.body.geo;

    res.send(userId + ' ' + token + ' ' + geo);
});
module.exports = router;

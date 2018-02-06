'use strict';
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router(); // eslint-disable-line

const models = require('../models/index');
const userIdentifier = require('../middlewares/userIdentifier');
const authRequired = require('../middlewares/authRequired');
const userService = require('../services/userService');
const errorFactory = require('../services/errorFactory');

router.get('/', (req, res) => {
  res.send({
    message: 'OKAY'
  });
});

router.post('/send', (req, res, next) => {
  console.log('************ *************** ******************');
  console.log(req.body);
    console.log('************* *************** ********************************');
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'dietclubsrilanka@gmail.com',
      pass: '0812421945'
    },

    tls: {
      rejectUnauthorized: false
    }
  });

  let HelperOptions = {
    from: '"Hasini" <hasini.2014198@iit.ac.lk',
    to: 'wijerathna.hasini@gmail.com',
    subject: req.body.text,
    text: req.body.description
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log("ERRRRRRRORRR!");
      return console.log(error);
    } else {
      console.log("The message was sent!");
    }
    // console.log("The message was sent!");
    // console.log(info);


  });
});

module.exports = router;

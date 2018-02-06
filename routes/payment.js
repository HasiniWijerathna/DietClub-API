'use strict';
const express = require('express');
const nodemailer = require('nodemailer');
const configureStripe = require('stripe');
const secretKey = 'sk_test_LA5MKqEHvaDH8hkLdktmobNy';

const stripeClient = configureStripe(secretKey);
const router = express.Router(); // eslint-disable-line

const userIdentifier = require('../middlewares/userIdentifier');
const authRequired = require('../middlewares/authRequired');
const userService = require('../services/userService');
const errorFactory = require('../services/errorFactory');

router.post('/', (req, res, next) => {
  const charge = {
    description: req.body.description,
    source: req.body.tokenId,
    currency: 'usd',
    amount: req.body.amount,
  };

  stripeClient.charges.create(charge, (error, charge) => {
    if (error) {
      console.error(error);

      res.status(400).send({
        message: 'Something went wrong :(',
      });
    } else {
      res.send({
        message: 'Your payment was successfully processed ',
        charge,
      });
    }
  });
});

module.exports = router;

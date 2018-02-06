'use strict';
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Services
const errorFactory = require('./services/errorFactory');

// Middlewares
const cors = require('./middlewares/cors');
const traceGenerator = require('./middlewares/traceGenerator');
const userIdentifier = require('./middlewares/userIdentifier');

// Routes
// const auth = require('./routes/auth');
// const users = require('./routes/users');
const mail = require('./routes/mail');
const payment = require('./routes/payment');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// Register the routes
// app.use('/auth', traceGenerator, auth);
// app.use('/user', traceGenerator, userIdentifier, users);
app.use('/mail', traceGenerator, mail);
app.use('/payment', traceGenerator, payment);

// catch 404 and forward to error handler
app.use(traceGenerator, (req, res, next) => {
  next(errorFactory.notFound(req));
});

// error handler
app.use((err, req, res, next) => {
  // Write the error to the console
  console.error(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.errorMessage);
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});

module.exports = app;

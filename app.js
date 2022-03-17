require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const Logger = require('./helpers/logger');
const baseRouter = require('./routes/base.router');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', baseRouter);

process.on('exit', (code) => {
  // About to exit with code ${code}
});

process.on('uncaughtException', (err) => {
  if (err) {
    // uncaughtException
    Logger.error('Uncaught Exception', `${err.message}`);
  } else {
    // uncaughtException (unknown)
    Logger.error('Uncaught Exception');
  }
});

process.on('unhandledRejection', (err) => {
  if (err) {
    // uncaught Exception ${err.message}
    Logger.error('Unhandled rejection', `${err.message}`);
  } else {
    // uncaughtException (unknown)
    Logger.error('Unhandled rejection', `${err.message}`);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    res.status(404).send({ error: { code: 404, message: 'Cannot locate the resource; Not Found' } });
  } else {
    // render the error page
    res.status(404).send({ error: { code: 404, message: 'Server Error, Try Again' } });
  }
});

module.exports = app;

/**
 * Define Express app
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { createErrorResponse } = require('./response');

const logger = require('./logger');
const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});

const passport = require('passport');
const authenticate = require('./auth');

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

// Middleware

app.use(pino); // Use pino logging middleware
app.use(helmet()); // Use helmetjs security middleware
app.use(cors()); // Use CORS middleware so we can make requests across origins
app.use(compression()); // Use gzip/deflate compression middleware

// Set up our passport authentication middleware

passport.use(authenticate.strategy());
app.use(passport.initialize());

// Define routes

app.use('/', require('./routes'));

// eslint-disable-next-line no-unused-vars
app.use((req, res) => {
  const error = new Error('cannot find the requested resource');
  error.status = 404;
  throw error;
});

// Add error-handling middleware to deal with anything else
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // We may already have an error response we can use, but if not,
  // use a generic `500` server error and message.
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  // If this is a server error, log something so we can see what's going on.
  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }
  res.status(status).json(createErrorResponse(status, message));
});

// Export our `app` so we can access it in server.js
module.exports = app;

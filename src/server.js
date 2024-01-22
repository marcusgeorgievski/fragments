/**
 * Starts the server.
 */

const stoppable = require('stoppable'); // We want to gracefully shutdown our server
const logger = require('./logger'); // Get our logger instance
const app = require('./app'); // Get our express app instance

// Get the desired port from the process' environment. Default to `8080`
const port = parseInt(process.env.PORT || '8080', 10);

// Log environment variables in debug mode
if (process.env.LOG_LEVEL === 'debug') {
  logger.info(process.env);
}

// Start a server listening on this port
const server = stoppable(
  app.listen(port, () => {
    // Log server start and port
    logger.info(`Server started on port ${port}`);
  })
);

// Export our server instance so other parts of our code can access it if necessary.
module.exports = server;

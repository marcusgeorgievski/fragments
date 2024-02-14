const { createSuccessResponse } = require('../../response');
const logger = require('../../logger');

/**
 * Create a new fragment for the current user
 */
module.exports = (req, res) => {
  logger.info('Creating a new fragment');
  console.log('Creating a new fragment');
  res.status(200).json(createSuccessResponse({ fragments: [] }));
};

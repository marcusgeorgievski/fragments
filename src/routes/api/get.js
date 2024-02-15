const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports = async (req, res) => {
  try {
    let results = null;
    results = await Fragment.byUser(req.user, req.query.expand === '1');

    logger.info(`Fetched fragments for ownerId=${req.user}`);

    res.status(200).json(createSuccessResponse({ fragments: results }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

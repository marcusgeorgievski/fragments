const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');
const logger = require('../../logger');

/**
 * Get a list of fragments for the current user
 */
module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Fragment.byId(req.user, id);
    logger.info(`Fetched fragment byId for ownerId=${req.user} with id=${id}:`);
    res.status(200).json(createSuccessResponse({ fragment: result }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

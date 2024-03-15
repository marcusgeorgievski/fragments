const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

// Get a list of fragments for the current user
module.exports = async (req, res) => {
  const ownerId = req.user;
  const expand = req.query.expand == '1';

  try {
    const fragments = await Fragment.byUser(ownerId, expand);

    logger.info(`Fetched ${fragments.length} fragments for ownerId: ${ownerId}`);

    res.status(200).json(createSuccessResponse({ fragments }));
  } catch (error) {
    logger.info(`Failed to fetch fragments for ownerId: ${ownerId}`);
    res.status(500).json({ error: error.message });
  }
};

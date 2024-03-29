const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');
const { ApplicationError } = require('../../model/app-error');

// Get a list of fragments for the current user
module.exports = async (req, res, next) => {
  const ownerId = req.user;
  const expand = req.query.expand == '1';

  logger.debug({ ownerId, expand }, `Fetching fragments by ownerId ${ownerId}`);

  try {
    const fragments = await Fragment.byUser(ownerId, expand);

    logger.info(`Fetched ${fragments.length} fragments for ownerId ${ownerId}`);

    res.status(200).json(createSuccessResponse({ fragments }));
  } catch (err) {
    logger.error(`Failed to fetch fragments for ownerId ${ownerId}`);
    next(new ApplicationError(500, `Failed to fetch fragments for ownerId ${ownerId}`));
  }
};

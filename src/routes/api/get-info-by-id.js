const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');
const logger = require('../../logger');
const { ApplicationError } = require('../../model/app-error');
// const { ApplicationError } = require('../../model/app-error');

// Get a fragment by id
module.exports = async (req, res, next) => {
  const fragmentId = req.params.id;
  const ownerId = req.user;

  logger.debug({ ownerId, fragmentId }, 'Fetching fragment info by ID');

  try {
    const fragment = await Fragment.byId(ownerId, fragmentId);

    logger.info(`Fetched fragment for ownerId ${ownerId} and fragment ID ${fragmentId}`);
    logger.debug({ fragment }, 'Fragment');

    res.status(200).send(
      createSuccessResponse({
        fragment,
      })
    );
  } catch (err) {
    logger.error(`Failed to fetch fragment for ownerId ${ownerId} and fragment ID ${fragmentId}`);
    next(
      new ApplicationError(
        404,
        `Failed to fetch fragment for ownerId ${ownerId} and fragment ID ${fragmentId}`
      )
    );
  }
};

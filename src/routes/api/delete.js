const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');
const { createSuccessResponse } = require('../../response');
const { ApplicationError } = require('../../model/app-error');

// DELETE fragment by id
module.exports = async (req, res, next) => {
  const fragmentId = req.params.id;
  const ownerId = req.user;

  logger.debug({ ownerId, fragmentId }, 'Delete fragment by ID');
  try {
    if (!fragmentId) {
      throw new ApplicationError(404, 'Fragment ID not provided');
    }

    await Fragment.delete(ownerId, fragmentId);

    logger.info(`Deleted fragment for ownerId ${ownerId} with fragment ID ${fragmentId}`);
    res.status(200).send(createSuccessResponse());
  } catch (error) {
    logger.error(`Failed to fetch fragment for ownerId: ${ownerId} and fragment ID: ${fragmentId}`);
    next(
      new ApplicationError(
        error.status || 404,
        `Failed to fetch fragment for ownerId ${ownerId} and fragment ID ${fragmentId}`
      )
    );
  }
};

const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');
const { createErrorResponse, createSuccessResponse } = require('../../response');

// DELETE fragment by id
module.exports = async (req, res) => {
  const fragmentId = req.params.id;
  const ownerId = req.user;

  logger.debug({ ownerId, fragmentId }, 'Delete fragment by ID');

  try {
    await Fragment.delete(ownerId, fragmentId);

    logger.info(`Deleted fragment for ownerId ${ownerId} with fragment ID ${fragmentId}`);
    res.status(200).send(createSuccessResponse());
  } catch (error) {
    logger.error(`Failed to fetch fragment for ownerId: ${ownerId} and fragment ID: ${fragmentId}`);
    res.status(error.status || 404).json(createErrorResponse(error.status || 404, error.message));
  }
};

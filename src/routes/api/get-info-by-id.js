const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');

// Get a fragment by id
module.exports = async (req, res) => {
  const fragmentId = req.params.id;
  const ownerId = req.user;

  try {
    const fragment = await Fragment.byId(ownerId, fragmentId);

    logger.info(`Fetched fragment for ownerId ${ownerId} and fragment ID ${fragmentId}`);

    res.status(200).send(
      createSuccessResponse({
        fragment,
      })
    );
  } catch (error) {
    logger.error(`Failed to fetch fragment for ownerId: ${ownerId} and fragment ID: ${fragmentId}`);
    res.status(404).json(createErrorResponse(404, error.message));
  }
};

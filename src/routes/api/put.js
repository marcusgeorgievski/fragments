const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
var contentType = require('content-type');

// UPDATE an existing fragment
module.exports = async (req, res) => {
  const fragmentId = req.params.id;
  const ownerId = req.user;
  const { type } = contentType.parse(req.get('Content-Type'));
  const size = Number(req.headers['content-length']);

  logger.debug({ ownerId, fragmentId, type, size }, 'Updating fragment');

  try {
    const originalFragment = await Fragment.byId(ownerId, fragmentId);
    const isMatchingType = originalFragment.mimeType === type;

    // Type must be same as original
    if (!isMatchingType) {
      logger.error('New type does not match existing type:', type);
      const error = new Error(`New type does not match existing type: ${type}`);
      error.status = 400;
      throw error;
    }

    await originalFragment.setData(req.body);
    // await originalFragment.save();

    logger.info(`Updated fragment for ownerId ${ownerId} with fragment ID ${originalFragment.id}`);

    res.status(200).json(createSuccessResponse({ fragment: originalFragment }));
  } catch (error) {
    logger.error('Error updating fragment ', error);
    res.status(error.status || 404).json(createErrorResponse(error.status || 404, error.message));
  }
};

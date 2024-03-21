const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
var contentType = require('content-type');

// Create a new fragment for the current user
module.exports = async (req, res) => {
  const ownerId = req.user;
  const { type } = contentType.parse(req.get('Content-Type'));
  const size = Number(req.headers['content-length']);

  logger.debug({ ownerId, type, size }, 'Creating a new fragment');

  try {
    const isSupportedType = Fragment.isSupportedType(type);

    // Disallow unsupported types
    if (!isSupportedType) {
      logger.error('Unsupported type:', type);
      const error = new Error(`Unsupported type: ${type}`);
      error.status = 415;
      throw error;
    }

    const fragment = new Fragment({
      ownerId,
      type,
      size,
    });

    await fragment.save();
    await fragment.setData(req.body);

    logger.info(`Created new fragment for ownerId ${ownerId} with fragment ID ${fragment.id}`);

    const hostUrl = `${req.secure ? `https://` : `http://`}${req.headers.host}`;
    logger.debug({ hostUrl }, 'Host URL');

    res.set({ Location: `${hostUrl}/v1/fragments/${fragment.id}` });
    res.status(201).json(createSuccessResponse({ fragment }));
  } catch (error) {
    logger.error('Error creating a new fragment ', error);
    res.status(error.status || 500).json(createErrorResponse(error.status || 500, error.message));
  }
};

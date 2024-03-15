const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
var contentType = require('content-type');

// Create a new fragment for the current user
module.exports = async (req, res) => {
  const ownerId = req.user;
  const { type } = contentType.parse(req.get('Content-Type'));
  const size = Number(req.headers['content-length']);

  try {
    const isSupportedType = Fragment.isSupportedType(type);

    // Disallow unsupported types
    if (!isSupportedType) {
      logger.error('Unsupported type:', type);
      res.status(415).json(createErrorResponse(415, 'Unsupported type: ' + type));
      return;
    }

    const fragment = new Fragment({
      ownerId,
      type,
      size,
    });

    await fragment.save();
    await fragment.setData(req.body);

    logger.info('Created new fragment for ownerId=', ownerId, ' with id=', fragment.id);

    const hostUrl =
      process.env.NODE_ENV === 'development'
        ? `http://${req.headers.host}`
        : `https://${req.headers.host}`;

    res.set({ Location: `${hostUrl}/v1/fragments/${fragment.id}` });

    res.status(201).json(createSuccessResponse({ fragment }));
  } catch (error) {
    logger.error('Error creating a new fragment ', error);
    createErrorResponse(res.status(500).json(500, 'Error creating a new fragment ' + error));
  }
};

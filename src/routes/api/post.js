const { createSuccessResponse, createErrorResponse } = require('../../response');
const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
var contentType = require('content-type');
// const { randomUUID, createHash } = require('crypto');

/**
 * Create a new fragment for the current user
 */
module.exports = async (req, res) => {
  try {
    const { type } = contentType.parse(req.get('Content-Type'));
    const size = Number(req.headers['content-length']);

    const fragment = new Fragment({
      ownerId: req.user,
      type,
      size,
    });

    await fragment.save();
    await fragment.setData(req.body);

    // console.log(fragment.id);

    logger.info('Created new fragment for ownerId=', req.user, ' with id=', fragment.id);

    // set Location header to the URL of the newly created fragment
    res.set({ Location: `${req.headers.host}/v1/fragments/${fragment.id}` });
    res.status(200).json(createSuccessResponse({ fragment: fragment }));
  } catch (error) {
    logger.error('Error creating a new fragment ', error);
    createErrorResponse(res.status(500).json(500, 'Error creating a new fragment ' + error));
  }
};

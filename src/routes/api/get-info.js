const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');
const logger = require('../../logger');

/**
 * Get a fragment by its id
 */
module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const fragment = await Fragment.byId(req.user, id);

    logger.info(`Fetched fragment by id for ownerId=${req.user} with id=${id}:`);

    res.status(200).send(
      createSuccessResponse({
        fragment: { ...fragment },
      })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

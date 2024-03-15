const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');
const logger = require('../../logger');

// Get a fragment by id
module.exports = async (req, res) => {
  const id = req.params.id;
  const ownerId = req.user;

  try {
    const fragment = await Fragment.byId(ownerId, id);

    logger.info(`Fetched fragment by id for ownerId=${req.user} with id=${id}:`);

    res.status(200).send(
      createSuccessResponse({
        fragment,
      })
    );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

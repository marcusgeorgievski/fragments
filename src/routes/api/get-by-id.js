const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');

// Get a fragment by id
module.exports = async (req, res) => {
  // TODO: supported type conversion (415 err)
  const fragmentId = req.params.id;
  const ownerId = req.user;

  try {
    const fragmentMetadata = await Fragment.byId(ownerId, fragmentId);
    const fragmentData = await fragmentMetadata.getData();

    logger.info(`Fetched fragment by id for ownerId=${ownerId} with id=${fragmentId}:`);

    res.set({ 'Content-Type': fragmentMetadata.type });
    res.status(200).send(fragmentData.toString());
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Fragment.byId(req.user, id);

    if (result === null) {
      res.status(404).json({ error: `Fragment not found for ownerId: ${req.user} and id: ${id}` });
      return;
    }

    res.status(200).json(createSuccessResponse({ fragment: result }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

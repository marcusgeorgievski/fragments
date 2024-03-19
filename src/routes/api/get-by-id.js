const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');
const MarkdownIt = require('markdown-it');
const { createErrorResponse } = require('../../response');

// Get a fragment by id
module.exports = async (req, res) => {
  // TODO: supported type conversion (415 err)
  const paramId = req.params.id;
  const ownerId = req.user;
  const [fragmentId, ext] = paramId.split('.');

  try {
    const fragment = await Fragment.byId(ownerId, fragmentId);
    const fragmentData = await fragment.getData();

    logger.info(`Fetched fragment for ownerId ${ownerId} and fragment ID ${fragmentId}`);

    // Extension provided, convert if possible
    if (ext !== undefined) {
      const convertedData = convertFragment(fragmentData.toString(), fragment, ext);

      logger.info(`Converted ${fragment.mimeType} to ${extToType[ext]}`);
      res.set({ 'Content-Type': extToType[ext] });
      const convertedBuffer = Buffer.from(convertedData);
      res.status(200).send(convertedBuffer);
      return;
    }

    res.set({ 'Content-Type': fragment.type });
    res.status(200).send(fragmentData);
  } catch (error) {
    logger.error(`Failed to fetch fragment for ownerId: ${ownerId} and fragment ID: ${fragmentId}`);
    res.status(error.status || 404).json(createErrorResponse(error.status || 404, error.message));
  }
};

const extToType = {
  txt: 'text/plain',
  md: 'text/markdown',
  html: 'text/html',
  csv: 'text/csv',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
};

function convertFragment(fragmentData, fragment, ext) {
  const extType = extToType[ext]; // ext -> mime/type
  const validTypes = fragment.formats;
  const fragmentType = fragment.mimeType;

  if (!validTypes.includes(extType)) {
    const error = new Error(`Cannot convert fragment to ${extType}`);
    error.status = 415;
    throw error;
  }

  let convertedData;

  switch (fragmentType) {
    case 'text/markdown':
      if (extType === 'text/html') {
        const md = new MarkdownIt({
          html: true,
        });

        convertedData = md.render(fragmentData);
      }
      break;
  }

  return convertedData;
}

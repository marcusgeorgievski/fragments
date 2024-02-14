// Use crypto.randomUUID() to create unique IDs, see:
// https://nodejs.org/api/crypto.html#cryptorandomuuidoptions
const { randomUUID, createHash } = require('crypto');
// Use https://www.npmjs.com/package/content-type to create/parse Content-Type headers
const contentType = require('content-type');

// Functions for working with fragment metadata/data using our DB
const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('./data');
// const { format } = require('path');

class Fragment {
  constructor({
    id,
    ownerId,
    created = new Date().toISOString(),
    updated = new Date().toISOString(),
    type,
    size = 0,
  }) {
    if (!ownerId || !type) {
      throw new Error('ownerId and type are required');
    }
    if (typeof size !== 'number' || size < 0) {
      throw new Error('size must be a non-negative number');
    }
    if (!Fragment.isSupportedType(type)) {
      throw new Error('Unsupported type');
    }

    // TODO
    this.id = id || randomUUID();
    this.ownerId = createHash('sha256').update(ownerId).digest('hex');
    this.created = created;
    this.updated = updated;
    this.type = type;
    this.size = size;
  }

  /**
   * Get all fragments (id or full) for the given user
   * @param {string} ownerId user's hashed email
   * @param {boolean} expand whether to expand ids to full fragments
   * @returns Promise<Array<Fragment>>
   */
  static async byUser(ownerId, expand = false) {
    // TODO
    const hashedOwnerId = createHash('sha256').update(ownerId).digest('hex');
    return listFragments(hashedOwnerId, expand);
  }

  /**
   * Gets a fragment for the user by the given id.
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<Fragment>
   */
  static async byId(ownerId, id) {
    // TODO
    let hashedOwnerId = createHash('sha256').update(ownerId).digest('hex');

    try {
      // Read the fragment metadata
      let fragmentData = await readFragment(hashedOwnerId, id);

      // If no fragment is found, throw an error
      if (!fragmentData) {
        throw new Error(`Fragment not found for ownerId: ${ownerId} and id: ${id}`);
      }

      return fragmentData;
    } catch (error) {
      // Rethrow with error message
      throw new Error(
        `Error fetching fragment byId for ownerId=${ownerId} and id=${id}: ${error.message}`
      );
    }
  }

  /**
   * Delete the user's fragment data and metadata for the given id
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<void>
   */
  static delete(ownerId, id) {
    // TODO
    const hashedOwnerId = createHash('sha256').update(ownerId).digest('hex');
    return deleteFragment(hashedOwnerId, id);
  }

  /**
   * Saves the current fragment to the database
   * @returns Promise<void>
   */
  save() {
    // TODO: save and update the updated date
    this.updated = new Date().toISOString();
    return writeFragment(this);
  }

  /**
   * Gets the fragment's data from the database
   * @returns Promise<Buffer>
   */
  getData() {
    // TODO
    return readFragmentData(this.ownerId, this.id);
  }

  /**
   * Set's the fragment's data in the database
   * @param {Buffer} data
   * @returns Promise<void>
   */
  async setData(data) {
    // check if data is a buffer

    if (!Buffer.isBuffer(data)) {
      throw new Error('Data must be a buffer');
    }

    // Set new size
    this.size = data.length;

    // Update the updated date
    this.updated = new Date().toISOString();

    return writeFragmentData(this.ownerId, this.id, data);
  }

  /**
   * Returns the mime type (e.g., without encoding) for the fragment's type:
   * "text/html; charset=utf-8" -> "text/html"
   * @returns {string} fragment's mime type (without encoding)
   */
  get mimeType() {
    const { type } = contentType.parse(this.type);
    return type;
  }

  /**
   * Returns true if this fragment is a text/* mime type
   * @returns {boolean} true if fragment's type is text/*
   */
  get isText() {
    // TODO
    return this.mimeType.startsWith('text/');
  }

  /**
   * Returns the formats into which this fragment type can be converted
   * @returns {Array<string>} list of supported mime types
   */
  get formats() {
    const conversionMap = {
      'text/plain': ['text/plain'],
      'text/markdown': ['text/markdown', 'text/html', 'text/plain'],
      'text/html': ['text/html', 'text/plain'],
      'text/csv': ['.csv', 'text/plain', '.json'],
      'application/json': ['.json', 'text/plain'],
      'image/png': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
      'image/jpeg': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
      'image/webp': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
      'image/avif': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
      'image/gif': ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'],
    };

    // Extract the media type
    let { type } = contentType.parse(this.mimeType);

    return conversionMap[type];
  }

  /**
   * Returns true if we know how to work with this content type
   * @param {string} value a Content-Type value (e.g., 'text/plain' or 'text/plain: charset=utf-8')
   * @returns {boolean} true if we support this Content-Type (i.e., type/subtype)
   */
  static isSupportedType(value) {
    const validTypes = [
      `text/plain`,
      /*
       Currently, only text/plain is supported. Others will be added later.

      `text/markdown`,
      `text/html`,
      `application/json`,
      `image/png`,
      `image/jpeg`,
      `image/webp`,
      `image/gif`,
      */
    ];

    // Extract the media type
    let { type } = contentType.parse(value);

    // Check if the value includes any of the valid types
    return validTypes.includes(type);
  }
}

// export the Fragment class
module.exports.Fragment = Fragment;

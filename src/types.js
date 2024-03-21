// This file container jsdoc types for the fragments service

// Models -----------------------------------------------------------

// Fragment metadata

/**
 * @typedef {Object} FragmentMetadata
 * @property {string} id
 * @property {string} ownerId
 * @property {string} created
 * @property {string} updated
 * @property {string} type
 * @property {number} size
 */

// Custom response types --------------------------------------------

// Success response with fragment metadata

/**
 * @typedef {Object} SuccessResponseMetadata
 * @property {string} status
 * @property {Fragment} fragment
 */

// Success response with array of fragment id's

/**
 * @typedef {Object} SuccessResponseArray
 * @property {string} status
 * @property {string[]} fragments
 */

// Success response with array of fragments metadata

/**
 * @typedef {Object} SuccessResponseMetadataArray
 * @property {string} status
 * @property {FragmentMetadata[]} fragments
 */

// Response types ---------------------------------------------------

// POST /v1/fragments

/**
 * @typedef {Object} PostResponse
 * @property {number} statusCode
 * @property {Object} header
 * @property {SuccessResponseMetadata} body
 */

// GET /v1/fragments

/**
 * @typedef {Object} GetResponse
 * @property {number} statusCode
 * @property {Object} header
 * @property {SuccessResponseArray} body
 */

// GET /v1/fragments?expand=1

/**
 * @typedef {Object} GetResponse
 * @property {number} statusCode
 * @property {Object} header
 * @property {SuccessResponseMetadataArray} body
 */

// GET /v1/fragments/:id

/**
 * @typedef {Object} GetIdResponse
 * @property {number} statusCode
 * @property {Object} header
 * @property {string} text
 */

// GET /v1/fragments/:id/info

/**
 * @typedef {Object} GetInfoResponse
 * @property {number} statusCode
 * @property {Object} header
 * @property {SuccessResponseMetadata} body
 */

// Allows the typedefs to be imported from other files
module.exports = {};

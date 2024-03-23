/**
 * Represents an error related to fragment operations.
 * @class
 * @extends Error
 */
class FragmentsError extends Error {
  /**
   * Creates an instance of FragmentsError.
   * @param {number} status - The HTTP status code related to the error.
   * @param {string} message - The error message.
   */
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

module.exports.FragmentsError = FragmentsError;

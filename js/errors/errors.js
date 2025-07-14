// errors.js

export class InvalidParamsForParabola extends Error {
  /**
   * @param {string} message - Error message describing what went wrong.
   */
  constructor(message) {
    super(message);
    this.name = "InvalidParamsForParabola";
  }
}

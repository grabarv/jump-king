// Parabola.js

import { InvalidParamsForParabola } from "../errors/errors.js";

export class Parabola {
  // parabola is stored in the form of y=a*(x-h)^2 + k; a !== 0;
  #a;
  #h;
  #k;

  constructor() {}

  /**
   * Creates new formula of parabola
   * @param {number} x1 any abscissa
   * @param {number} y1 any y ordinate
   * @param {number} x2 abscissa of vertex
   * @param {number} y2 ordinate of vertex
   */
  createNew(x1, y1, x2, y2) {
    this.#h = x2;
    this.#k = y2;
    this.#a = (y1 - this.#k) / Math.pow(x1 - this.#h, 2);
    // console.log(this.#a, this.#h, this.#k);
    // console.log(x1, y1, x2, y2);
    if (this.#a === NaN || this.#a === 0 || Math.abs(this.#a) === Infinity) {
      throw new InvalidParamsForParabola(
        "Error in creating parabola: a = " + this.#a
      );
    }
  }

  /**
   * calculates ordinate
   * @param {number} x any abscissa
   */

  calcY(x) {
    return this.#a * Math.pow(x - this.#h, 2) + this.#k;
  }

  get vertex() {
    return [this.#h, this.#k];
  }
}

// PlayerElementView.js
import { UIManager } from "../utils/UIManager.js";

export class PlayerElementView {
  #element;
  #size;
  #maxX;
  #maxY;

  constructor(selector = ".player") {
    this.#element = document.querySelector(selector);

    if (!this.#element) {
      throw new Error("Player element not found!");
    }

    const styles = window.getComputedStyle(this.#element);
    const w = parseFloat(styles.width || "0");
    const h = parseFloat(styles.height || "0");

    if (!w || !h) {
      throw new Error("Player element size could not be computed.");
    }

    this.#size = [w, h];
    this.#maxX = window.innerWidth - w - UIManager.getSidebarWidth();
    this.#maxY = window.innerHeight - h;
  }

  hide() {
    this.#element.classList.add("hidden");
  }

  show() {
    this.#element.classList.remove("hidden");
  }

  updatePosition(x, y) {
    this.#element.style.left = x + "px";
    this.#element.style.top = y + "px";
  }

  get size() {
    return this.#size;
  }

  get maxX() {
    return this.#maxX;
  }

  get maxY() {
    return this.#maxY;
  }
}

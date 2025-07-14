// Level.js

import { Block } from "./Block.js";

export class Level {
  #levelHTMLElement;
  #mapHTMLElement;

  constructor(mapHTMLElement) {
    this.#mapHTMLElement = mapHTMLElement;
    this.#levelHTMLElement = document.createElement("div");
    this.#levelHTMLElement.style.position = "absolute";
    this.#levelHTMLElement.style.width = "calc(95vw - 3px)";
    this.#levelHTMLElement.style.height = "100vh";
    this.#levelHTMLElement.style.top = `0vh`;
    this.#levelHTMLElement.style.left = "0";
    this.#mapHTMLElement.append(this.#levelHTMLElement);
  }

  hide() {
    this.#levelHTMLElement.classList.add("hidden");
  }
  show() {
    this.#levelHTMLElement.classList.remove("hidden");
  }
  get levelHTMLElement() {
    return this.#levelHTMLElement;
  }
  get mapHTMLElement() {
    return this.#mapHTMLElement;
  }
}

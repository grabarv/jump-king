// InputHandler.js

export class InputHandler {
  #keysPressed = {};

  constructor() {
    document.addEventListener("keydown", (e) => {
      this.#keysPressed[e.key] = true;
    });
    document.addEventListener("keyup", (e) => {
      this.#keysPressed[e.key] = false;
    });
  }
  isPressed(key) {
    return this.#keysPressed[key] ?? false;
  }

  isPressed(keys) {
    if (typeof keys === "string") {
      return this.#keysPressed[keys] ?? false;
    }
    if (typeof keys === "object") {
      return keys.some((key) => this.#keysPressed[key]);
    }
    return false;
  }
}

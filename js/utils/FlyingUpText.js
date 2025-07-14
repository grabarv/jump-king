// FlyingUpText,js

export class FlyingUpText {
  #htmlElement;
  constructor(text, top, left, width, height) {
    const textElement = document.createElement("p");
    textElement.textContent = text;
    this.#htmlElement = document.createElement("div");
    this.#htmlElement.style.position = "fixed";
    this.#htmlElement.style.top = top + "vh";
    this.#htmlElement.style.left = left + "vw";
    if (width && height) {
      this.#htmlElement.style.width = width + "vw";
      this.#htmlElement.style.height = height + "h";
    }
    this.#htmlElement.classList.add("fade-up", "hidden");

    this.#htmlElement.appendChild(textElement);
    document.body.append(this.#htmlElement);
    this.#htmlElement.addEventListener("animationend", () => {
      this.#htmlElement.classList.add("hidden");
      this.#htmlElement.classList.remove("fade-up-animation");
    });
  }
  startAnimation(sec) {
    this.#htmlElement.classList.remove("hidden");

    if (sec >= 12) {
      this.#htmlElement.classList.add("fade-up-animation-20-sec");
    } else {
      this.#htmlElement.classList.add("fade-up-animation-6-sec");
    }
  }
}

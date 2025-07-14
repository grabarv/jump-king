import { FlyingUpText } from "./FlyingUpText.js";

// UIManager.js
export class UIManager {
  #welcomePage = document.querySelector(".welcome-page");
  #powerBar = document.querySelector(".power");
  #game = document.querySelector(".game");
  #settingBtn = document.querySelector(".settings");
  #settingWindow = document.querySelector(".settings-window");
  #speedAccInput = this.#settingWindow.querySelector("#power-gain");
  #playerMovementInput = this.#settingWindow.querySelector("#player-speed");
  #bindApplyChanges;
  #bindCloseSettings;
  #bindResetSettings;
  flyUpText = new FlyingUpText("Press Escape to close settings", 10, 35);

  hideWelcomePage() {
    this.#welcomePage.classList.add("hidden");
    this.#game.classList.remove("hidden");
  }

  showWelcomePage() {
    this.#welcomePage.classList.remove("hidden");
    this.#game.classList.add("hidden");
  }

  updatePowerDisplay(power) {
    this.#powerBar.style.height = `${100 * (1 - power)}%`;
  }

  static getSidebarWidth() {
    const sidebar = document.querySelector(".aside");

    if (!sidebar) return 0;
    return sidebar.getBoundingClientRect().width;
  }
  static get windowHeight() {
    return window.innerHeight;
  }
  static get windowWidth() {
    return window.innerWidth;
  }
  static areElementsOverlapping(HTMLElement1, HTMLElement2) {
    const rect1 = HTMLElement1.getBoundingClientRect();
    const rect2 = HTMLElement2.getBoundingClientRect();

    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  static areElementsOverlapping(
    x1,
    y1,
    width1,
    height1,
    x2,
    y2,
    width2,
    height2
  ) {
    return !(
      x1 + width1 < x2 ||
      x1 > x2 + width2 ||
      y1 + height1 < y2 ||
      y1 > y2 + height2
    );
  }
  static scoreBarHeight() {
    return Number.parseFloat(
      window.getComputedStyle(document.querySelector(".score"))?.height
    );
  }

  static changeBackgroundColor(color) {
    document.body.style.backgroundImage = "none";
    document.querySelector("body").style.backgroundColor = color;
  }

  switchOnSettingButton(jumpController) {
    this.#settingBtn.addEventListener("click", () => {
      this.#openSettings(jumpController);
    });
    this.#bindCloseSettings = this.#closeSettings.bind(this);
    document.addEventListener("keydown", this.#bindCloseSettings);
    this.#bindApplyChanges = this.#applyChanges.bind(this, jumpController);
    document
      .querySelector("#apply")
      .addEventListener("click", this.#bindApplyChanges);
    this.#bindResetSettings = this.#resetSettings.bind(this, jumpController);

    document
      .querySelector("#reset")
      .addEventListener("click", this.#bindResetSettings);

    this.#prepareSettings(jumpController);
  }

  #resetSettings(jumpController, e) {
    e.preventDefault();
    jumpController.resetJumpAccumulationSpeed();
    jumpController.resetMoveX();
    this.#prepareSettings(jumpController);
  }

  #prepareSettings(jumpController) {
    let jumpSpeed = jumpController.jumpAccumulationSpeed;
    let moveX = jumpController.moveX;
    this.#speedAccInput.value = jumpSpeed;
    this.#playerMovementInput.value = moveX;
  }

  #openSettings(jumpController) {
    this.flyUpText.startAnimation();
    this.#prepareSettings(jumpController);
    this.#settingWindow.classList.remove("hidden");
  }
  #applyChanges(jumpController, e) {
    e.preventDefault();

    let jumpSpeed = +this.#speedAccInput.value;
    let moveX = +this.#playerMovementInput.value;
    jumpController.jumpAccumulationSpeed = jumpSpeed;
    jumpController.moveX = moveX;

    this.#closeSettings({ key: "Escape" });
  }

  #closeSettings(e) {
    if (
      e.key === "Escape" &&
      !this.#settingWindow.classList.contains("hidden")
    ) {
      this.#settingWindow.classList.add("hidden");
    }
  }
  switchOffSettingButton() {
    document.removeEventListener("keydown", this.#bindCloseSettings);
    this.#settingWindow
      .querySelector("button")
      .removeEventListener("click", this.#bindApplyChanges);
    this.#settingBtn.removeEventListener("click", this.#openSettings);
  }

  static switchToSky() {
    document.body.classList.add("sky");
    document.body.classList.remove("leaves");
  }

  static switchToLeaves() {
    document.body.classList.add("leaves");
    document.body.classList.remove("sky");
  }
}

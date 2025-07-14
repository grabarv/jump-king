//JumpController.js

import { UIManager } from "../utils/UIManager.js";
import { Parabola } from "./Parabola.js";

export class JumpController {
  #jumpPower = 0;
  #isJumping = false;
  #jumpDirection = "none"; // "left", "right", "none"
  #jumpCapacity = 0.6;
  #maxPower = 1.0;
  #player;
  #input;
  #moveX;
  #moveY;
  #jumpParabola = new Parabola();
  #jumpAccumulationSpeed = 0.01;
  #xInParabola = 0;
  #startDirection = "none"; // "left", "right", "none";
  #defaultJumpAccumulationSpeed;
  #defaultMoveX;

  constructor(player, input, moveX, moveY) {
    this.#player = player;
    this.#input = input;
    this.#moveX = moveX * UIManager.windowWidth;
    this.#moveY = moveY * UIManager.windowHeight * this.#jumpCapacity;
    this.#defaultJumpAccumulationSpeed = this.#jumpAccumulationSpeed;
    this.#defaultMoveX = this.#moveX;
  }

  update() {
    const jumpKeys = ["w", "W", " ", "ArrowUp"];
    const leftKeys = ["a", "A", "ArrowLeft"];
    const rightKeys = ["d", "D", "ArrowRight"];

    if (
      this.#input.isPressed(jumpKeys) &&
      !this.#isJumping &&
      this.#player.isStanding()
    ) {
      this.#jumpPower = Math.min(
        this.#maxPower,
        this.#jumpPower + this.#jumpAccumulationSpeed
      );
    }

    if (
      this.#jumpPower > 0 &&
      !this.#input.isPressed(jumpKeys) &&
      this.#player.isStanding()
    ) {
      if (!this.#isJumping) {
        this.#player.resetHightChange();
        // const div   = document.createElement("div");
        // div.style.width = "100px";
        // div.style.height = "100px";
        // div.style.position = "absolute";
        // div.style.backgroundColor = "black";
        this.#xInParabola = this.#player.XPos;
        if (this.#input.isPressed(leftKeys)) {
          this.#jumpDirection = "left";
          this.#startDirection = "left";
          this.#jumpParabola.createNew(
            this.#player.XPos,
            this.#player.YPos,
            this.#player.XPos - UIManager.windowWidth * this.#jumpPower,
            this.#player.YPos -
              this.#jumpPower * UIManager.windowHeight * this.#jumpCapacity
          );

          // div.style.left = `${
          //   this.#player.XPos - UIManager.windowWidth * this.#jumpPower
          // }px`;
          // div.style.top = `${
          //   this.#player.YPos -
          //   this.#jumpPower * UIManager.windowHeight * this.#jumpCapacity
          // }px`;
        } else if (this.#input.isPressed(rightKeys)) {
          this.#jumpDirection = "right";
          this.#startDirection = "right";
          this.#jumpParabola.createNew(
            this.#player.XPos,
            this.#player.YPos,
            this.#player.XPos + UIManager.windowWidth * this.#jumpPower,
            this.#player.YPos -
              this.#jumpPower * UIManager.windowHeight * this.#jumpCapacity
          );

          // div.style.left = `${
          //   this.#player.XPos + UIManager.windowWidth * this.#jumpPower
          // }px`;
          // div.style.top = `${
          //   this.#player.YPos -
          //   this.#jumpPower * UIManager.windowHeight * this.#jumpCapacity
          // }px`;
        } else {
          this.#jumpDirection = "none";
          this.#startDirection = "none";

          // div.style.left = `${this.#player.XPos}px`;
          // div.style.top = `${
          //   this.#player.YPos -
          //   this.#jumpPower * UIManager.windowHeight * this.#jumpCapacity
          // }px`;
        }

        // document
        //   .querySelector(".game")
        //   .insertAdjacentElement("afterbegin", div);
      }

      this.#isJumping = true;
    }

    if (this.#isJumping) {
      if (this.#jumpDirection === "none") {
        if (this.#jumpPower > 0) {
          if (this.#player.canMoveUp()) {
            this.#player.moveToWithoutHeightChange(
              this.#player.XPos,
              this.#player.YPos - this.#moveY
            );
          } else {
            this.#jumpPower = 0;
          }
        } else {
          this.#player.moveToWithoutHeightChange(
            this.#player.XPos,
            this.#player.YPos + this.#moveY
          );
        }
      } else {
        this.#changeDirection();
        const x1 = this.#xInParabola;
        this.#updatePosInParabola();
        const x2 = this.#xInParabola;
        if (this.#jumpParabola.calcY(x1) > this.#jumpParabola.calcY(x2)) {
          if (this.#player.canMoveUp()) {
            const a = this.#moveHorizontallyTo();

            this.#player.moveTo(a, this.#jumpParabola.calcY(this.#xInParabola));
          } else {
            this.#jumpPower = 0;
            this.#jumpDirection = "none";
          }
        } else {
          const a = this.#moveHorizontallyTo();

          this.#player.moveTo(a, this.#jumpParabola.calcY(this.#xInParabola));
        }
      }

      this.#jumpPower -= this.#jumpAccumulationSpeed;

      if (
        this.#jumpPower < 0
        // || this.#jumpParabola.calcY(this.#xInParabola) < this.#player.element.maxY
      ) {
        this.#jumpPower = 0;
      }
    }
    if (this.#player.isStanding() && this.#jumpPower <= 0) {
      if (this.#isJumping) {
        this.#isJumping = false;
        this.#jumpDirection = "none";
        this.#startDirection = "none";
      }
    }

    if (this.#player.isStanding() && !this.#player.canMoveUp()) {
      this.#changeDirection();
      if (this.#input.isPressed(leftKeys)) {
        this.#player.moveTo(this.#player.XPos - this.#moveX, this.#player.YPos);
      } else if (this.#input.isPressed(rightKeys)) {
        this.#player.moveTo(this.#player.XPos + this.#moveX, this.#player.YPos);
      }
    }

    return this.#jumpPower;
  }

  // reset() {
  //   this.#jumpPower = 0;
  //   this.#isJumping = false;
  //   this.#jumpDirection = "none";
  // }

  #changeDirection() {
    if (this.#jumpDirection === "left" && !this.#player.canMoveLeft()) {
      this.#jumpDirection = "right";
    }
    if (this.#jumpDirection === "right" && !this.#player.canMoveRight()) {
      this.#jumpDirection = "left";
    }
  }

  #moveHorizontallyTo() {
    if (this.#jumpDirection === "left") {
      return this.#player.XPos - this.#moveX;
    } else if (this.#jumpDirection === "right") {
      return this.#player.XPos + this.#moveX;
    } else {
      return this.#player.XPos;
    }
  }

  #updatePosInParabola() {
    if (this.#startDirection === "left") {
      this.#xInParabola -= this.#moveX;
    }
    if (this.#startDirection === "right") {
      this.#xInParabola += this.#moveX;
    }
  }
  get jumpAccumulationSpeed() {
    return this.#jumpAccumulationSpeed;
  }

  set jumpAccumulationSpeed(speed) {
    if (typeof speed === "number") {
      if (speed > 0.05) {
        this.#jumpAccumulationSpeed = 0.05;
      } else if (speed < 0.005) {
        this.#jumpAccumulationSpeed = 0.0005;
      } else {
        this.#jumpAccumulationSpeed = speed;
      }
    }
  }
  get moveX() {
    return this.#moveX / UIManager.windowWidth;
  }

  set moveX(newVal) {
    if (typeof newVal === "number") {
      if (newVal > 0.01) {
        this.#moveX = 0.01 * UIManager.windowWidth;
      } else if (newVal < 0.0005) {
        this.#moveX = 0.0005 * UIManager.windowWidth;
      } else {
        this.#moveX = newVal * UIManager.windowWidth;
      }
    }
  }
  resetJumpAccumulationSpeed() {
    this.#jumpAccumulationSpeed = this.#defaultJumpAccumulationSpeed;
  }
  resetMoveX() {
    this.#moveX = this.#defaultMoveX;
  }
}

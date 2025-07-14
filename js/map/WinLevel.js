// WinLevel.js

import { Player } from "../player/Player.js";
import { UIManager } from "../utils/UIManager.js";
import { Level } from "./Level.js";

export class WinLevel extends Level {
  moveUp = (UIManager.windowHeight - UIManager.scoreBarHeight()) * 0.001;
  isMovingUp = true;
  jumps = 0;
  constructor(mapHTMLElement) {
    super(mapHTMLElement);
    const html = `<br><br><br><h1> Winner</h1>
    <div class='cloud'> <img src='source/cloud.png'/></div>
    `;
    this.levelHTMLElement.insertAdjacentHTML("afterbegin", html);
    this.hide();
  }
  updateWinningAnimation(player) {
    UIManager.switchToSky();

    if (this.jumps < 5) {
      const position = this.cloudHTMLElement.getBoundingClientRect();
      if (
        position.top <=
        (UIManager.windowHeight -
          UIManager.scoreBarHeight() -
          position.height) /
          2 +
          UIManager.scoreBarHeight()
      ) {
        if (this.isMovingUp) {
          this.moveUp =
            (UIManager.windowHeight - UIManager.scoreBarHeight()) * 0.003;
          if (player.YPos > position.top - UIManager.windowHeight * 0.1) {
            player.moveToWithoutHeightChange(
              player.XPos,
              player.YPos - this.moveUp
            );
          } else {
            this.isMovingUp = false;
          }
        } else {
          // debugger;
          if (player.YPos < position.top) {
            player.moveToWithoutHeightChange(
              player.XPos,
              player.YPos + this.moveUp
            );
          } else {
            this.isMovingUp = true;
            this.jumps++;
          }
        }
      } else {
        // debugger;

        this.cloudHTMLElement.style.top = position.top - this.moveUp + "px";
        let y = position.top - this.moveUp;
        let x =
          position.left +
          position.width / 2 -
          player.width / 2 +
          UIManager.windowWidth * 0.03;
        player.moveToWithoutHeightChange(x, y);
      }
    }
  }
  get cloudHTMLElement() {
    return this.mapHTMLElement.querySelector(".cloud");
  }
}

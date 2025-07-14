// ScoreManager.js

import { UIManager } from "./UIManager.js";

export class ScoreManager {
  #scoreHTMLElement;
  #currentScore;
  #mapHandler;
  constructor(mapHandler) {
    this.#scoreHTMLElement = document.querySelector(".score");
    this.#currentScore = 0;
    this.#scoreHTMLElement.innerHTML = this.#currentScore;
    this.#mapHandler = mapHandler;
  }
  updateScore(playerBottomHeight) {
    if (this.#mapHandler.activeLevelID === this.#mapHandler.winningLevelD) {
      return;
    }

    let score = this.#mapHandler.levels
      .filter((levels, id) => {
        return this.#mapHandler.activeLevelID > id;
      })
      .reduce((acc, level) => {
        return acc + level.blocks.length;
      }, 0);
    score +=
      this.#mapHandler.levels?.[this.#mapHandler.activeLevelID]?.blocks?.filter(
        (block) => {
          return (
            (block.top * UIManager.windowHeight) / 100 >=
            playerBottomHeight - 30
          );
        }
      ).length ?? 0;
    this.#currentScore = score;
    this.#displayScore();
  }

  #displayScore() {
    this.#scoreHTMLElement.innerHTML = this.#currentScore;
  }
}

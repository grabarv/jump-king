// Map.js

import { PassLevel } from "./PassLevel.js";
import { WinLevel } from "./WinLevel.js";

/**
 * One level takes 100vh
 * 0 level - 8 blocks, width 20 vw
 * 1 level - 6 blocks, width 20 vw
 * 2 level - 5 blocks, width 15 vw
 * 3 level - 3 blocks, width 15 vw
 * 4 level - 3 blocks, width 10 vw
 *  */

export class MapHandler {
  #mapHTMLElement;
  #levelsAmount;
  #levels = [];
  #activeLevelID;
  #minPlayerPos = window.getComputedStyle(document.querySelector(".score"))
    .width;
  #mapID;

  constructor(levelsAmount = 5, mapID) {
    this.#mapID = mapID;
    if (document.querySelector(`.map--${mapID}`)) {
      this.#mapHTMLElement = document.querySelector(`#map--${mapID}`);
    } else {
      this.#mapHTMLElement = document.createElement("div");
      this.#mapHTMLElement.classList.add("map");
      this.#mapHTMLElement.id = `map--${mapID}`;
      document.querySelector(".game").append(this.#mapHTMLElement);
    }

    this.#levelsAmount = levelsAmount;
    this.#activeLevelID = 0;
    for (let i = 0; i < this.#levelsAmount; i++) {
      this.#levels.push(new PassLevel(i, this.#mapHTMLElement));
    }
    this.#levelsAmount++;

    this.#levels.push(new WinLevel(this.#mapHTMLElement));
    this.#levels[this.#activeLevelID].show();
    // this.#levels[this.levelsAmount].show();
  }
  get activeLevel() {
    return this.#levels[this.#activeLevelID];
  }
  get activeLevelID() {
    return this.#activeLevelID;
  }

  get winningLevelD() {
    return this.levelsAmount - 1;
  }

  get levelsAmount() {
    return this.#levelsAmount;
  }

  get mapID() {
    return this.#mapID;
  }
  showNextLevel() {
    if (this.#activeLevelID != this.#levelsAmount - 1) {
      this.#levels[this.#activeLevelID].hide();
      this.#activeLevelID++;
      this.#levels[this.#activeLevelID].show();
    }
  }
  showPreviousLevel() {
    if (this.#activeLevelID != 0) {
      this.#levels[this.#activeLevelID].hide();
      this.#activeLevelID--;
      this.#levels[this.#activeLevelID].show();
    }
  }
  static scoreBarHeight() {
    const scoreBar = document.querySelector(".score");
    return window.getComputedStyle(scoreBar).height;
  }

  get levels() {
    return this.#levels;
  }
  hide() {
    this.#mapHTMLElement.classList.add("hidden");
  }

  show() {
    this.#mapHTMLElement.classList.remove("hidden");
  }
}

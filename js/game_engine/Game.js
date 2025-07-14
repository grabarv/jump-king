// Game.js

import { Player } from "../player/Player.js";
import { UIManager } from "../utils/UIManager.js";
import { InputHandler } from "../utils/InputHandler.js";
import { JumpController } from "../player/JumpController.js";
import { MapHandler } from "../map/MapHandler.js";
import { ScoreManager } from "../utils/ScoreManager.js";
export class Game {
  #player;
  #ui;
  #inputHandler;
  #moveX = 0.005;
  #moveY = 0.01;
  #jumpController;
  #update;
  #mapHandler;
  #scoreManager;
  #isRunning;
  #creationDate;
  #lastPlayed;
  #difficulty;

  constructor(difficulty) {
    this.#creationDate = new Date();
    this.#ui = new UIManager();
    this.#ui.hideWelcomePage();

    this.#inputHandler = new InputHandler();

    const mapID = this.#generateMapID();

    this.#difficulty = difficulty;

    switch (difficulty) {
      case "Insane":
        this.#mapHandler = new MapHandler(9, mapID);
        break;
      case "Hard":
        this.#mapHandler = new MapHandler(7, mapID);
        break;
      case "Medium":
        this.#mapHandler = new MapHandler(5, mapID);
        break;
      case "Easy":
        this.#mapHandler = new MapHandler(2, mapID);
        break;
      default:
        this.#mapHandler = new MapHandler(3, mapID);
    }

    this.#scoreManager = new ScoreManager(this.#mapHandler);

    this.#player = new Player(this.#mapHandler);

    this.#player.putOnStartPos();

    this.#jumpController = new JumpController(
      this.#player,
      this.#inputHandler,
      this.#moveX,
      this.#moveY
    );

    this.#ui.switchOnSettingButton(this.#jumpController);

    this.#isRunning = true;

    this.#update = this.#gameLoop.bind(this);

    this.#runGame();
  }

  #runGame() {
    requestAnimationFrame(this.#update);
  }

  #gameLoop() {
    if (this.#isRunning) {
      if (this.#mapHandler.activeLevelID === this.#mapHandler.winningLevelD) {
        this.#mapHandler.activeLevel.updateWinningAnimation(this.#player);
        this.#ui.updatePowerDisplay(0);
      } else {
        const jumpPower = this.#jumpController.update();
        this.#ui.updatePowerDisplay(jumpPower);
        this.#scoreManager.updateScore(this.#player.YPos + this.#player.height);
      }
      requestAnimationFrame(this.#update);
    }
  }

  #generateMapID() {
    let id;
    do {
      id = Math.floor(Math.random() * 100);
    } while (document.querySelector(`#map--${id}`));
    return id;
  }

  get player() {
    return this.#player;
  }

  stop() {
    this.#lastPlayed = new Date();
    this.#isRunning = false;
    this.#mapHandler.hide();
    this.#ui.switchOffSettingButton();
    UIManager.switchToLeaves();
    this.#ui.showWelcomePage();
  }

  load() {
    this.#isRunning = true;
    this.#mapHandler.show();
    this.#ui.hideWelcomePage();

    this.#player.putOnStartPos();
    this.#ui.switchOnSettingButton(this.#jumpController);

    this.#runGame();
  }

  get creationDate() {
    return this.#creationDate.toLocaleTimeString();
  }

  get lastPlayed() {
    return this.#lastPlayed.toLocaleTimeString();
  }
  get difficulty() {
    return this.#difficulty;
  }
  get jumpController() {
    return this.#jumpController;
  }
}

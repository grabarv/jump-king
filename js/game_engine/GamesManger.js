// GamesManager.js

import { Game } from "./Game.js";

export class GamesManager {
  #games = [];
  #currentGame = null;
  constructor() {}
  startNewGame(difficulty) {
    this.#currentGame = new Game(difficulty);
    this.#games.push(this.#currentGame);
    this.#games.forEach((g, i) => {
      console.log(
        i,
        g.jumpController.jumpAccumulationSpeed,
        g.jumpController.moveX
      );
    });
  }
  stopCurrentGame() {
    this.#currentGame.stop();
    this.#currentGame = null;
  }

  loadGame(game) {
    this.#currentGame = game;
    this.#currentGame.load();
  }

  deleteGame(game) {
    game.stop();
    this.#games.splice(this.#games.indexOf(game), 1);
  }

  get currentGame() {
    return this.#currentGame;
  }
  get games() {
    return this.#games;
  }
}

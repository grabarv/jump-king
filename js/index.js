// index.js (Main Entry)
import { GamesManager } from "./game_engine/GamesManger.js";
import { FlyingUpText } from "./utils/FlyingUpText.js";

document.addEventListener("DOMContentLoaded", () => {
  const gamesManager = new GamesManager();

  const startBtn = document.querySelector("#start-button");
  const loadBtn = document.querySelector("#load-button");
  const settingsBtn = document.querySelector(".settings");
  const exitBtn = document.querySelector(".exit");
  const gamesContainer = document.querySelector(".game-loading");
  const welcomePageContainer = document.querySelector(".welcome-page");
  const infoBtn = document.querySelector(".info");
  const flyUpEscapeElement = new FlyingUpText(
    "Press Esc to go to the main menu",
    10,
    35
  );
  const flyUpGameInfoText = new FlyingUpText(
    "Press & hold A or D to jump left or right. While holding press W to gain jump power. Then stop holding W to jump",
    20,
    25,
    40,
    20
  );

  function startGame(e) {
    document.querySelector(".difficulties").classList.add("hidden");

    gamesManager.startNewGame(e.target?.textContent);
  }

  function chooseDifficulty(e) {
    if (e.key === "Enter" || e.target === startBtn) {
      document.removeEventListener("keydown", chooseDifficulty);
      const difficultyButtons = document.querySelectorAll(".difficulty-btn");
      difficultyButtons.forEach((button) => {
        button.addEventListener("click", startGame);
      });

      document.querySelector(".welcome-page").classList.add("hidden");
      document.querySelector(".difficulties").classList.remove("hidden");
    }
  }

  function exitGame() {
    gamesManager.stopCurrentGame();
  }

  function closeGameContainer(e) {
    if (e.key === "Escape" && !gamesContainer.classList.contains("hidden")) {
      document.removeEventListener("keydown", closeGameContainer);
      welcomePageContainer.classList.remove("hidden");

      gamesContainer.classList.add("hidden");
    }
  }

  function loadGame(e) {
    let id =
      Number.parseInt(e.target?.textContent?.slice(4)) ??
      Number.parseInt(e.target?.firstChildElement?.textContent?.slice(4));
    if (id >= 0 && id < gamesManager.games.length) {
      gamesContainer.classList.add("hidden");

      gamesManager.loadGame(gamesManager.games[id]);
    }
  }

  function deleteGame(e) {
    const deleteGameContainers = [...document.querySelectorAll(".delete-game")];
    if (deleteGameContainers.includes(e.target)) {
      const gameHTMlElement = e.target?.closest(".block-choosing");
      const gameId = Number.parseInt(
        gameHTMlElement?.querySelector(".block-text")?.textContent?.slice(4)
      );
      gamesManager.deleteGame(gamesManager.games[gameId]);
      openGameContainer();
    }
  }

  function openGameContainer() {
    gamesContainer.replaceChildren();
    gamesManager.games.forEach((game, id) => {
      const html = `
    <div class='block-choosing'>
      <div class="block-text">Game ${id}\tDifficulty: ${game.difficulty}\nCreated: ${game.creationDate}\nLast played: ${game.lastPlayed}</div><div class="block-icon"><img class='delete-game' src='./source/bucket.png' width='60px'/></div></div>`;
      gamesContainer.insertAdjacentHTML("afterbegin", html);
    });
    welcomePageContainer.classList.add("hidden");
    gamesContainer.classList.remove("hidden");
    document.addEventListener("keydown", closeGameContainer);
    gamesContainer.addEventListener("click", loadGame);
    gamesContainer.addEventListener("click", deleteGame);

    flyUpEscapeElement.startAnimation();
  }

  function resizingAlert() {
    window.alert(
      "The window size have been changed. Please reload the page to play again."
    );
  }
  function addResizingAlert() {
    window.addEventListener("resize", resizingAlert);
  }

  function removeResizingAlert() {
    window.removeEventListener("resize", resizingAlert);
  }

  addResizingAlert();

  document.addEventListener("keydown", chooseDifficulty);
  startBtn.addEventListener("click", chooseDifficulty);
  exitBtn.addEventListener("click", exitGame);
  loadBtn.addEventListener("click", openGameContainer);
  infoBtn.addEventListener(
    "click",
    flyUpGameInfoText.startAnimation.bind(flyUpGameInfoText, 15)
  );
});

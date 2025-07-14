import { UIManager } from "../utils/UIManager.js";
import { PlayerElementView } from "./PlayerElementView.js";

export class Player {
  #pos = [0, 0];
  #view;
  mapHandler;
  #heightChange = 0;

  constructor(mapHandler) {
    this.#view = new PlayerElementView();
    const [w, h] = this.#view.size;
    this.#pos = [(window.innerWidth - w) / 2, window.innerHeight - h];
    this.mapHandler = mapHandler;
  }

  putOnStartPos() {
    this.#updateView();
    this.#view.show();
  }

  // moveRight(rel) {
  //   this.#pos[0] += window.innerWidth * rel;
  //   if (this.#pos[0] > this.#view.maxX) this.#pos[0] = this.#view.maxX;
  //   this.#updateView();
  // }

  // moveLeft(rel) {
  //   this.#pos[0] -= window.innerWidth * rel;
  //   if (this.#pos[0] < 0) this.#pos[0] = 0;
  //   this.#updateView();
  // }

  // moveUp(rel) {
  //   // console.log(this.#pos[1], window.innerHeight * rel);
  //   this.#pos[1] -= window.innerHeight * rel;
  //   if (this.#pos[1] < 0) this.#pos[1] = 0;
  //   this.#updateView();
  // }

  // moveDown(rel) {
  //   console.log(this.#pos[1], window.innerHeight * rel);
  //   console.log("down");

  //   this.#pos[1] += window.innerHeight * rel;
  //   if (this.#pos[1] > this.#view.maxY) this.#pos[1] = this.#view.maxY;
  //   this.#updateView();
  // }
  // getXLeft() {
  //   return Number.parseInt(this.XPos);
  // }
  canMoveLeft() {
    if (this.#pos[0] <= 0) {
      return false;
    }
    const blocks = this.mapHandler.activeLevel.blocks;
    if (!blocks) {
      return true;
    }

    for (const block of blocks) {
      const blockHeightInPx = (block.height * UIManager.windowHeight) / 100;
      const blockWidthInPx = (block.width * UIManager.windowWidth) / 100;
      const blockPosInPx = [
        block.HTMLElement.getBoundingClientRect().x,
        block.HTMLElement.getBoundingClientRect().y,
      ];

      if (
        (this.YPos >= blockPosInPx[1] &&
          this.YPos <= blockPosInPx[1] + blockHeightInPx) ||
        (this.YPos + this.#view.size[1] - 20 >= blockPosInPx[1] + 10 &&
          this.YPos + this.#view.size[1] - 20 <=
            blockPosInPx[1] + blockHeightInPx)
      ) {
        if (
          this.XPos + 30 >= blockPosInPx[0] &&
          this.XPos + 30 <= blockPosInPx[0] + blockWidthInPx
        ) {
          return false;
        }
      }
    }
    return true;
  }

  canMoveUp() {
    if (
      this.#pos[1] <= 0 &&
      this.mapHandler.activeLevelID === this.mapHandler.levelsAmount - 1
    ) {
      return false;
    }

    const blocks = this.mapHandler.activeLevel.blocks;

    if (!blocks) {
      return true;
    }

    for (const block of blocks) {
      const blockHeightInPx = (block.height * UIManager.windowHeight) / 100;
      const blockWidthInPx = (block.width * UIManager.windowWidth) / 100;
      const blockPosInPx = [
        block.HTMLElement.getBoundingClientRect().x,
        block.HTMLElement.getBoundingClientRect().y,
      ];
      if (
        this.YPos + 20 >= blockPosInPx[1] + blockHeightInPx &&
        this.YPos + 20 <= blockPosInPx[1] + blockHeightInPx + 10
      ) {
        if (
          (this.XPos + 30 >= blockPosInPx[0] &&
            this.XPos + 30 <= blockPosInPx[0] + blockWidthInPx) ||
          (this.XPos + this.#view.size[0] - 30 >= blockPosInPx[0] &&
            this.XPos + this.#view.size[0] - 30 <=
              blockPosInPx[0] + blockWidthInPx)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  canMoveRight() {
    if (this.#pos[0] >= this.#view.maxX) {
      return false;
    }

    const blocks = this.mapHandler.activeLevel.blocks;

    if (!blocks) {
      return true;
    }

    for (const block of blocks) {
      const blockHeightInPx = (block.height * UIManager.windowHeight) / 100;
      const blockWidthInPx = (block.width * UIManager.windowWidth) / 100;
      const blockPosInPx = [
        block.HTMLElement.getBoundingClientRect().x,
        block.HTMLElement.getBoundingClientRect().y,
      ];
      if (
        (this.YPos >= blockPosInPx[1] &&
          this.YPos <= blockPosInPx[1] + blockHeightInPx) ||
        (this.YPos + this.#view.size[1] - 20 >= blockPosInPx[1] + 10 &&
          this.YPos + this.#view.size[1] - 20 <=
            blockPosInPx[1] + blockHeightInPx)
      ) {
        if (
          this.XPos + this.#view.size[0] - 30 >= blockPosInPx[0] &&
          this.XPos + this.#view.size[0] - 30 <=
            blockPosInPx[0] + blockWidthInPx
        ) {
          return false;
        }
      }
    }
    return true;
  }

  moveTo(x, y) {
    this.#pos[0] = x;
    this.#pos[1] = y + this.#heightChange;
    this.checkPos();
  }

  moveToWithoutHeightChange(x, y) {
    this.#pos[0] = x;
    this.#pos[1] = y;
    this.checkPos();
  }

  checkPos() {
    // if (this.#pos[0] > this.#view.maxX && this.mapHandler.activeLevelID === 0)
    //   this.#pos[0] = this.#view.maxX;
    // if (
    //   this.#pos[0] < 0 &&
    //   this.mapHandler.activeLevelID === this.mapHandler.levelSAmount - 1
    // )
    //   this.#pos[0] = 0;
    if (this.#pos[1] <= 0) {
      if (
        this.mapHandler.activeLevelID != this.mapHandler.levelsAmount - 1 &&
        this.#heightChange === 0
      ) {
        this.mapHandler.showNextLevel();
        this.movePlayerLevelUp();
        this.#pos[1] = this.#view.maxY - 10;
      } else {
        this.#pos[1] = 0;
      }
    } else if (this.#pos[1] >= this.#view.maxY) {
      if (this.mapHandler.activeLevelID != 0) {
        this.mapHandler.showPreviousLevel();
        this.movePlayerLevelDown();

        this.#pos[1] = 0;
      } else {
        this.#pos[1] = this.#view.maxY;
      }
    }

    this.#updateView();
  }

  isStanding() {
    if (
      this.#pos[1] >= this.#view.maxY &&
      this.mapHandler.activeLevelID === 0
    ) {
      return true;
    }
    const blocks = this.mapHandler.activeLevel.blocks;
    const roundedBottomYPos = this.YPos + this.#view.size[0];
    const roundXPos = this.XPos;
    if (!blocks) {
      return true;
    }

    for (const block of blocks) {
      const blockHeightInPx = (block.height * UIManager.windowHeight) / 100;
      const blockWidthInPx = (block.width * UIManager.windowWidth) / 100;
      const blockPosInPx = [
        block.HTMLElement.getBoundingClientRect().x,
        block.HTMLElement.getBoundingClientRect().y,
      ];
      if (
        roundedBottomYPos >= blockPosInPx[1] &&
        roundedBottomYPos <= blockPosInPx[1] + blockHeightInPx - 10
      ) {
        if (
          (roundXPos + 30 >= blockPosInPx[0] + 20 &&
            roundXPos + 30 <= blockPosInPx[0] + blockWidthInPx - 20) ||
          (roundXPos + this.#view.size[0] - 30 >= blockPosInPx[0] + 20 &&
            roundXPos + this.#view.size[0] - 30 <=
              blockPosInPx[0] + blockWidthInPx - 20)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  #updateView() {
    this.#view.updatePosition(this.#pos[0], this.#pos[1]);
  }
  get XPos() {
    return this.#pos[0];
  }
  get YPos() {
    return this.#pos[1];
  }
  get element() {
    return this.#view;
  }

  #isPlayerTouchingBlock() {
    const blocks = this.mapHandler.activeLevel.blocks;

    for (const block of blocks) {
      const {
        x: x1,
        y: y1,
        width: width1,
        height: height1,
      } = block.HTMLElement.getBoundingClientRect();

      if (
        UIManager.areElementsOverlapping(
          x1,
          y1,
          width1,
          height1,
          this.#pos[0],
          this.#pos[1],
          this.#view.size[0],
          this.#view[1]
        )
      ) {
        return true;
      }
    }
    return false;
  }
  resetHightChange() {
    this.#heightChange = 0;
  }

  movePlayerLevelUp() {
    this.#heightChange += UIManager.windowHeight - this.#view.size[1]; //- UIManager.scoreBarHeight();
  }

  movePlayerLevelDown() {
    this.#heightChange -= UIManager.windowHeight - this.#view.size[1]; // - UIManager.scoreBarHeight();
  }
  get width() {
    return this.#view.size[0];
  }

  get height() {
    return this.#view.size[1];
  }
}

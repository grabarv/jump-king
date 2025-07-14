// PassLevel.js

import { Block } from "./Block.js";
import { Level } from "./Level.js";

export class PassLevel extends Level {
  #blocks = [];
  #blocksAmount;
  #widthOfBlocks;
  #heightOfBlocks;
  #levelID;
  #levelsDescription = [
    {
      blocks: 8,
      width: 15,
      height: 10,
    },
    {
      blocks: 6,
      width: 15,
      height: 10,
    },
    {
      blocks: 5,
      width: 11.25,
      height: 7.5,
    },
    {
      blocks: 3,
      width: 11.25,
      height: 7.5,
    },
    {
      blocks: 3,
      width: 7.5,
      height: 5,
    },
    {
      blocks: 3,
      width: 7.5,
      height: 5,
    },
    {
      blocks: 3,
      width: 7.5,
      height: 5,
    },
    {
      blocks: 2,
      width: 7.5,
      height: 5,
    },
    {
      blocks: 2,
      width: 4.5,
      height: 3,
    },
  ];
  constructor(levelID, mapHTMLElement) {
    super(mapHTMLElement);
    this.#blocksAmount = this.#levelsDescription[levelID].blocks;
    this.#widthOfBlocks = this.#levelsDescription[levelID].width;
    this.#heightOfBlocks = this.#levelsDescription[levelID].height;
    this.#levelID = levelID;
    do {
      for (let i = 0; i < this.#blocksAmount; i++) {
        if (i == 0) {
          this.#blocks.push(
            new Block(
              this.#widthOfBlocks,
              this.#heightOfBlocks,
              this.levelHTMLElement,
              this.#blocks,
              true
            )
          );
        } else {
          this.#blocks.push(
            new Block(
              this.#widthOfBlocks,
              this.#heightOfBlocks,
              this.levelHTMLElement,
              this.#blocks
            )
          );
        }
      }
    } while (!this.#isCorrectlyCreated);
    this.hide();
  }

  #isCorrectlyCreated() {
    return true;
  }

  get blocks() {
    return this.#blocks;
  }
}

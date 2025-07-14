// Block.js

import { UIManager } from "../utils/UIManager.js";

export class Block {
  #width;
  #height;
  #levelHTMLElement;
  #blockHTMLElement;
  #top;
  #left;

  constructor(width, height, levelHTMLElement, blocks, hasToBeInTheBottom) {
    this.#width = width;
    this.#height = height;
    this.#levelHTMLElement = levelHTMLElement;
    const image = document.createElement("img");
    image.src = "source/block.png";
    image.style.width = "100%";
    image.style.height = "100%";
    this.#blockHTMLElement = document.createElement("div");
    this.#blockHTMLElement.style.position = "absolute";
    // this.#blockHTMLElement.classList.add("hidden");
    this.#blockHTMLElement.style.width = this.#width + "vw";
    this.#blockHTMLElement.style.height = this.#height + "vh";
    this.#blockHTMLElement.appendChild(image);
    this.#levelHTMLElement.appendChild(this.#blockHTMLElement);
    let { height: scoreElementHeight } = document
      .querySelector(".score")
      .getBoundingClientRect();
    scoreElementHeight = (scoreElementHeight / UIManager.windowHeight) * 100;

    let { height: playerHeight } = document
      .querySelector(".player")
      .getBoundingClientRect();
    playerHeight = (playerHeight / UIManager.windowHeight) * 100;
    if (hasToBeInTheBottom) {
      do {
        this.#top =
          Math.random() *
            (85 - this.#height - scoreElementHeight - playerHeight - 50) +
          scoreElementHeight +
          playerHeight +
          50;
        this.#left = Math.random() * (100 - this.#width - 6);
        this.#blockHTMLElement.style.top = this.#top + "vh";
        this.#blockHTMLElement.style.left = this.#left + "vw";
      } while (!this.#checkBlockPosition(blocks));
    } else {
      do {
        this.#top =
          Math.random() *
            (85 - this.#height - scoreElementHeight - playerHeight) +
          scoreElementHeight +
          playerHeight;
        this.#left = Math.random() * (100 - this.#width - 6);
        this.#blockHTMLElement.style.top = this.#top + "vh";
        this.#blockHTMLElement.style.left = this.#left + "vw";
      } while (!this.#checkBlockPosition(blocks));
      // this.#blockHTMLElement.classList.remove("hidden");
    }
  }

  #checkBlockPosition(blocks) {
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
          (this.#left / 100) * UIManager.windowWidth,
          (this.#top / 100) * UIManager.windowHeight,
          (this.#width / 100) * UIManager.windowWidth,
          (this.#height / 100) * UIManager.windowHeight
        )
      ) {
        return false;
      }
    }
    return this.#checkBlockNeighborsAmount(blocks);
  }

  // getXRight() {
  //   return (
  //     this.getXLeft +
  //     Number.parseInt((this.#width * UIManager.windowWidth) / 100)
  //   );
  // }
  // getXLeft() {
  //   return parseInt((this.height * UIManager.windowHeight) / 100);
  // }
  // getYTop() {
  //   return parseInt((this.height * UIManager.windowHeight) / 100);
  // }
  // getYBottom() {
  //   return parseInt((this.height * UIManager.windowHeight) / 100);
  // }

  // getWidth() {
  //   return parseInt((this.width * UIManager.windowWidth) / 100);
  // }

  #checkBlockNeighborsAmount(blocks) {
    const fullBlocksArray = [...blocks, this];

    for (const currentBlock of fullBlocksArray) {
      let neighborsAmount = 0;
      for (const blockNeighbor of fullBlocksArray) {
        if (currentBlock === blockNeighbor) {
          continue;
        }
        let {
          x: x1,
          y: y1,
          width: width1,
          height: height1,
        } = blockNeighbor.HTMLElement.getBoundingClientRect();
        x1 -= 70;
        y1 -= 70;
        width1 += 140;
        height1 += 140;

        let {
          x: x2,
          y: y2,
          width: width2,
          height: height2,
        } = currentBlock.HTMLElement.getBoundingClientRect();

        if (
          UIManager.areElementsOverlapping(
            x1,
            y1,
            width1,
            height1,
            x2,
            y2,
            width2,
            height2
          )
        ) {
          neighborsAmount++;
        }
      }
      if (neighborsAmount > 1) {
        return false;
      }
    }
    return true;
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  get top() {
    return this.#top;
  }
  get left() {
    return this.#left;
  }
  get HTMLElement() {
    return this.#blockHTMLElement;
  }
}

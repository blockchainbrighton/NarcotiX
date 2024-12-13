// modules/stash.js

export class Stash {
  constructor(gridSize) {
    this.position = { x: Math.floor(gridSize / 4), y: Math.floor(gridSize / 4) };
  }
}

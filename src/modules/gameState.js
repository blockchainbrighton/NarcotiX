// modules/gameState.js

export class GameState {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.pickups = [];
    this.funds = 0;
  }

  initialize() {
    this.funds = 0;
    this.pickups = [];
  }
}

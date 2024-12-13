// modules/gameState.js

import { INITIAL_FUNDS } from './config.js';

export class GameState {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.pickups = [];
    this.dropOffs = [];
    this.thugs = [];
    this.funds = INITIAL_FUNDS; // Dealer starts with $100
    this.carriedMoney = 0;
    this.stashedMoney = 0;
    this.gameOver = false;
    this.round = 1;
    this.drugInventory = {
      A: 0,
      B: 0,
      C: 0
    };
  }

  initialize() {
    this.pickups = [];
    this.dropOffs = [];
    this.thugs = [];
    this.funds = INITIAL_FUNDS; // Reset to initial funds
    this.carriedMoney = 0;
    this.stashedMoney = 0;
    this.gameOver = false;
    this.round = 1;
    this.drugInventory = {
      A: 0,
      B: 0,
      C: 0
    };
  }

  nextRound() {
    this.round += 1;
    this.dropOffs = []; // Clear previous drop-offs
    this.thugs = []; // Clear thugs from previous round
    // Optionally reset drug inventory if needed
  }

  checkGameOver() {
    if (this.funds + this.carriedMoney <= 0) {
      this.gameOver = true;
    }
  }
}
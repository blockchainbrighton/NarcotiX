// modules/stash.js

export class Stash {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.position = { x: Math.floor(gridSize / 4), y: Math.floor(gridSize / 4) };
    this.stashedMoney = 0;
  }

  reset() {
    this.stashedMoney = 0;
  }

  updateStash(amount) {
    this.stashedMoney += amount;
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  withdraw(amount) {
    const withdrawAmount = Math.min(amount, this.stashedMoney);
    this.stashedMoney -= withdrawAmount;
    return withdrawAmount;
  }

  deposit(amount) {
    this.stashedMoney += amount;
  }
}
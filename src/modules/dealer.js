// modules/dealer.js

import { PICKUP_PRICES, DRUG_TYPES } from './config.js';

export class Dealer {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.direction = { x: 1, y: 0 };
    this.inventorySegments = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }];
    this.resetPosition();
  }

  resetPosition() {
    this.inventorySegments = [{ x: Math.floor(this.gridSize / 2), y: Math.floor(this.gridSize / 2) }];
    this.direction = { x: 1, y: 0 };
  }

  move() {
    const head = this.inventorySegments[0];
    const newHead = { x: head.x + this.direction.x, y: head.y + this.direction.y };

    // Wrap-around
    newHead.x = (newHead.x + this.gridSize) % this.gridSize;
    newHead.y = (newHead.y + this.gridSize) % this.gridSize;

    this.inventorySegments.unshift(newHead);
    this.inventorySegments.pop();
  }

  changeDirection(newDir) {
    // Prevent reversing direction
    if (this.direction.x + newDir.x === 0 && this.direction.y + newDir.y === 0) return;
    this.direction = newDir;
  }

  growInventory() {
    const tail = this.inventorySegments[this.inventorySegments.length - 1];
    this.inventorySegments.push({ x: tail.x, y: tail.y });
  }

  depositInventory() {
    this.inventorySegments = [this.inventorySegments[0]];
  }

  get head() {
    return this.inventorySegments[0];
  }

  // New: Handle purchasing drugs with carried money
  purchaseDrugs(state) {
    const { carriedMoney } = state;

    // Initialize variables to track purchases
    const purchasedDrugs = {
      A: 0,
      B: 0,
      C: 0
    };

    // Spend all carriedMoney on drugs A, B, C based on their prices
    let remainingMoney = carriedMoney;

    // Example strategy: Buy as much as possible of each drug in order A, B, C
    for (let drug of DRUG_TYPES) {
      const price = PICKUP_PRICES[drug];
      if (price <= remainingMoney) {
        const quantity = Math.floor(remainingMoney / price);
        purchasedDrugs[drug] += quantity;
        remainingMoney -= quantity * price;
      }
    }

    // Update state
    state.drugInventory.A += purchasedDrugs.A;
    state.drugInventory.B += purchasedDrugs.B;
    state.drugInventory.C += purchasedDrugs.C;
    state.carriedMoney = remainingMoney; // Any leftover money

    return purchasedDrugs; // Return details for HUD or logs
  }

  // New: Handle stash decisions
  handleStashDecision(carriedMoney, stashLimit) {
    // Ensure the stashed money does not exceed the stash limit
    const totalMoney = carriedMoney;
    const stashAmount = Math.min(totalMoney, stashLimit);
    const carryAmount = totalMoney - stashAmount;
    return { stashAmount, carryAmount };
  }
}
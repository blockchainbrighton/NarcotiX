// modules/dealer.js

// <!-- 
{/* <details>
  <summary>Module Summary: dealer.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Represents and controls the player character (the "Dealer") on the grid, handling movement, drug purchases, and inventory logic.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Movement and direction changes while navigating the grid.</li>
        <li>Inventory management: collecting pickups, updating position, and growing/shrinking segments.</li>
        <li>Purchasing drugs with carried funds and allocating them to different drug types.</li>
        <li>Facilitating stash decisions (how much to stash vs. carry forward).</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>gameEngine.js</code>: Receives updates on when to move and when to process collisions or stash decisions.</li>
        <li><code>collision.js</code>: Dealer’s position determines collision outcomes, affecting inventory and funds.</li>
        <li><code>GameState</code>: Shares information about current carried money, drug inventory, and stash decisions.</li>
        <li><code>config.js</code>: Uses drug prices and available drug types when purchasing.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>When new drugs are introduced, update the purchase logic accordingly.</li>
        <li>If adding special movement mechanics or power-ups, integrate smoothly into <code>move()</code> or <code>changeDirection()</code> logic.</li>
        <li>Ensure that stash and carry logic remains balanced with new game features.</li>
      </ul>
    </li>
  </ul>
</details> */}



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
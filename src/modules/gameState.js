// modules/gameState.js

//<!-- 
{/* <details>
  <summary>Module Summary: gameState.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Maintains and manages all dynamic game data, including positions, funds, inventory, and round tracking.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Keeps track of pickups, drop-offs, thugs, current funds, carried money, stashed money, and drug inventory.</li>
        <li>Initializes the game state at start or reset, and handles transitions to new rounds.</li>
        <li>Checks for game over conditions.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>gameEngine.js</code>: The engine reads and updates the state each frame, spawns entities, and checks conditions.</li>
        <li><code>collision.js</code>, <code>pickups.js</code>, <code>stash.js</code>, and <code>dealer.js</code>: All rely on and manipulate the game state’s funds, inventory, and entity arrays.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>If adding new game resources or stats, ensure they are initialized and reset properly here.</li>
        <li>Maintain clean, central logic for round transitions and game over checks as complexity grows.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->


import { INITIAL_FUNDS } from './config.js';

export class GameState {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.pickups = [];
    this.dropOffs = [];
    this.thugs = [];
    this.funds = 0; // Set funds to $0 initially
    this.carriedMoney = INITIAL_FUNDS; // Initialize carriedMoney to $100
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
    this.funds = 0; // Reset funds to $0
    this.carriedMoney = INITIAL_FUNDS; // Reset carriedMoney to $100
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
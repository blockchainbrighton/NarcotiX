// modules/config.js

//<!-- 
{/* <details>
  <summary>Module Summary: config.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Centralizes all game configuration constants, making it easy to adjust gameplay parameters, visuals, and difficulty settings.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Defines grid size, initial speed, initial funds, spawn rates, and other core game parameters.</li>
        <li>Stores the stash limit, drop-off counts, pickup intervals, and thug spawn frequency for flexible balancing.</li>
        <li>Defines drug types and their respective prices at pickups and drop-offs, controlling the game’s economy.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>dealer.js</code>, <code>collision.js</code>, and <code>pickups.js</code>: Use pricing and spawn constants to adjust logic dynamically.</li>
        <li><code>gameEngine.js</code> and <code>gameState.js</code>: Reference grid size, initial funds, and other start-up parameters.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>Adjust constants here to fine-tune game difficulty, pacing, and player progression.</li>
        <li>When adding new drugs, enemies, or power-ups, define their properties here for centralized control.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->


export const GRID_SIZE = 36;
export const INITIAL_SPEED = 5;
export const INITIAL_FUNDS = 100; // Updated initial funds
export const STASH_LIMIT = 500; // Maximum money that can be stashed
export const THUG_SPAWN_RATE = 30000; // Spawn a thug every 30 seconds
export const MAX_PICKUPS = 5;
export const PICKUP_SPAWN_INTERVAL = 2000; // spawn every 2 seconds
export const DROP_OFF_COUNT = 3; // Number of drop-off points per round
export const DROP_OFF_AMOUNT = 50; // Amount per drop-off
export const THUG_COLOR = 'red';
export const DROP_OFF_COLOR = 'purple';

// New: Drug Types and Prices
export const DRUG_TYPES = ['A', 'B', 'C'];

// Prices at Pickup Points (could vary per pickup point)
export const PICKUP_PRICES = {
  A: 10,
  B: 20,
  C: 30
};

// Prices at Drop-off Points (higher than pickup)
export const DROPOFF_PRICES = {
  A: 15,
  B: 25,
  C: 35
};
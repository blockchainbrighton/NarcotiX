// modules/pickups.js

// <!-- 
{/* <details>
  <summary>Module Summary: pickups.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Manages spawning and handling of pickups, drop-offs, and thugs, controlling key resource flows and threats on the grid.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Spawns pickups at intervals to provide the player with resources (drugs) to convert into money.</li>
        <li>Generates drop-off points after the player acquires drugs, enabling conversion of drugs into funds.</li>
        <li>Introduces thugs over time, adding risk and challenge to later rounds.</li>
        <li>Updates thug positions and directions, adding dynamic hazards.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>gameEngine.js</code>: Called by the main loop to regularly spawn pickups and possibly drop-offs/thugs.</li>
        <li><code>logger.js</code>: Logs spawn events (pickups, drop-offs, thugs) for better tracking.</li>
        <li><code>collision.js</code>: Drop-off and thug entities are checked during collisions with the dealer.</li>
        <li><code>gameState.js</code>: Updates state arrays (e.g., pushing new pickups, drop-offs, or thugs).</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>Balance spawn rates and intervals for improved gameplay difficulty and pacing.</li>
        <li>If introducing new entity types (e.g., power-ups), integrate their spawn logic here.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->


import { getRandomInt } from './utils.js';
import { 
  DROP_OFF_COLOR, 
  DROP_OFF_COUNT, 
  THUG_COLOR, 
  THUG_SPAWN_RATE, 
  PICKUP_SPAWN_INTERVAL, 
  DROP_OFF_AMOUNT,
  DRUG_TYPES,
  DROPOFF_PRICES,
  MAX_PICKUPS
} from './config.js';

let lastPickupSpawnTime = 0;
let lastThugSpawnTime = 0;

// Spawn Pickups at Regular Intervals
export function spawnPickups(state) {
  const now = performance.now();
  if (now - lastPickupSpawnTime > PICKUP_SPAWN_INTERVAL && state.pickups.length < MAX_PICKUPS) {
    const newPickup = {
      x: getRandomInt(state.gridSize),
      y: getRandomInt(state.gridSize),
      type: 'pickup',
      color: 'yellow'
    };
    state.pickups.push(newPickup);
    lastPickupSpawnTime = now;
    // Log the pickup spawn
    state.logger.logEvent('PickupSpawn', `Spawned pickup at (${newPickup.x}, ${newPickup.y}).`);
  }
}

// Spawn Drop-off Points After Pickup Collection
export function spawnDropOffs(state) {
  for (let i = 0; i < DROP_OFF_COUNT; i++) {
    // Assign random drug type required for this drop-off
    const requiredDrug = DRUG_TYPES[getRandomInt(DRUG_TYPES.length)];
    const newDropOff = {
      x: getRandomInt(state.gridSize),
      y: getRandomInt(state.gridSize),
      type: 'dropOff',
      color: DROP_OFF_COLOR,
      requiredDrug: requiredDrug,
      price: DROPOFF_PRICES[requiredDrug]
    };
    state.dropOffs.push(newDropOff);
    // Log the drop-off spawn
    state.logger.logEvent('DropOffSpawn', `Spawned drop-off at (${newDropOff.x}, ${newDropOff.y}) requiring Drug ${requiredDrug}.`);
  }
}

// Spawn Thugs at Specified Intervals
export function spawnThugs(state, currentTime) {
  if (currentTime - lastThugSpawnTime > THUG_SPAWN_RATE) {
    const newThug = {
      x: getRandomInt(state.gridSize),
      y: getRandomInt(state.gridSize),
      type: 'thug',
      color: THUG_COLOR,
      direction: getRandomDirection()
    };
    state.thugs.push(newThug);
    lastThugSpawnTime = currentTime;
    // Log the thug spawn
    state.logger.logEvent('ThugSpawn', `Spawned thug at (${newThug.x}, ${newThug.y}).`);
  }
}

// Move Thugs with Random Directions
export function moveThugs(state) {
  state.thugs.forEach(thug => {
    thug.x += thug.direction.x;
    thug.y += thug.direction.y;

    // Wrap-around
    thug.x = (thug.x + state.gridSize) % state.gridSize;
    thug.y = (thug.y + state.gridSize) % state.gridSize;

    // Randomly change direction
    if (Math.random() < 0.1) { // 10% chance to change direction each move
      thug.direction = getRandomDirection();
    }
  });
}

// Helper Function to Get Random Direction for Thugs
function getRandomDirection() {
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];
  return directions[getRandomInt(directions.length)];
}
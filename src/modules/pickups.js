// modules/pickups.js

import { getRandomInt } from './utils.js';

let lastSpawnTime = 0;
const SPAWN_INTERVAL = 2000; // spawn every 2 seconds

export function spawnPickups(state) {
  const now = performance.now();
  if (now - lastSpawnTime > SPAWN_INTERVAL && state.pickups.length < 5) {
    state.pickups.push({
      x: getRandomInt(state.gridSize),
      y: getRandomInt(state.gridSize),
      type: 'basic',
      color: 'yellow'
    });
    lastSpawnTime = now;
  }
}

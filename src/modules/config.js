// modules/config.js

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
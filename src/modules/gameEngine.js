// modules/gameEngine.js

import { Logger } from './logger.js';
import { Dealer } from './dealer.js';
import { InputController } from './inputController.js';
import { Renderer } from './renderer.js';
import { GameState } from './gameState.js';
import { Stash } from './stash.js';
import { spawnPickups, spawnDropOffs, spawnThugs, moveThugs } from './pickups.js';
import { handleCollisions } from './collision.js';
import { 
  GRID_SIZE, 
  INITIAL_SPEED, 
  STASH_LIMIT, 
  THUG_SPAWN_RATE,
  INITIAL_FUNDS
} from './config.js';
import { UI } from './ui.js'; // Import UI module

// Initialize the logger
const logger = new Logger();

// Initialize the game state
const state = new GameState(GRID_SIZE);
state.logger = logger; // Attach logger to state for global access



// Initialize canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size based on grid size
canvas.width = GRID_SIZE * 20;
canvas.height = GRID_SIZE * 20;

let animationFrameId;
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;

let moveInterval = 1000 / INITIAL_SPEED; // Time (ms) between dealer moves
let lastMoveTime = 0;

let isPaused = false;


// Initialize other game components
const dealer = new Dealer(GRID_SIZE);
const stash = new Stash(GRID_SIZE);
const input = new InputController(dealer, logger); // Pass logger to InputController
const renderer = new Renderer(ctx, state, dealer, stash);
const ui = new UI(state, stash); // Initialize UI

// Game Loop
function gameLoop(timestamp) {
  if (state.gameOver) {
    cancelAnimationFrame(animationFrameId);
    displayGameOver();
    // Game over is already logged in handleCollisions
    return;
  }

  if (!isPaused) {
    // Check if it's time to move the dealer
    if (timestamp - lastMoveTime > moveInterval) {
      dealer.move();
      spawnPickups(state);
      logger.logEvent('DealerMove', `Dealer moved to (${dealer.head.x}, ${dealer.head.y}).`);

      // Only spawn drop-offs if dealer has drugs and no drop-offs exist
      if (state.carriedMoney > 0 && state.dropOffs.length === 0) { 
        spawnDropOffs(state);
        logger.logEvent('DropOffSpawn', `Spawned drop-off points for round ${state.round}.`);
      }

      // Handle collisions and get the result
      const collisionResult = handleCollisions(dealer, state, stash); // Logger accessed via state.logger

      if (collisionResult === 'stash') {
        pauseGame();
        ui.showStashDecisionModal((stashAmount, carryAmount) => {
          // Update stash and carried money based on player input
          stash.deposit(stashAmount);
          state.carriedMoney = carryAmount;

          // Log the stash decision
          logger.logStashDecision({ stashAmount, carryAmount });

          // Proceed to next round
          state.nextRound();
          ui.updateCashHoldings();
          ui.updateCurrentStash();
          ui.updateDropOffList();

          // Log the start of a new round
          logger.logEvent('NewRound', `Starting round ${state.round} with carried money $${carryAmount} and stashed money $${stashAmount}.`);

          // Resume the game
          resumeGame();
        });
      }

      ui.updateCashHoldings();
      ui.updateCurrentStash();
      ui.updateDropOffList();
      lastMoveTime = timestamp;
    }

    // Move thugs
    moveThugs(state);
    logger.logEvent('ThugMove', `Thugs have moved.`);

    // Spawn thugs based on spawn rate
    spawnThugs(state, timestamp);
    // Assuming spawnThugs logs its own events via state.logger

    // Render the current frame
    renderer.draw();
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

// Display Game Over Screen
function displayGameOver() {
  const hud = document.getElementById('hud');
  if (hud) {
    hud.textContent = `Game Over! Total Stashed: $${state.stashedMoney}`;
  }

  const gameOverScreen = document.getElementById('gameOverScreen');
  if (gameOverScreen) {
    gameOverScreen.style.display = 'block';
    gameOverScreen.textContent = 'Game Over! Press F5 to Restart.';
  }
}

// Start the Game
export function startGame() {
  state.initialize();
  dealer.resetPosition();
  stash.reset();
  ui.initializeUI(); // Ensure UI is initialized
  isPaused = false;
  logger.logEvent('GameStart', `Game started with initial funds $${INITIAL_FUNDS}.`);
  requestAnimationFrame((timestamp) => {
    lastMoveTime = timestamp;
    gameLoop(timestamp);
  });
}

// Pause the Game
export function pauseGame() {
  isPaused = true;
  logger.logEvent('GamePause', `Game paused.`);
  // Optionally, display a pause overlay
}

// Resume the Game
export function resumeGame() {
  isPaused = false;
  logger.logEvent('GameResume', `Game resumed.`);
  requestAnimationFrame(gameLoop);
}
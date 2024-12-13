// modules/gameEngine.js
// <!-- 
// <details>
//   <summary>Module Summary: gameEngine.js</summary>
//   <ul>
//     <li><strong>Purpose:</strong> The central controller of the game, managing the main loop, initialization, updates, rendering, pausing, and resuming.</li>
//     <li><strong>Key Responsibilities:</strong>
//       <ul>
//         <li>Initialize game state, canvas, and all key components (Dealer, Stash, UI, Renderer, InputController).</li>
//         <li>Execute the main game loop, including movement updates, collision checks, spawn logic for pickups/drop-offs/thugs, and rendering.</li>
//         <li>Handle game flow elements like pausing, resuming, stash decisions, and transitioning between rounds.</li>
//       </ul>
//     </li>
//     <li><strong>Interactions with Other Modules:</strong>
//       <ul>
//         <li><code>Logger</code>: Logs events (start, pause, resume, stash decisions, collisions) for debugging and game narrative.</li>
//         <li><code>Dealer</code>: Controls player movement and actions. Receives direction from InputController and updates from the engine.</li>
//         <li><code>InputController</code>: Processes user input and updates Dealer’s direction.</li>
//         <li><code>Renderer</code>: Draws the current game state each frame.</li>
//         <li><code>GameState</code>: Holds all dynamic data such as funds, positions, and round info. The engine updates and queries GameState constantly.</li>
//         <li><code>Stash</code>: Manages depositing money and round transitions.</li>
//         <li><code>pickups.js</code>: Spawns and manages pickups, drop-offs, and thugs as directed by the game loop.</li>
//         <li><code>collision.js</code>: Checks and resolves interactions (e.g., pickup collection, drop-off conversions, thug encounters).</li>
//         <li><code>UI</code>: Updates on-screen elements (HUD, stash decision modal) based on game events.</li>
//       </ul>
//     </li>
//     <li><strong>Notes for Updates:</strong>
//       <ul>
//         <li>When adding new entities or gameplay mechanics, integrate their update cycles here (e.g., new spawn logic or movement calls).</li>
//         <li>If adding new game states or transitions, ensure <code>state</code> and <code>UI</code> updates remain consistent.</li>
//         <li>Maintain clear logging for major events so issues can be traced easily.</li>
//       </ul>
//     </li>
//   </ul>
// </details>
// -->

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
      // Removed: logger.logEvent('DealerMove', ...)

      // Only spawn drop-offs if dealer has drugs and no drop-offs exist
      if (state.carriedMoney > 0 && state.dropOffs.length === 0) { 
        spawnDropOffs(state);
        // Removed redundant DropOffSpawn log as it's handled in collision.js
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
    // Removed: logger.logEvent('ThugMove', ...)

    // Optionally, log thug movements with throttling
    // Uncomment the following line if you want to log thug moves but throttled
    // state.logger.logThrottledEvent('ThugMove', `Thugs have moved.`);

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
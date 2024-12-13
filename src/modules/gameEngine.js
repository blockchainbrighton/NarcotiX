// modules/gameEngine.js

import { Dealer } from './dealer.js';
import { InputController } from './inputController.js';
import { Renderer } from './renderer.js';
import { GameState } from './gameState.js';
import { Stash } from './stash.js';
import { spawnPickups } from './pickups.js';
import { handleCollisions } from './collision.js';
import { GRID_SIZE, INITIAL_SPEED } from './config.js';

let animationFrameId;
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;

const moveInterval = 1000 / INITIAL_SPEED; // Time (ms) between dealer moves
let lastMoveTime = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size based on grid size
canvas.width = GRID_SIZE * 20;
canvas.height = GRID_SIZE * 20;

const state = new GameState(GRID_SIZE);
const dealer = new Dealer(GRID_SIZE);
const stash = new Stash(GRID_SIZE);
const input = new InputController(dealer);
const renderer = new Renderer(ctx, state, dealer, stash);

function gameLoop(timestamp) {
  // Check if it's time to move the dealer
  if (timestamp - lastMoveTime > moveInterval) {
    dealer.move();
    spawnPickups(state);
    handleCollisions(dealer, state, stash);
    lastMoveTime = timestamp;
  }

  // Render the current frame
  renderer.draw();

  animationFrameId = requestAnimationFrame(gameLoop);
}

export function startGame() {
  state.initialize();
  requestAnimationFrame((timestamp) => {
    lastMoveTime = timestamp;
    gameLoop(timestamp);
  });
}
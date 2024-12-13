# NarcotiX Game Framework – Unified Context Document

**Last Update:** [Include timestamp or version here]

## Overview

The NarcotiX Game Framework is a modular, grid-based experience that melds “Snake”-style movement with resource collection, strategic decision-making, and escalating challenges. Each module has a focused responsibility, ensuring a clean architecture that’s easy to maintain and expand.

## Module Summaries

### main.js
- **Role:** Entry point.
- **Function:** Launches the game by calling `startGame()` from `gameEngine.js`.

### gameEngine.js
- **Role:** Central orchestrator.
- **Function:** Runs the game loop, handles spawning, collision checks, pausing, resuming, and round transitions.

### logger.js
- **Role:** Logging system.
- **Function:** Logs events, collisions, stash decisions, and supports throttling frequent occurrences.

### dealer.js
- **Role:** Player (Dealer) logic.
- **Function:** Manages movement, direction changes, inventory handling, purchasing drugs, and interacting with stash decisions.

### inputController.js
- **Role:** Player input handler.
- **Function:** Translates keyboard input into dealer direction changes and logs these changes.

### renderer.js
- **Role:** Visual rendering.
- **Function:** Draws the grid, entities, and HUD each frame, updating UI elements like funds and drop-offs.

### gameState.js
- **Role:** Central data store.
- **Function:** Maintains all dynamic game data (positions, funds, drug inventory), initializes and resets state, and handles round transitions.

### stash.js
- **Role:** Stash management.
- **Function:** Provides a safe storage location for funds, allowing players to decide how much to stash before starting a new round.

### pickups.js
- **Role:** Entity spawner.
- **Function:** Spawns pickups (for drugs), drop-offs (for converting drugs to money), and thugs (enemies), regulating game economy and difficulty.

### collision.js
- **Role:** Collision logic.
- **Function:** Detects collisions with pickups, drop-offs, thugs, and stash, triggering appropriate outcomes (collecting resources, converting drugs, losing money, or prompting stash decisions).

### ui.js
- **Role:** UI management.
- **Function:** Controls non-canvas UI elements like the stash decision modal, updating funds, drop-off lists, and other informational panels.

### utils.js
- **Role:** Utility functions.
- **Function:** Offers helpers like random integer generation and random direction selection for reuse across multiple modules.

### config.js
- **Role:** Central configuration.
- **Function:** Defines all constants (grid size, initial funds, prices, spawn rates), allowing easy balancing and scaling of the game’s difficulty and features.

## Inter-Module Relationships

- **gameEngine** is the heart, invoking **dealer**, **inputController**, **renderer**, **ui**, **collision**, **pickups**, **stash**, **logger**, and **gameState**.
- **ui** and **renderer** display state and results of player actions. **ui** handles user decisions at stash points, while **renderer** draws the game world.
- **pickups**, **collision**, and **dealer** work together to manage resource flows and events as the player navigates the grid.
- **config** and **utils** underlie every module, providing constants and reusable functions to keep the code flexible and organized.

## Future Directions & Notes

- Any new module should follow the established pattern: a collapsible summary above the code and an update to this context document.
- Balancing and tuning the parameters in **config.js** can significantly shape player experience.
- Consider expanding **ui.js** for tutorials, tips, or advanced player controls in future iterations.

By maintaining this unified overview and updating each module’s summary and the `CONTEXT_SUMMARY.md` as the code evolves, the NarcotiX framework remains transparent, scalable, and developer-friendly.

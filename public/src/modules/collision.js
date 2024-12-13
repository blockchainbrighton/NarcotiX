// modules/collision.js

//<!-- 
{/* <details>
  <summary>Module Summary: collision.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Handles collision detection between the dealer and other entities, determining outcomes (e.g., collecting pickups, converting drugs at drop-offs, losing money to thugs).</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Checks dealer’s position against pickups, drop-offs, thugs, and stash.</li>
        <li>On pickup collision: awards drugs, triggers drop-off spawns if needed.</li>
        <li>On drop-off collision: converts drugs into money if player has required drug.</li>
        <li>On thug collision: causes player to lose carried money.</li>
        <li>On stash collision: triggers the stash decision process in the game engine.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>dealer.js</code>: Modifies dealer’s inventory and position on certain collision outcomes.</li>
        <li><code>pickups.js</code>: Spawns drop-offs after successful pickup events.</li>
        <li><code>logger.js</code>: Logs collisions, attempts, and outcomes (conversion, thug losses).</li>
        <li><code>gameState.js</code> and <code>stash.js</code>: Updates funds, checks round progression, handles stash visits.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>When introducing new entity types or collision-based effects (e.g., obstacles or power-ups), expand collision checks accordingly.</li>
        <li>Maintain clear and informative logging for debugging complex interactions.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->

// src/modules/collision.js

import { spawnDropOffs } from './pickups.js';
import { STASH_LIMIT, PICKUP_PRICES, DROPOFF_PRICES, INITIAL_FUNDS } from './config.js';

/**
 * Handles all collision detections and corresponding game logic.
 * @param {Dealer} dealer - The dealer instance.
 * @param {GameState} state - The current game state.
 * @param {Stash} stash - The stash instance.
 * @returns {string|null} - Returns 'stash' if stash decision is needed, otherwise null.
 */
export function handleCollisions(dealer, state, stash) {
  const head = dealer.head;

  // Handle collision with pickups
  const pickupIndex = state.pickups.findIndex(p => p.x === head.x && p.y === head.y);
  if (pickupIndex !== -1) {
    const pickup = state.pickups[pickupIndex];
    handlePickupCollision(dealer, state, pickupIndex, pickup);
    return null; // No stash decision needed after pickup
  }

  // Handle collision with drop-off points
  const dropOffIndex = state.dropOffs.findIndex(d => d.x === head.x && d.y === head.y);
  if (dropOffIndex !== -1) {
    const dropOff = state.dropOffs[dropOffIndex];
    handleDropOffCollision(dealer, state, stash, dropOffIndex, dropOff);
    return null; // No stash decision needed after drop-off
  }

  // Handle collision with thugs
  const thugIndex = state.thugs.findIndex(t => t.x === head.x && t.y === head.y);
  if (thugIndex !== -1) {
    const thug = state.thugs[thugIndex];
    handleThugCollision(dealer, state, thugIndex, thug);
    return null; // No stash decision needed after thug collision
  }

  // Handle collision with stash
  if (isAtStashPosition(head, stash.position)) {
    if (state.carriedMoney > 0 || state.stashedMoney > 0) {
      // Log arrival at stash
      state.logger.logEvent('StashArrival', `Reached stash at (${stash.position.x}, ${stash.position.y}).`);
      return 'stash';
    }
  }

  // Check game over condition
  state.checkGameOver();
  if (state.gameOver) {
    state.logger.logGameOver(state.stashedMoney); // Log game over event
  }

  return null; // No special action required
}

/**
 * Handles the collision with a pickup point.
 * @param {Dealer} dealer 
 * @param {GameState} state 
 * @param {number} pickupIndex 
 * @param {object} pickup 
 */
function handlePickupCollision(dealer, state, pickupIndex, pickup) {
  // Collect pickup
  dealer.growInventory();
  state.pickups.splice(pickupIndex, 1);

  // Purchase drugs with carried money
  const purchasedDrugs = dealer.purchaseDrugs(state);

  // Log the pickup and purchase
  state.logger.logEvent('Pickup', `Collected a pickup at (${pickup.x}, ${pickup.y}). Purchased Drugs: ${JSON.stringify(purchasedDrugs)}.`);

  // Spawn drop-off points if it's the first pickup
  if (state.round === 1 && state.pickups.length === 0) { // Ensure it's the first round and all pickups are collected
    spawnDropOffs(state);
    state.logger.logEvent('DropOffSpawn', `Spawned drop-off points after first pickup.`);
  }

  // No direct UI updates; observer pattern handles it
}

/**
 * Handles the collision with a drop-off point.
 * @param {Dealer} dealer 
 * @param {GameState} state 
 * @param {Stash} stash 
 * @param {number} dropOffIndex 
 * @param {object} dropOff 
 */
function handleDropOffCollision(dealer, state, stash, dropOffIndex, dropOff) {
  const requiredDrug = dropOff.requiredDrug;

  if (state.drugInventory[requiredDrug] > 0) {
    // Exchange one unit of the required drug for money
    state.subtractCarriedMoney(PICKUP_PRICES[requiredDrug]); // Assuming conversion cost
    state.addCarriedMoney(DROPOFF_PRICES[requiredDrug]);
    state.drugInventory[requiredDrug] -= 1;
    state.dropOffs.splice(dropOffIndex, 1);

    // Log the drop-off and conversion
    state.logger.logEvent('DropOff', `Converted Drug ${requiredDrug} at (${dropOff.x}, ${dropOff.y}) for $${DROPOFF_PRICES[requiredDrug]}.`);

    // Optionally, deposit inventory if required
    dealer.depositInventory();
  } else {
    // Inform the player they lack the required drug
    state.logger.logEvent('DropOffAttempt', `Attempted to convert Drug ${requiredDrug} at (${dropOff.x}, ${dropOff.y}) but lacked the required quantity.`);
    console.log(`Need Drug ${requiredDrug} to exchange at this drop-off.`);
  }

  // No direct UI updates; observer pattern handles it
}

/**
 * Handles the collision with a thug.
 * @param {Dealer} dealer 
 * @param {GameState} state 
 * @param {number} thugIndex 
 * @param {object} thug 
 */
function handleThugCollision(dealer, state, thugIndex, thug) {
  // Lose all carried money
  state.subtractCarriedMoney(state.carriedMoney); // Sets carriedMoney to 0

  // Optionally, reset dealer to stash
  dealer.resetPosition();

  // Log the thug collision and loss
  state.logger.logCollision({
    type: 'Thug',
    involvedEntities: [`Thug at (${thug.x}, ${thug.y})`],
    outcome: 'Lost all carried money.'
  });

  // Remove the thug from the game
  state.thugs.splice(thugIndex, 1);
}

/**
 * Checks if the dealer is at the stash position.
 * @param {object} dealerHead 
 * @param {object} stashPosition 
 * @returns {boolean}
 */
function isAtStashPosition(dealerHead, stashPosition) {
  return dealerHead.x === stashPosition.x && dealerHead.y === stashPosition.y;
}
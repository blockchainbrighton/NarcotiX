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


import { spawnDropOffs } from './pickups.js';
import { STASH_LIMIT, PICKUP_PRICES, DROPOFF_PRICES, INITIAL_FUNDS } from './config.js';

export function handleCollisions(dealer, state, stash) {
  const head = dealer.head;

  // Check collision with pickups
  for (let i = 0; i < state.pickups.length; i++) {
    const p = state.pickups[i];
    if (p.x === head.x && p.y === head.y) {
      // Collect pickup
      dealer.growInventory();
      state.pickups.splice(i, 1);

      // Purchase drugs with carried money
      const purchasedDrugs = dealer.purchaseDrugs(state);

      // Log the pickup and purchase
      state.logger.logEvent('Pickup', `Collected a pickup at (${p.x}, ${p.y}). Purchased Drugs: ${JSON.stringify(purchasedDrugs)}.`);

      // Spawn drop-off points if it's the first pickup
      if (state.carriedMoney === INITIAL_FUNDS) { // Use config constant
        spawnDropOffs(state);
        state.logger.logEvent('DropOffSpawn', `Spawned drop-off points after first pickup.`);
      }

      updateHUD(state.funds, state.carriedMoney, state.dropOffs, state.drugInventory);
      break;
    }
  }

  // Check collision with drop-off points
  for (let i = 0; i < state.dropOffs.length; i++) {
    const d = state.dropOffs[i];
    if (d.x === head.x && d.y === head.y) {
      // Check if dealer has the required drug
      const requiredDrug = d.requiredDrug;
      if (state.drugInventory[requiredDrug] > 0) {
        // Exchange one unit of the required drug for money
        state.drugInventory[requiredDrug] -= 1;
        state.funds += DROPOFF_PRICES[requiredDrug];
        state.carriedMoney -= PICKUP_PRICES[requiredDrug]; // Assuming conversion
        state.dropOffs.splice(i, 1);

        // Log the drop-off and conversion
        state.logger.logEvent('DropOff', `Converted Drug ${requiredDrug} at (${d.x}, ${d.y}) for $${DROPOFF_PRICES[requiredDrug]}.`);

        dealer.depositInventory();
        updateHUD(state.funds, state.carriedMoney, state.dropOffs, state.drugInventory);
      } else {
        // Inform the player they lack the required drug
        state.logger.logEvent('DropOffAttempt', `Attempted to convert Drug ${requiredDrug} at (${d.x}, ${d.y}) but lacked the required quantity.`);
        console.log(`Need Drug ${requiredDrug} to exchange at this drop-off.`);
      }
      break;
    }
  }

  // Check collision with thugs
  for (let i = 0; i < state.thugs.length; i++) {
    const t = state.thugs[i];
    if (t.x === head.x && t.y === head.y) {
      // Lose all carried money
      state.carriedMoney = 0;
      // Optionally, reset dealer to stash
      dealer.resetPosition();

      // Log the thug collision and loss
      state.logger.logCollision({
        type: 'Thug',
        involvedEntities: [`Thug at (${t.x}, ${t.y})`],
        outcome: 'Lost all carried money.'
      });

      updateHUD(state.funds, state.carriedMoney, state.dropOffs, state.drugInventory);
      break;
    }
  }

  // Check if at stash
  if (head.x === stash.position.x && head.y === stash.position.y) {
    if (state.carriedMoney > 0 || state.stashedMoney > 0) {
      // Log arrival at stash
      state.logger.logEvent('StashArrival', `Reached stash at (${stash.position.x}, ${stash.position.y}).`);
      return 'stash';
    }
  }

  // Check game over condition
  if (state.checkGameOver()) {
    state.logger.logGameOver(state.stashedMoney); // Log game over event
  }

  return null; // No special action required
}

function updateHUD(funds, carried, dropOffs, drugInventory) {
  const hud = document.getElementById('hud');
  if (hud) {
    hud.textContent = `Funds: $${funds} | Carried: $${carried} | Drugs: A(${drugInventory.A}), B(${drugInventory.B}), C(${drugInventory.C})`;
  }
}
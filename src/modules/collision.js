// modules/collision.js

export function handleCollisions(dealer, state, stash) {
  // Check if dealer head hits a pickup
  const head = dealer.head;
  for (let i = 0; i < state.pickups.length; i++) {
    const p = state.pickups[i];
    if (p.x === head.x && p.y === head.y) {
      // Collect pickup
      dealer.growInventory();
      state.pickups.splice(i, 1);
      break;
    }
  }

  // Check if dealer is at the stash
  if (head.x === stash.position.x && head.y === stash.position.y) {
    // Deposit inventory
    const inventoryCount = dealer.inventorySegments.length - 1;
    state.funds += inventoryCount * 10; // basic scoring
    dealer.depositInventory();
    updateHUD(state.funds, inventoryCount);
  }
}

function updateHUD(funds, delivered) {
  const hud = document.getElementById('hud');
  if (hud) {
    hud.textContent = `Funds: ${funds} | Last Delivery: ${delivered} items`;
  }
}

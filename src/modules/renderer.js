// modules/renderer.js

//<!-- 
{/* <details>
  <summary>Module Summary: renderer.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Responsible for all visual rendering of the game on the canvas and updating related UI elements (such as HUD and control panel).</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Draws the grid, dealer, pickups, drop-offs, thugs, and stash on the canvas.</li>
        <li>Updates the on-screen HUD, including funds, carried money, and current drug inventory.</li>
        <li>Manages the control panel elements like stash, cash holdings, and drop-off lists.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>gameEngine.js</code>: Called each frame to reflect the current game state visually.</li>
        <li><code>gameState.js</code>, <code>stash.js</code>, and <code>dealer.js</code>: Uses their data to update the display (positions, funds, inventory).</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>When adding new entities or visual effects, update the drawing logic accordingly.</li>
        <li>Keep the rendering process efficient and modular so it scales with additional game elements.</li>
      </ul>
    </li>
  </ul>
</details> */}
// -->



export class Renderer {
  constructor(ctx, state, dealer, stash) {
    this.ctx = ctx;
    this.state = state;
    this.dealer = dealer;
    this.stash = stash;
  }

  draw() {
    const { ctx, state, dealer, stash } = this;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw grid
    ctx.strokeStyle = '#333';
    for (let x = 0; x < ctx.canvas.width; x += 20) {
      for (let y = 0; y < ctx.canvas.height; y += 20) {
        ctx.strokeRect(x, y, 20, 20);
      }
    }

    // Draw pickups
    for (let pickup of state.pickups) {
      ctx.fillStyle = pickup.color || 'yellow';
      ctx.fillRect(pickup.x * 20, pickup.y * 20, 20, 20);
    }

    // Draw drop-off points
    for (let dropOff of state.dropOffs) {
      ctx.fillStyle = dropOff.color || 'purple';
      ctx.fillRect(dropOff.x * 20, dropOff.y * 20, 20, 20);
    }

    // Draw thugs
    for (let thug of state.thugs) {
      ctx.fillStyle = thug.color || 'red';
      ctx.fillRect(thug.x * 20, thug.y * 20, 20, 20);
    }

    // Draw stash
    ctx.fillStyle = 'blue';
    ctx.fillRect(stash.position.x * 20, stash.position.y * 20, 20, 20);

    // Draw dealer (inventory chain)
    ctx.fillStyle = 'green';
    for (let segment of dealer.inventorySegments) {
      ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    }

    // Update Control Panel
    this.updateControlPanel();
  }

  updateControlPanel() {
    // Update Current Cash Holdings
    const cashHoldingsElement = document.getElementById('cashHoldings');
    if (cashHoldingsElement) {
      cashHoldingsElement.textContent = `$${this.state.funds}`;
    }

    // Update Current Stash
    const currentStashElement = document.getElementById('currentStash');
    if (currentStashElement) {
      currentStashElement.textContent = `$${this.stash.stashedMoney}`;
    }

    // Update Drop-offs Waiting
    const dropOffListElement = document.getElementById('dropOffList');
    if (dropOffListElement) {
      // Clear existing list
      dropOffListElement.innerHTML = '';
      // Populate with current drop-offs
      this.state.dropOffs.forEach((dropOff, index) => {
        const li = document.createElement('li');
        li.textContent = `Drop-off ${index + 1}: ${dropOff.requiredDrug} → $${dropOff.price}`;
        dropOffListElement.appendChild(li);
      });
    }

    // Update HUD with Drug Inventory
    const hud = document.getElementById('hud');
    if (hud) {
      hud.textContent = `Funds: $${this.state.funds} | Carried: $${this.state.carriedMoney} | Drugs: A(${this.state.drugInventory.A}), B(${this.state.drugInventory.B}), C(${this.state.drugInventory.C})`;
    }
  }
}
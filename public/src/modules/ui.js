// modules/ui.js

//<!-- 
{/* <details>
  <summary>Module Summary: ui.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Manages the game’s user interface elements outside the main canvas, including forms, modals, and displays in the control panel.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Updates and displays information like cash holdings, stashed money, and active drop-offs.</li>
        <li>Creates and manages the stash decision modal, allowing players to split money between stashing and carrying to the next round.</li>
        <li>Ensures UI elements remain synchronized with the current <code>gameState</code> and <code>stash</code>.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>gameState.js</code> and <code>stash.js</code>: Uses their data (funds, stash totals, drop-offs) to update the UI.</li>
        <li><code>gameEngine.js</code> and <code>collision.js</code>: Invoked when the dealer reaches the stash and needs to make decisions.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>If new UI elements or forms are introduced (e.g., inventory management menus, tutorial pop-ups), integrate them here.</li>
        <li>Maintain a user-friendly and accessible interface by ensuring forms and buttons have proper validation and feedback.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->



import { STASH_LIMIT } from './config.js';

export class UI {
  constructor(state, stash) {
    this.state = state;
    this.stash = stash;
    this.createStashModal();
  }

  initializeUI() {
    this.updateCashHoldings();
    this.updateCurrentStash();
    this.updateDropOffList();
    // Initialize other UI elements as needed
  }

  updateCashHoldings() {
    const cashHoldingsElement = document.getElementById('cashHoldings');
    if (cashHoldingsElement) {
      cashHoldingsElement.textContent = `$${this.state.funds}`;
    }
  }

  updateCurrentStash() {
    const currentStashElement = document.getElementById('currentStash');
    if (currentStashElement) {
      currentStashElement.textContent = `$${this.stash.stashedMoney}`;
    }
  }

  updateDropOffList() {
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
  }

  showStashDecisionModal(callback) {
    const modal = document.getElementById('stashModal');
    if (modal) {
      modal.style.display = 'block';

      // Handle form submission
      const form = document.getElementById('stashForm');
      form.onsubmit = (e) => {
        e.preventDefault();
        const stashAmount = parseInt(document.getElementById('stashAmount').value) || 0;
        const carryAmount = parseInt(document.getElementById('carryAmount').value) || 0;

        // Validate inputs
        if (
          stashAmount < 0 ||
          carryAmount < 0 ||
          (stashAmount + carryAmount) > this.state.carriedMoney ||
          stashAmount > STASH_LIMIT
        ) {
          alert('Invalid amounts entered. Please ensure you do not exceed your carried money or stash limit.');
          return;
        }

        modal.style.display = 'none';
        callback(stashAmount, carryAmount);
      };

      // Handle modal close without making a decision
      const closeBtn = document.getElementById('closeStashModal');
      closeBtn.onclick = () => {
        modal.style.display = 'none';
        // Optionally, default to carrying all money
        callback(0, this.state.carriedMoney);
      };
    }
  }

  createStashModal() {
    // Create modal HTML structure if not already present
    if (!document.getElementById('stashModal')) {
      const modal = document.createElement('div');
      modal.id = 'stashModal';
      modal.className = 'modal';

      modal.innerHTML = `
        <div class="modal-content">
          <span id="closeStashModal" class="close">&times;</span>
          <h2>Stash Decision</h2>
          <form id="stashForm">
            <label for="stashAmount">Amount to Stash ($):</label>
            <input type="number" id="stashAmount" name="stashAmount" min="0" max="${STASH_LIMIT}" required>

            <label for="carryAmount">Amount to Carry ($):</label>
            <input type="number" id="carryAmount" name="carryAmount" min="0" max="${this.state.carriedMoney}" required>

            <button type="submit">Confirm</button>
          </form>
        </div>
      `;

      document.body.appendChild(modal);
    }
  }

  // Optionally, add methods to update other UI elements
}
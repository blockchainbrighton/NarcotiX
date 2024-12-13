// modules/ui.js

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
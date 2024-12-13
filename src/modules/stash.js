// modules/stash.js

//<!-- 
{/* <details>
  <summary>Module Summary: stash.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Represents the stash location on the grid, where players can store money safely between rounds.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Tracks the position of the stash on the grid.</li>
        <li>Manages stashed funds, allowing deposits and withdrawals.</li>
        <li>Resets stash when the game restarts.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>gameEngine.js</code>: Accesses stash for depositing money at round’s end.</li>
        <li><code>dealer.js</code>: Integrates with stash decisions (how much to stash vs. carry forward).</li>
        <li><code>collision.js</code>: Detects when the dealer reaches the stash to trigger stash decision UI.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>Adjust stash logic if new mechanics for saving or investing money are introduced.</li>
        <li>Update position logic if multiple stash points or dynamic stash movement is considered.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->


export class Stash {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.position = { x: Math.floor(gridSize / 4), y: Math.floor(gridSize / 4) };
    this.stashedMoney = 0;
  }

  reset() {
    this.stashedMoney = 0;
  }

  updateStash(amount) {
    this.stashedMoney += amount;
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  withdraw(amount) {
    const withdrawAmount = Math.min(amount, this.stashedMoney);
    this.stashedMoney -= withdrawAmount;
    return withdrawAmount;
  }

  deposit(amount) {
    this.stashedMoney += amount;
  }
}
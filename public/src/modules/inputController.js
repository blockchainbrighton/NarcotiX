// modules/inputController.js

//<!-- 
{/* <details>
  <summary>Module Summary: inputController.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Captures and interprets player keyboard input to control the dealer’s movement.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Listens for arrow keys (Up, Down, Left, Right) and WASD keys to change the dealer’s direction.</li>
        <li>Logs direction changes for transparency and debugging.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>dealer.js</code>: Invokes <code>changeDirection</code> method to adjust player movement.</li>
        <li><code>logger.js</code>: Logs each direction change event.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>Additional controls (e.g., special actions, menu toggles) can be added by extending key handling.</li>
        <li>Ensure new controls remain intuitive to the player.</li>
      </ul>
    </li>
  </ul>
</details> */}
// -->


export class InputController {
  constructor(dealer, logger) {
    this.dealer = dealer;
    this.logger = logger;
    this.initListeners();
  }

  // Initialize Keyboard Event Listeners
  initListeners() {
    document.addEventListener('keydown', (e) => {
      let newDirection = null;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          newDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
          newDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
          newDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
          newDirection = { x: 1, y: 0 };
          break;
        // Add more cases for additional controls if needed
        default:
          break;
      }

      if (newDirection) {
        this.dealer.changeDirection(newDirection);
        // Log the direction change
        this.logger.logEvent('Input', `Direction changed to (${newDirection.x}, ${newDirection.y}).`);
      }
    });
  }
}
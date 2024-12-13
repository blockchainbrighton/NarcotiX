// modules/inputController.js

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
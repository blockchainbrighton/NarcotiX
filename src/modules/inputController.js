// modules/inputController.js

export class InputController {
  constructor(dealer) {
    this.dealer = dealer;
    window.addEventListener('keydown', (e) => this.handleKey(e));
  }

  handleKey(e) {
    const { dealer } = this;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (dealer.direction.y === 0) dealer.changeDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
        if (dealer.direction.y === 0) dealer.changeDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
        if (dealer.direction.x === 0) dealer.changeDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
        if (dealer.direction.x === 0) dealer.changeDirection({ x: 1, y: 0 });
        break;
    }
  }
}

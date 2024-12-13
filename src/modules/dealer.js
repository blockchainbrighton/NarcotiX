// modules/dealer.js

export class Dealer {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.direction = { x: 1, y: 0 };
    this.inventorySegments = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }];
  }

  move() {
    const head = this.inventorySegments[0];
    const newHead = { x: head.x + this.direction.x, y: head.y + this.direction.y };

    // Wrap-around or end game if out of bounds: (For now, wrap-around)
    newHead.x = (newHead.x + this.gridSize) % this.gridSize;
    newHead.y = (newHead.y + this.gridSize) % this.gridSize;

    this.inventorySegments.unshift(newHead);
    // Normally in Snake, we remove the tail unless we picked up something. For now, always remove:
    this.inventorySegments.pop();
  }

  changeDirection(newDir) {
    this.direction = newDir;
  }

  growInventory() {
    // Add a new segment to the tail by duplicating the last segment
    const tail = this.inventorySegments[this.inventorySegments.length - 1];
    this.inventorySegments.push({ x: tail.x, y: tail.y });
  }

  depositInventory() {
    // After depositing, reduce inventory to just the head or a small set.
    this.inventorySegments = [this.inventorySegments[0]];
  }

  get head() {
    return this.inventorySegments[0];
  }
}
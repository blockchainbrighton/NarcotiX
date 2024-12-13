// modules/renderer.js

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

    // Draw grid (optional: a simple visual grid)
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

    // Draw stash
    ctx.fillStyle = 'blue';
    ctx.fillRect(stash.position.x * 20, stash.position.y * 20, 20, 20);

    // Draw dealer (inventory chain)
    ctx.fillStyle = 'green';
    for (let segment of dealer.inventorySegments) {
      ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    }
  }
}

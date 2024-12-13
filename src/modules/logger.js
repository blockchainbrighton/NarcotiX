// modules/logger.js

export class Logger {
    constructor() {
      // Optionally, you can set up different log levels or outputs here
    }
  
    logEvent(eventType, details) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${eventType}] ${details}`);
    }
  
    logCollision(collisionDetails) {
      const { type, involvedEntities, outcome } = collisionDetails;
      const entities = involvedEntities.join(' & ');
      const message = `Collision with ${type}: ${entities}. Outcome: ${outcome}.`;
      this.logEvent('Collision', message);
    }
  
    logStashDecision(decisionDetails) {
      const { stashAmount, carryAmount } = decisionDetails;
      const message = `Stash Decision - Stashed: $${stashAmount}, Carried: $${carryAmount}.`;
      this.logEvent('StashDecision', message);
    }
  
    logGameOver(finalFunds) {
      const message = `Game Over! Total Stashed: $${finalFunds}.`;
      this.logEvent('GameOver', message);
    }
  
    // Add more specialized logging methods as needed
  }
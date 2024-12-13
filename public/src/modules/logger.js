// modules/logger.js

// <!-- 
{/* <details>
  <summary>Module Summary: logger.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Provide a centralized logging mechanism for game events, collisions, and important decisions, facilitating debugging and a logical game narrative.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Log events with timestamps for clarity.</li>
        <li>Support throttled logging for events that occur frequently (e.g., thug movements).</li>
        <li>Specialized logging for collisions, stash decisions, and game over conditions.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>gameEngine.js</code>: Logs start, pause, resume, round transitions, and game-over scenarios.</li>
        <li><code>collision.js</code>: Logs details of collisions and outcomes.</li>
        <li><code>dealer.js</code>, <code>stash.js</code>, <code>pickups.js</code>: Events here can trigger logs for purchases, stash decisions, and spawns.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>When adding new event types, define clear and descriptive log messages.</li>
        <li>Use <code>logThrottledEvent</code> for repetitive events to avoid cluttered logs.</li>
        <li>Ensure logs remain concise but informative to assist in debugging.</li>
      </ul>
    </li>
  </ul>
</details> */}




export class Logger {
  constructor() {
    // Initialize a map to keep track of last log times for throttled events
    this.lastLogTimes = {};
    // Define throttle intervals for specific event types in milliseconds
    this.throttleIntervals = {
      'ThugMove': 1000, // Thug movements logged at most once per second
      // Add other event types and their throttle intervals as needed
    };
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

  // Method to log events with throttling
  logThrottledEvent(eventType, details) {
    const now = Date.now();
    const throttleInterval = this.throttleIntervals[eventType] || 0;
    const lastLogTime = this.lastLogTimes[eventType] || 0;

    if (now - lastLogTime >= throttleInterval) {
      this.logEvent(eventType, details);
      this.lastLogTimes[eventType] = now;
    }
    // If within throttle interval, do not log
  }

  // Add more specialized logging methods as needed
}
// modules/utils.js

//<!-- 
{/* <details>
  <summary>Module Summary: utils.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Provides shared utility functions that are reused across multiple modules to avoid code duplication.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li><code>getRandomInt(max)</code>: Returns a random integer within a specified range, commonly used for spawning entities at random positions.</li>
        <li><code>getRandomDirection()</code>: Returns a random movement direction, primarily used for thug movements.</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li><code>pickups.js</code>: Uses <code>getRandomInt</code> to determine spawn locations for pickups, drop-offs, and thugs.</li>
        <li><code>gameEngine.js</code> and others could use these utilities for randomization as the game expands.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>Add new utility functions here if multiple modules require similar logic (e.g., math helpers, formatting functions).</li>
        <li>Keep utilities general and well-documented to ensure easy reuse.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->


export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomDirection() {
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];
  return directions[getRandomInt(directions.length)];
}
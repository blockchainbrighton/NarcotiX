// main.js is the entry point of the application. It imports the startGame function from the gameEngine module and calls it to start the game.
// <!-- 
{/* <details>
  <summary>Module Summary: main.js</summary>
  <ul>
    <li><strong>Purpose:</strong> Serves as the entry point for the NarcotiX game. It imports the game engine and starts the game loop.</li>
    <li><strong>Key Responsibilities:</strong>
      <ul>
        <li>Importing and launching the main game engine module.</li>
        <li>Ensuring initial setup and configuration is triggered (e.g., startGame()).</li>
      </ul>
    </li>
    <li><strong>Interactions with Other Modules:</strong>
      <ul>
        <li>Imports <code>startGame</code> from <code>gameEngine.js</code> to initialize the entire game.</li>
        <li>No direct access to other modules; relies on <code>gameEngine.js</code> to orchestrate them.</li>
      </ul>
    </li>
    <li><strong>Notes for Updates:</strong>
      <ul>
        <li>If the initialization process changes (e.g., additional setup steps), update this file to call those functions before <code>startGame</code>.</li>
        <li>Keep this file minimal. It should remain a simple and stable entry point.</li>
      </ul>
    </li>
  </ul>
</details> */}
//-->



import { startGame } from "./modules/gameEngine.js";

startGame();

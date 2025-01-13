NarcotiX Game Framework

Overview

NarcotiX is a modular JavaScript-based game framework designed to implement an interactive grid-based game inspired by classic “Snake” mechanics. The game combines core gameplay with extended features such as inventory management, pickups, scoring, and real-time updates. It is structured to facilitate iterative development, enabling seamless integration of new modules with minimal disruption. Enhanced with simulation-like mechanics, players now experience a more immersive and strategic gameplay environment.

Game Features
	•	Grid-based Gameplay: Navigate a dynamic grid environment while interacting with pickups and depositing inventory.
	•	Inventory Management: Collect items to grow inventory and deposit them at a stash for scoring.
	•	Modular Design: Designed with independent modules for scalability, allowing developers to add features iteratively.
	•	Real-time Rendering: Smooth game updates with 60 FPS visuals using a flexible rendering engine.
	•	User Input Control: Supports keyboard inputs (WASD or arrow keys) for intuitive navigation.
	•	Simulation Mechanics:
	•	Initial Funds: Dealer starts with $100.
	•	Pickup Points: Find pickup points to acquire $100 worth of digital drugs.
	•	Drop-off Points: Multiple drop-off points appear upon acquiring drugs; convert drugs into money at each drop-off.
	•	Stashing Money: After all drop-offs, stash collected money with a decision on how much to keep and carry for the next round.
	•	Risk of Loss: Encounter roaming thugs in subsequent rounds; collisions result in loss of carried money.
	•	Game Over Condition: The game ends if the dealer runs out of money entirely.

Color Mapping and Element Roles

To enhance visual clarity and gameplay experience, different game elements are represented by specific colors on the grid:
	•	Dealer (Player):
	•	Color: Green
	•	Role: Represents the player-controlled character navigating the grid to collect pickups, convert them at drop-offs, and manage funds.
	•	Pickups:
	•	Color: Yellow
	•	Role: Locations where the dealer can collect $100 worth of digital drugs to initiate the conversion process.
	•	Drop-off Points:
	•	Color: Purple
	•	Role: Locations where the dealer converts carried drugs into money. Each drop-off converts a specified amount (e.g., $50).
	•	Thugs:
	•	Color: Red
	•	Role: Enemies that roam the grid in advanced rounds. Colliding with a thug results in the loss of all carried money.
	•	Stash:
	•	Color: Blue
	•	Role: The depot where the dealer can stash money. Upon reaching the stash, the player decides how much money to keep and carry into the next round.
	•	Grid Lines:
	•	Color: Dark Gray (#333)
	•	Role: Optional visual grid to aid navigation.

Modules Overview

1. gameEngine.js
	•	Purpose: The core engine driving the game.
	•	Key Features:
	•	Manages the game loop.
	•	Orchestrates updates for dealer movements, pickups, collisions, and rendering.
	•	Initializes all components, including the Renderer, Dealer, and GameState.
	•	New Features:
	•	Handles the transition between rounds.
	•	Manages the spawning and movement of thugs in advanced rounds.
	•	Oversees the decision-making process for stashing money.
	•	Development Notes:
	•	Acts as the main entry point for the game.
	•	Ensure all new modules integrate smoothly into the game loop.

2. gameState.js
	•	Purpose: Maintains the state of the game.
	•	Key Features:
	•	Tracks the grid size, current pickups, and player funds.
	•	Provides an initialize() function to reset the game state.
	•	New Features:
	•	Tracks dealer’s current funds, carried money, and stashed money.
	•	Maintains the list of active drop-off points and thugs.
	•	Monitors game over conditions.
	•	Development Notes:
	•	Any new game logic should register state variables here.
	•	Ensure new state properties are initialized properly.

3. config.js
	•	Purpose: Stores configuration constants.
	•	Key Features:
	•	Defines grid size, initial speed, and starting funds.
	•	New Features:
	•	Configures initial dealer funds ($100).
	•	Sets spawn rates and quantities for drop-off points and thugs.
	•	Defines stash limits and rules for money splitting.
	•	Defines color mappings for various game elements.
	•	Development Notes:
	•	Use this module to manage constants for new features (e.g., spawn intervals, scoring factors).

4. dealer.js
	•	Purpose: Represents the player-controlled character.
	•	Key Features:
	•	Moves on the grid in a specified direction.
	•	Grows inventory on pickup collisions.
	•	Deposits inventory at the stash.
	•	New Features:
	•	Handles funds management, including carrying and stashing money.
	•	Implements decision-making for splitting money between stash and carried funds.
	•	Interacts with drop-off points to convert drugs into money.
	•	Responds to collisions with thugs, resulting in potential loss of carried money.
	•	Development Notes:
	•	Extend Dealer to handle additional interactions or behaviors.
	•	Ensure compatibility with new gameplay mechanics.

5. stash.js
	•	Purpose: Represents the stash where inventory is deposited.
	•	Key Features:
	•	Tracks the stash position on the grid.
	•	New Features:
	•	Facilitates the decision-making process for stashing vs. carrying money.
	•	Updates stashed funds based on dealer’s decisions.
	•	Development Notes:
	•	Extend Stash if new deposit mechanics are introduced.

6. collision.js
	•	Purpose: Handles collision detection and resolution.
	•	Key Features:
	•	Detects collisions between the dealer and pickups, drop-offs, thugs, or the stash.
	•	Updates funds and HUD based on interactions.
	•	New Features:
	•	Detects collisions with thugs.
	•	Implements consequences of thug collisions (loss of carried money).
	•	Manages game over conditions when funds are depleted.
	•	Development Notes:
	•	Add new collision conditions for additional gameplay mechanics.

7. pickups.js
	•	Purpose: Manages the spawning of pickups, drop-offs, and thugs.
	•	Key Features:
	•	Spawns pickups at random grid locations at regular intervals.
	•	Ensures the maximum number of active pickups is maintained.
	•	New Features:
	•	Manages the appearance of drop-off points after acquiring drugs.
	•	Controls the spawning of thugs in advanced rounds.
	•	Handles thug movements and behaviors.
	•	Development Notes:
	•	Modify or extend spawn logic for new pickup types or behaviors.

8. inputController.js
	•	Purpose: Handles user inputs.
	•	Key Features:
	•	Maps keyboard inputs to dealer direction changes.
	•	New Features:
	•	May include additional inputs for stashing decisions if necessary.
	•	Development Notes:
	•	Extend input handling for new controls (e.g., special actions or power-ups).

9. renderer.js
	•	Purpose: Handles rendering of the game.
	•	Key Features:
	•	Draws the grid, dealer, pickups, drop-off points, thugs, and stash on the canvas.
	•	Updates visuals every frame.
	•	New Features:
	•	Renders drop-off points and thugs on the map.
	•	Displays HUD elements for funds, carried money, and stashed money.
	•	Visual indicators for thug presence and collisions.
	•	Development Notes:
	•	Add support for rendering new visual elements as needed.

10. utils.js
	•	Purpose: Utility functions used across modules.
	•	Key Features:
	•	Provides random number generation for grid-based operations.
	•	New Features:
	•	Additional utilities for handling money splitting decisions.
	•	Functions to manage thug movements and behaviors.
	•	Development Notes:
	•	Add reusable utility functions for new features.

Color Mapping and Element Roles

To enhance visual clarity and gameplay experience, different game elements are represented by specific colors on the grid:
	•	Dealer (Player):
	•	Color: Green
	•	Role: Represents the player-controlled character navigating the grid to collect pickups, convert them at drop-offs, and manage funds.
	•	Pickups:
	•	Color: Yellow
	•	Role: Locations where the dealer can collect $100 worth of digital drugs to initiate the conversion process.
	•	Drop-off Points:
	•	Color: Purple
	•	Role: Locations where the dealer converts carried drugs into money. Each drop-off converts a specified amount (e.g., $50).
	•	Thugs:
	•	Color: Red
	•	Role: Enemies that roam the grid in advanced rounds. Colliding with a thug results in the loss of all carried money.
	•	Stash:
	•	Color: Blue
	•	Role: The depot where the dealer can stash money. Upon reaching the stash, the player decides how much money to keep and carry into the next round.
	•	Grid Lines:
	•	Color: Dark Gray (#333)
	•	Role: Optional visual grid to aid navigation.

Framework for Adding New Modules

Integration Guidelines
	1.	Plan: Define the purpose and responsibilities of the new module.
	2.	Develop: Implement the module as a standalone file, ensuring adherence to the modular structure.
	3.	Test Independently: Test the module independently by mocking required data or using existing modules.
	4.	Integrate: Hook the module into the game engine or appropriate existing modules.
	5.	Test in Context: Validate that the module works seamlessly within the overall game.

Documentation Updates
	•	Update this README with:
	•	Module name.
	•	Purpose and responsibilities.
	•	Development notes for future maintenance.

Testing Workflow
	•	Use temporary mock functions or values to test new features before integrating them into the game loop.
	•	Use console.log or similar debugging tools to verify module behavior.

Example Update: Adding a New Power-Up Module

New Module: powerUps.js
	•	Purpose: Introduce power-ups that grant temporary bonuses to the player.
	•	Responsibilities:
	•	Spawn power-ups randomly on the grid.
	•	Apply effects when the dealer collects them.

Integration Steps:
	1.	Develop the powerUps.js module with spawn logic and effect application.
	2.	Modify collision.js to detect collisions with power-ups.
	3.	Extend renderer.js to draw power-ups.
	4.	Update gameState.js to track active power-ups.
	5.	Update this README with powerUps.js details.

Development Workflow
	1.	Initialization:
	•	Ensure all dependencies are loaded.
	•	Use the modular approach to keep code maintainable and testable.
	2.	Iterative Development:
	•	Add one feature or module at a time.
	•	Ensure complete testing before moving to the next task.
	3.	Scalability:
	•	Use this README as a living document to track features and responsibilities.

Enhanced Gameplay Mechanics

Simulation Elements

Starting Funds
	•	Dealer Initialization:
	•	The dealer starts with $100.
	•	Initial funds are set in gameState.js and config.js.

Pickup Points
	•	Finding Pickup Points:
	•	The dealer locates the first pickup point.
	•	Upon finding it, the dealer is credited with $100 worth of digital drugs.
	•	Triggered in collision.js and managed within dealer.js.

Drop-off Points
	•	Activation of Drop-off Points:
	•	After acquiring drugs, multiple drop-off points appear on the map.
	•	Managed by pickups.js to spawn drop-off locations.
	•	Converting Drugs to Money:
	•	The dealer must visit each drop-off point to convert some drugs into money.
	•	Conversion logic handled in dealer.js and collision.js.

Stashing Money
	•	Collecting Funds:
	•	Once all drop-off points are interacted with, the total money is collected.
	•	Decision Making:
	•	Upon reaching the stash, the player decides how much money to stash and how much to carry.
	•	Input handled in stash.js and possibly inputController.js.
	•	The split affects the next round’s starting funds.

Advanced Rounds and Thugs
	•	Introducing Thugs:
	•	In subsequent rounds, thugs roam the map.
	•	Thugs are spawned and managed by pickups.js and their behavior is handled in utils.js.
	•	Collision with Thugs:
	•	If the dealer collides with a thug before finding the next pickup point, all carried money is lost.
	•	Managed in collision.js.
	•	Dealer must return to the stash to collect more money.
	•	Game Over Condition:
	•	The game ends if the dealer runs out of money completely.
	•	Condition checked in gameState.js and handled within gameEngine.js.

Color Mapping and Element Roles

To enhance visual clarity and gameplay experience, different game elements are represented by specific colors on the grid:
	•	Dealer (Player):
	•	Color: Green
	•	Role: Represents the player-controlled character navigating the grid to collect pickups, convert them at drop-offs, and manage funds.
	•	Pickups:
	•	Color: Yellow
	•	Role: Locations where the dealer can collect $100 worth of digital drugs to initiate the conversion process.
	•	Drop-off Points:
	•	Color: Purple
	•	Role: Locations where the dealer converts carried drugs into money. Each drop-off converts a specified amount (e.g., $50).
	•	Thugs:
	•	Color: Red
	•	Role: Enemies that roam the grid in advanced rounds. Colliding with a thug results in the loss of all carried money.
	•	Stash:
	•	Color: Blue
	•	Role: The depot where the dealer can stash money. Upon reaching the stash, the player decides how much money to keep and carry into the next round.
	•	Grid Lines:
	•	Color: Dark Gray (#333)
	•	Role: Optional visual grid to aid navigation.

Flow of Gameplay
	1.	Initialization:
	•	Dealer starts with $100.
	2.	First Pickup:
	•	Dealer finds the first pickup point and gains $100 worth of drugs.
	•	Drop-off points appear on the map.
	3.	Drop-off Phase:
	•	Dealer visits each drop-off point to convert drugs into money.
	4.	Stashing Phase:
	•	After all drop-offs, dealer collects the total money.
	•	Dealer decides how much to stash and carry for the next round.
	5.	Subsequent Rounds:
	•	Dealer searches for the next pickup point with carried money.
	•	Thugs begin to appear and roam the map.
	•	Risk of collision with thugs increases the challenge.
	6.	Game Over:
	•	Occurs if the dealer’s funds reach zero.

Conclusion

The NarcotiX framework is designed to support iterative development and modularity, enabling easy integration of new features. By following the provided guidelines and updating this document with each new addition, teams can maintain a robust and scalable codebase for the game. The introduction of simulation-like mechanics and clear color mappings enhances the gameplay experience, providing strategic depth and increased engagement for players.


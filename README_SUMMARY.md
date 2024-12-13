NarcotiX Game Framework – Summary

Core Concept:
NarcotiX is a modular, grid-based game inspired by “Snake,” where the player moves around a grid to collect and convert digital drugs into money, then stash profits to survive later, more dangerous rounds.

Key Gameplay Loop:

Starting Funds & Pickup: You begin with $100. Your first goal is to find a pickup point that gives you $100 worth of drugs.
Drop-off Conversions: Once you have drugs, multiple drop-off points appear. Visit each to convert some of your carried drugs into cash.
Stashing Profits: After using all drop-offs, return to the stash. Decide how much money to store safely (stash) and how much to carry into the next round.
Increasing Challenge: In later rounds, thugs appear. Colliding with a thug causes you to lose all carried money, raising the stakes as you navigate the grid.
Game Over Condition: If you ever run completely out of money (both carried and stashed), the game ends.
Game Elements:

Dealer (Player, Green): Controlled by arrow keys/WASD. Moves through the grid, collecting pickups, visiting drop-offs, and avoiding thugs.
Pickups (Yellow): Grant you drugs worth $100, enabling you to engage with drop-offs.
Drop-offs (Purple): Where you trade drugs for money. Each drop-off yields a certain amount of cash.
Stash (Blue): Safe place to store funds between rounds.
Thugs (Red): Enemies that appear in later rounds. A collision causes loss of carried funds.
Modular Design:
The framework is built from separate modules (e.g., gameEngine, gameState, dealer, pickups, stash, collision) that each handle different parts of the game. This allows easy updates or additions of new features without overhauling the entire codebase.

Visual Feedback:
Colors and a clear HUD help players identify their character, pickups, drop-offs, stash locations, and threats. Real-time rendering at 60 FPS ensures smooth visuals.

Objectives and Strategy:
The player aims to maximize stashed money over multiple rounds. Strategic decisions include how much to stash versus carry forward and how to navigate the grid to avoid thugs while completing conversions efficiently.

In Short:
NarcotiX challenges players to acquire drugs, convert them into money, and manage their funds wisely while facing increasing risks. Its modular structure simplifies adding new game elements, ensuring ongoing expansion and refinement.
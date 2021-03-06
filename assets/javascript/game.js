$(document).ready(function() {

// ======== GLOBAL VARIABLES ========
	var characters = [];
	var enemies = [];
	var yourCharacter = {};
	var currentEnemy = {};
	var yourCharacterHp = 0;
	var yourCharacterAttack = 0;
	var defenderHp = 0;
	var defenderAttack = 0;
	var attackAbility = false;
	var yourCharacterPicked = false;
	var defenderPicked = false;

// ======== FUNCTIONS ========

	// Start the game...
	function initializeGame() {

		// Set the list of characters
		characters = [{
			name: "Yoda",
			hp: 180,
			attackPower: 25,
			src: "./assets/images/yoda.jpeg"
		}, {
			name: "Kylo Ren",
			hp: 120,
			attackPower: 15,
			src: "./assets/images/kylo-ren.jpg"
		}, {
			name: "Captain Phasma",
			hp: 100,
			attackPower: 5,
			src: "./assets/images/captain-phasma.jpg"
		}, {
			name: "Darth Vader",
			hp: 150,
			attackPower: 20,
			src: "./assets/images/darth-vader.jpg"
		}];

		var counter = 0;

		// For each character...
		characters.forEach(function(characterObj){

			// Create a div
			var charactersDiv = $("<div>");

			// Set div attributes
			charactersDiv.addClass("characters");
			charactersDiv.attr("value", counter); // set value equal to the index

			// Append character's name, img, and hp to the character's div
			charactersDiv.append("<p>" + characterObj.name + "</p>");
			charactersDiv.append("<img src=" + characterObj.src + " alt='character'>");
			charactersDiv.append("<p>" + characterObj.hp + "</p>");

			// Add the character's div to the list-of-characters section
			$("#list-of-characters").append(charactersDiv);

			counter++;
		});

		// Empty out divs
		$("#your-character-section").empty();
		$("#enemies-available-section").empty();
		$("#your-character-section").empty();
		$("#defender-section").empty();
		$("#game-results").empty();

		// Reset variables
		enemies = [];
		yourCharacter = {};
		currentEnemy = {};
		yourCharacterHp = 0;
		yourCharacterAttack = 0;
		defenderHp = 0;
		defenderAttack = 0;
		attackAbility = false;
		yourCharacterPicked = false;
		defenderPicked = false;
	}

	// When you pick a character from the list of characters...
	function pickYourCharacter() {

		// Grab the value of the character div
		var index = $(this).attr("value");
		
		// Do nothing if the user has already picked a character
		if (yourCharacterPicked) {
			return;
		}

		// If you haven't picked a character...

		// Then grab the character's info
		yourCharacter = characters[index];
		yourCharacterHp = yourCharacter.hp;

		// Now that a character was chosen, we can set yourCharacterPicked to true
		yourCharacterPicked = true;

		// Display the chosen character
		displayYourCharacter();

		// Empty out list of characters
		$("#list-of-characters").empty();

		// Determine list of enemies

		characters.splice(index, 1);
		enemies = characters;

		// display the rest of characters as enemies
		displayEnemies();
		
	}

	function displayYourCharacter() {
		$("#your-character-section").empty();

		var yourCharacterDiv = $("<div>");

		yourCharacterDiv.addClass("characters");

		// Append character's name, img, and hp to the character's div
		yourCharacterDiv.append("<p>" + yourCharacter.name + "</p>");
		yourCharacterDiv.append("<img src=" + yourCharacter.src + " alt='character'>");
		yourCharacterDiv.append("<p>" + yourCharacterHp + "</p>");

		// Add the character's div to the your-character-section
		$("#your-character-section").append(yourCharacterDiv);

	}

	// Display the list of available enemies
	function displayEnemies() {

		var enemiesCounter = 0;

		// Loop through the list of available enemies...
		enemies.forEach(function(enemy) {

			// Create a div
			var enemiesDiv = $("<div>");

			enemiesDiv.addClass("enemies");
			enemiesDiv.attr("value", enemiesCounter);

			// Append enemie's name, img, and hp to the enemies's div
			enemiesDiv.append("<p>" + enemy.name + "</p>");
			enemiesDiv.append("<img src=" + enemy.src + " alt='character'>");
			enemiesDiv.append("<p>" + enemy.hp + "<p>");

			// Add the enemie's div to the enemies-available-section
			$("#enemies-available-section").append(enemiesDiv);

			enemiesCounter++;
		});
	}

	function pickDefender() {

		// If a defender has already been picked, then do nothing
		if (defenderPicked) {
			return;
		}

		$("#game-results").empty();

		// Grab info of the defender
		var enemyIndex = $(this).attr("value");

		currentEnemy = enemies[enemyIndex];
		defenderHp = currentEnemy.hp;
		defenderAttack = currentEnemy.attackPower;

		defenderPicked = true;

		// Display the defender
		displayDefender();

		// Remove defender from list of available enemies
		enemies.splice(enemyIndex, 1);

		// Display new list of available enemies
		$("#enemies-available-section").empty();
		displayEnemies();
	}

	// Display the defender picked
	function displayDefender() {

		$("#defender-section").empty();

		// Create a div
		var enemyDiv = $("<div>");

		// Add defender class
		enemyDiv.addClass("defender");

		// Append defender's name, img, and hp
		enemyDiv.append("<p>" + currentEnemy.name + "</p>");
		enemyDiv.append("<img src=" + currentEnemy.src + " alt='character'>");
		enemyDiv.append("<p>" + defenderHp + "</p>");

		// Add defender to the defender-section
		$("#defender-section").append(enemyDiv);

	}

	// Execute a game's round
	function gameRound() {

		// If defender is not picked OR if the game is over, then do nothing...
		if (!defenderPicked || attackAbility) {
			return;
		}

		// Increase your character's attack power by 8
		yourCharacterAttack += 8;

		// Attack defender
		defenderHp -= yourCharacterAttack;

		// Defender attacks user
		yourCharacterHp -= defenderAttack;

		checkResults();
	}

	// After each round, check if the user won or lost
	function checkResults() {

		// Empty the #game-results div 
		$("#game-results").empty();

		// If yourCharacter and defender both reach 0 or negative numbers
		// at the same time, then...
		if (yourCharacterHp <= 0 && defenderHp <= 0) {
			
			// Check if yourCharacter lost
			if (yourCharacterHp < defenderHp) {

				// Disable the attack button and let user know they lost
				attackAbility = true;
				displayGameLost();
			}
			// Otherwise, yourCharacter won the round
			else {

				// Enable the pick defender ability and let user know they won the round
				defenderPicked = false;
				roundWon();
			}
		}
		// If your character is the first to reach 0, then...
		else if (yourCharacterHp <= 0) {

			// Disable the attack button and let user know they lost
			attackAbility = true;
			displayGameLost();
		}
		// If the defender is the first to reach 0, then...
		else if (defenderHp <= 0) {
			// Enable the pick defender ability and let user know they won the round
			defenderPicked = false;
			roundWon();
		}
		// If no one has lost, then show new attack results
		else {

			// Show attack power in #game-results div
			$("#game-results").append("<p>You attacked " + currentEnemy.name + " for " + yourCharacterAttack + " points.");
			$("#game-results").append(currentEnemy.name + " attacked you back for " + defenderAttack + " damage.");

			// Update yourCharacter's and defender's hp
			displayYourCharacter();
			displayDefender();
		}
	}

	// If the user loses...
	function displayGameLost() {

			// Update yourCharacter's and defender's hp
			displayYourCharacter();
			displayDefender();

			// Display Game Over to user
			$("#game-results").append("<p>You have been defeated...GAME OVER!!!");
			$("#game-results").append("<button id='restart'>Restart</button>");
	}

	// If an user won a round...
	function roundWon() {

		// Empty the defender section
		$("#defender-section").empty();

		// If you have defeated all enemies, then you won the game
		if (enemies.length === 0) {
			$("#game-results").append("<p>You won!!! GAME OVER!!!");
			$("#game-results").append("<button id='restart'>Restart</button>");
		}
		// Otherwise...
		else {

			// Let the user know they won this round
			$("#game-results").append("<p>You have defeated " + currentEnemy.name + 
				" , you can choose to fight another enemy");

		}
	}

// ======== MAIN PROCESSES ========

	// Initialize game
	initializeGame();

	// We sometimes use .on() method instead of .click() because 
	// the elements are dynamically being created. Therefore, in order
	// to actually register click events we use .on() since .click() won't
	// actually register click events with these dynamically created elements

	// When a character is picked...
	$("#list-of-characters").on("click", ".characters", pickYourCharacter);

	// When a defender is chosen...
	$("#enemies-available-section").on("click", ".enemies", pickDefender);

	// When the attack button is clicked...
	$("#attack-button").click(gameRound);

	$("#game-results").on("click", "#restart", initializeGame);

});


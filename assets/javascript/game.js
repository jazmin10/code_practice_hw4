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
	// var attackAbility = false;
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
		enemyPicked = false;
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
		displayYourCharacter(yourCharacter);

		// Empty out list of characters
		$("#list-of-characters").empty();

		// Determine list of enemies

		characters.splice(index, 1);
		enemies = characters;

		// display the rest of characters as enemies
		displayEnemies(enemies);
		
	}

	function displayYourCharacter(characterChosen) {
		$("#your-character-section").empty();

		var yourCharacterDiv = $("<div>");

		yourCharacterDiv.addClass("characters");

		// Append character's name, img, and hp to the character's div
		yourCharacterDiv.append("<p>" + characterChosen.name + "</p>");
		yourCharacterDiv.append("<img src=" + characterChosen.src + " alt='character'>");
		yourCharacterDiv.append("<p>" + yourCharacterHp + "</p>");

		// Add the character's div to the your-character-section
		$("#your-character-section").append(yourCharacterDiv);

	}

	// Display the list of available enemies
	function displayEnemies(listEnemies) {

		var enemiesCounter = 0;

		// Loop through the list of available enemies...
		listEnemies.forEach(function(enemy) {

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

		// Grab info of the defender
		var enemyIndex = $(this).attr("value");

		currentEnemy = enemies[enemyIndex];
		defenderHp = currentEnemy.hp;
		defenderAttack = currentEnemy.attackPower;

		defenderPicked = true;

		// Display the defender
		displayDefender(currentEnemy);

		// Remove defender from list of available enemies
		enemies.splice(enemyIndex, 1);

		// Display new list of available enemies
		$("#enemies-available-section").empty();
		displayEnemies(enemies);
	}

	// Display the defender picked
	function displayDefender(defender) {

		$("#defender-section").empty();

		// Create a div
		var enemyDiv = $("<div>");

		// Add defender class
		enemyDiv.addClass("defender");

		// Append defender's name, img, and hp
		enemyDiv.append("<p>" + defender.name + "</p>");
		enemyDiv.append("<img src=" + defender.src + " alt='character'>");
		enemyDiv.append("<p>" + defenderHp + "</p>");

		// Add defender to the defender-section
		$("#defender-section").append(enemyDiv);

	}

	// Execute a game's round
	function gameRound() {

		// If defender is not picked, then do nothing...
		if (!defenderPicked) {
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

		if (yourCharacterHp < 0) {
			console.log("game over");
		}

		// Empty the #game-results div 
		$("#game-results").empty();

		// Show attack power in #game-results div
		$("#game-results").append("<p>You attacked " + currentEnemy.name + " for " + yourCharacterAttack + " points.");
		$("#game-results").append(currentEnemy.name + " attacked you back for " + defenderAttack + " damage.");

		// Update yourCharacter's and defender's hp
		displayYourCharacter(yourCharacter);
		displayDefender(currentEnemy);
	}

// ======== MAIN PROCESSES ========

	// Initialize game
	initializeGame();

	// When a character is picked...
	$(".characters").click(pickYourCharacter);

	// When a defender is chosen...
	// We use .on() method instead of .click() because enemies are being dynamically
	// created. The .click() method won't work when only using $(".enemies")
	$("#enemies-available-section").on("click", ".enemies", pickDefender);

	// When the attack button is clicked...
	$("#attack-button").click(gameRound);


});


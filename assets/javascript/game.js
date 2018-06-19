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
	var enemyPicked = false;

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
		yourCharacterAttack = 8;

		// Now that a character was chosen, we can set yourCharacterPicked to true
		yourCharacterPicked = true;

		// Display the chosen character
		displayYourCharacter(yourCharacter);

		// Empty out list of characters
		$("#list-of-characters").empty();

		// Determine list of enemies

		// display enemies
		
	}

	function displayYourCharacter(characterChosen) {
		var yourCharacterDiv = $("<div>");

		yourCharacterDiv.addClass("characters");

		// Append character's name, img, and hp to the character's div
		yourCharacterDiv.append("<p>" + characterChosen.name + "</p>");
		yourCharacterDiv.append("<img src=" + characterChosen.src + " alt='character'>");
		yourCharacterDiv.append("<p>" + yourCharacterHp + "</p>");

		// Add the character's div to the your-character-section
		$("#your-character-section").append(yourCharacterDiv);

	}

// ======== MAIN PROCESSES ========

	initializeGame();

	$(".characters").click(pickYourCharacter);

});
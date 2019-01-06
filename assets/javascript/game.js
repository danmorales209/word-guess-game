/*
JavaScript for Assignment #3
Daniel Morales
*/

class secretWord {
    /* Class to define the secret word container. Uses secretWordArray to
    store all potenial words. Set currentWord picks a random integer from
    the array to assign the active word. */
    // properties
    constructor() {
        this.currentWord = '';
        this.currentWordDisplay = [];
        this.secretWordArray = [
            "Gandalf", "Mordor", "Galadriel"
        ];
    };

    // methods

    changeCurrentWord() {
        let upperBound = this.secretWordArray.length;

        let index = 0;

        index = Math.floor(Math.random() * upperBound);

        this.currentWord = this.secretWordArray[index];

        this.initializeCurrentWordDisplay();
    };

    initializeCurrentWordDisplay() {
        for (let i = 0; i < this.currentWord.length; i++) {
            this.currentWordDisplay.push("_");
        }
    };

    updateCurrentWordDisplay(letter) {
        if (this.isLetterInWord(letter)) {
            for (let i = 0; i < this.currentWord.length; i++) {
                if (letter.toUpperCase() === this.currentWord[i].toUpperCase()) {
                    this.currentWordDisplay[i] = letter.toUpperCase();
                }
            }
        }
    };

    printCurrentWordDisplay() {
        let displayString = "";

        for (let i = 0; i < this.currentWordDisplay.length; i++) {
            if (i === (this.currentWordDisplay.length - 1)) {
                displayString += this.currentWordDisplay[i];
            }
            else {
                displayString += `${this.currentWordDisplay[i]} `;
            }
        }
        return displayString;
    };

    isLetterInWord(letter) {
        return this.currentWord.toUpperCase().includes(letter.toUpperCase());
    }

};

class scoreTally {
    constructor() {
        this.gamesWon = 0;
        this.guessesLeft = 10;
        this.lettersGuessed = [];
    };

    win() {
        this.gamesWon++;
    };

    appendLettersGuessed(letter) {
        this.lettersGuessed.push(String(letter).toUpperCase());
    };

    decrementGuessesLeft() {
        this.guessesLeft--;
    };

    letterGuessUpdate(letter) {
        let returnMessage = "Press a letter to guess!";

        if (this.lettersGuessed.includes(String(letter).toUpperCase())) {
            returnMessage = `${String(letter).toUpperCase()} was already guessed, please select a new letter.`;
        }
        else if (Number(letter)) {
            returnMessage = `${letter} is not a character, please select a new letter.`;

        }
        else {
            this.appendLettersGuessed(letter);
            this.decrementGuessesLeft();
        }

        return returnMessage;
    };

    printLettersGuessed() {
        let stringOut = '';
        if (this.lettersGuessed === 1) {
            stringOut = this.lettersGuessed[0];
        }
        else {
            for (let i = 0; i < this.lettersGuessed.length; i++) {
                if (i === (this.lettersGuessed.length - 1)) {
                    stringOut += this.lettersGuessed[i];
                }
                else {
                    stringOut += `${this.lettersGuessed[i]}, `;
                }
            }
        }

        return stringOut;
    }

    resetSelf() {
        this.guessesLeft = 10;
        this.lettersGuessed = [];
    }

    isGameOver() {
        if(this.guessesLeft < 1) {
            return true;
        }
        else {
            return false;
        }
    }
};

function initialKeyUp(event) {
    for (let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "initial";
    }
    document.getElementById("initial-message").style.display = "none";
    document.addEventListener("keyup", guessKeyUp);
    console.log(event.key);
    document.removeEventListener("keyup", initialKeyUp);
}

function guessKeyUp (event) {
    
    var userKey = event.key;

    guessMessage.innerText = gameMaster.letterGuessUpdate(userKey);
    guessedLettersDisplay.innerText = gameMaster.printLettersGuessed();

    mySecretWord.updateCurrentWordDisplay(userKey);

    secretWordDisplay.innerText = mySecretWord.printCurrentWordDisplay();

    guessesLeftDisplay.innerText = gameMaster.guessesLeft;

}

function initialHiddenState() {
    for(let i=0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "none";
    }
}


// Instanitate the classes
var mySecretWord = new secretWord();
var gameMaster = new scoreTally();
var hiddenElements = document.getElementsByClassName("hidden");

initialHiddenState();

// Set the first secret word
mySecretWord.changeCurrentWord();


// Initialize the HTML content with the 
var secretWordDisplay = document.getElementById("secret-word-display");
secretWordDisplay.innerText = mySecretWord.printCurrentWordDisplay();

var gameTallyDisplay = document.getElementById("games-won");
gameTallyDisplay.innerText = gameMaster.gamesWon;

var guessesLeftDisplay = document.getElementById("guesses-remaining");
guessesLeftDisplay.innerText = gameMaster.guessesLeft;

var guessMessage = document.getElementById("guess-message");
guessMessage.innerText = "Press a letter to guess!";

var guessedLettersDisplay = document.getElementById("guessed-letters-display");
guessedLettersDisplay.innerText = gameMaster.printLettersGuessed();

document.addEventListener("keyup", initialKeyUp );






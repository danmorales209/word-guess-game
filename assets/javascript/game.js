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
        if(this.isLetterInWord()) {
            for (let i = 0; i < this.currentWord.length; i++) {
                if (letter.toUpperCase() === currentWord[i]) {
                    currentWordDisplay[i] = letter.toUpperCase();
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
        return this.currentWord.includes(letter);
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
        let returnMessage = "Press any key to start";

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
        if(this.lettersGuessed === 1) {
            stringOut = this.lettersGuessed[0];
        }
        else {
            for( let i = 0; i < this.lettersGuessed.length; i++) {
                if(i === (this.lettersGuessed.length - 1)) {
                    stringOut += this.lettersGuessed[i];
                }
                else {
                    stringOut += `${this.lettersGuessed[i]}, `;
                }
        }
            
        }
    }

    resetSelf() {
        this.guessesLeft = 10;
        this.lettersGuessed = [];
    }
};

var mySecretWord = new secretWord();
var gameMaster = new scoreTally();

mySecretWord.changeCurrentWord();

var secretWordDisplay = document.getElementById("secret-word-display");
secretWordDisplay.innerText = mySecretWord.printCurrentWordDisplay();

var gameTallyDisplay = document.getElementById("games-won");
gameTallyDisplay.innerText = gameMaster.gamesWon;

var guessesLeftDisplay = document.getElementById("guesses-remaining");
guessesLeftDisplay.innerText = gameMaster.guessesLeft;

var guessMessage = document.getElementById("guess-message");
guessMessage.innerText = "Press any key to start!";

document.onkeyup = function (event) {
    var userKey = event.key;

    guessMessage.innerText = gameMaster.letterGuessUpdate(userKey);

}






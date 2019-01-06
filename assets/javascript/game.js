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
            "Gandalf", "Mordor", "Galadriel", "Aragorn", "Frodo"
        ];
        this.secretWordSounds = [
            "neverlate", "blackgate", "task", "protect", "happen"
        ];
        this.secretWordImg = [
            "Gandalf", "mordor", "Galadriel", "aragorn", "frodo"
        ];
        this.index = 0;
    };

    // methods

    changeCurrentWord() {
        let upperBound = this.secretWordArray.length;

        this.index = Math.floor(Math.random() * upperBound);

        this.currentWord = this.secretWordArray[this.index];

        this.initializeCurrentWordDisplay();
    };

    initializeCurrentWordDisplay() {
        this.currentWordDisplay =[];

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
    };

    pushImg() {
        return `assets\\images\\${this.secretWordImg[this.index]}.png`;
    };

    pushSound() {
        return `assets\\audio\\${this.secretWordSounds[this.index]}.wav`;
    };

    isSecretWordGuessed() {
        let wordGuessed = false;
        if (this.currentWordDisplay.indexOf("_") === -1) {
            wordGuessed = true;
        }

        return wordGuessed;
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
};

function initialKeyUp(event) {
    let classElementsArray = document.getElementsByClassName("hidden");

    for (let i = 0; i < classElementsArray.length; i++) {
        classElementsArray[i].style.display = "initial";
    }
    document.getElementById("initial-message").style.display = "none";
    document.addEventListener("keyup", guessKeyUp);
    console.log(event.key);
    document.removeEventListener("keyup", initialKeyUp);
}

function guessKeyUp(event) {

    var userKey = event.key;

    guessMessage.innerText = gameMaster.letterGuessUpdate(userKey);
    guessedLettersDisplay.innerText = `Letters guessed: ${gameMaster.printLettersGuessed()}`;

    mySecretWord.updateCurrentWordDisplay(userKey);

    secretWordDisplay.innerText = mySecretWord.printCurrentWordDisplay();

    if (!mySecretWord.isSecretWordGuessed()) { // Secret word hasn't been guessed
        if (gameMaster.guessesLeft > 1) { // guesses left
            guessesLeftDisplay.innerText = `You have ${gameMaster.guessesLeft} guesses left.`;
        }
        else if (gameMaster.guessesLeft == 1) { // last guess
            guessesLeftDisplay.innerText = `You have only ${gameMaster.guessesLeft} guess left!`;
        }
        else { // out of guesses
            guessMessage.innerText = "You lost! Press any key to guess on a new word";
            mySecretWord.changeCurrentWord();
            gameMaster.resetSelf();
        }
    }
    else {
        guessMessage.innerText = "You won! Press any key to guess on a new word";
        winSound.getElementsByTagName("source")[0].src = mySecretWord.pushSound();
        winImage.height= 300;
        winImage.src = mySecretWord.pushImg();
        
        winSound.load();
        winSound.play();
        
        mySecretWord.changeCurrentWord();
        gameMaster.win();
        gameMaster.resetSelf();
        gameTallyDisplay.innerText = `You have won ${gameMaster.gamesWon} games.`;
        secretWordDisplay.innerText = mySecretWord.printCurrentWordDisplay();

        setTimeout(function() {
            winImage.src = "";
            winImage.height = 0;
        }, 10000);

        guessedLettersDisplay.innerText = `Letters guessed: ${gameMaster.printLettersGuessed()}`;
        guessesLeftDisplay.innerText = `You have ${gameMaster.guessesLeft} guesses left.`;


    }

}

function initialHiddenState(classElementsArray) {
    for (let i = 0; i < classElementsArray.length; i++) {
        classElementsArray[i].style.display = "none";
    }
}

// Instanitate the classes
var mySecretWord = new secretWord();
var gameMaster = new scoreTally();
var hiddenElements = document.getElementsByClassName("hidden");

initialHiddenState(hiddenElements);

// Set the first secret word
mySecretWord.changeCurrentWord();


// Initialize the HTML content with the 
var secretWordDisplay = document.getElementById("secret-word-display");
secretWordDisplay.innerText = mySecretWord.printCurrentWordDisplay();

var gameTallyDisplay = document.getElementById("games-won");
gameTallyDisplay.innerText = `You have won ${gameMaster.gamesWon} games.`;

var guessesLeftDisplay = document.getElementById("guesses-remaining");
guessesLeftDisplay.innerText = `You have ${gameMaster.guessesLeft} guesses left.`;

var guessMessage = document.getElementById("guess-message");
guessMessage.innerText = "Press a letter to guess!";

var guessedLettersDisplay = document.getElementById("guessed-letters-display");
guessedLettersDisplay.innerText = `Letters guessed: ${gameMaster.printLettersGuessed()}`;

var winSound = document.getElementById("win-sound");
var winImage = document.getElementById("win-pic");

document.addEventListener("keyup", initialKeyUp);







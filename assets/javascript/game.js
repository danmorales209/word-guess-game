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

        initializeCurrentWordDisplay();
    };

    initializeCurrentWordDisplay() {
        for (let i = 0; i < this.currentWord.length; i++) {
            this.currentWordDisplay.push("_");
        }
    };

    updateCurrentWordDisplay(letter) {
        for (let i = 0; i < this.currentWord.length; i++) {
            if( letter.toUpperCase() === currentWord[i] ) {
                currentWordDisplay[i] = letter.toUpperCase();
            }
        }
    };

    printCurrentWordDisplay() {
        let displayString = "";

        for (chars in currentWordDisplay) {
            displayString += 
        }
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
        this.lettersGuessed.push(String(letter).toUpperCase() );
    };

    decrementGuessesLeft() {
        this.guessesLeft--;
    };

    letterGuessUpdate(letter) {
        let returnMessage = "";
        
        if (this.lettersGuessed.includes( String(letter).toUpperCase() ) ) {
            returnMessage = `${ String( letter ).toUpperCase() } was already guessed, please select a new letter.`;
        }
        else if (Number(letter)) {
            returnMessage = `${letter} is not a character, please select a new letter.`;

        }
        else {
            appendLettersGuessed( letter );
            decrementGuessesLeft();
        }

        return returnMessage;
    };

    resetSelf() {
        this.guessesLeft = 10;
        this.lettersGuessed = [];
    }
};

var mySecretWord = new secretWord();
var gameMaster = new scoreTally();
var hiddenWordArray = "";

mySecretWord.changeCurrentWord();

for (let i = 0; i < mySecretWord.currentWord.length; i++) {
    hiddenWordArray.push('_');
}



var secretWordDisplay = document.getElementById("secret-word-display");
secretWordDisplay.innerHTML = mySecretWord.currentWord;

document.onkeyup = function(event) {
    var userKey = event.key;

    alert(mySecretWord.currentWord);

}






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
    };

    currentWord;

    static secretWordArray = [
        "Gandalf", "Mordor", "Galadriel"
    ];


    // methods

    set currentWord() {
        let upperBound = this.secretWordArray.length;

        let index = 0;

        index = Math.floor(Math.random() * upperBound);

        this.currentWord = this.secretWordArray[index];
    };

    get currentWord() {
        return this.currentWord;
    };
};

class scoreTally {
    constructor() {
        this.gamesWon = 0;
        this.guessesLeft = 10;
        this.lettersGuessed = [];
    };

    get gamesWon() {
        return this.gamesWon;
    };

    get guessesLeft() {
        return this.guessesLeft;
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






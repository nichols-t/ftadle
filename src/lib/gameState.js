const factorList = require('../data/factors.json');
const { listFactors } = require('./factorize');
const GAME_PARAMS = require('../constants/game_params.json');

module.exports = class GameState {
    target;
    maxGuesses;
    guessesUsed;
    gameOver;
    correct = false;
    constructor ({ targetNumber, maxGuesses }) {
        this.target = Number(targetNumber);
        this.maxGuesses = Number(maxGuesses);
        this.guessesUsed = 0;
        this.gameOver = false;
        this.correct = false;
    }

    /**
     * Executes a guess with the given number. If the game is over, changes the gameOver
     * state to true. Modifies the correct state depending on whether or not the guess
     * is correct. If the game is over, the list of correct factors is returned; otherwise,
     * return the list of common factors.
     * @param {Number} guessNum 
     * @returns {{
     *              correct: Boolean,
     *              gameOver: Boolean,
     *              factors: {}
     * }} Object with correct, gameOver, factors keys
     */
    guess(guessNum) {
        this.guessesUsed += 1;
        let returnFactors = [];
        const targetFactors = factorList[this.target];
        const result = {};

        if (this.guessesUsed > this.maxGuesses) {
            this.gameOver = true;
            this.correct = false;
            returnFactors = targetFactors;
            return { correct: this.correct, gameOver: this.gameOver, factors: targetFactors }
        } else if (guessNum === this.target) {
            this.correct = true;
            this.gameOver = true;
            returnFactors = targetFactors;
        } else {
            const guessFactors = listFactors(guessNum);
    
            const filteredFactors = {};
            for (const key in guessFactors) {
                if (!targetFactors[key]) {
                    filteredFactors[key] = GAME_PARAMS.GUESS_FACTOR_RESULT.NOT_DIVISOR;
                } else if (targetFactors[key] !== guessFactors[key]) {
                    filteredFactors[key] = GAME_PARAMS.GUESS_FACTOR_RESULT.WRONG_POWER;
                } else {
                    filteredFactors[key] = GAME_PARAMS.GUESS_FACTOR_RESULT.CORRECT;
                }
            }

            this.correct = false;
            returnFactors = filteredFactors;
        }

        return {
            correct: this.correct,
            factors: returnFactors,
            gameOver: this.gameOver
        };
    }
}
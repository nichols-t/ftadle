const factorList = require('../data/factors.json');
const { listFactors } = require('./factorize');

module.exports = class GameState {
    target;
    maxGuesses;
    constructor ({ targetNumber, maxGuesses }) {
        this.target = Number(targetNumber);
        this.maxGuesses = Number(maxGuesses);
    }

    guess(guessNum) {
        let correct;
        if (guessNum === this.target) {
            correct = true;
        } else {
            correct = false;
        }

        const guessFactors = listFactors(guessNum);
        const targetFactors = factorList[this.target];

        const filteredFactors = {};
        for (const key in guessFactors) {
            if (!targetFactors[key]) {
                filteredFactors[key] = -1;
            } else if (targetFactors[key] !== guessFactors[key]) {
                filteredFactors[key] = 0;
            } else {
                filteredFactors[key] = 1;
            }
        }
        console.log(guessFactors);
        console.log(targetFactors);

        return { correct, factors: filteredFactors };
    }
}
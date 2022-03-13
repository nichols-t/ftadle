const GameState = require('./gameState');
const factors = require('../data/factors.json');
const _ = require('lodash');

module.exports = class ServerState {
    games;
    constructor() {
        this.games = {};
    }

    newGame(playerId) {
        const targetNum = _.sample(Object.keys(factors));
        this.games[playerId] = new GameState({ targetNumber: targetNum , maxGuesses: 6 });
        return this;
    }

    guess(playerId, guessNumber) {
        return this.games[playerId].guess(guessNumber);
    }
}
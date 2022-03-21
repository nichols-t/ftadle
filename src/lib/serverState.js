const GameState = require('./gameState');
const factors = require('../data/factors.json');
const GAME_PARAMS = require('../constants/game_params.json');
const _ = require('lodash');

module.exports = class ServerState {
    games;
    constructor() {
        this.games = {};
    }

    /**
     * Creates a new game for the player with the given player ID
     * @param {String} playerId a unique identifier for the player
     * @returns {Boolean} whether or not a new game was created
     */
    newGame(playerId) {
        let created = false;
        if (!this.games[playerId]) {
            const targetNum = _.sample(Object.keys(factors));
            this.games[playerId] = new GameState({
                targetNumber: targetNum,
                maxGuesses: GAME_PARAMS.NUM_MAX_GUESSES
            });
            created = true;
        }
        return created;
    }

    /**
     * Handles a player guess. Returns the guess result from the game state. If the guess
     * was correct, deletes the game state from this.games.
     * @param {String} playerId the player that is guessing 
     * @param {Number} guessNumber the player's guess
     * @returns {*} the guess result
     */
    guess(playerId, guessNumber) {
        const guessResult = this.games[playerId].guess(guessNumber);
        if (guessResult.correct) {
            console.log(`Player ${playerId} guessed correctly and ended their game`);
            delete this.games[playerId];
        }
        return guessResult;
    }

    /**
     * Return the number of games that this server state is currently running
     * @returns {Number} the number of games that this server currently hass
     */
    getNumGames() {
        return Object.keys(this.games).length;
    }
}
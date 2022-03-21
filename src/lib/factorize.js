const _ = require('lodash');
const GAME_PARAMS = require('../constants/game_params.json');

/**
 * Naive factorization algorithm, but it seems to be fast enough for numbers
 * that are small enough to use as a guess.
 * @param {Number} n a natural number that is at least 2
 * @returns {Array<Number>} array of the numbers that are factors of n
 */
function factorize(n) {
    if (!Number.isInteger(n)) {
        throw new Error(`Factorization must be done on an integer, received '${n}'`);
    }
    if (n < 2) {
        throw  new Error(`Cannot factorize numbers smaller than 2, received '${n}'`);
    }
    var factors = [],
        divisor = 2;

    if (n === 2) {
        return [2];
    }
    while (n > 2) {
        if (n % divisor == 0) {
            factors.push(divisor);
            n = n / divisor;
        }
        else {
            divisor++;
        }
    }
    return factors;
}

/**
 * Lists the factors of n by power
 * @param {Number} n a natural number greater than 2 
 * @return {*} Object with keys that are the game's possible prime factors that have
 * a nonzero power in the factorization of n. The value of a key is the power of that
 * key in the factorization of n.
 */
function listFactors(n) {
    const factors = factorize(n);
    const list = {};
    for (const p of GAME_PARAMS.FACTORS) {
        const pow = _.countBy(factors, f => f === p).true;
        if (pow > 0) {
            list[p] = pow;
        } 
    }
    return list;
}

module.exports = {
    listFactors
}
const fs = require('fs');
require('lodash.product');
require('lodash.combinations');
const _ = require('lodash');

const POWERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const PRIMES = [2, 3, 5, 7];

const factors = {};

for (let numFactors = 1; numFactors <= PRIMES.length; numFactors += 1) {
  const nFactorsCombinations = _.combinations(_.product(PRIMES, POWERS), numFactors);
  // Don't allow things like [2, 2] and [2, 3]
  const filteredCombinations = nFactorsCombinations.filter((comb) => {
    const bases = comb.map((pair) => pair[0]);
    if (_.uniq(bases).length !== bases.length) {
      return false
    }
    return true;
  });
  for (let factorization of filteredCombinations) {
    const num = factorization.reduce((partialFactor, curr) => {
      partialFactor *= Math.pow(curr[0], curr[1]);
      return partialFactor;
    }, 1);
    factors[num] = {};
    for (pair of factorization) {
      factors[num][pair[0]] = pair[1];
    }
  }
}

fs.writeFileSync('./factors.json', JSON.stringify(factors, null, 2));
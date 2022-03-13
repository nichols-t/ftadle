const _ = require('lodash');

function factorize(n) {
    var factors = [],
        divisor = 2;

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

function listFactors(n) {
    const factors = factorize(n);
    const list = {};
    for (const p of [2, 3, 5, 7]) {
        const pow = _.countBy(factors, f => f === 2).true;
        if (pow > 0) {
            list[p] = pow;
        } 
    }
    return list;
}

module.exports = {
    listFactors
}
# FTAdle

It's like wordle, but instead you guess a number. The game then tells you which prime factors
your guess number shares with the target number.

Implemented in JS with a basic express app to run it with. I've also generated the prime
factorizations for the numbers I am using. For now, this is limited to primes 2,3,5,7 and
powers 0-9. I really have no idea if that is a sensible limit or not.

## Running the Game

Run `npm start` to start the express app.

Call the `/newgame` route with a JSON body containing a `playerId` key to start a new game for the
given player ID. Only one game runs for each unique `playerId`.

Call the `/guess` route with a `playerId` and a `guess` number. The API returns an object telling
you which of the prime factors your guess number shares with the common number. The values are:
- `-1` when your guess had a prime that is not in the factorization of the target
- `0` when your guess has a common prime with the target, but that prime has a different power in the
  target factorization
- `1` when your gues has the same factorization for that prime as the target

For example, if the target is 20 (2^2 * 5), and the guess is 30 (2 * 3 * 5), the API would respond with
```JSON
{
    '2': 0, // 20 has 2 in its prime factorization, but to a different power than 30 does
    '3': -1, // 3 does not appear in the prime factorization of 20
    '5': 1  // 5 is in the factorization of both 20 and 30, with the same exponent
}
```

## Improvements

This is a rough roadmap for what needs to be done for this game:
- Implement testing and clean up APIs
- Implement database interface so we can save data if we want to
    - (Don't much care about using an actual DB, but interface should be there)
- Clean up organization/strings
    - Maybe make some submodules for constants, etc
- UI?
    - Would be neat to have a simple UI to run this stuff with
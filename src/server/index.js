const express = require('express');
const ServerState = require('../lib/serverState');

const server = express();
server.use(express.json());
const port = 3000;
const state = new ServerState();

server.get('/', (req, res) => {
    res.send('Welcome to FTAdle!');
    res.status(200);
    res.end();
});

server.post('/newgame', (req, res) => {
    try {
        if (!req.body.playerId) {
            res.status(400);
            res.send('newgame request must include a player ID!');
            res.end();
        } else {
            res.status(200);
            state.newGame(req.body.playerId);
            res.send(`Created new game for player ${req.body.playerId}`);
            res.end();
        }
    } catch (e) {
        console.log(e);
        console.log(req.body);
        res.status(400);
        res.send('Malformed request to newgame!');
    }
});

server.post('/guess', (req, res) => {
    try {
        if (!req.body.guess) {
            res.status(400);
            res.send('guess request must include a guess!');
            res.end();
        } else {
            console.log(`Player ${req.body.playerId} guessed ${req.body.guess}`);
            const result = state.guess(req.body.playerId, Number(req.body.guess));
            res.status(200);
            res.send(result);
            res.end();
        }
    } catch {
        res.status(400);
        res.send('Malformed request to guess!');
    }
});

server.listen(port, () => {
    console.log(`Running FTAdle server on port ${port}`);
});

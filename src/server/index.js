const express = require('express');
const ROUTES = require('../constants/routes.json');
const STATUS = require('../constants/status.json');
const ServerState = require('../lib/serverState');
const _ = require('lodash');

const server = express();
server.use(express.json());
const port = 3000;
const state = new ServerState();

server.get(ROUTES.BASE, (_req, res) => {
    res.send('Welcome to FTAdle! Call the /newgame route to start a new game!');
    res.status(STATUS.OK);
    res.end();
});

server.post(ROUTES.NEW_GAME, (req, res) => {
    const id = _.get(req, 'body.playerId');
    try {
        if (!id) {
            res.status(STATUS.EBADREQ);
            res.send({ message: 'newgame request must include a player ID!' });
            res.end();
        } else {
            res.status(STATUS.OK);
            const didCreateNewGame = state.newGame(id);
            let message = `Game already in progress for player ${id}`;
            if (didCreateNewGame) {
                message = `Created new game for player ${id}`;
            }
            res.send({ message });
            console.log(`Server now running ${state.getNumGames()} games`);
            res.end();
        }
    } catch (e) {
        console.log(e);
        console.log(req.body);
        res.status(STATUS.EBADREQ);
        res.send({ message: 'Malformed request to newgame!' });
    }
});

server.post(ROUTES.GUESS, (req, res) => {
    const id = _.get(req, 'body.playerId');
    const guess = _.get(req, 'body.guess');
    try {
        if (!guess) {
            res.status(STATUS.EBADREQ);
            res.send({ message: 'guess request must include a guess!' });
            res.end();
        } else if (!id) {
            res.status(STATUS.EBADREQ);
            res.send({ message: 'guess request must include a playerId!' });
            res.end();
        } else if (!state.games[id]) {
            res.status(STATUS.EBADREQ);
            res.send({ message: `No game found for player ${id}`});
            res.end();
        } else {
            console.log(`Player ${id} guessed ${guess}`);
            const result = state.guess(id, Number(guess));
            res.status(STATUS.OK);
            res.send(result);
            res.end();
        }
    } catch {
        res.status(STATUS.EBADREQ);
        res.send('Malformed request to guess!');
    }
});

server.listen(port, () => {
    console.log(`Running FTAdle server on port ${port}`);
});

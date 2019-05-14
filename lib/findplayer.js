"use strict"

const Player = require('../player.js');

module.exports = {
    findPlayer(uid, players, create = true){
        const index = players.findIndex(x => x.uid === uid);
        let player = undefined;
        if (index < 0 && create){
            player = new Player(uid);
            players.push(player);
        }
        else {
            player = players[index];
        }
        return player;
    }
}

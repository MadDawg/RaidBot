"use strict"

class Raid{
    // args should be string, uid (string), string
    constructor(name, level, leader_uid, guild_id){
        this.players = []; // uid/boolean pairs
        this.leader_uid = leader_uid; //uid
        this.guild_id = guild_id;
        this.date = "not set"
        this.reminders = false;
        this.name = name;
        this.addPlayer(leader_uid, level);
    }
    // upsert-style
    addPlayer(player_uid, level){
        let highlevel = true;
        if (level < 75 || level == "low")
            highlevel = false;

        const index = this.players.findIndex(x => x.uid === player_uid);

        if (index != -1){
            players[index].highlevel = highlevel;
        }
        else {
            this.players.push({
                uid: player_uid,
                highlevel: highlevel
            });
        }
    }
    removePlayer(player_uid){
        const index = this.players.findIndex(x => x.uid === player_uid);
        if (index != -1){
            players.splice(index, 1);
        }
    }
    promotePlayer(player_uid){
        if (this.players.includes(player_uid)){
            this.leader_uid = player_uid;
        }
    }
    isMember(player_uid){
        return (this.players.includes(player_uid));
    }
    isLeader(player_uid){
        return (player_uid == this.leader_uid);
    }
    setTime(date){
        this.date = date;
    }
    setTimeZone(timezone){
        this.date.timezone = timezone;
    }
    setName(name){
        this.name = name;
    }
}

module.exports = Raid;

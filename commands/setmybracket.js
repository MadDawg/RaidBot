const Player = require('../player.js');
const Raid = require('../raid.js');
const PlayerFinder = require('../lib/findplayer.js');

// TODO: check all raids player is in and make sure there is still room
// for them to be an active player (put them as reserve if not)

module.exports = {
    name: 'setmybracket',
    aliases: ['setmylevel', 'setbracket'],
    description: 'Set the level on your profile',
    guildOnly: true,
    args: true,
    usage: '<level>',
    admin: false,
    leader: false,

    execute(message, args, raids, players){
        const player = PlayerFinder.findPlayer(message.author.id, players);
        level = args[0];
        if (isNaN(level)){
            return message.reply(`invalid value entered for level.`);
        }
        let reply = player.setLevel(level);
        return message.reply(reply);
    }
}

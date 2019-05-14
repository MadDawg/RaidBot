// TODO: maybe allow player to add alts

const Player = require('../player.js');
const Raid = require('../raid.js');
const PlayerFinder = require('../lib/findplayer.js');

module.exports = {
    name: 'setmyign',
    aliases: ['setign', 'setmyname'],
    description: 'Set the in-game name on your profile',
    guildOnly: true,
    args: false,
    usage: '<IGN>',
    admin: false,
    leader: false,

    execute(message, args, raids, players){
        const player = PlayerFinder.findPlayer(message.author.id, players);
        name = args[0];
        player.setName(name);
        return message.reply(`in-game name set to ${name}`);
    }
}

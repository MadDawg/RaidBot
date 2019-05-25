const Player = require('../player.js');
const Raid = require('../raid.js');
const PlayerFinder = require('../lib/findplayer.js');

module.exports = {
    name: 'remind',
    aliases: ['ping'],
    description: 'Remind players of the raid',
    guildOnly: true,
    args: false,
    usage: '',
    admin: false,
    leader: true,

    execute(message, args, raids, players){
        const player = PlayerFinder.findPlayer(message.author.id, players);
        const raid = player.active;
        if (!raid){
            return message.reply('you are not currently managing a raid.');
        }
        if (!raid.isLeader(player)){
            return message.reply(`only the raid leader can use this command.`);
        }
        let reply = "";
        for (var i = 0; i < raid.active.length; i++){
            reply += `<@${raid.active[i].uid}>`;
        }
        for (var i = 0; i < raid.reserve.length; i++){
            reply += `<@${raid.reserve[i].uid}>`;
        }
        reply += `, this is a reminder that you are in the **${raid.name}** raid.`;
        return message.channel.send(reply);
    },
}

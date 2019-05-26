const Player = require('../player.js');
const Raid = require('../raid.js');
const PlayerFinder = require('../lib/findplayer.js');

module.exports = {
    name: 'create',
    aliases: ['createraid', 'makeraid', 'hostraid', 'host', 'create'],
    description: 'Create a raid',
    guildOnly: true,
    args: true,
    usage: '<name>',
    admin: false,
    leader: false,
    //minArgs: 2,

    execute(message, args, raids, players){
        const name = args.join(" ");

        const player = PlayerFinder.findPlayer(message.author.id, players);

        if (player.bracket < 1){
            return message.reply(`set/check your profile's level bracket before trying to start a raid.`);
        }

        let index = raids.findIndex(x => x.name.toLowerCase() === name.toLowerCase());
        if (index > -1){
            return message.reply(`raid **${raids[index].name}** already exists.`)
        }

        const raid = new Raid(name, player, message.guild.id);
        raids.push(raid);
        let reply = `raid **${raid.name}** created!`;

        player.active = raid;

        reply += `\nNow managing **${raid.name}**.`
}

module.exports = {
    name: 'join',
    aliases: ['enlist', 'signup'],
    description: 'Join a raid',
    guildOnly: true,
    args: true,
    usage: '<name> <level>',
    admin: false,
    leader: false,
    minArgs: 2,

    execute(message, args, raids, players){
        name = args[0].toLowerCase();
        level = args[1].toLowerCase();

        if (isNaN(level) && level != "high" && level != "low"){
            return message.reply(`Invalid value entered for level.`);
        }

        let index = raids.findIndex(x => x.name === name);
        if (index < 0){
            // These should probably be exceptions
            // just because I keep forgetting to bold the name
            return reply(`Raid **${name}** does not exist.`);
        }
        raid = raids[index];

        let player = undefined;
        index = players.findIndex(x => x.uid === message.author.id);
        if (index > -1){ player = players[index]; }
        else{
            player = new Player(message.author.id);
            players.push(player);
        }
        player.active = raid;
        raid.addPlayer(message.author.id, level);

        let reply = `Joined raid **${raid.name}**.`
        reply += `\nSwitched active raid to **${raid.name}**.`

        return message.reply(reply);
    }

}

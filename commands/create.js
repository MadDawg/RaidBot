module.exports = {
    name: 'create',
    aliases: ['createraid'],
    description: 'Create raid',
    guildOnly: true,
    args: true,
    usage: '<name> <level> [time]',
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
        if (index > -1){
            return message.reply(`Raid **${name}** already exists.`)
        }

        const raid = new Raid(name, level, message.author.id, message.guild.id);
        raids.push(raid);
        let reply = `Raid **${raid.name}** created!`;


        let player = undefined;
        index = players.findIndex(x => x.uid === message.author.id);
        if (index > -1){ player = players[index]; }
        else{
            player = new Player(message.author.id);
            players.push(player);
        }
        player.active = raid;

        reply += `\nSwitched active raid to **${raid.name}**.`

        if (args.length > 2){
            date_raw_str = args.splice(0,2);
            date_str = Date(date_raw_str.join(" "));
            if (date_str == "Invalid Date"){
                reply += `\nInvalid date/time was ignored.`;
            }
            else{ raid.setTime(Date(date_str)); }
        }
        return message.reply(reply);
    }
}

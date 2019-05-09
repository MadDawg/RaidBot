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
        args[0] = args[0].toLowerCase();
        const index = raids.findIndex(x => x.name === args[0]);
        if (index > -1){
            return message.reply(`Raid **${args[0]}** already exists.`)
        }

        const raid = new Raid(args[0], args[1], message.author.id, message.guild.id);
        let reply = `Raid **${raid.name}** created!`;

        const player = new Player(message.author.id);
        player.active = raid;
        reply += `\nSwitched active raid to **${raid.name}**.`

        if (args.length < 2){
            date_raw_str = args.splice(0,1);
            date_str = Date(date_raw_str);
            if (date_str == "Invalid Date"){
                reply += `\nInvalid date/time was ignored.`;
            }
            else{ raid.setTime(Date(date_str)); }
        }
        return message.reply(reply);
    }
}

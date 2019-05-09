// time defaults to Asia/Hong_Kong

module.exports = {
    name: 'settime',
    aliases: ['setdate'],
    description: 'Set raid date/time',
    guildOnly: true,
    args: true,
    usage: '<date>',
    admin: false,
    leader: true,

    execute(message, args, raids, players){

        const index = players.findIndex(x => x.uid === message.author.id);

        // player cannot be in a raid if he doesn't exist
        if (index < 0){
            return message.reply("You have not joined any raids.");
        }
        const player = players[index];
        const raid = player.active;

        if (raid == undefined){
            return message.reply("You have not joined any raids.");
        }

        if (raid.leader_uid !== player.uid){
            return message.reply("Only the raid leader can do that.");
        }

        const format = {
            timeZone: "Asia/Hong_Kong",
            hourCycle: "h24",
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
        };

        const date = new Date(args.join(" "));

        try{
            //if (args.length > 1) format.timeZone = args[1];
            //message.channel.send(date.toLocaleString('en-GB', format));
            if (date == "Invalid Date"){
                return message.reply(date);
            }
            raid.date = date;
            message.channel.send(`Date for **${raid.name}** set to ${date}`);
        }
        catch(err) {
            if (err instanceof RangeError){
                message.channel.send(`Invalid or unsupported timezone: ${format.timeZone}`);
                format.timeZone = "Asia/Hong_Kong";
                message.channel.send(date.toLocaleString('en-GB', format));
            }
        }
    }

}

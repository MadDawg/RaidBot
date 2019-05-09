// time defaults to Asia/Hong_Kong

module.exports = {
    name: 'settime',
    aliases: ['setdate'],
    description: 'Set raid time/date',
    guildOnly: true,
    args: true,
    usage: '<date>',
    admin: false,
    leader: true,

    execute(message, args, raids, players){
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
            message.channel.send(date.toLocaleString('en-GB', format));
        }
        catch(err) {
            if (err instanceof RangeError){
                message.channel.send(`Invalid or unsupported timezone: ${format.timeZone}`);
                //format.timeZone = "UTC";
                message.channel.send(date.toLocaleString('en-GB', format));
            }
        }
    }

}

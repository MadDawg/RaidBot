const PlayerFinder = require('../lib/findplayer.js');

module.exports = {
    name: 'date',
    aliases: [],
    description: 'Show date/time',
    guildOnly: false,
    args: false,
    usage: '[timezone]',
    spammy: false,
    admin: false,

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

        const date = new Date();

        try{
            const player = PlayerFinder.findPlayer(message.author.id, players, false);

            if (args != ""){ format.timeZone = args; }
            else if (player){ format.timeZone = player.timeZone; }

            message.channel.send(date.toLocaleString('en-GB', format));
        }
        catch(err) {
            if (err instanceof RangeError){
                message.channel.send(`Invalid or unsupported timezone: **${format.timeZone}**`);
                format.timeZone = "Asia/Hong_Kong";
                message.channel.send(date.toLocaleString('en-GB', format));
            }
        }
    },
}

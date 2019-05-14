const Player = require('../player.js');
const Raid = require('../raid.js');
const PlayerFinder = require('../lib/findplayer.js');


module.exports = {
    name: 'setmytimezone',
    aliases: ['setmytz'],
    description: 'Set the time zone (in IANA format) on your profile',
    guildOnly: true,
    args: true,
    usage: '<tz>',
    admin: false,
    leader: false,

    execute(message, args, raids, players){
        const player = PlayerFinder.findPlayer(message.author.id, players);
        timeZone = args[0];

        const format = {
            timeZone: timeZone,
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

        try{
            const date = new Date();
            localestring = date.toLocaleString('en-GB', format);
            let reply = `your time zone as been set to **${format.timeZone}**`;
            reply += `\n${localestring}`;
            player.setTimeZone(timeZone);
            message.reply(reply);
        }
        catch(err) {
            if (err instanceof RangeError){
                message.reply(`invalid or unsupported timezone: **${format.timeZone}**`);
            }
        }
    }
}

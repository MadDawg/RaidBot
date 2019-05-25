const Discord = require('discord.js');
const PlayerFinder = require('../lib/findplayer.js');

module.exports = {
    name: 'info',
    aliases: ['checkroster', 'roster', 'overview'],
    description: 'Get raid info',
    guildOnly: true,
    args: false,
    usage: '',
    admin: false,
    leader: false,

    async execute(message, args, raids, players){
        const player = PlayerFinder.findPlayer(message.author.id, players);
        if (!player.active){
            return message.reply(`you do not have a raid selected.`);
        }

        const raid = raids.find(x => x.name === player.active.name);
        if (!raid){
            return message.reply(`this raid does not exist.`);
        }

        const format = {
            timeZone: player.timeZone,
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

        let raw_date = "not set";
        let date = raw_date;
        if (raid.date){
            raw_date = raid.date;
            date = raw_date.toLocaleString('en-GB', format);
        }

        let upper_str = "no players";
        let lower_str = upper_str;
        let reserve_str = upper_str;
        for (var i = 0; i < raid.active.length; i++){
            if (raid.active[i].upper){
                upper_str = "";
                const nick = await raid.active[i].getDiscordTag(message);
                upper_str += `${nick}\n`;
            }
            else{
                lower_str = "";
                const nick = await raid.active[i].getDiscordTag(message);
                lower_str += `${nick}}\n`;
            }
        }
        for (var i = 0; i < raid.reserve.length; i++){
            reserve_str = "";
            const nick = await raid.reserve[i].getDiscordTag(message);
            reserve_str += `${nick}\n`;
        }

        const data = {
            title: `Raid overview for \'${raid.name}\'`,
            fields: [
                { name: "Scheduled time", value: date, inline: false },
                { name: "75+ bracket", value: upper_str, inline: false },
                { name: "74- bracket", value: lower_str, inline: false },
                { name: "Players in reserve", value: reserve_str, inline: false },
            ],
        }
        embed = new Discord.RichEmbed(data);
        return message.channel.send(embed);
    }
}

const Discord = require('discord.js');
const Player = require('../player.js');
const Raid = require('../raid.js');
const PlayerFinder = require('../lib/findplayer.js');

module.exports = {
    name: 'profile',
    aliases: [],
    description: 'View player\'s profile',
    guildOnly: true,
    args: false,
    usage: '[name]',
    admin: false,
    leader: false,

    execute(message, args, raids, players){
        let user = message.author;
        // TODO: implement [name]

        const player = PlayerFinder.findPlayer(user.id, players);
        let bracket = "not set"
        // player.upper is a boolean that can be undefined
        if (player.upper){
            bracket = "75+";
        }
        else if (player.upper == false){
            bracket = "75-";
        }

        let myraids = [];
        //myraids = ["myraid (leader)", "yourraid", "herraid", "hisraid"];
        for (var i = 0; i < raids.length; i++){
            if (raids[i].isLeader(user.id)){
                myraids.push(`${raids[i].name} (leader)`);
            }
            else if (raids[i].isMember(player)){
                myraids.push(raids[i].name);
            }
        }
        myraids_str = myraids.join(", ");
        // TODO: make sure this cannot be the name of a raid (or not :P)
        if (myraids_str == "") { myraids_str = "not currently in any raids" };

        data = {
            //title: user.tag,
            author: { name: user.tag, icon: user.displayAvatarURL },
            //thumbnail: { url: user.avatarURL },
            fields: [
                { name: "Discord Nickname", value: user.username, inline: true },
                { name: "Discord ID", value: user.id, inline: true },
                { name: "In-game Name", value: player.name, inline: false },
                { name: "Level Bracket", value: bracket, inline: false },
                { name: "Time Zone (IANA)", value: player.timeZone, inline: false },
                { name: "Raids", value: myraids_str, inline: false },
            ],
        }
        embed = new Discord.RichEmbed(data);
        embed.setColor('BLUE');
        message.channel.send(embed);
    }
}

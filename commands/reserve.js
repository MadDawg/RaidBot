// TODO: clarify usage
/*
* As leader: set player to backup
* As active player: set self to backup
* When joining: join as backup
*/

module.exports = {
    name: 'reserve',
    aliases: ['standby', 'backup'],
    description: 'Join a raid as raid backup player or switch to backup if already in a raid',
    guildOnly: true,
    args: true,
    usage: '<name> <level>',
    admin: false,
    leader: false,

}

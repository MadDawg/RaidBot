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

    execute(message, args, raids, players){}

}

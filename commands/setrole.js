module.exports = {
    name: 'setrole',
    aliases: ['assignrole'],
    description: 'Assign role to be given to player when he or she joins a raid',
    guildOnly: true,
    args: true,
    usage: '<role>',
    admin: true,
    leader: false,

    execute(message, args, raids, players){}
}

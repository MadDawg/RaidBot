// TODO: if argument is not give and there are more than 5 raids,
// switch to interactive mode

module.exports = {
    name: 'switchto',
    aliases: ['switch'],
    description: 'Switch to a specific raid or move along the list of raids you\'ve joined',
    guildOnly: true,
    args: false,
    usage: '[name]',
    admin: false,
    leader: false,

}

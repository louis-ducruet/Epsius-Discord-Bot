module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        if (process.env.DISCORD_RESTRICTED_CHANNELS.indexOf(message.channel.id) && !(message.member.id === '990896605957881897' || message.member.roles.cache.has(process.env.DISCORD_EXCEPTION_RESTRICTED_ROLE))){
            message.delete();
        }
    }
}
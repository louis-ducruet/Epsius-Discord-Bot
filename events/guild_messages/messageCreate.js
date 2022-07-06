module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const secureChannel = process.env.DISCORD_RESTRICTED_CHANNELS.indexOf(message.channel.id) === -1 ? false : true;
        if (secureChannel && !(message.member.id === '990896605957881897' || message.member.roles.cache.has(process.env.DISCORD_EXCEPTION_RESTRICTED_ROLE))){
            message.delete();
        }
    }
}
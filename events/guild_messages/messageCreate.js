module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const secureChannel = process.envVar.discord.secureChannel.indexOf(message.channel.id) === -1 ? false : true;
        if (secureChannel && !(message.member.id === process.envVar.discord.botId || message.member.roles.cache.has(process.envVar.discord.exceptionRole))){
            message.delete();
        }
    }
}
module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const secureChannel = client.env.discord.secureChannel.indexOf(message.channel.id) === -1 ? false : true;
        if (secureChannel && !(message.member.id === '990896605957881897' || message.member.roles.cache.has(client.env.discord.exceptionRole))){
            message.delete();
        }
    }
}
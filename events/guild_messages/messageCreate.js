const logger = require("../../utils/modules/logger");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        // Vérifie que le message à la perm d'être envoyer
        const secureChannel = process.envVar.discord.secureChannel.indexOf(message.channel.id) === -1 ? false : true;
        if (secureChannel && !(message.member.id === process.envVar.discord.botId || message.member.roles.cache.has(process.envVar.discord.exceptionRole))){
            // Supprime le message
            message.delete().then(
                logger.success('Suppression message channel sécurisé', message.member.id, JSON.stringify(message, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
            );
        }
    }
}
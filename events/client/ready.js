const logger = require("../../utils/modules/logger");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        // Log la disponibilité du bot
        logger.info(`${client.user.username} est en ligne !`);
        // Définition du serveur dans lequel les commandes sont ajoutées
        const devGuild = await client.guilds.cache.get(process.envVar.discord.guild);
        // Ajout des commandes au serveur
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
}
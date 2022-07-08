const logger = require("../../utils/modules/logger");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        logger.info(`${client.user.username} est en ligne !`);

        const devGuild = await client.guilds.cache.get(process.envVar.discord.guild);
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
}
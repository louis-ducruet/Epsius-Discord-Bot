const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'purge',
    description: 'Vide le channel de l\'ensemble des messages envoyés',
    async runSlash(client, interaction) {
        // Clone le channel actuel sans les messages
        interaction.channel.clone()
        // Supprime l'ancien
        interaction.channel.delete().then(
            logger.success(`Le channel ${interaction.channel.name} a été purgé`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        )
        // Cloture l'interaction
        interaction.deferReply()
        return interaction.deleteReply()

    }
}
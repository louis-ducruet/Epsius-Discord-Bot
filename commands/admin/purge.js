module.exports = {
    name: 'purge',
    description: 'Vide le channel de l\'ensemble des messages envoyés',
    async runSlash(client, interaction) {
        // Clone le channel actuel sans les messages
        interaction.channel.clone()
        // Supprime l'ancien
        interaction.channel.delete()
        // Cloture l'interaction
        interaction.deferReply()
        return interaction.deleteReply()

    }
}
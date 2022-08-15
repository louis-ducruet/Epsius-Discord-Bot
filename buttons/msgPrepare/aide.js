const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'btn_aide',
    async runInteraction(client, interaction, args){
        const modal = new ModalBuilder()
            .setCustomId('modal_aide')
            .setTitle('Formulaire de demande d\'aide')
        const row = [ new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('titre')
                        .setRequired(true)
                        .setStyle(TextInputStyle.Short)
                        .setLabel('Titre de la demande')
                        .setMinLength(10)
                        .setPlaceholder('Le lien mail /info_prof ne fonctionne pas')
                        .setRequired(true)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('description')
                        .setRequired(true)
                        .setStyle(TextInputStyle.Paragraph)
                        .setLabel('Description de la demande')
                        .setMinLength(40)
                        .setRequired(true)
                )
        ]

        modal.addComponents(row)
            
        // Supprimer la réponse à l'intéraction
        await interaction.showModal(modal);
    }
}
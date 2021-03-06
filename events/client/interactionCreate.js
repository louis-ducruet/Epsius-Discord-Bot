const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        // Si l'intéraction est une commande
        if (interaction.type === InteractionType.ApplicationCommand){
            // Récupération de l'objet
            const cmd = client.commands.get(interaction.commandName);
            // Vérifier que la commande existe
            if (!cmd) return interaction.reply({content: `La commande \`${interaction.commandName}\` n'existe pas !`, ephemeral: true});
            // Exécuter le code de la commande
            await cmd.runSlash(client, interaction);

        } 
        // Si l'intéraction est un bouton
        else if (interaction.isButton()){
            // Récupération des arguments
            const args = interaction.customId.split('_');
            // Récupération de l'objet
            const btn = client.buttons.get(`${args[0]}_${args[1]}`);
            // Vérifier que le bouton existe
            if (!btn) return interaction.reply({content: `Le bouton \`${args[0]}_${args[1]}\` n'existe pas !`, ephemeral: true});
            // Exécuter le code du bouton
            btn.runInteraction(client, interaction, args);
        }
    }
}
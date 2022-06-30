const logger = require("../../utils/modules/logger");

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand()){

            const cmd = client.commands.get(interaction.commandName);

            if (!cmd) return interaction.reply({content: `La commande ${interaction.commandName} n'existe pas !`, ephemeral: true});

            cmd.runSlash(client, interaction);

        } else if (interaction.isButton()){

            const btn = client.buttons.get(interaction.customId);

            if (!btn) return interaction.reply({content: `Le bouton ${interaction.commandName} n'existe pas !`, ephemeral: true});

            btn.runInteraction(client, interaction);
            
        }
    }
}
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand()){

            const cmd = client.commands.get(interaction.commandName);

            if (!cmd) return interaction.reply({content: `La commande \`${interaction.commandName}\` n'existe pas !`, ephemeral: true});

            await cmd.runSlash(client, interaction);

        } else if (interaction.isButton()){

            const args = interaction.customId.split('_');
            const btn = client.buttons.get(`${args[0]}_${args[1]}`);
            
            if (!btn) return interaction.reply({content: `Le bouton \`${args[0]}_${args[1]}\` n'existe pas !`, ephemeral: true});

            btn.runInteraction(client, interaction, args);
        }
    }
}
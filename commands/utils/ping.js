module.exports = {
    name: 'ping',
    description: 'Commande ping!',
    runSlash(client, interaction) {
        interaction.reply({content: 'Pong!', ephemeral: true});
    }
}
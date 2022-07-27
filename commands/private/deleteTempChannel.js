const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'delete_temp_channel',
    description: 'Supprime un salon temporaire.',
    options: [{
        type: ApplicationCommandOptionType.Channel,
        name: 'channel',
        description: 'Channel à supprmier',
        required: true
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const inputChannel = interaction.options.get('channel');
        
        // Vérifier que le channel est supprimable par l'utilisateur
        if (inputChannel.channel.type !== 'GUILD_TEXT' || inputChannel.channel.parentId !== process.envVar.discord.tempGroup) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        // Supprime le channel
        inputChannel.channel.delete(`Channel supprimé avec la commande /delete_temp_channel par ${interaction.user.username}#${interaction.user.discriminator}`);
        // Envoie un message de log dans le channel de la commande
        interaction.reply({ content: `Le channel #${inputChannel.channel.name} a été supprimé avec succès !` });
    }
}
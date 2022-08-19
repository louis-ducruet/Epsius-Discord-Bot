const {ApplicationCommandOptionType, ChannelType} = require('discord.js');
const logger = require('../../utils/modules/logger');

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
        if (inputChannel.channel.type !== ChannelType.GuildText || inputChannel.channel.parentId !== process.envVar.discord.tempGroup) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        // Supprime le channel
        inputChannel.channel.delete(`Channel supprimé avec la commande /delete_temp_channel par ${interaction.user.username}#${interaction.user.discriminator}`).then(
            logger.success(`Le channel #${inputChannel.channel.name} a été supprimé avec succès !`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        );
        // Envoie un message de log dans le channel de la commande
        interaction.reply({ content: `Le channel #${inputChannel.channel.name} a été supprimé avec succès !` });
    }
}
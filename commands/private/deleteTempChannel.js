module.exports = {
    name: 'delete_temp_channel',
    description: 'Supprime un salon temporaire.',
    options: [{
        type: 'CHANNEL',
        name: 'channel',
        description: 'Channel à supprmier',
        required: true
    }],
    async runSlash(client, interaction) {
        const inputChannel = interaction.options.get('channel');
        if (inputChannel.channel.type !== 'GUILD_TEXT' || inputChannel.channel.parentId !== '993875082038476800') return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        inputChannel.channel.delete(`Channel supprimé avec la commande /delete_temp_channel par ${interaction.user.username}#${interaction.user.discriminator}`);
        interaction.reply({ content: `Le channel #${inputChannel.channel.name} a été supprimé avec succès !` })
    }
}
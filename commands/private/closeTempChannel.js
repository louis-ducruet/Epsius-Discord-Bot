module.exports = {
    name: 'close_temp_channel',
    description: 'Ferme un salon temporaire (Passe en lecture seule).',
    options: [{
        type: 'CHANNEL',
        name: 'channel',
        description: 'Channel à fermer',
        required: true
    }],
    async runSlash(client, interaction) {
        const inputChannel = interaction.options.get('channel');
        if (inputChannel.channel.type !== 'GUILD_TEXT' || inputChannel.channel.parentId !== '993875082038476800') return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        inputChannel.channel.permissionOverwrites.edit('991311405951234208', { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
        inputChannel.channel.permissionOverwrites.edit('991311841840083054', { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
        inputChannel.channel.permissionOverwrites.edit('991310981324091472', { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
        inputChannel.channel.permissionOverwrites.edit('991312987421941760', { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
        inputChannel.channel.permissionOverwrites.edit('991312503336337451', { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
        inputChannel.channel.permissionOverwrites.edit('991312255629135943', { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
        inputChannel.channel.send(`Le channel vient d'être cloturé par ${interaction.user}`);
        interaction.reply({ content: `Le channel ${inputChannel.channel} a été fermé avec succès !` })
    }
}
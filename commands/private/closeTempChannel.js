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
        if (inputChannel.channel.type !== 'GUILD_TEXT' || inputChannel.channel.parentId !== process.envVar.discord.tempGroup) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        process.envVar.classes.forEach(classe => {
            classe.adminsRole.forEach(admin => {
                inputChannel.channel.permissionOverwrites.edit(admin, { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
            });
            classe.groupesRole.forEach(groupe => {
                inputChannel.channel.permissionOverwrites.edit(groupe, { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
            });
        });
        inputChannel.channel.send(`Le channel vient d'être cloturé par ${interaction.user}`);
        interaction.reply({ content: `Le channel ${inputChannel.channel} a été fermé avec succès !` })
    }
}
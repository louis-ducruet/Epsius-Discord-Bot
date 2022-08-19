const {ApplicationCommandOptionType, ChannelType} = require('discord.js');
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'close_temp_channel',
    description: 'Ferme un salon temporaire (Passe en lecture seule).',
    options: [{
        type: ApplicationCommandOptionType.Channel,
        name: 'channel',
        description: 'Channel à fermer',
        required: true
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const inputChannel = interaction.options.get('channel');
        
        // Vérifier que le channel est fermable par l'utilisateur
        if (inputChannel.channel.type !== ChannelType.GuildText || inputChannel.channel.parentId !== process.envVar.discord.tempGroup) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        // Retire les permissions d'écriture sur le channel
        process.envVar.classes.forEach(classe => {
            classe.adminsRole.forEach(admin => {
                inputChannel.channel.permissionOverwrites.edit(admin, { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
            });
            classe.groupesRole.forEach(groupe => {
                inputChannel.channel.permissionOverwrites.edit(groupe, { SEND_MESSAGES: false, MANAGE_MESSAGES: false, ADD_REACTIONS: false });
            });
        });
        // Envoie un message dans le channel pour informer sa cloture
        inputChannel.channel.send(`Le channel vient d'être cloturé par ${interaction.user}`).then(
            logger.success(`Le channel ${inputChannel.channel.name} a été fermé avec succès !`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        );
        // Envoie un réponse dans la channel de la commande
        interaction.reply({ content: `Le channel ${inputChannel.channel} a été fermé avec succès !` })
    }
}
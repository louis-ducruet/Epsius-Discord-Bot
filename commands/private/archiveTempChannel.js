const {ApplicationCommandOptionType, ChannelType, PermissionFlagsBits} = require('discord.js');
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'archive_temp_channel',
    description: 'Archive un salon temporaire (Passe en lecture seule).',
    options: [{
        type: ApplicationCommandOptionType.Channel,
        name: 'channel',
        description: 'Channel à archiver',
        required: true
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const inputChannel = interaction.options.get('channel');
        // Récupère les permissions du channel
        const perms = inputChannel.channel.permissionOverwrites.cache

        // Vérifier que le channel est fermable par l'utilisateur
        if (inputChannel.channel.type !== ChannelType.GuildText || inputChannel.channel.parentId !== process.envVar.discord.tempGroup) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        
        // Déplace le channel dans le catégorie Archive
        inputChannel.channel.setParent(process.envVar.discord.archiveGroupe);
        // Modifie les permissions du channel
        let permission = [{ id: process.envVar.discord.everyoneRole, deny: [PermissionFlagsBits.ViewChannel] }];
        perms.map( perm => {
            if (perm.id !== process.envVar.discord.everyoneRole){
                permission.push({id: perm.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [PermissionFlagsBits.AddReactions, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.SendMessages]});
            }
        });
        inputChannel.channel.permissionOverwrites.set(permission);
        // Envoie un message dans le channel pour informer sa cloture
        inputChannel.channel.send(`Le channel vient d'être archivé par ${interaction.user}`).then(
            logger.success(`Le channel ${inputChannel.channel.name} a été archivé avec succès !`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        );
        // Envoie un réponse dans la channel de la commande
        interaction.reply({ content: `Le channel ${inputChannel.channel} a été fermé avec succès !` })
    }
}
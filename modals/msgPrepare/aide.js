const { EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'modal_aide',
    async runInteraction(client, interaction){
        // Récupération des variables
        const titre = interaction.fields.getTextInputValue('titre')
        const description = interaction.fields.getTextInputValue('description')
        // Mise en page du message
        const embed = new EmbedBuilder()
            .setTitle(titre)
            .setDescription(description)
            .setColor('#1ecc5d')
            .setThumbnail('https://cdn.icon-icons.com/icons2/2263/PNG/512/support_call_center_help_information_customer_service_icon_140371.png')
            .setTimestamp()
            .setAuthor({name: interaction.member.displayName, iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.id}/${interaction.member.avatar ? interaction.member.avatar : interaction.member.user.avatar}.png`})
        // Création du channel
        interaction.guild.channels.create({ 
                name: `${interaction.member.displayName}-${Date.now()}`,
                type: ChannelType.GuildText, 
                reason: `Channel créé avec un ticket par ${interaction.user.username}#${interaction.user.discriminator}`,
                parent: process.envVar.discord.aideGroup,
                permissionOverwrites: [
                    { id: process.envVar.discord.everyoneRole, deny: [PermissionFlagsBits.ViewChannel] }, 
                    { id: interaction.member.id, allow: [PermissionFlagsBits.ViewChannel] }
                ]
            }).then(channel => {
                // Envoie un message dans le channel nouvellement créé
                channel.send({embeds: [embed]});
                logger.success(`Le channel ${channel.name} a été créé avec succès !`, interaction.user.id, JSON.stringify(channel, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
                // Envoie un message dans le channel de la modal
                interaction.reply({ content: `Le channel ${channel} a été créé avec succès !`, ephemeral: true });
            });
    }
}
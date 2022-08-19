const { EmbedBuilder } = require("discord.js");
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'ping',
    description: 'Information sur la latence de l\'API et du BOT.',
    async runSlash(client, interaction) {
        // Envoie un message temporaire pour évaluer la latence du bot
        const tryPong = await interaction.reply({ content: 'Chargement des données ...', ephemeral: true, fetchReply: true});

        // Définition du contenu du message avec mise en page
        const embed = new EmbedBuilder()
            .setTitle('ℹ Info sur le bot')
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('#3a86c0')
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Latence BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true },
                { name: 'BOT Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false },
                { name: 'OS Serveur', value: `\`\`\`${process.platform} ${process.arch}\`\`\``, inline: true },
                { name: 'IP BOT', value: `\`\`\`${process.env.SERVER_IP}:${process.env.SERVER_PORT}\`\`\``, inline: true },
                { name: 'Localisation', value: `\`\`\`${process.env.P_SERVER_LOCATION}\`\`\``, inline:true },
                { name: 'Varsion Node', value: `\`\`\`${process.version}\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            });

        // Envoyer le message de réponse
        interaction.editReply({ content: null, embeds: [embed] }).then(
            logger.success('Message d\'information serveur', interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        );
    }
}
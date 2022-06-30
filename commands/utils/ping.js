const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Commande ping!',
    async runSlash(client, interaction) {
        const tryPong = await interaction.reply({ content: 'Chargement des données ...', ephemeral: true, fetchReply: true});
        const tryPongTimestamp = new Date(tryPong.timestamp).getTime();
        const embed = new MessageEmbed()
            .setTitle('ℹ Info sur le bot')
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('#3a86c0')
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Latence BOT', value: `\`\`\`${tryPongTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true },
                { name: 'BOT Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false }
            )
            .setTimestamp()
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            });

        interaction.editReply({ content: null, embeds: [embed] });
    }
}
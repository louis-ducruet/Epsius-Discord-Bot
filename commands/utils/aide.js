const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'aide',
    description: 'Envoie une demande d\'aide',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'titre',
        description: 'Le titre de votre demande',
        required: true
    },
    {
        type: ApplicationCommandOptionType.String,
        name: 'message',
        description: 'Le message de votre demande',
        required: true
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const titre = interaction.options.getString('titre');
        const message = interaction.options.getString('message');
        // Génération du message mis en page
        const embed = new EmbedBuilder()
            .setTitle(titre)
            .setDescription(message)
            .setColor('#1ecc5d')
            .setThumbnail('https://cdn.icon-icons.com/icons2/2263/PNG/512/support_call_center_help_information_customer_service_icon_140371.png')
            .setTimestamp()
            .setAuthor({name: interaction.member.displayName, iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.id}/${interaction.member.avatar ? interaction.member.avatar : interaction.member.user.avatar}.png`})
        // Envoie le message
        interaction.reply({ embeds: [embed], fetchReply : true}).then( (msg) => {
            // Création du thread
            msg.startThread({
                name: `${interaction.member.displayName} ${titre}`,
                autoArchiveDuration: 60,
                rateLimitPerUser: 60
            })
        })
    }
}
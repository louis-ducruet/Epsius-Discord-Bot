const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'info_prof',
    description: 'Envoie un message avec les informations sur un prof.',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'nom',
        description: 'Le nom de l\'intervenant',
        required: true
    },
    {
        type: ApplicationCommandOptionType.String,
        name: 'modules',
        description: 'Les modules de l\'intervenant',
        required: true
    },
    {
        type: ApplicationCommandOptionType.String,
        name: 'email',
        description: 'L\'email de l\'intervenant'
    },
    {
        type: ApplicationCommandOptionType.User,
        name: 'discord',
        description: 'Le discord de l\'intervenant (User ID)'
    },
    {
        type: ApplicationCommandOptionType.String,
        name: 'autre',
        description: 'Information complémentaire comme une autre adresse email'
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const inputNom = interaction.options.getString('nom');
        const inputModules = interaction.options.getString('modules');
        let inputEmail = interaction.options.getString('email');
        let inputDiscord = interaction.options.getUser('discord');
        const inputAutre = interaction.options.getString('autre');
        // Vérifier si l'email est correct
        if (!RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$').test(inputEmail)) inputEmail = null;
        // Vérifie que l'email ou le discord est présent
        if (!inputDiscord && !inputEmail) return interaction.reply({ 
            content: ':x: **Commande invalide** : Il faut au moins l\'email ou le discord valide', 
            ephemeral: true 
        });
        // Génération du message mis en page
        const embed = new EmbedBuilder()
            .setTitle(inputNom)
            .setDescription(`${inputModules}\n‎`)
            .setThumbnail('https://cdn.icon-icons.com/icons2/3142/PNG/512/id_card_identity_name_identification_icon_192543.png')
            .setColor('#3498db')
            .addFields(
                { name: 'Email', value: inputEmail ? inputEmail : '???', inline: true },
                { name: 'Discord', value: inputDiscord ? `${inputDiscord}\n${inputDiscord.username}#${inputDiscord.discriminator}` : '???', inline: true }
            )
        // Ajoute le champ autre s'il est sélectionné
        if (inputAutre){
            embed.addFields({name: 'Autre', value: inputAutre, inline: false});
        }
        // Ajout du bouton d'email
        let buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji({ name: '📧'})
                    .setLabel('Envoyer un e-mail')
                    .setURL(`https://epsius-discord-bot.netlify.app/mailto/#${inputEmail}`)
            );
        // Vérifie que l'email est renseigné
        if (inputEmail){
            // Envoie le message
            interaction.reply({ embeds: [embed], components: [buttons] });
        }
        // Si l'email n'est pas renseigné
        else{
            // Envoie le message
            interaction.reply({ embeds: [embed] });
        }
    }
}
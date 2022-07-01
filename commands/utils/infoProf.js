const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'info_prof',
    description: 'Envoie un message avec les informations sur un prof.',
    options: [{
        type: 'STRING',
        name: 'nom',
        description: 'Le nom de l\'intervenant',
        required: true
    },
    {
        type: 'STRING',
        name: 'modules',
        description: 'Les modules de l\'intervenant',
        required: true
    },
    {
        type: 'STRING',
        name: 'email',
        description: 'L\'email de l\'intervenant'
    },
    {
        type: 'STRING',
        name: 'discord',
        description: 'Le discord de l\'intervenant (User ID)'
    }],
    async runSlash(client, interaction) {
        const inputNom = interaction.options.getString('nom');
        const inputModules = interaction.options.getString('modules');
        let inputEmail = interaction.options.getString('email');
        let inputDiscord = interaction.options.getString('discord');

        if (!RegExp('^[0-9]{18}$').test(inputDiscord)) inputDiscord = null;
        if (!RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$').test(inputEmail)) inputEmail = null;
        let profUser = await client.users.fetch(inputDiscord)
            .then((res) => {
                return res
            })
            .catch(() => {
                inputDiscord = null;
                return null
            });
        if (!inputDiscord && !inputEmail) return interaction.reply({ 
            content: ':x: **Commande invalide** : Il faut au moins l\'email ou le discord valide', 
            ephemeral: true 
        });

        const embed = new MessageEmbed()
            .setTitle(inputNom)
            .setDescription(`${inputModules}\n\n***La première ligne du compte discord fonctionne uniquement si vous avez un serveur en commun !***`)
            .setThumbnail('https://cdn.icon-icons.com/icons2/3142/PNG/512/id_card_identity_name_identification_icon_192543.png')
            .setColor('#3498db')
            .addFields(
                { name: 'Email', value: inputEmail ? inputEmail : '???', inline: true },
                { name: 'Discord', value: inputDiscord ? `${profUser}\n${profUser.username}#${profUser.discriminator}` : '???', inline: true }
            )

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setEmoji({id: null, name: '📧'})
                    .setLabel('Envoyer un e-mail')
                    .setURL(`https://epsius-bot-action.netlify.app?token=2Sy8eL9b27sx67Am4UCHRb&url=mailto:${inputEmail}`)
            );
        
        interaction.reply({ embeds: [embed], components: [buttons] });
    }
}
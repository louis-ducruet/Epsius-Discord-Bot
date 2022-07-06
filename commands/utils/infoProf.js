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
    },
    {
        type: 'STRING',
        name: 'autre',
        description: 'Information complémentaire comme une autre adresse email'
    }],
    async runSlash(client, interaction) {
        const inputNom = interaction.options.getString('nom');
        const inputModules = interaction.options.getString('modules');
        let inputEmail = interaction.options.getString('email');
        let inputDiscord = interaction.options.getString('discord');
        const inputAutre = interaction.options.getString('autre');

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
            .setDescription(`${inputModules}\n‎`)
            .setThumbnail('https://cdn.icon-icons.com/icons2/3142/PNG/512/id_card_identity_name_identification_icon_192543.png')
            .setColor('#3498db')
            .addFields(
                { name: 'Email', value: inputEmail ? inputEmail : '???', inline: true },
                { name: 'Discord', value: inputDiscord ? `${profUser}\n${profUser.username}#${profUser.discriminator}` : '???', inline: true }
            )
        
        if (inputAutre){
            embed.addField('Autre', inputAutre, false);
        }

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setEmoji({id: null, name: '📧'})
                    .setLabel('Envoyer un e-mail')
                    .setURL(`https://epsius-discord-bot.netlify.app/mailto/#${inputEmail}`)
            );
        
        interaction.reply({ embeds: [embed], components: [buttons] });
    }
}
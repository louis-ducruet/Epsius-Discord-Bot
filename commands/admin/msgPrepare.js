const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'message_prepare',
    description: 'Envoie un message préparé par le bot pour un certain contexte.',
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'give_role',
            description: 'Affiche le message d\'attribution de classe'
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'aide',
            description: 'Affiche le message de support'
        }
    ],
    async runSlash(client, interaction) {
        // Définition du contenu du message avec mise en page
        let embed = new EmbedBuilder()
            .setColor('#d8a824')
            .setThumbnail('https://cdn.icon-icons.com/icons2/2774/PNG/512/team_people_icon_176892.png')

        // Récupération des boutons
        let boutons = [];

        switch (interaction.options._subcommand) {
            case 'give_role':
                embed.setTitle(':school_satchel: Accéder à son groupe')
                    .setDescription(process.envVar.msg.giveRoleDescription)

                for (let i = 0; i < process.envVar.classes.length; i++) {
                    // Pour chaque classe faire une nouvelle ligne
                    boutons.push(new ActionRowBuilder());
                    for (let j = 0; j < process.envVar.classes[i].groupesRole.length; j++) {
                        // Pour chaque groupe faire un bouton simple et un avec l'option
                        boutons[i].addComponents(
                            new ButtonBuilder()
                                .setStyle((j+i)%2 == 0 ? ButtonStyle.Primary : ButtonStyle.Success)
                                .setLabel(`${process.envVar.classes[i].nom} G${j + 1}`)
                                .setCustomId(`btn_giverole_${i}_${j}_0`),
                                
                            new ButtonBuilder()
                                .setStyle((j+i)%2 == 0 ? ButtonStyle.Secondary : ButtonStyle.Danger)
                                .setLabel(`${process.envVar.classes[i].nom} G${j + 1} + ${process.envVar.classes[i].nomOption}`)
                                .setCustomId(`btn_giverole_${i}_${j}_1`)
                        );
                    }
                }
                break;
        
            case 'aide':
                embed.setTitle(':helmet_with_cross:  Besoin d\'aide ? C\'est par ici !') 
                    .setDescription(process.envVar.msg.aideDescription)
                boutons = [new ActionRowBuilder()]
                boutons[0].addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Success)
                        .setEmoji({ name: '☎' })
                        .setLabel('Créer un ticket')
                        .setCustomId(`btn_aide`)
                )
                break;

            default:
                embed.setTitle('Cette action n\'existe pas')
                break;
        }

        // Envoyer le message de réponse
        interaction.reply({ embeds: [embed], components: boutons, fetchReply: true }).then(
            logger(`Affichage du message préparer ${interaction.options._subcommand}`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        );
    }
}
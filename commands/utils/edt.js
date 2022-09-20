const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ButtonStyle } = require("discord.js");
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'edt',
    description: 'Permet d\'acceder l\'agenda',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'login',
        description: 'Ce qu\'il y a avant @epsi.fr dans votre adresse email',
        required: true
    },
    {
        type: ApplicationCommandOptionType.String,
        name: 'date',
        description: 'Au format YYYY-MM-DD. Exemple : 2022-12-25',
        required: true
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const inputLogin = interaction.options.getString('login');
        const inputDate = interaction.options.getString('date');
        interaction.deferReply({ ephemeral: true });
        // Récupère les données de l'emploi du temps
        fetch(`https://edt-epsi-api-l4utkvvwt-unpseudocomplique.vercel.app/edt/${inputLogin}/${inputDate}`)
            .then((response) => {
                // Convertie le fichier en objet
                return response.json();
            })
            .then((data) => {
                // Si une erreur se produit
                if (typeof data.statusCode !== 'undefined') {
                    // Envoyer un message d'erreur
                    interaction.editReply({ content: `Une erreur est survenue lors du chargement. Merci de vérifier les paramètres.` });
                    logger.debug(`N'arrive pas à voir l'agenda de ${inputLogin} pour le ${inputDate}.`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
                }else {
                    // Sinon construire une embed
                    const embed = new EmbedBuilder()
                        .setTitle('<:epsi:1020247725108908032> Emploi du temps <:wis:1020247723846422578>')
                        .setDescription(`De \`${inputLogin}\` pour le \`${inputDate}\``)
                        .setColor('#00a5d9')
                        .setURL(`https://edtmobiliteng.wigorservices.net//WebPsDyn.aspx?action=posEDTBEECOME&serverid=C&Tel=${inputLogin}&date=${inputDate.substr(5, 2)}/${inputDate.substr(8, 2)}/${inputDate.substr(0, 4)}`)
                        .setThumbnail('https://cdn.icon-icons.com/icons2/317/PNG/512/calendar-clock-icon_34472.png')
                        .setTimestamp();
                    // Pour chaque cours ajouter un champ
                    data.forEach(lesson => {
                        embed.addFields( { name: `${lesson.startHour} - ${lesson.endHour} : ${lesson.name}`, value: `:teacher: : ${lesson.teacher}\n:school: : ${lesson.room}`} )
                    });
                    // Envoyer le message contenant l'embed
                    interaction.editReply({ embeds: [embed] });
                    logger.success(`Regarde l'agenda de ${inputLogin} pour le ${inputDate}.`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
                }
            });
    }
}
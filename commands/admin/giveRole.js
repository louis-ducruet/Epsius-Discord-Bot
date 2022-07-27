const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'give_role',
    description: 'Affiche les boutons pour choisir sa classe.',
    async runSlash(client, interaction) {
        // Définition du contenu du message avec mise en page
        const embed = new EmbedBuilder()
            .setTitle(':school_satchel: Accéder à son groupe')
            .setDescription(process.envVar.msg.giveRoleDescription)
            .setColor('#d8a824')
            .setThumbnail('https://cdn.icon-icons.com/icons2/2774/PNG/512/team_people_icon_176892.png')

        // Récupération des boutons
        const boutons = [];
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

        // Envoyer le message de réponse
        interaction.reply({ embeds: [embed], components: boutons, fetchReply: true });
    }
}
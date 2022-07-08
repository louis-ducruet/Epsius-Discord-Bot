const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'give_role',
    description: 'Affiche les boutons pour choisir sa classe.',
    async runSlash(client, interaction) {
        const embed = new MessageEmbed()
            .setTitle(':school_satchel: Accéder à son groupe')
            .setDescription(process.envVar.msg.giveRoleDescription)
            .setColor('#d8a824')
            .setThumbnail('https://cdn.icon-icons.com/icons2/2774/PNG/512/team_people_icon_176892.png')

        const boutons = [];
        for (let i = 0; i < process.envVar.classes.length; i++) {
            boutons.push(new MessageActionRow());
            for (let j = 0; j < process.envVar.classes[i].groupesRole.length; j++) {
                boutons[i].addComponents(
                    new MessageButton()
                        .setStyle((j+i)%2 == 0 ? 'PRIMARY' : 'SUCCESS')
                        .setLabel(`${process.envVar.classes[i].nom} G${j + 1}`)
                        .setCustomId(`btn_giverole_${i}_${j}_0`),
                    new MessageButton()
                        .setStyle((j+i)%2 == 0 ? 'SECONDARY' : 'DANGER')
                        .setLabel(`${process.envVar.classes[i].nom} G${j + 1} + ${process.envVar.classes[i].nomOption}`)
                        .setCustomId(`btn_giverole_${i}_${j}_1`)
                );
            }
        }
        interaction.reply({ embeds: [embed], components: boutons, fetchReply: true });
    }
}
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'give_role',
    description: 'Affiche les boutons pour choisir sa classe.',
    async runSlash(client, interaction) {
        const embed = new MessageEmbed()
            .setTitle(':school_satchel: Accéder à son groupe')
            .setDescription(process.env.GIVE_ROLE_DESCRIPTION)
            .setColor('#d8a824')
            .setThumbnail('https://cdn.icon-icons.com/icons2/2774/PNG/512/team_people_icon_176892.png')

        const pns1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('SUCCESS')
                    .setLabel('PSN1 G1')
                    .setCustomId('btn_give_role_sn1g1'),

                new MessageButton()
                    .setStyle('DANGER')
                    .setLabel('PSN1 G1 + BTS')
                    .setCustomId('btn_give_role_sn1g1_bts')
            );
        
        const psn2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setLabel('PSN2 G1')
                    .setCustomId('btn_give_role_sn2g1'),

                new MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel('PSN2 G1 + BTS')
                    .setCustomId('btn_give_role_sn2g1_bts'),

                new MessageButton()
                    .setStyle('SUCCESS')
                    .setLabel('PSN2 G2')
                    .setCustomId('btn_give_role_sn2g2'),

                new MessageButton()
                    .setStyle('DANGER')
                    .setLabel('PSN2 G2 + BTS')
                    .setCustomId('btn_give_role_sn2g2_bts')
            );
        
        interaction.reply({ embeds: [embed], components: [pns1, psn2], fetchReply: true });
    }
}
module.exports = {
    name: 'btn_give_role_sn2g2_bts',
    async runInteraction(client, interaction){
        await interaction.guild.roles.fetch();
        let roleClasse = interaction.guild.roles.cache.find(role => role.name === 'PSN2_groupe2');
        let roleBts = interaction.guild.roles.cache.find(role => role.name === 'PSN2_BTS');
        interaction.member.roles.add(roleClasse);
        interaction.member.roles.add(roleBts);
        interaction.deferReply()
        return interaction.deleteReply();
    }
}
module.exports = {
    name: 'btn_give_role_sn1g1_bts',
    async runInteraction(client, interaction){
        await interaction.guild.roles.fetch();
        let roleClasse = interaction.guild.roles.cache.find(role => role.name === 'PSN1');
        let roleBts = interaction.guild.roles.cache.find(role => role.name === 'PSN1_BTS');
        interaction.member.roles.add(roleClasse);
        interaction.member.roles.add(roleBts);
        interaction.deferReply()
        return interaction.deleteReply();
    }
}
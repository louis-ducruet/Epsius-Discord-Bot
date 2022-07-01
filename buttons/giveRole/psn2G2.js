module.exports = {
    name: 'btn_give_role_sn2g2',
    async runInteraction(client, interaction){
        await interaction.guild.roles.fetch();
        let roleClasse = interaction.guild.roles.cache.find(role => role.name === 'PSN2_groupe2');
        interaction.member.roles.add(roleClasse);
        interaction.deferReply()
        return interaction.deleteReply();
    }
}
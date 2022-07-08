module.exports = {
    name: 'btn_giverole',
    async runInteraction(client, interaction, args){
        let roles = [
            await interaction.guild.roles.fetch(process.envVar.classes[args[2]].groupesRole[args[3]])
        ];
        if (args[4] === '1') roles.push(await interaction.guild.roles.fetch(process.envVar.classes[args[2]].optionRole));
        
        interaction.member.roles.add(roles);

        interaction.deferReply()
        return interaction.deleteReply();
    }
}
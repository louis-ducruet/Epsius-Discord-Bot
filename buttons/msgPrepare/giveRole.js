const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'btn_giverole',
    async runInteraction(client, interaction, args){
        // Récupération des roles à ajouter
        let roles = [
            await interaction.guild.roles.fetch(process.envVar.classes[args[2]].groupesRole[args[3]])
        ];
        if (args[4] === '1') roles.push(await interaction.guild.roles.fetch(process.envVar.classes[args[2]].optionRole));
        
        // Ajout des roles à l'utilisateur
        interaction.member.roles.add(roles).then( () => {
            logger.success(`Ajout des roles à ${interaction.member.id}.`, interaction.user.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        });

        // Supprimer la réponse à l'intéraction
        interaction.deferReply()
        return interaction.deleteReply();
    }
}
const { ApplicationCommandType } = require("discord.js");
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'Warn Pseudo',
    type: ApplicationCommandType.User,
    description: '',
    async runSlash(client, interaction) {
        const targetUser = await interaction.member.guild.members.fetch(interaction.targetId);
        targetUser.send(`
Bonjour ${targetUser.user.username},
Votre pseudo (**${targetUser.nickname ? targetUser.nickname : targetUser.user.username}**) ne respecte pas les règles du serveur ***${targetUser.guild.name}*** :
- **Votre prénom doit être __contenu__ dans votre pseudo**
Cette règle a pour objectif de permettre à tous de facilement pouvoir communiquer avec une personne.
Merci de modifier **au plus vite** votre pseudo
Epsius`
        ).then(
            logger.success(`Demande de modification de pseudo envoyé (${targetUser.nickname ? targetUser.nickname : targetUser.user.username})`, targetUser.user.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        )
        .catch( err => {
            logger.error(`Demande de modification de pseudo non envoyé (${targetUser.nickname ? targetUser.nickname : targetUser.user.username})`, targetUser.user.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false);
            targetUser.setNickname('Prénom dans pseudo!');
        })
    }
}
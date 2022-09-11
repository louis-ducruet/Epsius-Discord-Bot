const { ApplicationCommandType } = require("discord.js");
const logger = require('../../utils/modules/logger');

module.exports = {
    name: 'Warn Pseudo',
    type: ApplicationCommandType.User,
    description: '',
    async runSlash(client, interaction) {
        const targetUser = await interaction.member.guild.members.fetch(interaction.targetId);
        targetUser.send(`
Bonjour ${targetUser.user},

Votre pseudo (**\`${targetUser.nickname ? targetUser.nickname : targetUser.user.username}\`**) ne respecte pas les règles du serveur ***${interaction.member.guild.name}*** :
__Raison :__ La principale raison de signalement est l'absence de prénom dans le pseudo mais d'autres manquements au règlement peuvent en être le cause.
__Pour rappel :__ **Votre prénom doit être __contenu__ dans votre pseudo**.

Cette règle a pour objectif de permettre à tous de facilement pouvoir communiquer avec une personne notamment pour les nouveaux.
Pour information l'ensemble des règles du serveur à ce sujet se situe dans le salon **#:scroll:règles** (catégorie : :clown: Règles sur les pseudonymes et l'avatar :clown:)

Merci de modifier **au plus vite** votre pseudo
[Modération]: Epsius
        `).then(
            logger.success(`Demande de modification de pseudo envoyé (${targetUser.nickname ? targetUser.nickname : targetUser.user.username})`, targetUser.user.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
        )
        .catch( err => {
            logger.error(`Demande de modification de pseudo non envoyé (${targetUser.nickname ? targetUser.nickname : targetUser.user.username})`, targetUser.user.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false);
            targetUser.setNickname('Prénom dans pseudo!');
        });
        // Cloture l'interaction
        client.channels.cache.get(process.envVar.discord.logChannel).send(`
${interaction.user} a warn le pseudo de ${targetUser.user}
\`\`\`
${targetUser.nickname ? targetUser.nickname : targetUser.user.username}
\`\`\`
__Règle :__ Ne respecte pas les règles concernant le pseudonyme. - __Sanction :__ Rappel des règles - __Date :__ <t:${parseInt(Date.now() / 1000)}:f>
        `);
        interaction.reply({ content: 'Le signalement a été pris en compte', ephemeral: true})
    }
}
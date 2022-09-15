const {ApplicationCommandOptionType, ChannelType, PermissionFlagsBits} = require('discord.js');
const logger = require('../../utils/modules/logger');

// Génération des options de la commande en fonction des classes
const choices = [{ name: 'Tous', value: 0 }];
for (let i = 0; i < process.envVar.classes.length; i++) {
    // Pour chaque classe ajouter une option qui regroupe l'ensemble des groupes
    choices.push({ name: process.envVar.classes[i].nom, value: (i + 1) * 10 });
    // Et une qui regroupe les personnes d'une même classe avec l'option
    choices.push({ name: `${process.envVar.classes[i].nom} ${process.envVar.classes[i].nomOption}`, value: -((i + 1) * 10) });
    for (let j = 0; j < process.envVar.classes[i].groupesRole.length; j++) {
        // Pour chaque groupe faire une option qui le regroupe
        choices.push({ name: `${process.envVar.classes[i].nom} Groupe ${j + 1}`, value: ((i + 1) * 10) + j + 1 });
    }
}

module.exports = {
    name: 'add_temp_channel',
    description: 'Créer un salon temporaire pour des discussions sur un module.',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'nom',
        description: 'Le nom du channel',
        required: true
    },
    {
        type: ApplicationCommandOptionType.Integer,
        name: 'groupe',
        description: 'Le groupe qui peut voir le channel',
        required: true,
        choices: choices
    }],
    async runSlash(client, interaction) {
        // Récupération des données saisies
        const inputNom = interaction.options.getString('nom');
        const inputGroupe = interaction.options.getInteger('groupe');

        // Définition des permissions du channel temporaire
        let permission = [{ id: process.envVar.discord.everyoneRole, deny: [PermissionFlagsBits.ViewChannel] }];
        // Si le channel est pour un groupe d'une classe
        if (Math.floor(inputGroupe/10) !== 0 && inputGroupe%10 !== 0){
            if (!interaction.member.roles.cache.has(process.envVar.classes[Math.floor(inputGroupe/10) - 1].adminsRole[inputGroupe%10 - 1])) {
                logger.debug(`Vous n'avez pas la permission de faire cette action !`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
                return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
            }
            
            permission.push({ id: process.envVar.classes[Math.floor(inputGroupe/10) - 1].groupesRole[inputGroupe%10 - 1], allow: [PermissionFlagsBits.ViewChannel] });
        }
        // Si le channel est pour une classe
        else if (inputGroupe !== 0){
            // Vérification des permissions de l'utilisateur
            let auth = 0;
            for (let i = 0; i < process.envVar.classes[Math.floor(Math.abs(inputGroupe)/10) - 1].adminsRole.length; i++) {
                if (interaction.member.roles.cache.has(process.envVar.classes[Math.floor(Math.abs(inputGroupe)/10) - 1].adminsRole[i])) auth += 1;
                if (inputGroupe < 0){
                    permission.push({ id: process.envVar.classes[Math.floor(Math.abs(inputGroupe)/10) - 1].optionRole, allow: [PermissionFlagsBits.ViewChannel] });
                }else{
                    permission.push({ id: process.envVar.classes[Math.floor(inputGroupe/10) - 1].groupesRole[i], allow: [PermissionFlagsBits.ViewChannel] });
                }
            }
            // Si les perms sont insufisante afficher un message d'erreur
            if (auth === 0) {
                logger.debug(`Vous n'avez pas la permission de faire cette action !`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false)
                return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
            }
        }
        // Si le channel est pour toutes les classes
        else{
            for (let i = 0; i < process.envVar.classes.length; i++) {
                for (let j = 0; j < process.envVar.classes[i].groupesRole.length; j++) {
                    permission.push({ id: process.envVar.classes[i].groupesRole[j], allow: [PermissionFlagsBits.ViewChannel] });
                }
            }
        }
        // Création du channel temporaire
        interaction.guild.channels.create({ 
            name: inputNom,
            type: ChannelType.GuildText, 
            reason: `Channel créé avec la commande /add_temp_channel par ${interaction.user.username}#${interaction.user.discriminator}`,
            parent: process.envVar.discord.tempGroup,
            permissionOverwrites: permission
        }).then(channel => {
            // Envoie un message dans le channel nouvellement créé
            channel.send(`Bienvenue dans le channel temporaire ${inputNom} créé par ${interaction.user}!`);
            logger.success(`Le channel ${channel.name} a été créé avec succès !`, interaction.member.id, JSON.stringify(interaction, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value), false);
            // Envoie un message dans le channel de la commande
            interaction.reply(`Le channel ${channel} a été créé avec succès !`);
        });
    }
}
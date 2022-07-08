const choices = [{ name: 'Tous', value: 0 }];
for (let i = 0; i < process.envVar.classes.length; i++) {
    choices.push({ name: process.envVar.classes[i].nom, value: (i + 1) * 10 });
    for (let j = 0; j < process.envVar.classes[i].groupesRole.length; j++) {
        choices.push({ name: `${process.envVar.classes[i].nom} Groupe ${j + 1}`, value: ((i + 1) * 10) + j + 1 });
    }
}

module.exports = {
    name: 'add_temp_channel',
    description: 'Créer un salon temporaire pour des discussions sur un module.',
    options: [{
        type: 'STRING',
        name: 'nom',
        description: 'Le nom du channel',
        required: true
    },
    {
        type: 'INTEGER',
        name: 'groupe',
        description: 'Le groupe qui peut voir le channel',
        required: true,
        choices: choices
    }],
    async runSlash(client, interaction) {
        const inputNom = interaction.options.getString('nom');
        const inputGroupe = interaction.options.getInteger('groupe');
        let permission = [{ id: process.envVar.discord.everyoneRole, deny: ['VIEW_CHANNEL'] }];

        if (Math.floor(inputGroupe/10) !== 0 && inputGroupe%10 !== 0){
            if (!interaction.member.roles.cache.has(process.envVar.classes[Math.floor(inputGroupe/10) - 1].adminsRole[inputGroupe%10 - 1])) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
            
            permission.push({ id: process.envVar.classes[Math.floor(inputGroupe/10) - 1].groupesRole[inputGroupe%10 - 1], allow: ['VIEW_CHANNEL'] });
        }
        else if (inputGroupe !== 0){
            let auth = 0;

            for (let i = 0; i < process.envVar.classes[Math.floor(inputGroupe/10) - 1].adminsRole.length; i++) {
                if (interaction.member.roles.cache.has(process.envVar.classes[Math.floor(inputGroupe/10) - 1].adminsRole[i])) auth += 1;
                
                permission.push({ id: process.envVar.classes[Math.floor(inputGroupe/10) - 1].groupesRole[i], allow: ['VIEW_CHANNEL'] });
            }
            
            if (auth === 0) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
        }
        else{
            for (let i = 0; i < process.envVar.classes.length; i++) {
                for (let j = 0; j < process.envVar.classes[i].groupesRole.length; j++) {
                    permission.push({ id: process.envVar.classes[i].groupesRole[j], allow: ['VIEW_CHANNEL'] });
                }
            }
        }
        interaction.guild.channels.create(inputNom, { 
            type: 'GUILD_TEXT', 
            reason: `Channel créé avec la commande /add_temp_channel par ${interaction.user.username}#${interaction.user.discriminator}`,
            parent: process.envVar.discord.tempGroup,
            permissionOverwrites: permission
        }).then(channel => {
            channel.send(`Bienvenue dans le channel temporaire ${inputNom} créé par ${interaction.user}!`);
            interaction.reply({ content: `Le channel ${channel} a été créé avec succès !` });
        });
    }
}
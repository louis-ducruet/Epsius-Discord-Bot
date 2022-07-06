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
        choices: [
            {
                name: "Tous",
                value: 0
            },
            {
                name: "PSN1",
                value: 10
            },
            {
                name: "PSN2",
                value: 20
            },
            {
                name: "PSN2 Groupe 1",
                value: 21
            },
            {
                name: "PSN2 Groupe 2",
                value: 22
            }
        ]
    }],
    async runSlash(client, interaction) {
        const inputNom = interaction.options.getString('nom');
        const inputGroupe = interaction.options.getInteger('groupe');
        let permission = [{ id: '961267363808944169', deny: ['VIEW_CHANNEL'] }];
        switch (inputGroupe){
            case 10:
                if (!interaction.member.roles.cache.has('991311405951234208')) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
                permission.push({ id: '991311405951234208', allow: ['VIEW_CHANNEL'] });
                break;
            case 20:
                if (!interaction.member.roles.cache.has('991310981324091472') && !interaction.member.roles.cache.has('991311841840083054')) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
                permission.push(
                    { id: '991310981324091472', allow: ['VIEW_CHANNEL'] },
                    { id: '991311841840083054', allow: ['VIEW_CHANNEL'] }
                );
                break;
            case 21:
                if (!interaction.member.roles.cache.has('991310981324091472')) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
                permission.push({ id: '991310981324091472', allow: ['VIEW_CHANNEL'] });
                break;
            case 22:
                if (!interaction.member.roles.cache.has('991311841840083054')) return interaction.reply({ content: `Vous n'avez pas la permission de faire cette action !`, ephemeral: true });
                permission.push({ id: '991311841840083054', allow: ['VIEW_CHANNEL'] });
                break;
            case 0:
                permission.push(
                    { id: '991311405951234208', allow: ['VIEW_CHANNEL'] },
                    { id: '991310981324091472', allow: ['VIEW_CHANNEL'] },
                    { id: '991311841840083054', allow: ['VIEW_CHANNEL'] }
                );
                break;

        }
        interaction.guild.channels.create(inputNom, { 
            type: 'GUILD_TEXT', 
            reason: `Channel créé avec la commande /add_temp_channel par ${interaction.user.username}#${interaction.user.discriminator}`,
            parent: '993875082038476800',
            permissionOverwrites: permission
        }).then(channel => {
            channel.send(`Bienvenue dans le channel temporaire ${inputNom} créé par ${interaction.user.username}#${interaction.user.discriminator}!`);
            interaction.reply({ content: `Le channel ${channel} a été créé avec succès !` });
        });
    }
}
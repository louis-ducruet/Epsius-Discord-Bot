// IMPORTATION DES BIBLIOTHEQUES
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});
const logger = require('./utils/modules/logger');
process.envVar = require('./env.json');

// CHARGEMENT DES COMMANDES ET DES BOUTONS
client.commands = new Collection();
client.buttons = new Collection();

logger.info('---- Importation ----')
const handlers = ['CommandUtil', 'ButtonUtil', 'EventUtil']
handlers.forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

// GESTION DES ERREURS
process.on('uncaughtException', (err, origin) => logger.error(`uncaughtException : ${err}\n Origine : ${origin}`));
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`unhandledRejection : ${reason}\n Promise :`);
    logger.debug({promise});
});
process.on('exit', code => logger.warn(`Le processus s'est arrêté avec le code : ${code}`));
process.on('warning', (...args) => console.log(...args));

// CONNEXION DU BOT
client.login(process.envVar.discord.token);
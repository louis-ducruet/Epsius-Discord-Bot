// IMPORTATION DES BIBLIOTHEQUES
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});
const logger = require('./utils/modules/logger');
process.envVar = require('./env.json');

// CHARGEMENT DES COMMANDES ET DES BOUTONS
client.commands = new Collection();
client.buttons = new Collection();
client.modal = new Collection();

logger.info('---- Importation ----', 'root', 'Lancement d\'Epsius')
const handlers = ['CommandUtil', 'ButtonUtil', 'ModalUtil', 'EventUtil']
handlers.forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

// GESTION DES ERREURS
process.on('uncaughtException', (err, origin) => logger.error(`uncaughtException : ${err}`, 'root', JSON.stringify(origin, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value)));
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`unhandledRejection : ${reason}\n`, 'root', JSON.stringify(promise, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));
});
process.on('exit', code => logger.warn(`Le processus s'est arrêté avec un code`, 'root', JSON.stringify(code, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value)));
process.on('warning', (...args) => logger.warn('Node js à récupérer une erreur', 'root', JSON.stringify(args, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value)));

// CONNEXION DU BOT
client.login(process.envVar.discord.token);
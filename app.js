const { Client, Collection } = require('discord.js');
const client = new Client({intents: ['GUILDS', 'GUILD_MESSAGES']});
const logger = require('./utils/modules/logger');
client.env = require('./env.json');

client.commands = new Collection();
client.buttons = new Collection();

logger.info('---- Importation ----')
const handlers = ['CommandUtil', 'ButtonUtil', 'EventUtil']
handlers.forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('uncaughtException', (err, origin) => logger.error(`uncaughtException : ${err}\n Origine : ${origin}`));
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`unhandledRejection : ${reason}\n Promise :`)
    console.log(promise);
});
process.on('exit', code => logger.warn(`Le processus s'est arrêté avec le code : ${code}`));
process.on('warning', (...args) => console.log(...args));

client.login(client.env.discord.token);

const { Client, Collection } = require('discord.js');
const client = new Client({intents: []});
const logger = require('./utils/modules/logger');
const dotenv = require('dotenv');

dotenv.config();
client.commands = new Collection();

logger.info('---- Importation ----')
const handlers = ['CommandUtil', 'EventUtil']
handlers.forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('uncaughtException', (err, origin) => logger.error(`uncaughtException : ${err}\n Origine : ${origin}`));
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`unhandledRejection : ${reason}\n Promise :`)
    console.log(promise);
});
process.on('exit', code => logger.warn(`Le processus s'est arrêté avec le code : ${code}`));
process.on('warning', (...args) => console.log(...args));

client.login(process.env.DISCORD_TOKEN);

const { Client, Collection } = require('discord.js');
const client = new Client({intents: []});
const logger = require('./utils/modules/logger');
const dotenv = require('dotenv');

dotenv.config();
client.commands = new Collection();

logger.info('---- Importation ----')
const handlers = ['CommandUtil', 'EventUtil']
handlers.forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

client.login(process.env.DISCORD_TOKEN);

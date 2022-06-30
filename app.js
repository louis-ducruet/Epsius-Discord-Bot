const { Client } = require('discord.js');
const client = new Client({intents: []});
const logger = require('./utils/modules/logger');

const dotenv = require('dotenv');
dotenv.config();

require('./utils/handlers/EventUtils')(client);

client.login(process.env.DISCORD_TOKEN);

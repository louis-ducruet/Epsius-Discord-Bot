const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const logger = require('../modules/logger');

module.exports = async client => {
    (await pGlob(`${process.cwd().replaceAll('\\', '/')}/events/*/*.js`)).map(async eventFile => {

        const event = require(eventFile);

        if (!eventList.includes(event.name)){
            return logger.error(`Importation [EVENT]: ${event.name} n'est pas un évènement valide !`, 'root', JSON.stringify(event, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        }else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }

        logger.success(`Importation [EVENT]: ${event.name}`, 'root', JSON.stringify(event, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));
    })
}

const eventList = [
    'ready', 'resumed', 'voiceServerUpdate', 'userUpdate', 'applicationCommandCreate', 
    'applicationCommandUpdate', 'applicationCommandDelete', 'interactionCreate', 'messageCreate', 'guildScheduledEventCreate'
];
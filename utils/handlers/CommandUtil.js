const { promisify } = require('util');
const { glob } = require('glob');
const logger = require('../modules/logger');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd().replaceAll('\\', '/')}/commands/*/*.js`)).map(async cmdFile => {
        
        const cmd = require(cmdFile);

        if (!cmd.name || (!cmd.description && !cmd.type)) return logger.error(`Importation [CMD]: ${cmd.name} n'est pas valide (nom / description) !`, 'root', JSON.stringify(cmd, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));

        client.commands.set(cmd.name, cmd);
        logger.success(`Importation [CMD]: ${cmd.name}`, 'root', JSON.stringify(cmd, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));
    })
}
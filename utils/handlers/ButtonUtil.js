const { promisify } = require('util');
const { glob } = require('glob');
const logger = require('../modules/logger');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd().replaceAll('\\', '/')}/buttons/*/*.js`)).map(async btnFile => {
        
        const btn = require(btnFile);

        if (!btn.name) return logger.error(`Importation [BTN]: ${btn.name} n'est pas un bouton valide !`, 'root', JSON.stringify(btn, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));

        client.buttons.set(btn.name, btn);
        logger.success(`Importation [BTN]: ${btn.name}`, 'root', JSON.stringify(btn, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));
    })
}
const { promisify } = require('util');
const { glob } = require('glob');
const logger = require('../modules/logger');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd().replaceAll('\\', '/')}/modals/*/*.js`)).map(async modFile => {
        
        const mod = require(modFile);

        if (!mod.name) return logger.error(`Importation [MODAL]: ${mod.name} n'est pas une modal valide !`, 'root', JSON.stringify(mod, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));

        client.modal.set(mod.name, mod);
        logger.success(`Importation [MODAL]: ${mod.name}`, 'root', JSON.stringify(mod, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value));
    })
}
const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd().replaceAll('\\', '/')}/events/*/*.js`)).map(async eventFile => {

        const event = require(eventFile);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        }else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }

        console.log(`Importation : [EVENT] ${event.name}`);
    })
}
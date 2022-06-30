const logger = require("../../utils/modules/logger");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        logger.info(`${client.user.username} est prêt !`);
    }
}
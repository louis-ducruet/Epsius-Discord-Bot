module.exports = {
    error: message => console.error(`\x1b[31m${message}\x1b[0m`),
    warn: message => console.warn(`\x1b[33m${message}\x1b[0m`),
    info: message => console.info(`\x1b[36m${message}\x1b[0m`),
    debug: message => console.log(message),
    success: message => console.log(`\x1b[32m${message}\x1b[0m`),
  };
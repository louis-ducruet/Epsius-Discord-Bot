const fs = require('fs');

function dateToString(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function log(type, userId, msg, ctx) {
  fs.appendFile('./log.csv', `${dateToString(new Date())};${type};${userId};${msg};${ctx}\n`, function (err) {
    if (err) console.error('Problème de log');
  });
}

module.exports = {
    error: (message, userId = null, contexte = null, afficheConsole = true) => {
      if (afficheConsole) {
        console.error(`\x1b[31m${message}\x1b[0m`);
      }
      log('ERROR', userId, message, contexte);
    },
    warn: (message, userId = null, contexte = null, afficheConsole = true) => {
      if (afficheConsole) {
        console.warn(`\x1b[33m${message}\x1b[0m`);
      }
      log('WARN', userId, message, contexte);
    },
    info: (message, userId = null, contexte = null, afficheConsole = true) => {
      if (afficheConsole) {
        console.info(`\x1b[36m${message}\x1b[0m`);
      }
      log('INFO', userId, message, contexte);
    },
    debug: (message, userId = null, contexte = null, afficheConsole = true) => {
      if (afficheConsole) {
        console.log(message);
      }
      log('DEBUG', userId, message, contexte);
    },
    success: (message, userId = null, contexte = null, afficheConsole = true) => {
      if (afficheConsole) {
        console.log(`\x1b[32m${message}\x1b[0m`);
      }
      log('SUCCESS', userId, message, contexte);
    },
  };
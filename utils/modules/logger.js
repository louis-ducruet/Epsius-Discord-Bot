const fs = require('fs');

module.exports = {
    error: message => {
      console.error(`\x1b[31m${message}\x1b[0m`);
      fs.appendFile('./log.csv', `ERROR; ${new Date().toGMTString()}; ${message}\n`, function (err) {
        if (err) console.error('Problème de log');
      });
    },
    warn: message => {
      console.warn(`\x1b[33m${message}\x1b[0m`);
      fs.appendFile('./log.csv', `WARN; ${new Date().toGMTString()}; ${message}\n`, function (err) {
        if (err) console.error('Problème de log');
      });
    },
    info: message => {
      console.info(`\x1b[36m${message}\x1b[0m`);
      fs.appendFile('./log.csv', `INFO; ${new Date().toGMTString()}; ${message}\n`, function (err) {
        if (err) console.error('Problème de log');
      });
    },
    debug: message => {
      console.log(message);
      fs.appendFile('./log.csv', `DEBUG; ${new Date().toGMTString()}; ${message}\n`, function (err) {
        if (err) console.error('Problème de log');
      });
    },
    success: message => {
      console.log(`\x1b[32m${message}\x1b[0m`);
      fs.appendFile('./log.csv', `SUCCESS; ${new Date().toGMTString()}; ${message}\n`, function (err) {
        if (err) console.error('Problème de log');
      });
    },
  };

const constants = require('../../constants');
const logger = require('./logger');

const Logger = {};

Logger.info = (message, ...info) => {
  logger.debug(`FLOW=${constants.FLOW} , ${message}, INFO: ${info.map(val => JSON.stringify(val)).join(', ')}`);
};

Logger.error = (message, ...info) => {
  logger.error(`FLOW=${constants.FLOW}, ${message}, INFO: ${info.map(val => JSON.stringify(val)).join(', ')}`);
};

Logger.success = (message, ...info) => {
  logger.info(`FLOW=${constants.FLOW}, ${message},  INFO: ${info.map(val => JSON.stringify(val)).join(', ')}`);
};

Logger.warn = (message, ...info) => {
  logger.warn(`FLOW=${constants.FLOW},  ${message},  INFO: ${info.map(val => JSON.stringify(val)).join(', ')}`);
};

module.exports = Logger;

const buildDevLogger = require('./dev-logger');
const buildProLogger = require('./pro-logger');

let logger = null;
if (process.env.NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProLogger();
}

module.exports = logger;

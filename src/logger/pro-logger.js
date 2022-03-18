const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

function buildProLogger () {
  return createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json()
    ),
    transports: [
      new transports.Console()
    //  new transports.File({ filename: 'production-error.log' , level: 'error' })
    ]
  });
}

module.exports = buildProLogger;

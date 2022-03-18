const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, colorize } = format;

function buildDevLogger () {
  const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level}]: ${message}`;
  });
  return createLogger({
    level: 'debug',
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat
    ),
    transports: [
      new transports.Console()
    ]
  });
}

module.exports = buildDevLogger;

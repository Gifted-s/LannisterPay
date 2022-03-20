const app = require('./src/app');
const { FLOW } = require('./src/constants');
const Logger = require('./src/logger');
require('dotenv').config();

const startServer = async () => {
  try {
    // eslint-disable-line global-require
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, (err) => {
      if (err) {
        Logger.error('SERVER STARTUP ERROR', JSON.stringify(err));
        switch (err.code) {
          case 'EACCES':
            // Error: ${err.port} requires elevated privileges
            process.exit(1);
          case 'EADDRINUSE':
            // Port ${port} is already in use
            process.exit(1);
          default:
            throw err;
        }
      }
      console.log('==============================================');
      console.log(`SERVER RUNNINING ON localhost:${PORT}`);
      console.log(`MODE = ${process.env.NODE_ENV}`);
      console.log(`FLOW = ${FLOW}`);
      console.log('===============================================');
      // Success: server started on port ${httpPort}
    });
  } catch (err) {
    // Error: problem starting the server
    Logger.error('SERVER STARTUP ERROR', JSON.stringify(err));
  }
};

startServer();

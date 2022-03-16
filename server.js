// const { FLOW } = require('./constants')

const constants = require('./constants');

// const utils = require('./utils/index')
require('dotenv').config();

// const httpPort = utils.normalizePort('8000')
const startServer = async () => {
  try {
    const app = require('./app'); // eslint-disable-line global-require
    app.listen(8000, (err) => {
      if (err) {
        console.log(JSON.stringify(err));
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
      console.log('SERVER RUNNINING ON localhost:8000');
      console.log(`MODE = ${process.env.NODE_ENV}`);
      console.log(`FLOW = ${constants.FLOW}`);
      console.log('===============================================');
      // Success: server started on port ${httpPort}
    });
  } catch (err) {
    // Error: problem starting the server
    console.log(JSON.stringify(err));
  }
};

startServer();

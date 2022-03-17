const client = require('..');
const Logger = require('../../helpers/logger');
const { FCS_COLLECTION_NAME, DB_NAME } = require('../config/db-config');

client.connect()
  .then(() => {
    client.db(DB_NAME).collection(FCS_COLLECTION_NAME)
      .createIndex(
        { 'FEE-ENTITY.TYPE': 1, 'FEE-ENTITY.ENTITY-PROPERTY': 1, 'FEE-LOCALE': 1, 'FEE-CURRENCY': 1 })
      .then((result) => {
        Logger.success(result, 'Index Created');
        client.close().catch(err => Logger.error('DB CONNECTION CLOSE FAILED', err.message));
      })
      .catch(err => {
        Logger.error('Index Creation Failure', err.message);
      });
  }).catch(err => {
    Logger.error('DB CONNECTION FAILED', err.message);
  });

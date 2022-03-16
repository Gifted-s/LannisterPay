const client = require('..');
const Logger = require('../../helpers/logger');
const { FCS_COLLECTION_NAME, DB_NAME } = require('../config/db-config');
const dbConfig = require('../config/db-config');

client.connect()
  .then(() => {
    client.db(DB_NAME).collection(FCS_COLLECTION_NAME)
      .createIndex(
        { 'FEE-ENTITY.TYPE': 1, 'FEE-ENTITY.ENTITY-PROPERTY': 1 })
      .then((result) => {
        Logger.success(result, 'Index Created');
      })
      .catch(err => {
        Logger.error('Index Creation Failure', err.message);
      });
  });

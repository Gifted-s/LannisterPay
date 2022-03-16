
const dbConfig = require('./db-config');

module.exports = {
  collectionName: process.env.FCS_DB_COLLECTION,
  database: process.env.LANNISTERPAY_DB,
  mappings: {
    dynamic: false,
    fields: {
      'FEE-ENTITY.TYPE': {
        type: 'string',
        analyzer: 'lucene.standard'
      },

      'FEE-ENTITY.ENTITY-PROPERTY': {
        type: 'string',
        analyzer: 'lucene.standard'
      },
      'FEE-LOCALE': {
        type: 'string',
        analyzer: 'lucene.standard'
      }
    }
  },
  name: dbConfig.SEARCH_INDEX_IDENTIFIER
};

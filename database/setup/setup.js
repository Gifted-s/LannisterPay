
const axios = require('axios');
const searchIndexConfig = require('../config/search-index-config');
const Logger = require('../../helpers/logger');

const headers = {
  'Content-Type': 'application/json'
};

async function setupSearchIndex () {
  try {
    await axios({
      method: 'post',
      url: `https://cloud.mongodb.com/api/atlas/v1.0/groups/${process.env.MONGODB_PROJECT_ID}/clusters/${process.env.MONGODB_CLUSTER_NAME}/fts/indexes?pretty=true`,
      data: searchIndexConfig,
      headers,
      auth: {
        user: process.env.MONGODB_ATLAS_PUBLIC_KEY,
        pass: process.env.MONGODB_ATLAS_PRIVATE_KEY
      }
    });
  } catch (error) {
    Logger.error('Search Index Creation Failed', error.response.data);
  }
}

setupSearchIndex().then((res) => {
  Logger.success('Search Index Created Successfully', res.data);
});

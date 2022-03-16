const { MongoClient } = require('mongodb');
const Logger = require('../helpers/logger');
const connectionConfig = require('./config/connection-config');
require('dotenv').config();
// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${connectionConfig.DATABASE_USER}:${connectionConfig.DATABASE_PASSWORD}@cluster0.bqvgt.mongodb.net/Flutterwave?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client
  .connect()
  .then(() => {
    Logger.success('DATABASE CONNECTION HANDSHAKE SUCCESSFULL', 'MONGODB CONNECTED');
  }).catch(err => {
    Logger.error('DATABASE CONNECTION HANDSHAKE FAILED', 'DB CONNECTION FAILED');
  });

module.exports = client;

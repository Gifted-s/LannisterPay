const client = require('..');
const computeMostSpecificConfig = require('../../helpers/compute-most-suitable-config');
const { FCS_COLLECTION_NAME, DB_NAME } = require('../config/db-config');
const findValidConfigurations = async (PaymentEntity) => {
  try {
    const db = client.db(DB_NAME);
    const fcsCollection = db.collection(FCS_COLLECTION_NAME);
    const queryResult = fcsCollection.find({
      $and: [
        {
          $or: [{ 'FEE-ENTITY.TYPE': PaymentEntity.Type }, { 'FEE-ENTITY.TYPE': '*' }]
        }

      ]
    }).project({ _id: 0 });
    const validConfigurations = await queryResult.toArray();
    // console.log((await queryResult.explain()).executionStats )
    return validConfigurations;
  } catch (error) {
    return { error: true, message: error.message };
  }
};



const insertConfigsToDB = async (configurations) => {
  try {
    const db = client.db(DB_NAME);
    const fcsCollection = db.collection(FCS_COLLECTION_NAME);
    const insertResult = await fcsCollection.insertMany(configurations);
    if (insertResult.acknowledged) {
      return { inserted: true };
    }
  } catch (error) {
    return { error: true, message: error.message };
  }
};

module.exports = {
  findValidConfigurations,
  insertConfigsToDB
};

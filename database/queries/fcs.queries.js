const client = require('..');
const { FCS_COLLECTION_NAME, DB_NAME } = require('../config/db-config');

const findValidConfigurations = async (PaymentEntity) => {
  try {
    const db = client.db(DB_NAME);
    const fcsCollection = db.collection(FCS_COLLECTION_NAME);

    const queryResult = fcsCollection.find({
      $and: [
        {
          $or: [{ 'FEE-ENTITY.TYPE': PaymentEntity.Type }, { 'FEE-ENTITY.TYPE': '*' }]
        },
        {
          $or:
            [{ 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.ID },
              { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.Issuer },
              { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.Brand },
              { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.Number },
              { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.SixID },
              { 'FEE-ENTITY.ENTITY-PROPERTY': '*' }
            ]
        },

        {
          $or:
            [{ 'FEE-LOCALE': PaymentEntity.Locale },
              { 'FEE-LOCALE': '*' }
            ]
        },

        {
          $or:
            [{ 'FEE-CURRENCY': PaymentEntity.Currency },
              { 'FEE-CURRENCY': '*' }
            ]
        }

      ]
    }).project({ _id: 0 });
    const validConfigurations = await  queryResult.toArray()
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

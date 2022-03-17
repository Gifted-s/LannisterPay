const client = require('..');
const { FCS_COLLECTION_NAME, DB_NAME } = require('../config/db-config');
const configurations = require('../config/config.json');
const findValidConfigurations = async (PaymentEntity) => {
  try {
    const db = client.db(DB_NAME);
    const fcsCollection = db.collection(FCS_COLLECTION_NAME);
    console.log(configurations[0]);

   const validConfigurations= configurations.filter((configuration) => {
      const feeEntityProperty = configuration['FEE-ENTITY']['ENTITY-PROPERTY'];
      const feeType = configuration['FEE-ENTITY'].TYPE;
      const locale = configuration['FEE-LOCALE'];
      const currecy = configuration['FEE-CURRENCY'];
      if (
        (
          feeType === PaymentEntity.Type || feeType === '*'
        ) &&

        (
          feeEntityProperty === PaymentEntity.ID ||
          feeEntityProperty === PaymentEntity.Issuer ||
          feeEntityProperty === PaymentEntity.Brand ||
          feeEntityProperty === PaymentEntity.Number ||
          feeEntityProperty === PaymentEntity.SixID ||
          feeEntityProperty === '*'
        ) &&
        (locale === PaymentEntity.Locale ||
         locale === '*'
        ) &&
        (
          currecy === PaymentEntity.Currency ||
          currecy === '*'
        )
      ) {
        return true
      }
    });

    // const queryResult = fcsCollection.find({
    //   $and: [
    //     {
    //       $or: [{ 'FEE-ENTITY.TYPE': PaymentEntity.Type }, { 'FEE-ENTITY.TYPE': '*' }]
    //     },
    //     {
    //       $or:
    //         [{ 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.ID },
    //           { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.Issuer },
    //           { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.Brand },
    //           { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.Number },
    //           { 'FEE-ENTITY.ENTITY-PROPERTY': PaymentEntity.SixID },
    //           { 'FEE-ENTITY.ENTITY-PROPERTY': '*' }
    //         ]
    //     },

    //     {
    //       $or:
    //         [{ 'FEE-LOCALE': PaymentEntity.Locale },
    //           { 'FEE-LOCALE': '*' }
    //         ]
    //     },

    //     {
    //       $or:
    //         [{ 'FEE-CURRENCY': PaymentEntity.Currency },
    //           { 'FEE-CURRENCY': '*' }
    //         ]
    //     }

    //   ]
    // }).project({ _id: 0 });
    // const validConfigurations =[  {
    //     'FEE-ID': 'LNPY1223',
    //     'FEE-CURRENCY': 'NGN',
    //     'FEE-LOCALE': 'LOCL',
    //     'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '*' },
    //     'FEE-TYPE': 'FLAT_PERC',
    //     'FEE-VALUE': '50:1.4'
    //   }]
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

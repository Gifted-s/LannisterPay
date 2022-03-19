const fs = require('fs');

/**
 * @description findValidConfigurations will return all the valid fee configuration specification
 * @param {object} PaymentEntity
 * @returns {array} of valid fee configuration specifications
 */
const findValidConfigurations = async (PaymentEntity) => {
  try {
    // pull  all stored fee configuration specifications from json file
    const configurations = require('../fcs_config_collection/fcs_config_collection.json');
    // filter all fcs based on business logic rule for selecting valid configuration specification
    const validConfigurations = configurations.filter((configuration) => {
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
        return true;
      }
    });
      // check and handle when no specification is valid for the payment entity
    if (validConfigurations.length === 0) {
      return { error: true, message: 'No valid Fee Configuation Specification found' };
    }
    return validConfigurations;
  } catch (error) {
    return { error: true, message: error.message };
  }
};
  /**
   * @param {array} configurations an array of fee configuration specification object
   * @returns {promise} this will end up returning inserted - will be (true) if the configuration specifications array is inserted to the specified json file successfully or (false) error if there is an error
   */
const insertConfigsToDB = (configurations) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./src/database/fcs_config_collection/fcs_config_collection.json', JSON.stringify(configurations), function (err) {
      if (err) {
        return reject({ error: true, message: `Could not insert configurations:  ${err.message}` });
      }
      resolve({ inserted: true });
    });
  });
};

module.exports = {
  findValidConfigurations,
  insertConfigsToDB
};

const fs = require('fs');


  const findValidConfigurations = async (PaymentEntity) => {
    try {
      const configurations = require('../fcs_config_collection/fcs_config_collection.json');
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
      if (validConfigurations.length === 0) {
        return { error: true, message: 'No valid Fee Configuation Specification found' };
      }
      return validConfigurations;
    } catch (error) {
      return { error: true, message: error.message };
    }
  };

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



module.exports ={
  findValidConfigurations,
  insertConfigsToDB
};
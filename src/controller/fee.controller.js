
const { insertConfigsToDB, findValidConfigurations } = require('../database/queries/fcs.queries');
const computeMostSpecificConfig = require('../helpers/computeMostSuitableConfig');
const computeTransactionFee = require('../helpers/computeTransactionFee');
const enhancePaymentEntity = require('../helpers/enhancePaymentEntity');

const FeeController = {};
FeeController.handleAddConfigurationSpec = async (configurations) => {
  try {
    const insertResult = await insertConfigsToDB(configurations);
    if (insertResult.error) {
      return { status: 'failed', errorMessage: insertResult.message, error: true };
    }
    if (insertResult.inserted) {
      return { status: 'ok' };
    };
  } catch (error) {
    return { status: 'failed', errorMessage: error.message, error: true };
  }
};

FeeController.handleComputeTransactionFee = async ({ CurrencyCountry, Amount, Currency, PaymentEntity, Customer }) => {
  try {
    PaymentEntity = enhancePaymentEntity(CurrencyCountry, Currency, PaymentEntity);
    const validConfigs = await findValidConfigurations(PaymentEntity);
    if (validConfigs.error) {
      return { status: 'failed', errorMessage: validConfigs.message, error: true };
    }
    const mostSpecificConfig = computeMostSpecificConfig(validConfigs, PaymentEntity);
    const computedTransactionFee = computeTransactionFee(mostSpecificConfig, Amount, Customer.BearsFee);
    return computedTransactionFee;
  } catch (error) {
    return { status: 'failed', errorMessage: error.message, error: true };
  }
};

module.exports = FeeController;

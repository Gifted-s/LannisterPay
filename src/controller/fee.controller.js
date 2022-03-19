
const { insertConfigsToDB, findValidConfigurations } = require('../database/queries/fcs.queries');
const computeMostSpecificConfig = require('../helpers/computeMostSuitableConfig');
const computeTransactionFee = require('../helpers/computeTransactionFee');
const enhancePaymentEntity = require('../helpers/enhancePaymentEntity');

const FeeController = {};
/**
 * @description handleAddConfigurationSpec will add a new set of fee configuration specifications to database in a specified format
 * @param {string} configurations a string that contains fee configuration specification
 * @returns {object} {status: 'failed', errorMessage: insertResult.message, error: true} if insertion failed |  {status: 'ok'} if insertion was successful
 */
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

/**
 *
 * @param {object} transactionPayload the transaction payload from the request body
 * @returns {object} an error object or an object that contains AppliedFeeID, AppliedFeeValue, ChargeAmount, SettlementAmount
 */
FeeController.handleComputeTransactionFee = async (transactionPayload) => {
  try {
    let { CurrencyCountry, Amount, Currency, PaymentEntity, Customer } = transactionPayload;
    /** add Locale and Currency to PaymntEntity object */
    PaymentEntity = enhancePaymentEntity(CurrencyCountry, Currency, PaymentEntity);

    /** find all the valid fee configuration specifications  */
    const validConfigs = await findValidConfigurations(PaymentEntity);

    if (validConfigs.error) {
      return { status: 'failed', errorMessage: validConfigs.message, error: true };
    }
    /** get the most specific configuration that suit the transaction payload */
    const mostSpecificConfig = computeMostSpecificConfig(validConfigs, PaymentEntity);

    /** compute the transation processing fee */
    const computedTransactionFee = computeTransactionFee(mostSpecificConfig, Amount, Customer.BearsFee);
    return computedTransactionFee;
  } catch (error) {
    return { status: 'failed', errorMessage: error.message, error: true };
  }
};

module.exports = FeeController;

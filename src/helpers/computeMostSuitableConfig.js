/**
 * @description computeMostSuitableConfig willcompute the fee specification configuration that best suit a transaction payload by using specificity count algorithm
 * @param {array} configurations an array of valid fee configuration specifications
 * @param {object} payload payment entity object
 * @returns {object} the most suitable configuration for the transaction payload based on specificity count
 */
function computeMostSuitableConfig (configurations, payload) {
  let maxSpecificityCount = 0;
  let mostSpecificConfigIndex = 0;
  for (let i = 0; i < configurations.length; i++) {
    const currentConfig = configurations[i];
    let specificityCount = 0;
    if (currentConfig['FEE-CURRENCY'] === payload.Currency) {
      specificityCount++;
    }

    if (currentConfig['FEE-LOCALE'] === payload.Locale) {
      specificityCount++;
    }
    if (currentConfig['FEE-ENTITY'].TYPE === payload.Type) {
      specificityCount++;
    }
    if (currentConfig['FEE-ENTITY']['ENTITY-PROPERTY'] === payload.ID ||
      currentConfig['FEE-ENTITY']['ENTITY-PROPERTY'] === payload.Issuer ||
      currentConfig['FEE-ENTITY']['ENTITY-PROPERTY'] === payload.Brand ||
      currentConfig['FEE-ENTITY']['ENTITY-PROPERTY'] === payload.Number ||
      currentConfig['FEE-ENTITY']['ENTITY-PROPERTY'] === payload.SixID
    ) {
      specificityCount++;
    }
    if (specificityCount > maxSpecificityCount) {
      mostSpecificConfigIndex = i;
      maxSpecificityCount = specificityCount;
    }
  }
  return configurations[mostSpecificConfigIndex];
}

module.exports = computeMostSuitableConfig;

function createFakeFCS (overrides) {
  return {
    ...{
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': 'LOCL',
      'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': 'MASTERCARD' },
      'FEE-TYPE': 'PERC',
      'FEE-VALUE': 1.4
    },
    ...overrides
  };
}

module.exports = createFakeFCS;

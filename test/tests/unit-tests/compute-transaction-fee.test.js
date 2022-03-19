
const computeTransactionFee = require('../../../src/helpers/computeTransactionFee');

describe('computeTransactionFee', () => {
  it('must return an object that contains the FEE-ID of config used', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'PERC',
      'FEE-VALUE': '1.4'
    }, 5000, true);

    expect(transactionFeeBody.AppliedFeeID).toBeDefined();
    expect(transactionFeeBody.AppliedFeeID).toEqual('LNPY1221');
  });

  it('should correctly compute AppliedFeeValue while FEE-TYPE is PERC', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'PERC',
      'FEE-VALUE': '1.4'
    }, 5000, true);
    // AppliedFeeValue = (1.4 * 5000)/ 100 = 70
    expect(transactionFeeBody.AppliedFeeValue).toBeDefined();
    expect(transactionFeeBody.AppliedFeeValue).toEqual(70);
  });

  it('should correctly compute AppliedFeeValue while FEE-TYPE is FLAT', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT',
      'FEE-VALUE': '10'
    }, 5000, true);
    // AppliedFeeValue = 10 because we are using a FLAT FEE-TYPE
    expect(transactionFeeBody.AppliedFeeValue).toBeDefined();
    expect(transactionFeeBody.AppliedFeeValue).toEqual(10);
  });

  it('should correctly compute AppliedFeeValue while FEE-TYPE is FLAT_PERC', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT_PERC',
      'FEE-VALUE': '10:0.2'
    }, 5000, true);
    // AppliedFeeValue = ((0.2 * 5000)/ 100) + 10 = 20
    expect(transactionFeeBody.AppliedFeeValue).toBeDefined();
    expect(transactionFeeBody.AppliedFeeValue).toEqual(20);
  });

  it('should correctly compute ChargeAmount while FEE-TYPE is PERC', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'PERC',
      'FEE-VALUE': '1.4'
    }, 5000, true);
    // (AppliedFeeValue = (1.4 * 5000)/ 100 = 70) +  Amount
    expect(transactionFeeBody.ChargeAmount).toBeDefined();
    expect(transactionFeeBody.ChargeAmount).toEqual(5070);
  });

  it('should correctly compute ChargeAmount while FEE-TYPE is FLAT', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT',
      'FEE-VALUE': '10'
    }, 5000, true);
    // AppliedFeeValue = 10 + Amount
    expect(transactionFeeBody.ChargeAmount).toBeDefined();
    expect(transactionFeeBody.ChargeAmount).toEqual(5010);
  });

  it('should correctly compute ChargeAmount while FEE-TYPE is FLAT_PERC', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT_PERC',
      'FEE-VALUE': '10:0.2'
    }, 5000, true);
    // (AppliedFeeValue = ((0.2 * 5000)/ 100) + 10 = 20) + Amount
    expect(transactionFeeBody.ChargeAmount).toBeDefined();
    expect(transactionFeeBody.ChargeAmount).toEqual(5020);
  });

  it('should correctly compute SettlementAmount while FEE-TYPE is PERC', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'PERC',
      'FEE-VALUE': '1.4'
    }, 5000, true);
    // SettlementAmount = ChargeAmount - AppliedFeeValue
    expect(transactionFeeBody.SettlementAmount).toBeDefined();
    expect(transactionFeeBody.SettlementAmount).toEqual(5000);
  });

  it('should correctly compute SettlementAmount while FEE-TYPE is FLAT', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT',
      'FEE-VALUE': '10'
    }, 5000, true);
    // SettlementAmount = ChargeAmount - AppliedFeeValue
    expect(transactionFeeBody.SettlementAmount).toBeDefined();
    expect(transactionFeeBody.SettlementAmount).toEqual(5000);
  });

  it('should correctly compute SettlementAmount while FEE-TYPE is FLAT_PERC', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT_PERC',
      'FEE-VALUE': '10:0.2'
    }, 5000, true);
    // SettlementAmount = ChargeAmount - AppliedFeeValue
    expect(transactionFeeBody.SettlementAmount).toBeDefined();
    expect(transactionFeeBody.SettlementAmount).toEqual(5000);
  });

  it('should not add ApplyFeeValue to ChargeAmount if bearsFee parameter is false', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT',
      'FEE-VALUE': '30'
    }, 5000, false);
    // ChargeAmount = Amount
    expect(transactionFeeBody.ChargeAmount).toBeDefined();
    expect(transactionFeeBody.ChargeAmount).toEqual(5000);
  });

  it('should return object that contains AppliedFeeID, AppliedFeeValue, ChargeAmount, SettlementAmount', () => {
    const transactionFeeBody = computeTransactionFee({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT',
      'FEE-VALUE': '30'
    }, 5000, true);
    expect(transactionFeeBody).toBeDefined();
    expect(transactionFeeBody).toEqual({
      AppliedFeeID: 'LNPY1221',
      AppliedFeeValue: 30,
      ChargeAmount: 5030,
      SettlementAmount: 5000
    });
  });
});

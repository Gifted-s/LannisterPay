/**
 * @description computeTransactionFee will compute the transaction fee for a particular transaction using the fcs config passed
 * @param {object} fcsConfig  fee configuration spec to use for computation
 * @param {integer} amount  The non-negative, numeric transaction amount
 * @param {boolean} bearsFee a boolean to check if customer should bear transaction processing fee charge
 * @returns an object that contains AppliedFeeID, AppliedFeeValue, ChargeAmount, SettlementAmount
 */

module.exports = function computeTransactionFee (fcsConfig, amount, bearsFee) {
  let AppliedFeeValue = 0;
  switch (fcsConfig['FEE-TYPE']) {
    case 'FLAT_PERC':
      const splitedFeeValue = fcsConfig['FEE-VALUE'].split(':');
      const flatValue = parseInt(splitedFeeValue[0]);
      const percValue = parseFloat(splitedFeeValue[1]);
      AppliedFeeValue = Math.round(flatValue + ((percValue / 100) * amount));
      break;
    case 'FLAT':
      AppliedFeeValue = parseInt(fcsConfig['FEE-VALUE']);
      break;
    case 'PERC':
      const perc = parseFloat(fcsConfig['FEE-VALUE']);
      AppliedFeeValue = Math.round(((perc / 100) * amount));
      break;
  }

  const ChargeAmount = bearsFee ? amount + AppliedFeeValue : amount;
  const SettlementAmount = ChargeAmount - AppliedFeeValue;
  const transactionFeeBody =
  {
    AppliedFeeID: fcsConfig['FEE-ID'],
    AppliedFeeValue,
    ChargeAmount,
    SettlementAmount
  };
  return transactionFeeBody;
};

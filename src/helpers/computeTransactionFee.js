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

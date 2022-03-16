module.exports = function (CurrencyCountry, Currency, PaymentEntity) {
  if (CurrencyCountry === PaymentEntity.Country) {
    PaymentEntity.Locale = 'LOCL';
  } else if (CurrencyCountry === '*' && PaymentEntity.Country === '*') {
    PaymentEntity.Locale = '*';
  } else {
    PaymentEntity.Locale = 'INTL';
  }
  PaymentEntity.Currency = Currency;
  PaymentEntity.ID = `${PaymentEntity.ID}`;
  PaymentEntity.SixID = `${PaymentEntity.SixID}`;
  return PaymentEntity;
};

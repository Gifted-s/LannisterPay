module.exports = function (CurrencyCountry, Currency, PaymentEntity) {
  if (CurrencyCountry === PaymentEntity.Country) {
    PaymentEntity.Locale = 'LOCL';
  } else {
    PaymentEntity.Locale = 'INTL';
  }
  PaymentEntity.Currency = Currency;
  PaymentEntity.ID = `${PaymentEntity.ID}`;
  PaymentEntity.SixID = `${PaymentEntity.SixID}`;
  return PaymentEntity;
};

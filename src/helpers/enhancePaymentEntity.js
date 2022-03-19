/**
 *
 * @param {string} CurrencyCountry  Country the transaction currency is applicable in
 * @param {string} Currency The transaction currency
 * @param {string} PaymentEntity the payment entity to be processed
 * @returns payment entity that new fields i.e Country and Locale
 */
module.exports = function enhancePaymentEntity (CurrencyCountry, Currency, PaymentEntity) {
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

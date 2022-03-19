const enhancePaymentEntity = require('../../../src/helpers/enhancePaymentEntity');

describe('enhancePaymentEntity', () => {
  it('must set Locale to LOCL if the CurrencyCountry is thesame as the PaymentEntity Country ', () => {
    const enhnacedPaymentEntity = enhancePaymentEntity('NG', 'NGN', {
      ID: 2203454,
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: 530191,
      Type: 'USSD',
      Country: 'NG'
    });

    expect(enhnacedPaymentEntity.Locale).toEqual('LOCL');
  });

  it('must set Locale to INTL if the CurrencyCountry is different from the PaymentEntity Country ', () => {
    const enhnacedPaymentEntity = enhancePaymentEntity('INR', 'NGN', {
      ID: 2203454,
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: 530191,
      Type: 'USSD',
      Country: 'NG'
    });

    expect(enhnacedPaymentEntity.Locale).toEqual('INTL');
  });

  it('Payment Currency to be set to the Currency passed as parameter ', () => {
    const enhnacedPaymentEntity = enhancePaymentEntity('NG', 'NGN', {
      ID: 2203454,
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: 530191,
      Type: 'USSD',
      Country: 'NG'
    });

    expect(enhnacedPaymentEntity.Currency).toEqual('NGN');
  });

  it('Payment ID to be passed as string for comparison with config in ID', () => {
    const enhnacedPaymentEntity = enhancePaymentEntity('NG', 'NGN', {
      ID: 2203454,
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: 530191,
      Type: 'USSD',
      Country: 'NG'
    });

    expect(enhnacedPaymentEntity.ID).toEqual('2203454');
  });

  it('Payment SixID to be passed as string for comparison with config in ID', () => {
    const enhnacedPaymentEntity = enhancePaymentEntity('NG', 'NGN', {
      ID: 2203454,
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: 530191,
      Type: 'USSD',
      Country: 'NG'
    });

    expect(enhnacedPaymentEntity.SixID).toEqual('530191');
  });
  // ID: 2203454,
  // Issuer: 'Airtel',
  // Brand: 'MASTERCARD',
  // Number: '530191******2903',
  // SixID: 530191,
  // Type: 'USSD',
  // Country: 'NG'

  it('must return an object that contains ID, Issuer, Locale,  Brand, Number, SixID, Type, Country, Currency ', () => {
    const enhnacedPaymentEntity = enhancePaymentEntity('NG', 'NGN', {
      ID: 2203454,
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: 530191,
      Type: 'USSD',
      Country: 'NG'
    });

    expect(enhnacedPaymentEntity).toEqual({
      ID: '2203454',
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: '530191',
      Type: 'USSD',
      Country: 'NG',
      Currency: 'NGN',
      Locale: 'LOCL'
    });
  });
});


const computeMostSpecificConfig = require('../../../src/helpers/computeMostSuitableConfig');

describe('computeMostSpecificConfig', () => {
  it('return the most specific config based on specificity count', () => {
    const mostSpecificConfig = computeMostSpecificConfig(
      [
        {
          'FEE-ID': 'LNPY1221',
          'FEE-CURRENCY': 'NGN',
          'FEE-LOCALE': '*',
          'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
          'FEE-TYPE': 'PERC',
          'FEE-VALUE': '1.4'
        },
        {
          'FEE-ID': 'LNPY1223',
          'FEE-CURRENCY': 'NGN',
          'FEE-LOCALE': 'LOCL',
          'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '*' },
          'FEE-TYPE': 'FLAT_PERC',
          'FEE-VALUE': '50:1.4'
        }
      ], {
        ID: '2203454',
        Issuer: 'GTBANK',
        Brand: 'MASTERCARD',
        Number: '530191******2903',
        SixID: '530191',
        Type: 'CREDIT-CARD',
        Country: 'NG',
        Locale: 'LOCL',
        Currency: 'NGN'
      });
    //   The most specific config is
    //   {
    //       'FEE-ID': 'LNPY1223',
    //       'FEE-CURRENCY': 'NGN',
    //       'FEE-LOCALE': 'LOCL',
    //       'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '*' },
    //       'FEE-TYPE': 'FLAT_PERC',
    //       'FEE-VALUE': '50:1.4'
    //     }
    // Because it has a specificity count of 3 bsaed on the  payload passed , these are:
    // the FEE-LOCALE, FEE-CURRENCY and FEE-TYPE,  this is contrary to the other config, where the specificity count is 1 which is only the FEE-CURRENCY
    expect(mostSpecificConfig).toEqual({
      'FEE-ID': 'LNPY1223',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': 'LOCL',
      'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'FLAT_PERC',
      'FEE-VALUE': '50:1.4'
    });

    const mostSpecificConfig2 = computeMostSpecificConfig([
      {
        'FEE-ID': 'LNPY1221',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': '*',
        'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': '1.4'
      }
    ], {
      ID: '2203454',
      Issuer: 'Airtel',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: '530191',
      Type: 'USSD',
      Country: 'NG',
      Locale: 'LOCL',
      Currency: 'NGN'
    });
    // Most Specific Config
    //   {
    //     'FEE-ID': 'LNPY1221',
    //     'FEE-CURRENCY': 'NGN',
    //     'FEE-LOCALE': '*',
    //     'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
    //     'FEE-TYPE': 'PERC',
    //     'FEE-VALUE': '1.4'
    //   }
    // Because it has a specificity count of 1 bsaed on the  payload passed , this is:
    // the FEE-CURRENCY,
    expect(mostSpecificConfig2).toEqual({
      'FEE-ID': 'LNPY1221',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': '*',
      'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
      'FEE-TYPE': 'PERC',
      'FEE-VALUE': '1.4'
    });

    const mostSpecificConfig3 = computeMostSpecificConfig([
      {
        'FEE-ID': 'LNPY1221',
        'FEE-CURRENCY': '*',
        'FEE-LOCALE': '*',
        'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': 'MTN' },
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': '1.4'
      },
      {
        'FEE-ID': 'LNPY1223',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': 'LOCL',
        'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': '50:1.4'
      }

    ], {
      ID: '2203454',
      Issuer: 'MTN',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: '530191',
      Type: 'USSD',
      Country: 'NG',
      Locale: 'LOCL',
      Currency: '*'
    });
      // Most Specific Config
      //   {
    // 'FEE-ID': 'LNPY1223',
    // 'FEE-CURRENCY': 'NGN',
    // 'FEE-LOCALE': 'LOCL',
    // 'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
    // 'FEE-TYPE': 'FLAT_PERC',
    // 'FEE-VALUE': '50:1.4'
      //   }
      // Because it has a specificity count of 4 bsaed on the  payload passed , these are:
      // the FEE-CURRENCY,FEE-LOCALE,FEE-ENTITY TYPE, FEE-ENTITY ENTITY-PROPERTY
    expect(mostSpecificConfig3).toEqual({
      'FEE-ID': 'LNPY1223',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': 'LOCL',
      'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
      'FEE-TYPE': 'FLAT_PERC',
      'FEE-VALUE': '50:1.4'
    });

    const mostSpecificConfig4 = computeMostSpecificConfig([
      {
        'FEE-ID': 'LNPY1221',
        'FEE-CURRENCY': '*',
        'FEE-LOCALE': '*',
        'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': 'MTN' },
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': '1.4'
      },
      {
        'FEE-ID': 'LNPY1223',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': '*',
        'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': '50:1.4'
      },
      {
        'FEE-ID': 'LNPY1223',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': 'LOCL',
        'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': '50:1.4'
      }

    ], {
      ID: '2203454',
      Issuer: 'MTN',
      Brand: 'MASTERCARD',
      Number: '530191******2903',
      SixID: '530191',
      Type: 'USSD',
      Country: 'NG',
      Locale: 'LOCL',
      Currency: '*'
    });
      // Most Specific Config
      //   {
    // 'FEE-ID': 'LNPY1223',
    // 'FEE-CURRENCY': 'NGN',
    // 'FEE-LOCALE': 'LOCL',
    // 'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
    // 'FEE-TYPE': 'FLAT_PERC',
    // 'FEE-VALUE': '50:1.4'
      //   }
      // Because it has a specificity count of 4 bsaed on the  payload passed , these are:
      // the FEE-CURRENCY,FEE-LOCALE,FEE-ENTITY TYPE, FEE-ENTITY ENTITY-PROPERTY
    expect(mostSpecificConfig4).toEqual({
      'FEE-ID': 'LNPY1223',
      'FEE-CURRENCY': 'NGN',
      'FEE-LOCALE': 'LOCL',
      'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
      'FEE-TYPE': 'FLAT_PERC',
      'FEE-VALUE': '50:1.4'
    });
  });
});

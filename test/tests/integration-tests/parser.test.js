const fcsParser = require('../../../src/helpers/parser');

describe('parser', () => {
  it('should return an error if a FEE-ID token is missing', () => {
    const parseResult = fcsParser(' NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('FEE-ID is missing for Fee Configuration Spec: 1 , please check FeeConfigurationSpec and try again');
  });

  it('should return an error if a FEE-CURRENCY token is missing', () => {
    const parseResult = fcsParser('LNPY1221  * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('FEE-CURRENCY is missing for Fee Configuration Spec: 1 , please check FeeConfigurationSpec and try again');
  });

  it('should return an error if a FEE-LOCALE token is missing', () => {
    const parseResult = fcsParser('LNPY1221 NGN  *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('FEE-LOCALE is missing for Fee Configuration Spec: 1 , please check FeeConfigurationSpec and try again');
  });
  it('should return an error if a FEE-ENTITY token is missing', () => {
    const parseResult = fcsParser('LNPY1221 NGN *  : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('FEE-ENTITY is missing for Fee Configuration Spec: 1 , please check FeeConfigurationSpec and try again');
  });

  it("should return an error if the ':' token is misplaced or abscent", () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*)  APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('[Syntax Error]: Expexted token after LNPY1221  NGN *  *(*) to be  :  at Fee Configuration Spec: 1');
  });

  it("should return an error if the 'APPLY' token is misplaced or abscent", () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) :  PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('[Syntax Error]: Expexted token after LNPY1221  NGN *  *(*) : to be APPLY at Fee Configuration Spec: 1');
  });

  it('should return an error if a FEE-TYPE token is missing ', () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) : APPLY  1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('FEE-TYPE is missing for Fee Configuration Spec: 1 , please check FeeConfigurationSpec and try again');
  });

  it('should return an error if a FEE-VALUE token is missing ', () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) : APPLY PERC \nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('FEE-VALUE is missing for Fee Configuration Spec: 1 , please check FeeConfigurationSpec and try again');
  });

  // TESTING THE CUSTOM FCS
  it('should return an error if a FEE-ID  is not 8 characters ', () => {
    const parseResult = fcsParser('LNPY122 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('\"FEE-ID\" length must be 8 characters long at Fee Configuration Spec: 1 ');
  });
  it('should return an error if a FEE-CURRENCY  is not supported ', () => {
    const parseResult = fcsParser('LNPY1221 USD * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('No fee configuration for USD transactions. at Fee Configuration Spec: 1 ');
  });

  it('should return an error if a FEE-LOCALE  is not one of INTL, LOCL and * ', () => {
    const parseResult = fcsParser('LNPY1221 NGN KO *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('\"FEE-LOCALE\" must be one of [LOCL, INTL, *] at Fee Configuration Spec: 1 ');
  });

  it('should return an error if a FEE-ENTITY TYPE  is not part of the FEE ENTITY TYPE options', () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL HAND(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('\"FEE-ENTITY\" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *] at Fee Configuration Spec: 2 ');
  });
  it('should return an error if a FEE-ENTITY ENTITY-PROPERTY  is missing', () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD() : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('\"FEE-ENTITY.ENTITY-PROPERTY\" is not allowed to be empty at Fee Configuration Spec: 2 ');
  });

  it('should return an error if a FEE-TYPE is not part of FLAT, FlAT_PERC or PERC', () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY UYUY 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual('\"FEE-TYPE\" must be one of [FLAT, PERC, FLAT_PERC] at Fee Configuration Spec: 4 ');
  });
  it('should return an error if a FEE-VALUE is missing', () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC ');
    expect(parseResult.error).toEqual('FEE-VALUE is missing for Fee Configuration Spec: 5 , please check FeeConfigurationSpec and try again');
  });

  it('should return an array of a custom configurations', () => {
    const parseResult = fcsParser('LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55');
    expect(parseResult.error).toEqual(undefined);
    expect(parseResult).toMatchSnapshot([
      {
        'FEE-ID': 'LNPY1221',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': '*',
        'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': '*' },
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': '1.4'
      },
      {
        'FEE-ID': 'LNPY1222',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': 'INTL',
        'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': 'VISA' },
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': '5.0'
      },
      {
        'FEE-ID': 'LNPY1223',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': 'LOCL',
        'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '*' },
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': '50:1.4'
      },
      {
        'FEE-ID': 'LNPY1224',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': '*',
        'FEE-ENTITY': { TYPE: 'BANK-ACCOUNT', 'ENTITY-PROPERTY': '*' },
        'FEE-TYPE': 'FLAT',
        'FEE-VALUE': '100'
      },
      {
        'FEE-ID': 'LNPY1225',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': '*',
        'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': 'MTN' },
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': '0.55'
      }
    ]);
  });
});

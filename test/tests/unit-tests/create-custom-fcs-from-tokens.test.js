const createCustomFCSFromTokens = require('../../../src/helpers/createCustomFCSFromTokens');

describe('createCustomFCSFromTokens', () => {
  it('must return an object that has the FEE-ID ', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens['FEE-ID']).toEqual('LNPY1223');
  });

  it('must return an object that has the FEE-CURRENCY ', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens['FEE-CURRENCY']).toEqual('NGN');
  });

  it('must return an object that has the FEE-LOCALE', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens['FEE-LOCALE']).toEqual('LOCL');
  });

  it('must return an object that has the FEE-ENTITY TYPE', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens['FEE-ENTITY'].TYPE).toEqual('CREDIT-CARD');
  });

  it('must return an object that has the FEE-ENTITY ENTITY-PROPERTY', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens['FEE-ENTITY']['ENTITY-PROPERTY']).toEqual('*');
  });

  it('must return an object that has the FEE-TYPE', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens['FEE-TYPE']).toEqual('FLAT_PERC');
  });

  it('must return an object that has the FEE-VALUE', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens['FEE-VALUE']).toEqual('50:1.4');
  });

  it('must return an object that contains FEE-ID, FEE-CURRENCY, FEE-LOCALE, FEE-ENTITY TYPE, FEE-ENTITY PROPERTY, FEE-TYPE, FEE-VALUE', () => {
    const customFCSFromTokens = createCustomFCSFromTokens([
      'LNPY1223',
      'NGN',
      'LOCL',
      'CREDIT-CARD(*)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '50:1.4'
    ]);
    expect(customFCSFromTokens).toEqual(
      {
        'FEE-ID': 'LNPY1223',
        'FEE-CURRENCY': 'NGN',
        'FEE-LOCALE': 'LOCL',
        'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '*' },
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': '50:1.4'
      }
    );
  });
});

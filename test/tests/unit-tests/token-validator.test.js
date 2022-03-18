
const tokenValidator = require('../../../src/helpers/validators/tokenValidator');
describe('tokens  validator', () => {
  it('should return error message if FEE-ID is not present at first index ', () => {
    expect(tokenValidator([
      '',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'PERC',
      '5.0'
    ], 0)).toEqual({ error: 'FEE-ID is missing for Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should return error message if FEE-CURRENCY is not present at second index ', () => {
    expect(tokenValidator([
      'LNPY1222',
      '',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'PERC',
      '5.0'
    ], 0)).toEqual({ error: 'FEE-CURRENCY is missing for Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should return error message if FEE-LOCALE  is not present at third index ', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      '',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'PERC',
      '5.0'
    ], 0)).toEqual({ error: 'FEE-LOCALE is missing for Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should return error message if FEE-ENTITY is not present at third index ', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      '',
      ':',
      'APPLY',
      'PERC',
      '5.0'
    ], 0)).toEqual({ error: 'FEE-ENTITY is missing for Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should return error message if token at forth index is not ":" ', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      '-',
      'APPLY',
      'PERC',
      '5.0'
    ], 0)).toEqual({ error: '[Syntax Error]: Expexted token after LNPY1222  NGN INTL  CREDIT-CARD(VISA) to be  :  at Fee Configuration Spec: 0' });
  });

  it('should return error message if token at fifth index is not "APPLY" ', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'WRONG_TEXT_HERE',
      'PERC',
      '5.0'
    ], 0)).toEqual({ error: '[Syntax Error]: Expexted token after LNPY1222  NGN INTL  CREDIT-CARD(VISA) : to be APPLY at Fee Configuration Spec: 0' });
  });

  it('should return error message if token at sixth index is not present ', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      '',
      '5.0'
    ], 0)).toEqual({ error: 'FEE-TYPE is missing for Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should return error message if token at sixth index is not present ', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'FLAT',
      ''
    ], 0)).toEqual({ error: 'FEE-VALUE is missing for Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should only allow a string combination of int and float at token 7 if the token at index 6 is FLAT_PERC ', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '0.3'
    ], 0)).toEqual({ error: 'FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float]  at Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should only allow positive integer and positive float in this format "int:float"', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'FLAT_PERC',
      'a:b'
    ], 0)).toEqual({ error: 'FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float] at Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should return an error if token at index 6 id FLAT_PERC and token at index 7 contains a negative integer', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '-10:3.0'
    ], 0)).toEqual({ error: 'FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float] at Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should return an error if token at index 6 id FLAT_PERC and token at index 7 contains a negative floating point number', () => {
    expect(tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '10:-3.0'
    ], 0)).toEqual({ error: 'FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float]  at Fee Configuration Spec: 0 , please check FeeConfigurationSpec and try again' });
  });

  it('should accept zero for token 7 if token 6 is set to FLAT', () => {
    const validationResult = tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'FLAT',
      '0'
    ], 0);
    expect(validationResult.allTokensPresent).toBeDefined();
  });

  it('should accept zero for token 7 if token 6 is set to PERC', () => {
    const validationResult = tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'PERC',
      '0'
    ], 0);
    expect(validationResult.allTokensPresent).toBeDefined();
  });

  it('should accept zero for token 7 if token 6 is set to FLAT_PERC', () => {
    const validationResult = tokenValidator([
      'LNPY1222',
      'NGN',
      'INTL',
      'CREDIT-CARD(VISA)',
      ':',
      'APPLY',
      'FLAT_PERC',
      '0:0'
    ], 0);
    expect(validationResult.allTokensPresent).toBeDefined();
  });
});

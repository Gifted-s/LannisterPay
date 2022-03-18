const fcsValidator = require('../../../src/helpers/validators/fcsValidator');
const createFakeFCS = require('../../fixtures/createFakeFCS');

describe('FCS validator', () => {
  describe('FEE-ID validation', () => {
    it('should return error message(\"FEE-ID\" is not allowed to be empty) if FEE-ID is missing ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ID': ''
      })).toEqual({ error: '\"FEE-ID\" is not allowed to be empty' });
    });

    it('should return error message("\"FEE-ID\" must be a string") if FEE-ID is not set to a string ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ID': null
      })).toEqual({ error: '"FEE-ID" must be a string' });

      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ID': 1
      })).toEqual({ error: '"FEE-ID" must be a string' });

      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ID': []
      })).toEqual({ error: '"FEE-ID" must be a string' });
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ID': true
      })).toEqual({ error: '"FEE-ID" must be a string' });
    });
  });

  describe('FEE-CURRENCY validation', () => {
    it('should return error message(No fee configuration for empty currency(no currency present) transactions.) if FEE-CURRENCY is missing ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-CURRENCY': ''
      })).toEqual({ error: 'No fee configuration for empty currency(no currency present) transactions.' });
    });

    it('should return error message(No fee configuration for USD transactions. if FEE-CURRENCY is set to unsupported currency e.g USD ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-CURRENCY': 'USD'
      })).toEqual({ error: 'No fee configuration for USD transactions.' });
    });

    it('should accept * as FEE-CURRENCY ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-CURRENCY': '*'
      });
      expect(isValid.value).toBeDefined();
    });

    it('should accept NGN as FEE-CURRENCY ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-CURRENCY': 'NGN'
      });
      expect(isValid.value).toBeDefined();
    });
  });

  describe('FEE-LOCALE validation', () => {
    it('should return error message("\"FEE-LOCALE\" must be one of [LOCL, INTL, *]) if FEE-LOCALE is missing ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-LOCALE': ''
      })).toEqual({ error: '\"FEE-LOCALE\" must be one of [LOCL, INTL, *]' });
    });

    it('should return error message("\"FEE-LOCALE\" must be one of [LOCL, INTL, *]) if FEE-LOCALE is not one of LOCL, INTL or *', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-LOCALE': 'INVALIDLOCAL'
      })).toEqual({ error: '"FEE-LOCALE" must be one of [LOCL, INTL, *]' });
    });

    it('should accept * as FEE-LOCALE', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-LOCALE': '*'
      });
      expect(isValid.value).toBeDefined();
    });

    it('should accept LOCL as FEE-LOCALE ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-LOCALE': 'LOCL'
      });
      expect(isValid.value).toBeDefined();
    });
    it('should accept INTL as FEE-LOCALE ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-LOCALE': 'INTL'
      });
      expect(isValid.value).toBeDefined();
    });
  });

  describe('FEE-ENTITY validation', () => {
    it('should return error message("FEE-ENTITY" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]) if FEE-ENTITY is missing ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: '', 'ENTITY-PROPERTY': 'MASTERCARD' }
      })).toEqual({ error: '"FEE-ENTITY" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]' });
    });

    it('should return error message(""FEE-ENTITY" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]) if FEE-ENTITY is not one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'INVALID_FEE_ENTITY', 'ENTITY-PROPERTY': 'MASTERCARD' }
      })).toEqual({ error: '"FEE-ENTITY" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]' });
    });

    it('should accept * as FEE_ENTITY', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: '*', 'ENTITY-PROPERTY': 'MASTERCARD' }
      });
      expect(isValid.value).toBeDefined();
    });

    it('should accept CREDIT-CARD as FEE_ENTITY ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': 'MASTERCARD' }
      });
      expect(isValid.value).toBeDefined();
    });
    it('should accept DEBIT-CARD as FEE_ENTITY ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'DEBIT-CARD', 'ENTITY-PROPERTY': 'VISA' }
      });
      expect(isValid.value).toBeDefined();
    });

    it('should accept BANK-ACCOUNT as FEE_ENTITY ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'BANK-ACCOUNT', 'ENTITY-PROPERTY': 'FIRST BANK' }
      });
      expect(isValid.value).toBeDefined();
    });

    it('should accept USSD as FEE_ENTITY ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'USSD', 'ENTITY-PROPERTY': '8347384738' }
      });
      expect(isValid.value).toBeDefined();
    });

    it('should accept WALLET-ID as FEE_ENTITY ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'WALLET-ID', 'ENTITY-PROPERTY': 'A3fk3B' }
      });
      expect(isValid.value).toBeDefined();
    });
  });

  describe('ENTITY-PROPERTY validation', () => {
    it('should return error message(\"FEE-ENTITY.ENTITY-PROPERTY\" is required" is required is not allowed to be empty) if ENTITY-PROPERTY is missing ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'CREDIT-CARD' }
      })).toEqual({ error: '\"FEE-ENTITY.ENTITY-PROPERTY\" is required' });
    });

    it('should return error message(\"FEE-ENTITY.ENTITY-PROPERTY\" is not allowed to be empty) if ENTITY-PROPERTY is set to empty string', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '' }
      })).toEqual({ error: '\"FEE-ENTITY.ENTITY-PROPERTY\" is not allowed to be empty' });
    });

    it('should accept * as ENTITY-PROPERTY', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-ENTITY': { TYPE: 'CREDIT-CARD', 'ENTITY-PROPERTY': '*' }
      });
      expect(isValid.value).toBeDefined();
    });
  });

  describe('FEE-TYPE validation', () => {
    it('should return error message("\"FEE-TYPE\" must be one of [FLAT, PERC, FLAT_PERC]) if FEE-TYPE is missing ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': ''
      })).toEqual({ error: '\"FEE-TYPE\" must be one of [FLAT, PERC, FLAT_PERC]' });
    });

    it('should return error message("\"FEE-TYPE\" must be one of [FLAT, PERC, FLAT_PERC]) if FEE-TYPE is not one of FLAT, PERC, FLAT_PERC', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'INVALID_FEE_TYPE'
      })).toEqual({ error: '"FEE-TYPE" must be one of [FLAT, PERC, FLAT_PERC]' });
    });

    it('should accept PERC as FEE-TYPE', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': 0.1
      });
      expect(isValid.value).toBeDefined();
    });

    it('should accept FLAT as FEE-TYPE', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'FLAT',
        'FEE-VALUE': 10
      });
      expect(isValid.value).toBeDefined();
    });
    it('should accept FLAT_PERC as FEE-TYPE ', () => {
      const isValid = fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': '23:0.5'
      });
      expect(isValid.value).toBeDefined();
    });
  });

  describe('FEE-VALUE validation', () => {
    it('should return error message(\"FEE-VALUE\" is not allowed to be empty) if FEE-VALUE is missing ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': ''
      })).toEqual({ error: '\"FEE-VALUE\" is not allowed to be empty' });
    });

    it('should return error message(\"FEE-VALUE\" must be an integer) if FEE-TYPE is FLAT and FEE-VALUE is not an integer ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'FLAT',
        'FEE-VALUE': 0.3
      })).toEqual({ error: '\"FEE-VALUE\" must be an integer' });
    });

    it('should return error message(\"FEE-VALUE\" must be a string) if FEE-TYPE is FLAT_PERC and FEE-VALUE is not a string ', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'FLAT_PERC',
        'FEE-VALUE': 0.2
      })).toEqual({ error: '\"FEE-VALUE\" must be a string' });
    });

    it('should return error message("FEE-VALUE\" must be a positive number) if FEE-TYPE is FLAT and FEE-VALUE is negative', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'FLAT',
        'FEE-VALUE': -2
      })).toEqual({ error: '"FEE-VALUE\" must be a positive number' });
    });

    it('should return error message("FEE-VALUE\" must be a positive number) if FEE-TYPE is PERC and FEE-VALUE is negative', () => {
      expect(fcsValidator({
        ...createFakeFCS(),
        'FEE-TYPE': 'PERC',
        'FEE-VALUE': -2.5
      })).toEqual({ error: '"FEE-VALUE\" must be a positive number' });
    });
  });
});

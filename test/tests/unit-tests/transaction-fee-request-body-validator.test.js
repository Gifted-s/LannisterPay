
const transactioFeeBodyValidator = require('../../../src/helpers/validators/transactioFeeBodyValidator');
const createFakeTransactionFeeBody = require('../../fixtures/createFakeTransactionFeeBody');

describe('Transaction Fee request body validator', () => {

  // TEST P ID
  it('should return error message if the ID field is missing ', () => {
    expect(transactioFeeBodyValidator({
      ...createFakeTransactionFeeBody(),
      ID: undefined
    })).toEqual({ error: '\"ID\" is required' });
  });

  it('should return error message if the ID field is set to a type other than positive integer', () => {
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ ID: null }))).toEqual({ error: '\"ID\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ ID: [] }))).toEqual({ error: '\"ID\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ ID: 'not accepted' }))).toEqual({ error: '\"ID\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ ID: true }))).toEqual({ error: '\"ID\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ ID: -12 }))).toEqual({ error: '\"ID\" must be a positive number' });
  });

   // TEST AMOUNT FIELD
  it('should return error message if the Amount field is missing ', () => {
    expect(transactioFeeBodyValidator({
      ...createFakeTransactionFeeBody(),
      Amount: undefined
    })).toEqual({ error: '\"Amount\" is required' });
  });

  it('should return error message if the Amount field is set to a type other than positive integer', () => {
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ Amount: null }))).toEqual({ error: '\"Amount\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ Amount: [] }))).toEqual({ error: '\"Amount\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ Amount: 'not accepted' }))).toEqual({ error: '\"Amount\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ Amount: true }))).toEqual({ error: '\"Amount\" must be a number' });
  });

   // TEST CURRENCY FIELD
  it('should return error message if the currency is an empty string', () => {
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ Currency: '' }))).toEqual({ error: 'No fee configuration for this currency(Empty Currency is not allowed) transactions.' });
  });
  it('should return error message if the currency is an unsupported currency', () => {
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ Currency: 'USD' }))).toEqual({ error: 'No fee configuration for USD transactions.' });
  });

  it('should return error message if the CurrencyCountry field is missing ', () => {
    expect(transactioFeeBodyValidator({
      ...createFakeTransactionFeeBody(),
      CurrencyCountry: undefined
    })).toEqual({ error: '\"CurrencyCountry\" is required' });
  });

  it('should return error message if the Curency field is set to a type other than a string', () => {
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ CurrencyCountry: null }))).toEqual({ error: '\"CurrencyCountry\" must be a string' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ CurrencyCountry: [] }))).toEqual({ error: '\"CurrencyCountry\" must be a string' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ CurrencyCountry: 10 }))).toEqual({ error: '\"CurrencyCountry\" must be a string' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({ CurrencyCountry: true }))).toEqual({ error: '\"CurrencyCountry\" must be a string' });
  });

   // TEST CUSTOMER ID FIELD
  it('should return error message if the Customer ID field is missing ', () => {
    expect(transactioFeeBodyValidator({
      ...createFakeTransactionFeeBody(),
      Customer: {
        ID: undefined,
        EmailAddress: 'anonimized29900@anon.io',
        FullName: 'Abel Eden',
        BearsFee: true
      }
    })).toEqual({ error: '\"Customer.ID\" is required' });
  });

  it('should return error message if the Customer ID field is set to a type other than a number', () => {
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: null,
        EmailAddress: 'anonimized29900@anon.io',
        FullName: 'Abel Eden',
        BearsFee: true
      }
    }))).toEqual({ error: '\"Customer.ID\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: [],
        EmailAddress: 'anonimized29900@anon.io',
        FullName: 'Abel Eden',
        BearsFee: true
      }
    }))).toEqual({ error: '\"Customer.ID\" must be a number' });
    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: -12,
        EmailAddress: 'anonimized29900@anon.io',
        FullName: 'Abel Eden',
        BearsFee: true
      }
    }))).toEqual({ error: '\"Customer.ID\" must be a positive number' });

    expect(transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: true,
        EmailAddress: 'anonimized29900@anon.io',
        FullName: 'Abel Eden',
        BearsFee: true
      }
    }))).toEqual({ error: '\"Customer.ID\" must be a number' });
  });

   // TEST CUSTOMER EMAIL ADDRESS FIELD
  it('should return error message if the Customer EmailAddress field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: undefined,
      FullName: 'Abel Eden',
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.EmailAddress\" is required');
  });

  it('should return error message if the Customer EmailAddress field is set to any type other than a  string in email format', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: 1,
      FullName: 'Abel Eden',
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.EmailAddress\" must be a string');
  });

  it('should return error message if the Customer EmailAddress field is set to any type other than a  string in email format', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: [],
      FullName: 'Abel Eden',
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.EmailAddress\" must be a string');
  });
  it('should return error message if the Customer EmailAddress field is set to any type other than a  string in email format', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: null,
      FullName: 'Abel Eden',
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.EmailAddress\" must be a string');
  });
  it('should return error message if the Customer EmailAddress field is set to any type other than a  string in email format', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: 'invalidmail',
      FullName: 'Abel Eden',
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.EmailAddress\" must be a valid email');
  });
  it('should return error message if the Customer EmailAddress field is set to any type other than a  string in email format', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: {},
      FullName: 'Abel Eden',
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.EmailAddress\" must be a string');
  });

  it('should accept a customer email which is a  string in email format', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: 'validemail@gmail.com',
      FullName: 'Abel Eden',
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual(undefined);
  });

    // TEST CUSTOMER FULLNAME FIELD
  it('should return error message if the Customer FullName field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: 12,
        EmailAddress: 'validemail@gmail.com',
        FullName: '',
        BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.FullName\" is not allowed to be empty');
  });

  it('should return error message if the Customer FullName is set to anthing other than a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: 'test@example.com',
      FullName: 1,
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.FullName\" must be a string');
  });

  it('should return error message if the Customer FullName is set to anthing other than a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: 'test@example.com',
      FullName: [],
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.FullName\" must be a string');
  });

  it('should return error message if the Customer FullName is set to anthing other than a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: 'test@example.com',
      FullName: {},
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.FullName\" must be a string');
  });
  it('should return error message if the Customer FullName is set to anything other than a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
      ID: 12,
      EmailAddress: 'test@example.com',
      FullName: true,
      BearsFee: true
    }}));
    expect(validationResult.error).toEqual('\"Customer.FullName\" must be a string');
  });







  // TEST CUSTOMER BEARSFEE FIELD
  it('should return error message if the Customer BearsFee field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: 12,
        EmailAddress: 'validemail@gmail.com',
        FullName: 'Full Name',
        BearsFee: null
    }}));
    expect(validationResult.error).toEqual('\"Customer.BearsFee\" must be a boolean');
  });

  it('should return error message if the Customer BearsFee field is another type aside a boolean', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: 12,
        EmailAddress: 'validemail@gmail.com',
        FullName: 'Full Name',
        BearsFee: 7
    }}));
    expect(validationResult.error).toEqual('\"Customer.BearsFee\" must be a boolean');
  });
  it('should return error message if the Customer BearsFee field is another type aside a boolean', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: 12,
        EmailAddress: 'validemail@gmail.com',
        FullName: 'Full Name',
        BearsFee: []
    }}));
    expect(validationResult.error).toEqual('\"Customer.BearsFee\" must be a boolean');
  });
  it('should return error message if the Customer BearsFee field is another type aside a boolean', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      Customer: {
        ID: 12,
        EmailAddress: 'validemail@gmail.com',
        FullName: 'Full Name',
        BearsFee: {}
    }}));
    expect(validationResult.error).toEqual('\"Customer.BearsFee\" must be a boolean');
  });




  // TEST PAYMENT ENITITY ID FIELD
  it('should return error message if the PaymentEntity ID field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": undefined,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.ID\" is required');
  });

  it('should return error message if the PaymentEntity ID field is set to any type aside positive integer ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": '',
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.ID\" must be a number');
  });


  it('should return error message if the PaymentEntity ID field is set to any type aside positive integer ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": [],
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.ID\" must be a number');
  });



  it('should return error message if the PaymentEntity ID field is set to any type aside positive integer ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": {},
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.ID\" must be a number');
  });


  it('should return error message if the PaymentEntity ID field is set to any type aside positive integer ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": true,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.ID\" must be a number');
  });



  

  // TEST PAYMENT ENITITY ISSUER FIELD
  it('should return error message if the PaymentEntity Issuer field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": undefined,
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Issuer\" is required');
  });

  it('should return error message if the PaymentEntity Issuer field is set to empty string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": '',
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Issuer\" is not allowed to be empty');
  });

  it('should return error message if the PaymentEntity Issuer field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": [],
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Issuer\" must be a string');
  });

  it('should return error message if the PaymentEntity Issuer field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": {},
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Issuer\" must be a string');
  });

  it('should return error message if the PaymentEntity Issuer field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": 1,
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Issuer\" must be a string');
  });

 // TEST PAYMENT BRAND FIELD
  it('should return error message if the PaymentEntity Brand field is empty', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": undefined,
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Brand\" is required');
  });


  it('should return error message if the PaymentEntity Brand field is empty string and PaymentEntity is set to CREDIT-CARD or DEBIT-CARD ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": '',
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Brand\" is not allowed to be empty');
  });



   // TEST PAYMENT ENITITY TYPE FIELD
  it('should allow empty string is PaymentEntity Type is not one of CREDIT-CARD or DEBIT-CARD ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": '',
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "USSD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });

   


  it('should allow empty string is PaymentEntity Type is not one of CREDIT-CARD or DEBIT-CARD ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": '',
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "USSD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });



   // TEST PAYMENT ENITITY BRAND FIELD
  it('should return error message if the PaymentEntity Brand field is set to any type aside string and PaymentEntity is set to CREDIT-CARD or DEBIT-CARD ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": [],
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Brand\" must be a string');
  });




  it('should return error message if the PaymentEntity Brand field is set to any type aside string and PaymentEntity is set to CREDIT-CARD or DEBIT-CARD ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": {},
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Brand\" must be a string');
  });


  it('should return error message if the PaymentEntity Brand field is set to any type aside string and PaymentEntity is set to CREDIT-CARD or DEBIT-CARD ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": true,
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Brand\" must be a string');
  });

  it('should return error message if the PaymentEntity Brand field is set to any type aside string and PaymentEntity is set to CREDIT-CARD or DEBIT-CARD ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "MASTERCARD",
        "Brand": 3,
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Brand\" must be a string');
  });




 // TEST PAYMENT ENITITY NUMBER FIELD
  it('should return error message if the PaymentEntity Number field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": undefined,
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Number\" is required');
  });

  it('should return error message if the PaymentEntity Number field is set to empty string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": '',
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Number\" is not allowed to be empty');
  });

  it('should return error message if the PaymentEntity Number field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": [],
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Number\" must be a string');
  });
  it('should return error message if the PaymentEntity Number field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": {},
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Number\" must be a string');
  });
  it('should return error message if the PaymentEntity Number field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": 1,
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Number\" must be a string');
  });

  it('should return error message if the PaymentEntity Number field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": true,
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Number\" must be a string');
  });





  // Test Payment Entity SixID field

  it('should return error message if the PaymentEntity SixID field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": undefined,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.SixID\" is required');
  });

  it('should return error message if the PaymentEntity SixID field is set to empty string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": '',
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.SixID\" is not allowed to be empty');
  });

  it('should allow positive integer', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 1232454,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });


  it('should allow a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": "1232454",
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });



  it('should return error message if the PaymentEntity SixID field is not set to positive integer or string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": [],
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.SixID\" must be one of [number, string]');
  });



  it('should return error message if the PaymentEntity SixID field is not set to positive integer or string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": {},
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.SixID\" must be one of [number, string]');
  });

  it('should return error message if the PaymentEntity SixID field is not set to positive integer or string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": true,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.SixID\" must be one of [number, string]');
  });




  // Test Payment Entity Type Field


  it('should return error message if the PaymentEntity Type field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 9898989,
        "Type": undefined,
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Type\" is required');
  });

  it('should return error message if the PaymentEntity Type field is set to empty string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": "",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"Payment Type\" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]');
  });

  it('should return error message if the PaymentEntity Type field is set to any type aside string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": 1,
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"Payment Type\" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]');
  });


  it('should return error message if the PaymentEntity Type field is set to any type aside string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": [],
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"Payment Type\" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]');
  });


  it('should return error message if the PaymentEntity Type field is set to any type aside string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": {},
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual('\"Payment Type\" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]');
  });

  it('should accept CREDIT-CARD as Payment Entity Type ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });

  it('should accept DEBIT-CARD as Payment Entity Type ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": "DEBIT-CARD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });


  it('should accept BANK-ACCOUNT as Payment Entity Type ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": "BANK-ACCOUNT",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });


  it('should accept USSD as Payment Entity Type ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": "USSD",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });


  it('should accept WALLET-ID as Payment Entity Type ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": "WALLET-ID",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });


  it('should accept * as Payment Entity Type ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "63874***3434",
        "SixID": 566656,
        "Type": "*",
        "Country": "NG"
    }}));
    expect(validationResult.error).toEqual(undefined);
  });




   // TEST PAYMENT ENITITY COUNTRY FIELD

  it('should return error message if the PaymentEntity Country field is missing ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "1343434",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": undefined
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Country\" is required');
  });

  it('should return error message if the PaymentEntity Country field is set to empty string ', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "1343434",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": ""
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Country\" is not allowed to be empty');
  });

  it('should return error message if the PaymentEntity Country field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "3434343",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": []
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Country\" must be a string');
  });
 

  it('should return error message if the PaymentEntity Country field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "3434343",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": {}
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Country\" must be a string');
  });


  it('should return error message if the PaymentEntity Country field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "3434343",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": 1
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Country\" must be a string');
  });
  it('should return error message if the PaymentEntity Country field is set to any field aside a string', () => {
    const validationResult = transactioFeeBodyValidator(createFakeTransactionFeeBody({
      "PaymentEntity": {
        "ID": 12212,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "3434343",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": true
    }}));
    expect(validationResult.error).toEqual('\"PaymentEntity.Country\" must be a string');
  });


});

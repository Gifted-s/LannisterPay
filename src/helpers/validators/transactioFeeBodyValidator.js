const Joi = require('joi');
module.exports = function transactionFeeBodyValidator (payload) {
  const transactionFeeBodySchema = Joi.object({
    ID: Joi.number().integer().positive().required(),
    Amount: Joi.number().integer().positive().allow(0).required(),
    Currency: Joi.string().valid('NGN').messages({
      'any.only': `No fee configuration for ${payload.Currency ? payload.Currency : 'this currency(Empty Currency is not allowed)'} transactions.`
    }),
    CurrencyCountry: Joi.string().required(),

    Customer: Joi.object({
      ID: Joi.number().integer().positive().required(),
      EmailAddress: Joi.string().email().required(),
      FullName: Joi.string().required(),
      BearsFee: Joi.boolean().required(),
    }),

    PaymentEntity: Joi.object({
      ID: Joi.number().integer().positive().required(),
      Issuer: Joi.string().required(),
      Brand: Joi.alternatives().conditional('Type', { switch: [{ is: 'CREDIT-CARD', then: Joi.string().required() }, { is: 'DEBIT-CARD', then: Joi.string().required(), otherwise: Joi.string().allow(null, '') }] }),
      Number: Joi.string().required(),
      SixID: Joi.alternatives().try(Joi.number().integer().positive().required(), Joi.string().required()).required(),
      Type: Joi.string().required().valid('CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID', '*').messages({
        'any.only': '"Payment Type" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]'
      }),
      Country: Joi.string().required()
    })

  });

  const validationResult = transactionFeeBodySchema.validate(payload, { abortEarly: false });
  if (validationResult.error) {
    return { error: validationResult.error.details[0].message };
  }
  return validationResult;
};

const Joi = require('joi');

module.exports = function (payload) {
  const fcsValidationSchema = Joi.object({
    'FEE-ID': Joi.string().alphanum().length(8).required(),

    'FEE-CURRENCY': Joi.string().valid('NGN', '*').messages({
      'any.only': `No fee configuration for ${payload['FEE-CURRENCY']} transactions.`
    }),

    'FEE-LOCALE': Joi.string()
      .valid('LOCL', 'INTL', '*'),

    'FEE-ENTITY': Joi.object({
      TYPE: Joi.string().valid('CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID', '*').messages({
        'any.only': '"FEE-ENTITY" must be one of [CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID, *]'
      }),
      'ENTITY-PROPERTY': Joi.string().required()
    }),

    'FEE-TYPE': Joi.string().valid('FLAT', 'PERC', 'FLAT_PERC'),

    'FEE-VALUE': Joi.alternatives().conditional('FEE-TYPE', { switch: [{ is: 'FLAT', then: Joi.number().integer().positive().required() }, { is: 'PERC', then: Joi.number().integer().positive().required() }, { is: 'FLAT_PERC', then: Joi.string() }] })

  });

  const validationResult = fcsValidationSchema.validate(payload, { abortEarly: false });
  if (validationResult.error) {
    return { error: validationResult.error.details[0].message };
  }
  return validationResult;
};

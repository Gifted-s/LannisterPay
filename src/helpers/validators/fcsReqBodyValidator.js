
const Joi = require('joi');
/**
 * @desc
 */
module.exports = function fcsReqBodyValidator (payload) {
  const fcsReqBodySchema = Joi.object({
    FeeConfigurationSpec: Joi.string()
      .required()
  });

  const validationResult = fcsReqBodySchema.validate(payload);
  if (validationResult.error) {
    return { error: validationResult.error.details[0].message };
  }
  return validationResult;
};

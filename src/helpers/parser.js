
const createCustomFCSFromTokens = require('./createCustomFCSFromTokens');
const fcsSchemaValidator = require('./validators/fcsValidator');
const tokenValidator = require('./validators/tokenValidator');

const fcsParser = (rawFCSString) => {
  const fcsStringArray = rawFCSString.split('\n');

  const configs = [];
  for (let i = 0; i < fcsStringArray.length; i++) {
    const tokens = fcsStringArray[i].split(' ');
    const tokenValidationResult = tokenValidator(tokens, i + 1);
    if (tokenValidationResult.error) {
      return { error: tokenValidationResult.error };
    }
    const customFCSConfigFromTokens = createCustomFCSFromTokens(tokens);
    const validationResult = fcsSchemaValidator(customFCSConfigFromTokens);
    if (validationResult.error) {
      return { error: `${validationResult.error} at Fee Configuration Spec: ${i + 1} ` };
    }
    configs.push(customFCSConfigFromTokens);
  }
  return configs;
};

module.exports = fcsParser;

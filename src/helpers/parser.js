
const createCustomFCSFromTokens = require('./createCustomFCSFromTokens');
const fcsSchemaValidator = require('./validators/fcsValidator');
const tokenValidator = require('./validators/tokenValidator');
/**
 *
 * @param {string} rawFCSString fee configuration specification in string format
 * @returns {array[object]} array of valid customized fee configuration specification in cutomized format
 */
const fcsParser = (rawFCSString) => {
  const fcsStringArray = rawFCSString.split('\n');

  const configs = [];
  for (let i = 0; i < fcsStringArray.length; i++) {

    /**  extract tokens from each transaction configuration specification string */
    const tokens = fcsStringArray[i].split(' ');
    /** validate tokens */
    const tokenValidationResult = tokenValidator(tokens, i + 1);

    /** check and handle error while validating tokens */
    if (tokenValidationResult.error) {
      return { error: tokenValidationResult.error };
    }

    /** create customized transaction configuration specification from tokens  */
    const customFCSConfigFromTokens = createCustomFCSFromTokens(tokens);

    /** validate custom fee configuration specification  */
    const validationResult = fcsSchemaValidator(customFCSConfigFromTokens);
    
    /** check and handle error found while validating custom fcs */
    if (validationResult.error) {
      return { error: `${validationResult.error} at Fee Configuration Spec: ${i + 1} ` };
    }
    configs.push(customFCSConfigFromTokens);
  }
  return configs;
};

module.exports = fcsParser;

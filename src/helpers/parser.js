
const fcsSchemaValidator = require('./validators/fcsValidator');
const tokenValidator = require('./validators/tokenValidator');

const fcsParser = (rawFCSString) => {
  const fcsStringArray = rawFCSString.split('\n');

  const configs = [];
  for (let i = 0; i < fcsStringArray.length; i++) {
    const tempFCS = {};
    const tokens = fcsStringArray[i].split(' ');
    const tokenValidationResult = tokenValidator(tokens, i + 1);
    if (tokenValidationResult.error) {
      return { error: tokenValidationResult.error };
    }
    tempFCS['FEE-ID'] = tokens[0];
    tempFCS['FEE-CURRENCY'] = tokens[1];
    tempFCS['FEE-LOCALE'] = tokens[2];
    tempFCS['FEE-ENTITY'] = { TYPE: tokens[3].slice(0, tokens[3].indexOf('(')) };
    tempFCS['FEE-ENTITY']['ENTITY-PROPERTY'] = tokens[3].slice(tokens[3].indexOf('(') + 1, tokens[3].length - 1);
    tempFCS['FEE-TYPE'] = tokens[6];
    tempFCS['FEE-VALUE'] = tokens[7];
    const validationResult = fcsSchemaValidator(tempFCS);
    if (validationResult.error) {
      return { error: `${validationResult.error} at Fee Configuration Spec: ${i + 1} ` };
    }
    configs.push(tempFCS);
  }

  return configs;
};

module.exports = fcsParser;

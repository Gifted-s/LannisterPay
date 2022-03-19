/**
 * @description createCustomFCSFromTokens will create a customized fee configuration specification from an array of tokens
 * @param {array} tokens an array of tokens to be used to construct customized configuration specification
 * @returns {object} customized configuration
 */
function createCustomFCSFromTokens (tokens) {
  const customFCS = {};
  customFCS['FEE-ID'] = tokens[0];
  customFCS['FEE-CURRENCY'] = tokens[1];
  customFCS['FEE-LOCALE'] = tokens[2];
  customFCS['FEE-ENTITY'] = { TYPE: tokens[3].slice(0, tokens[3].indexOf('(')) };
  customFCS['FEE-ENTITY']['ENTITY-PROPERTY'] = tokens[3].slice(tokens[3].indexOf('(') + 1, tokens[3].length - 1);
  customFCS['FEE-TYPE'] = tokens[6];
  customFCS['FEE-VALUE'] = tokens[7];
  return customFCS;
}

module.exports = createCustomFCSFromTokens;

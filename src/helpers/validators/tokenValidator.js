module.exports = function (tokens, fcsConfigNumber) {
  if (!tokens[0]) {
    return { error: `FEE-ID is missing for Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
  }

  if (!tokens[1]) {
    return { error: `FEE-CURRENCY is missing for Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
  }

  if (!tokens[2]) {
    return { error: `FEE-LOCALE is missing for Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
  }

  if (!tokens[3]) {
    return { error: `FEE-ENTITY is missing for Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
  }

  if (tokens[4] !== ':') {
    return { error: `[Syntax Error]: Expexted token after ${tokens[0]}  ${tokens[1]} ${tokens[2]}  ${tokens[3]} to be  :  at Fee Configuration Spec: ${fcsConfigNumber}` };
  }
  if (tokens[5] !== 'APPLY') {
    return { error: `[Syntax Error]: Expexted token after ${tokens[0]}  ${tokens[1]} ${tokens[2]}  ${tokens[3]} ${tokens[4]} to be APPLY at Fee Configuration Spec: ${fcsConfigNumber}` };
  }
  if (!tokens[6]) {
    return { error: `FEE-TYPE is missing for Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
  }
  if (!tokens[7]) {
    return { error: `FEE-VALUE is missing for Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
  }
  if (tokens[6] === 'PERC') {
    if (!parseFloat(tokens[7]) && parseFloat(tokens[7]) !== 0) {
      return { error: `FEE-VALUE is not represented as a positive Float at Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
    }
  } else if (tokens[6] === 'FLAT') {
    if (!parseInt(tokens[7]) && parseInt(tokens[7]) !== 0) {
      return { error: `FEE-VALUE is not represented as a positive Integer at Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
    }
  } else if (tokens[6] === 'FLAT_PERC') {
    const feeValueToArray = tokens[7].split(':');
    if (!parseInt(feeValueToArray[0]) && parseInt(feeValueToArray[0]) !== 0) {
      return { error: `FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float] at Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
    }
    if (parseInt(feeValueToArray[0]) < 0) {
      return { error: `FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float] at Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
    }
    if (!parseFloat(feeValueToArray[1]) && parseFloat(feeValueToArray[1]) !== 0) {
      return { error: `FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float]  at Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
    }
    if (parseFloat(feeValueToArray[1]) < 0) {
      return { error: `FEE-VALUE must contain a Positive Integer and a Positive Float Number in this format [int:float]  at Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
    }
  } else {
    return { error: `FEE-VALUE is not valid try representing it as a Float, Integer or in the format "[Integer:Float]" Fee Configuration Spec: ${fcsConfigNumber} , please check FeeConfigurationSpec and try again` };
  }

  return { allTokensPresent: true };
};

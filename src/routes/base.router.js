const express = require('express');
const { handleAddConfigurationSpec, handleComputeTransactionFee } = require('../controller/fee.controller');
const fcsParser = require('../helpers/parser');
const fcsReqBodyValidator = require('../helpers/validators/fcsReqBodyValidator');
const transactioFeeBodyValidator = require('../helpers/validators/transactioFeeBodyValidator');
const baseRouter = express.Router();

/**
 * @description base route to indicate that server is up
 */

baseRouter.get('/', (req, res, next) => {
  return res.status(200).send({ STATUS: 'SERVER IS UP ' });
});

/**
 * @description /fees (this route will handle inserting a new transfer configuration specification to the database)
 * @param {object} req request object from router
 * @param {object} res response object from router
 * @returns error or 200 ok status
 * @example
  Request body sample
  {
  "FeeConfigurationSpec": "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55"
  }
  Success status(200) example
  {
    "status": "ok"
  }
  Error status(400) example
  {
      "Error": "FEE-VALUE is missing for Fee Configuration Spec: 5 , please check FeeConfigurationSpec and try again"
  }
 */
baseRouter.post('/fees', async (req, res) => {
  try {
    // validate request body
    const validationResult = fcsReqBodyValidator(req.body);
    if (validationResult.error) {
      return res.status(400).send({ Error: validationResult.error });
    }
    // create a customized structure of the fee configuration specification from the validated FeeConfigurationSpec
    const fcsCustomStruct = fcsParser(validationResult.value.FeeConfigurationSpec);
    // handle error thrown while parsing FeeConfigurationSpec
    if (fcsCustomStruct.error) {
      return res.status(400).send({ Error: fcsCustomStruct.error });
    }
    // add customized fee configuration spec to database
    const addConfigControllerResponse = await handleAddConfigurationSpec(fcsCustomStruct);
    // check and handle error while inserting configuration to database
    if (addConfigControllerResponse.error) {
      return res.status(400).send({ Error: addConfigControllerResponse.errorMessage });
    }
    // return success message with status : ok
    return res.status(200).send({ status: addConfigControllerResponse.status });
  } catch (error) {
    return res.status(500).send({ Error: error.message });
  }
});

/**
 * @description /compute-transaction-fees (this route will handle calculating transaction processing fee based on the request body)
 * @param {object} req request object from router
 * @param {object} res response object from router
 * @returns error or 200 ok status
 * @example
  Request body sample
  {
      "ID": 91203,
      "Amount": 5000,
      "Currency": "NGN",
      "CurrencyCountry": "NG",
      "Customer": {
          "ID": 2211232,
          "EmailAddress": "anonimized29900@anon.io",
          "FullName": "Abel Eden",
          "BearsFee": true
      },
      "PaymentEntity": {
          "ID": 2203454,
          "Issuer": "Airtel",
          "Brand": "MASTERCARD",
          "Number": "530191******2903",
          "SixID": 530191,
          "Type": "USSD",
          "Country": "NG"
      }
  }
 Success status(200) example
  {
      "AppliedFeeID": "LNPY1221",
      "AppliedFeeValue": 70,
      "ChargeAmount": 5070,
      "SettlementAmount": 5000
  }
  Error status(400) example
  {
      "Error": "\"Customer.FullName\" is not allowed to be empty"
  }
 */
baseRouter.post('/compute-transaction-fees', async (req, res) => {
  try {
    // validate request body
    const validationResult = transactioFeeBodyValidator(req.body);
    if (validationResult.error) {
      return res.status(400).send({ Error: validationResult.error });
    }
    // compute transaction processing fee
    const computeTransactionFeeControllerResponse = await handleComputeTransactionFee(validationResult.value);
    // check and handle error during transaction processing fee computation
    if (computeTransactionFeeControllerResponse.error) {
      return res.status(400).send({ Error: computeTransactionFeeControllerResponse.errorMessage });
    }
    // return success response i.e object that includes  AppliedFeeID, AppliedFeeValue ,ChargeAmount, SettlementAmount
    return res.status(200).send(computeTransactionFeeControllerResponse);
  } catch (error) {
    return res.status(500).send({ Error: error.message });
  }
});

module.exports = baseRouter;

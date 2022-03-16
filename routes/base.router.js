const express = require('express');
const { handleAddConfigurationSpec, handleComputeTransactionFee } = require('../controller/fee.controller');
const fcsParser = require('../helpers/parser');
const fcsReqBodyValidator = require('../helpers/validators/fcsReqBodyValidator');
const transactioFeeBodyValidator = require('../helpers/validators/transactioFeeBodyValidator');
const baseRouter = express.Router();

baseRouter.get('/', (req,res,next)=>{
  return res.status(200).send({STATUS: "SERVER IS UP "})
})
baseRouter.post('/fees', async (req, res) => {
  try {
    const validationResult = fcsReqBodyValidator(req.body);
    if (validationResult.error) {
      return res.status(400).send({ Error: validationResult.error });
    }
    const fcsCustomStruct = fcsParser(validationResult.value.FeeConfigurationSpec);
    if (fcsCustomStruct.error) {
      return res.status(400).send({ Error: fcsCustomStruct.error });
    }
    const addConfigControllerResponse = await handleAddConfigurationSpec(fcsCustomStruct);
    if (addConfigcontrollerResponse.error) {
      return res.status(400).send({ Error: addConfigControllerResponse.errorMessage });
    }
    return res.status(200).send({ status: addConfigControllerResponse.status });
  } catch (error) {
    return res.status(500).send({ Error: error.message });
  }
});

baseRouter.post('/compute-transaction-fees', async (req, res) => {
  try {
    return res.send("test")
    // const validationResult = transactioFeeBodyValidator(req.body);
    // if (validationResult.error) {
    //   return res.status(400).send({ Error: validationResult.error });
    // }
    // const computeTransactionFeeControllerResponse = await handleComputeTransactionFee(validationResult.value);
    // if (computeTransactionFeeControllerResponse.error) {
    //   return res.status(400).send({ Error: computeTransactionFeeControllerResponse.errorMessage });
    // }
    // res.status(200).send(computeTransactionFeeControllerResponse);
  } catch (error) {
    return res.status(500).send({ Error: error.message });
  }
});

module.exports = baseRouter;

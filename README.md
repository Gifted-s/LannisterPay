# Lannister Pay


## Services exposed by the library


- Store various valid fee configuration specification
- Compute transaction prosessing fee



## Requirement

- NodeJS v14.17.5 or higher [Download Nodejs from its official website)[https://nodejs.org/en/]


## Environment Variables

- Create a .env file and set NODE_ENV=developement mode

## Start server locally

Run install command on your terminal

```json
npm install
```

OR

```json
yarn install
```

Once the above command is completed then run the start command for development mode

```json
npm run start-dev
```

You should see the following log in the terminal
```console
USER_PATH:~$ npm run start-dev
==============================================
SERVER RUNNINING ON localhost:8000
MODE = development
FLOW = TRANSACTION_PROCESSING_FEE_SERVICE
==============================================
```

The server is now accessible at localhost:8000


## Run test

Run test command on your terminal

```json
npm test
```

Output

```console
USER_PATH:~$ npm test
----------------------------------|---------|----------|---------|---------|-------------------
File                              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------------|---------|----------|---------|---------|-------------------
All files                         |     100 |      100 |     100 |     100 |                   
 src/helpers                      |     100 |      100 |     100 |     100 |                   
  computeMostSuitableConfig.js    |     100 |      100 |     100 |     100 |                   
  computeTransactionFee.js        |     100 |      100 |     100 |     100 |                   
  createCustomFCSFromTokens.js    |     100 |      100 |     100 |     100 |                   
  enhancePaymentEntity.js         |     100 |      100 |     100 |     100 |                   
  parser.js                       |     100 |      100 |     100 |     100 |                   
 src/helpers/validators           |     100 |      100 |     100 |     100 |                   
  fcsReqBodyValidator.js          |     100 |      100 |     100 |     100 |                   
  fcsValidator.js                 |     100 |      100 |     100 |     100 |                   
  tokenValidator.js               |     100 |      100 |     100 |     100 |                   
  transactioFeeBodyValidator.js   |     100 |      100 |     100 |     100 |                   
 test/fixtures                    |     100 |      100 |     100 |     100 |                   
  createFakeFCS.js                |     100 |      100 |     100 |     100 |                   
  createFakeTransactionFeeBody.js |     100 |      100 |     100 |     100 |                   
  fcsStringSample.js              |     100 |      100 |     100 |     100 |                   
----------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 9 passed, 9 total
Tests:       171 passed, 171 total
Snapshots:   1 passed, 1 total
Time:        1.595 s, estimated 2 s
Ran all test suites.

```
A test coverage file is also auto generated at the root




## Run linter

The eslint coding standard and convention is used 

Run the lint command

```json
npm run lint
```


## Run Docker Image

Pull image from docker hub (ensure you have docker setup on your machine)

```json
npm run lint
```























# Lannister Pay


## Services exposed by the library


- Store various valid fee configuration specification
- Compute transaction prosessing fee



## Requirement

- NodeJS v14.17.5 or higher [Download Nodejs from its official website)[https://nodejs.org/en/]


## Environment Variables

- Create a .env file and set NODE_ENV=developement 

## Run server locally

### Option 1 (Install and run locally)

Run install command on your terminal

```console
npm install
```

OR

```console
yarn install
```

Once the above command is completed then run the start command for development mode

```console
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

### Option 2 (Pull docker image from docker hub and run locally)
Ensure docker is available and running on your machine

Run pull command

```console
docker pull ayodeji00/lannister:v1
```

Once the command above is completed then enter the docker run command
```console
$ docker run -p 8000:8000 --env NODE_ENV=development ayodeji00/lannister:v1
```

The server is now accessible at localhost:8000

### Option 3 (Build and run docker image locally)
Ensure docker is available and running on your machine

Run build command

```console
docker build . -t <your docker hub username>/lannisterpay:v1
```

Once the command above is completed then enter the docker run command
```console
$ docker run -p 8000:8000 --env NODE_ENV=development <your docker hub username>/lannister:v1
```

The server is now accessible at localhost:8000



## Run test

Run test command on your terminal

```console
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

```console
npm run lint
```


## Usage

###  Add Fee Configuration Specification

To add a valid fee configuration spec, make a HTTP POST  to http://localhost:8000/fees
#### Sample post request body

```json
{
    "FeeConfigurationSpec": "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55"
}
```
#### Sample success response body ( HTTP 200 OK )

```json
{
  "status": "ok"
}
```

#### Sample error response body ( HTTP 400 Bad Request )

```json
{
    "Error": "FEE-CURRENCY is missing for Fee Configuration Spec: 5 , please check FeeConfigurationSpec and try again"
}
```




###  Compute Transaction Processing Fee

To compute transaction processing fee, make a HTTP POST  to http://localhost:8000/compute-transaction-fee
#### Sample post request body

```json
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
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }
}
```

Request body details

**ID**: The unique id of the transaction.

**Amount**: The non-negative, numeric transaction amount.

**Currency**: The transaction currency.

**CurrencyCountry**: Country the transaction currency is applicable in. Useful for determining the transaction locale.

**Customer** An object containing the customer information. It has the following fields
    <p>&nbsp; &nbsp;  &nbsp;      **ID**: Unique id of the customer . </p>
    <p>&nbsp; &nbsp; &nbsp;       **EmailAddress**: Email address of the customer. </p>
    <p>&nbsp; &nbsp; &nbsp;       **FullName**: Full name of the customer. </p>
    <p>&nbsp; &nbsp; &nbsp;       **BearsFee**: Indicates whether or not the customer is set to bear the transaction cost. If this is true, the final amount to charge the customer is     Amount + ApplicableFee, if not, the customer is charged the same value as the transaction amount. </p>
 
  
 


**PaymentEntity** An object representing the payment entity to be charged for the transaction. It has the following fields
    <p>&nbsp; &nbsp;  &nbsp;     **ID**: - Unique id of the entity.</p>
    <p>&nbsp; &nbsp;  &nbsp;     **Issuer**: - The issuing company / organization for the entity e.g. Banks, Telco Providers / Wallet Service Providers.</p>
    <p>&nbsp; &nbsp;  &nbsp;     **Brand**: - Applicable only to card-type transactions e.g. MASTERCARD, VISA, AMEX, VERVE e.t.c. </p>
    <p>&nbsp; &nbsp;  &nbsp;     **Number**: The payment entity number (masked pan in case of credit/debit cards, bank account numbers, mobile numbers, wallet ids e.t.c.) </p>
    <p>&nbsp; &nbsp;  &nbsp;     **SixID**: The first six digits of the payment entity number.</p>
    <p>&nbsp; &nbsp;  &nbsp;     **Type**: The type of the entity e.g. CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, WALLET-ID </p>
    <p>&nbsp; &nbsp;  &nbsp;     **Country**: The issuing country of the entity e.g. NG, US, GH, KE e.t.c. It's used together with the CurrencyCountry to determine a transaction's locale. </p>

#### Sample success response body ( HTTP 200 OK )

```json
{
    "AppliedFeeID": "LNPY1221",
    "AppliedFeeValue": 49,
    "ChargeAmount": 3500,
    "SettlementAmount": 3451
}
```

Response body details

**AppliedFeeID**: ID of the fee applied to the transaction.

**AppliedFeeValue**: Computed value of the applied fee. Note that, for flat fees, this is the same as the fee value. For percentage fees, this is obtained by doing ((fee value * transaction amount ) / 100) and for FLAT_PERC types, this is obtained by doing flat fee value + ((fee value * transaction amount ) / 100). An example, if the transaction amount is 1500:
    For configuration LNPY0221 NGN LOCL CREDIT-CARD(*) : APPLY PERC 1.4, AppliedFeeValue = (1.4 / 100) * 1500
    For configuration LNPY0222 NGN LOCL CREDIT-CARD(*) : APPLY FLAT 140, AppliedFeeValue = 140
    For configuration LNPY0223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 140:1.4, AppliedFeeValue = 140 + ((1.4 / 100) * 1500)

**ChargeAmount**: The final amount to charge the customer for the transaction. The value is dependent on what Customer.BearsFee is set to.
    If Customer.BearsFee is true, ChargeAmount = Transaction Amount + AppliedFeeValue
    If Customer.BearsFee is false, ChargeAmount = Transaction Amount

**SettlementAmount**: The amount LannisterPay will settle the merchant the transaction belongs to after the applied fee has been deducted. In essence:        SettlementAmount = ChargeAmount - AppliedFeeValue


#### Sample error response body ( HTTP 400 Bad Request )

```json
{
    "Error": "\"Customer.EmailAddress\" is not allowed to be empty"
}
```








































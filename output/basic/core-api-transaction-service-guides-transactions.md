---
title: Transactions with off-chain signatures – Safe Docs
url: https://docs.safe.global/core-api/transaction-service-guides/transactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:13+00:00
priority: 0.80
---

# Transactions with off-chain signatures – Safe Docs

API

Guides

Transactions

# Transactions with off-chain signatures

This guide shows how to interact with the Safe Transaction Service API to create, sign, and execute transactions with the owners of a Safe account.

The different steps are implemented using [Curl (opens in a new tab)](https://github.com/curl/curl) requests, the [Safe{Core} SDK (opens in a new tab)](https://github.com/safe-global/safe-core-sdk) TypeScript library and the [safe-eth-py (opens in a new tab)](https://github.com/safe-global/safe-eth-py) Python library.

## Prerequisites

1. [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) when using the Safe{Core} SDK.
2. [Python (opens in a new tab)](https://www.python.org/downloads/) >= 3.9 when using `safe-eth-py`.
3. Have a Safe account configured with a threshold of 2, where two signatures are needed.

## Steps

### Install dependencies

TypeScriptPython

`_10

yarn add @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit`

### Imports

TypeScriptPython

`_10

import SafeApiKit from '@safe-global/api-kit'

_10

import Safe from '@safe-global/protocol-kit'

_10

import {

_10

MetaTransactionData,

_10

OperationType

_10

} from '@safe-global/types-kit'`

### Create a Safe transaction

TypeScriptPythonCurl

`_18

// Initialize the Protocol Kit with Owner A

_18

const protocolKitOwnerA = await Safe.init({

_18

provider: config.RPC_URL,

_18

signer: config.OWNER_A_PRIVATE_KEY,

_18

safeAddress: config.SAFE_ADDRESS

_18

})

_18

_18

// Create a Safe transaction

_18

const safeTransactionData: MetaTransactionData = {

_18

to: config.TO,

_18

value: config.VALUE,

_18

data: '0x',

_18

operation: OperationType.Call

_18

}

_18

_18

const safeTransaction = await protocolKitOwnerA.createTransaction({

_18

transactions: [safeTransactionData]

_18

})`

### Sign the transaction

TypeScriptPythonCurl

`_10

// Sign the transaction with Owner A

_10

const safeTxHash = await protocolKitOwnerA.getTransactionHash(safeTransaction)

_10

const signatureOwnerA = await protocolKitOwnerA.signHash(safeTxHash)`

### Send the transaction to the service

TypeScriptPythonCurl

`_15

// Initialize the API Kit

_15

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_15

const apiKit = new SafeApiKit({

_15

chainId: 11155111n,

_15

apiKey: 'YOUR_API_KEY'

_15

})

_15

_15

// Send the transaction to the Transaction Service with the signature from Owner A

_15

await apiKit.proposeTransaction({

_15

safeAddress: config.SAFE_ADDRESS,

_15

safeTransactionData: safeTransaction.data,

_15

safeTxHash,

_15

senderAddress: config.OWNER_A_ADDRESS,

_15

senderSignature: signatureOwnerA.data

_15

})`

### Collect missing signatures

#### Get the pending transaction

TypeScriptPythonCurl

`_10

const signedTransaction = await apiKit.getTransaction(safeTxHash)`

#### Add missing signatures

TypeScriptPythonCurl

`_15

// Initialize the Protocol Kit with Owner B

_15

const protocolKitOwnerB = await Safe.init({

_15

provider: config.RPC_URL,

_15

signer: config.OWNER_B_PRIVATE_KEY,

_15

safeAddress: config.SAFE_ADDRESS

_15

})

_15

_15

// Sign the transaction with Owner B

_15

const signatureOwnerB = await protocolKitOwnerB.signHash(safeTxHash)

_15

_15

// Send the transaction to the Transaction Service with the signature from Owner B

_15

await apiKit.confirmTransaction(

_15

safeTxHash,

_15

signatureOwnerB.data

_15

)`

### Execute the transaction

TypeScriptPython

`_10

const transactionResponse =

_10

await protocolKitOwnerA.executeTransaction(signedTransaction)`

### Get the executed transaction

TypeScriptPythonCurl

`_10

const transactions = await apiKit.getMultisigTransactions(config.SAFE_ADDRESS)

_10

_10

if (transactions.results.length > 0) {

_10

console.log('Last executed transaction', transactions.results[0])

_10

}`

Supported Networks[Data decoder](/core-api/transaction-service-guides/data-decoder "Data decoder")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Transactions with off-chain signatures
  - Prerequisites
  - Steps
    - Install dependencies
    - Imports
    - Create a Safe transaction
    - Sign the transaction
    - Send the transaction to the service
    - Collect missing signatures
      - Get the pending transaction
      - Add missing signatures
    - Execute the transaction
    - Get the executed transaction

---

## Related Links

### Internal Links

- [https://docs.safe.global/core-api/transaction-service-guides/transactions#prerequisites](https://docs.safe.global/core-api/transaction-service-guides/transactions#prerequisites)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#steps](https://docs.safe.global/core-api/transaction-service-guides/transactions#steps)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#install-dependencies](https://docs.safe.global/core-api/transaction-service-guides/transactions#install-dependencies)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#imports](https://docs.safe.global/core-api/transaction-service-guides/transactions#imports)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#create-a-safe-transaction](https://docs.safe.global/core-api/transaction-service-guides/transactions#create-a-safe-transaction)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#sign-the-transaction](https://docs.safe.global/core-api/transaction-service-guides/transactions#sign-the-transaction)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#send-the-transaction-to-the-service](https://docs.safe.global/core-api/transaction-service-guides/transactions#send-the-transaction-to-the-service)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#collect-missing-signatures](https://docs.safe.global/core-api/transaction-service-guides/transactions#collect-missing-signatures)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#get-the-pending-transaction](https://docs.safe.global/core-api/transaction-service-guides/transactions#get-the-pending-transaction)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#add-missing-signatures](https://docs.safe.global/core-api/transaction-service-guides/transactions#add-missing-signatures)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#execute-the-transaction](https://docs.safe.global/core-api/transaction-service-guides/transactions#execute-the-transaction)
- [https://docs.safe.global/core-api/transaction-service-guides/transactions#get-the-executed-transaction](https://docs.safe.global/core-api/transaction-service-guides/transactions#get-the-executed-transaction)
- [Data decoder](https://docs.safe.global/core-api/transaction-service-guides/data-decoder)

### External Links

- [Curl(opens in a new tab)](https://github.com/curl/curl)
- [Safe{Core} SDK(opens in a new tab)](https://github.com/safe-global/safe-core-sdk)
- [safe-eth-py(opens in a new tab)](https://github.com/safe-global/safe-eth-py)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm)
- [Python(opens in a new tab)](https://www.python.org/downloads/)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Transaction data decoder – Safe Docs
url: https://docs.safe.global/core-api/transaction-service-guides/data-decoder
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# Transaction data decoder – Safe Docs

API

Guides

Data decoder

# Transaction data decoder

This guide shows how to use the Safe Transaction Service API to decode transaction data for contract interactions.

The different steps are implemented using [Curl (opens in a new tab)](https://github.com/curl/curl) requests and the [Safe{Core} SDK (opens in a new tab)](https://github.com/safe-global/safe-core-sdk) TypeScript library.

## Prerequisites

1. [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) when using the Safe{Core} SDK.
2. Have a Safe account.

## Steps

### Install dependencies

TypeScriptPython

`_10

yarn add @safe-global/api-kit`

### Imports

TypeScriptPython

`_10

import SafeApiKit from '@safe-global/api-kit'`

### Decode transaction data

TypeScriptPythonCurl

`_11

// Initialize the API Kit

_11

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_11

const apiKit = new SafeApiKit({

_11

chainId: 11155111n,

_11

apiKey: 'YOUR_API_KEY'

_11

})

_11

_11

const data = "0x095ea7b3000000000000000000000000e6fc577e87f7c977c4393300417dcc592d90acf8ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

_11

const dataDecoded = await apiKit.decodeData(data)

_11

_11

// This decoded data is also included as dataDecoded in the response of the apiKit's getMultisigTransactions, getModuleTransactions, and getAllTransactions methods.`

[Transactions](/core-api/transaction-service-guides/transactions "Transactions")[Messages](/core-api/transaction-service-guides/messages "Messages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Transaction data decoder
  - Prerequisites
  - Steps
    - Install dependencies
    - Imports
    - Decode transaction data

---

## Related Links

### Internal Links

- [https://docs.safe.global/core-api/transaction-service-guides/data-decoder#prerequisites](https://docs.safe.global/core-api/transaction-service-guides/data-decoder#prerequisites)
- [https://docs.safe.global/core-api/transaction-service-guides/data-decoder#steps](https://docs.safe.global/core-api/transaction-service-guides/data-decoder#steps)
- [https://docs.safe.global/core-api/transaction-service-guides/data-decoder#install-dependencies](https://docs.safe.global/core-api/transaction-service-guides/data-decoder#install-dependencies)
- [https://docs.safe.global/core-api/transaction-service-guides/data-decoder#imports](https://docs.safe.global/core-api/transaction-service-guides/data-decoder#imports)
- [https://docs.safe.global/core-api/transaction-service-guides/data-decoder#decode-transaction-data](https://docs.safe.global/core-api/transaction-service-guides/data-decoder#decode-transaction-data)
- [Transactions](https://docs.safe.global/core-api/transaction-service-guides/transactions)
- [Messages](https://docs.safe.global/core-api/transaction-service-guides/messages)

### External Links

- [Curl(opens in a new tab)](https://github.com/curl/curl)
- [Safe{Core} SDK(opens in a new tab)](https://github.com/safe-global/safe-core-sdk)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

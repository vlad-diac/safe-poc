---
title: Messages with off-chain signatures – Safe Docs
url: https://docs.safe.global/core-api/transaction-service-guides/messages
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# Messages with off-chain signatures – Safe Docs

API

Guides

Messages

# Messages with off-chain signatures

This guide shows how to interact with the Safe Transaction Service API to create and sign messages with a Safe account.

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

import SafeApiKit, {AddMessageOptions} from '@safe-global/api-kit'

_10

import Safe, {hashSafeMessage} from '@safe-global/protocol-kit'`

### Create a Safe message

TypeScriptPythonCurl

`_11

// Initialize the Protocol Kit with Owner A

_11

const protocolKitOwnerA = await Safe.init({

_11

provider: config.RPC_URL,

_11

signer: config.OWNER_A_PRIVATE_KEY,

_11

safeAddress: config.SAFE_ADDRESS

_11

})

_11

_11

const rawMessage: string = 'A Safe Message - ' + Date.now()

_11

_11

// Create a Safe message

_11

const safeMessage = protocolKitOwnerA.createMessage(rawMessage)`

### Sign the message

TypeScriptPythonCurl

`_10

// Sign the message with Owner A

_10

const signedMessageOwnerA = await protocolKitOwnerA.signMessage(safeMessage)`

### Send the message to the service

TypeScriptPythonCurl

`_14

// Initialize the API Kit

_14

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_14

const apiKit = new SafeApiKit({

_14

chainId: 11155111n,

_14

apiKey: 'YOUR_API_KEY'

_14

})

_14

_14

const messageProps: AddMessageOptions = {

_14

message: rawMessage,

_14

signature: signedMessageOwnerA.encodedSignatures()

_14

}

_14

_14

// Send the message to the Transaction Service with the signature from Owner A

_14

apiKit.addMessage(config.SAFE_ADDRESS, messageProps)`

### Collect the missing signatures

#### Get the pending message

TypeScriptPythonCurl

`_14

// Initialize the Protocol Kit with Owner B

_14

const protocolKitOwnerB = await Safe.init({

_14

provider: config.RPC_URL,

_14

signer: config.OWNER_B_PRIVATE_KEY,

_14

safeAddress: config.SAFE_ADDRESS

_14

})

_14

_14

// Get the Safe message hash

_14

const safeMessageHash = await protocolKitOwnerB.getSafeMessageHash(

_14

hashSafeMessage(rawMessage)

_14

)

_14

_14

// Get the Safe message

_14

const safeServiceMessage = await apiKit.getMessage(safeMessageHash)`

#### Add missing signatures

TypeScriptPythonCurl

`_11

// Sign the message with Owner B

_11

const signedMessageOwnerB = await protocolKitOwnerB.signMessage(safeServiceMessage)

_11

_11

// Get Owner B address

_11

const ownerBAddress = '0x...'

_11

_11

// Send the message to the Transaction Service with the signature from Owner B

_11

await apiKit.addMessageSignature(

_11

safeMessageHash,

_11

signedMessageOwnerB.getSignature(ownerBAddress)?.data || '0x'

_11

)`

[Data decoder](/core-api/transaction-service-guides/data-decoder "Data decoder")[Delegates](/core-api/transaction-service-guides/delegates "Delegates")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Messages with off-chain signatures
  - Prerequisites
  - Steps
    - Install dependencies
    - Imports
    - Create a Safe message
    - Sign the message
    - Send the message to the service
    - Collect the missing signatures
      - Get the pending message
      - Add missing signatures

---

## Related Links

### Internal Links

- [https://docs.safe.global/core-api/transaction-service-guides/messages#prerequisites](https://docs.safe.global/core-api/transaction-service-guides/messages#prerequisites)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#steps](https://docs.safe.global/core-api/transaction-service-guides/messages#steps)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#install-dependencies](https://docs.safe.global/core-api/transaction-service-guides/messages#install-dependencies)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#imports](https://docs.safe.global/core-api/transaction-service-guides/messages#imports)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#create-a-safe-message](https://docs.safe.global/core-api/transaction-service-guides/messages#create-a-safe-message)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#sign-the-message](https://docs.safe.global/core-api/transaction-service-guides/messages#sign-the-message)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#send-the-message-to-the-service](https://docs.safe.global/core-api/transaction-service-guides/messages#send-the-message-to-the-service)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#collect-the-missing-signatures](https://docs.safe.global/core-api/transaction-service-guides/messages#collect-the-missing-signatures)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#get-the-pending-message](https://docs.safe.global/core-api/transaction-service-guides/messages#get-the-pending-message)
- [https://docs.safe.global/core-api/transaction-service-guides/messages#add-missing-signatures](https://docs.safe.global/core-api/transaction-service-guides/messages#add-missing-signatures)
- [Data decoder](https://docs.safe.global/core-api/transaction-service-guides/data-decoder)
- [Delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)

### External Links

- [Curl(opens in a new tab)](https://github.com/curl/curl)
- [Safe{Core} SDK(opens in a new tab)](https://github.com/safe-global/safe-core-sdk)
- [safe-eth-py(opens in a new tab)](https://github.com/safe-global/safe-eth-py)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm)
- [Python(opens in a new tab)](https://www.python.org/downloads/)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

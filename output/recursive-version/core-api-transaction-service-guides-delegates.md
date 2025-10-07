---
title: Manage user delegates – Safe Docs
url: https://docs.safe.global/core-api/transaction-service-guides/delegates
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# Manage user delegates – Safe Docs

API

Guides

Delegates

# Manage user delegates

This guide shows how to interact with the Safe Transaction Service API to manage user delegates.

The different steps are implemented using [Curl (opens in a new tab)](https://github.com/curl/curl) requests, the [Safe{Core} SDK (opens in a new tab)](https://github.com/safe-global/safe-core-sdk) TypeScript library and the [safe-eth-py (opens in a new tab)](https://github.com/safe-global/safe-eth-py) Python library.

## Prerequisites

1. [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) when using the Safe{Core} SDK.
2. [Python (opens in a new tab)](https://www.python.org/downloads/) >= 3.9 when using `safe-eth-py`.
3. Have a Safe account.

## Steps

### Install dependencies

TypeScriptPython

`_10

yarn add ethers @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit`

### Imports

TypeScriptPython

`_10

import { ethers } from 'ethers'

_10

import SafeApiKit, { AddSafeDelegateProps } from '@safe-global/api-kit'`

### Get the delegates from a Safe

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

// Get the Safe delegates

_11

const delegates = await apiKit.getSafeDelegates({

_11

delegatorAddress: config.SAFE_ADDRESS

_11

})`

### Add a delegate to a delegator

TypeScriptPythonCurl

`_17

const provider = new ethers.JsonRpcProvider(config.RPC_URL)

_17

_17

const ownerA = new ethers.Wallet(config.OWNER_A_PRIVATE_KEY, provider)

_17

const ownerAAddress = await ownerA.getAddress()

_17

_17

const ownerB = new ethers.Wallet(config.OWNER_B_PRIVATE_KEY, provider)

_17

const ownerBAddress = await ownerB.getAddress()

_17

_17

const delegateConfig: AddSafeDelegateProps = {

_17

delegateAddress: ownerBAddress || '0x',

_17

delegatorAddress: ownerAAddress || '0x',

_17

signer: ownerA,

_17

label: 'Label'

_17

}

_17

_17

// Add Owner B as a delegate of Owner A for all Safes accounts (safeAddress = null)

_17

const safeDelegateAddResponse = await apiKit.addSafeDelegate(delegateConfig)`

### Delete a delegate of a delegator

TypeScriptPythonCurl

`_10

const delegateConfig: DeleteSafeDelegateProps = {

_10

delegateAddress: ownerBAddress || '0x',

_10

delegatorAddress: ownerAAddress || '0x',

_10

signer: ownerA

_10

}

_10

_10

// Remove Owner B as delegate of Owner A

_10

await apiKit.removeSafeDelegate(delegateConfig)`

[Messages](/core-api/transaction-service-guides/messages "Messages")[0g](/core-api/transaction-service-reference/0G "0g")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Manage user delegates
  - Prerequisites
  - Steps
    - Install dependencies
    - Imports
    - Get the delegates from a Safe
    - Add a delegate to a delegator
    - Delete a delegate of a delegator

---

## Related Links

### Internal Links

- [https://docs.safe.global/core-api/transaction-service-guides/delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)
- [https://docs.safe.global/core-api/transaction-service-guides/delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)
- [https://docs.safe.global/core-api/transaction-service-guides/delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)
- [https://docs.safe.global/core-api/transaction-service-guides/delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)
- [https://docs.safe.global/core-api/transaction-service-guides/delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)
- [https://docs.safe.global/core-api/transaction-service-guides/delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)
- [https://docs.safe.global/core-api/transaction-service-guides/delegates](https://docs.safe.global/core-api/transaction-service-guides/delegates)
- [Messages](https://docs.safe.global/core-api/transaction-service-guides/messages)
- [0g](https://docs.safe.global/core-api/transaction-service-reference/0G)

### External Links

- [Curl(opens in a new tab)](https://github.com/curl/curl)
- [Safe{Core} SDK(opens in a new tab)](https://github.com/safe-global/safe-core-sdk)
- [safe-eth-py(opens in a new tab)](https://github.com/safe-global/safe-eth-py)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Python(opens in a new tab)](https://www.python.org/downloads)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

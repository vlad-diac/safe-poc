---
title: Safe Sdk – Safe Docs
url: https://docs.safe.global/advanced/erc-4337/guides/safe-sdk
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe Sdk – Safe Docs

Advanced

ERC-4337

Guides

ERC-4337 Safe SDK

# Safe accounts with the Safe4337Module

In this guide, you will learn how to create and execute multiple Safe transactions grouped in a batch from a Safe account that is not yet deployed and where the executor may or may not have funds to pay for the transaction fees. This can be achieved by supporting the [ERC-4337](/home/glossary#erc-4337) execution flow, which is supported by the [Safe4337Module](/advanced/erc-4337/guides/safe-sdk) and exposed via the Relay Kit from the Safe{Core} SDK.

Read the [Safe4337Module documentation](/advanced/erc-4337/guides/safe-sdk) to understand its benefits and flows better.

[Pimlico (opens in a new tab)](https://pimlico.io) is used in this guide as the service provider, but any other provider compatible with the ERC-4337 can be used.

ℹ️

We have added support for then Entrypoint v0.7 contract but we are not making it the default yet.
If you are using Entrypoint v0.7, you need to set the `safeModuleVersion` to `0.3.0` when calling the `Safe4337Pack.init` method. This version of the Safe 4337 Module is the one compatible with the Entrypoint v0.7.

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- A [Pimlico account (opens in a new tab)](https://dashboard.pimlico.io) and an API key.

## Install dependencies

`_10

yarn add @safe-global/relay-kit`

## Steps

### Imports

Here are all the necessary imports for the script we implement in this guide.

`_10

import { Safe4337Pack } from '@safe-global/relay-kit'`

### Create a signer

Firstly, we need to get a signer, which will be the owner of a Safe account after it's deployed.

In this example, we use a private key, but any way to get an EIP-1193 compatible signer can be used.

`_10

const SIGNER_ADDRESS = // ...

_10

const SIGNER_PRIVATE_KEY = // ...

_10

const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'`

### Initialize the `Safe4337Pack`

The `Safe4337Pack` class is exported from the Relay Kit and implements the ERC-4337 to create, sign, and submit Safe user operations.

To instantiate this class, the static `init()` method allows connecting existing Safe accounts (as long as they have the `Safe4337Module` enabled) or setting a custom configuration to deploy a new Safe account at the time where the first Safe transaction is submitted.

New Safe accountExisting Safe account

When deploying a new Safe account, we need to pass the configuration of the Safe in the `options` property. In this case, we are configuring a Safe account that will have our signer as the only owner.

Optionally, you can [track your ERC-4337 Safe transactions on-chain](/advanced/onchain-tracking) by using the `onchainAnalytics` property.

By default `Safe4337Pack` is using version `0.2.0` of the Safe 4337 Module that is only compatible with Entrypoint v0.6. If you need to use v0.7 then add the `safeModulesVersion` property to the options object with the '0.3.0' value.

`` _12

const safe4337Pack = await Safe4337Pack.init({

_12

provider: RPC_URL,

_12

signer: SIGNER_PRIVATE_KEY,

_12

bundlerUrl: `https://api.pimlico.io/v2/11155111/rpc?add_balance_override&apikey=${PIMLICO_API_KEY}`,

_12

// safeModulesVersion: '0.3.0', // Defaults to 0.2.0. If you are using the v0.7 of the EntryPoint set the value to '0.3.0'

_12

options: {

_12

owners: [SIGNER_ADDRESS],

_12

threshold: 1

_12

},

_12

onchainAnalytics // Optional

_12

// ...

_12

}) ``

By default, the transaction fees will be paid in the native token and extracted from the Safe account, so there must be enough funds in the Safe address.

You can also use a paymaster to handle the fees. If you choose to use a paymaster, there are two other ways to initialize the `Safe4337Pack`.

Using an ERC-20 PaymasterUsing a verifying Paymaster (Sponsored)

A paymaster will execute the transactions and get reimbursed from the Safe account, which must have enough funds in the Safe address in advance.

Payment of transaction fees is made using an ERC-20 token specified with the `paymasterTokenAddress` property. If an ERC-20 token is used, the Safe must approve that token to the paymaster. If no balance is approved, it can be specified using the `amountToApprove` property.

`` _10

const safe4337Pack = await Safe4337Pack.init({

_10

// ...

_10

paymasterOptions: {

_10

paymasterUrl: `https://api.pimlico.io/v2/11155111/rpc?apikey=${PIMLICO_API_KEY}`,

_10

paymasterAddress: '0x...',

_10

paymasterTokenAddress: '0x...',

_10

amountToApprove // Optional

_10

}

_10

}) ``

### Create a user operation

To create a Safe user operation, use the `createTransaction()` method, which takes the array of transactions to execute and returns a `SafeOperation` object.

`_10

// Define the transactions to execute

_10

const transaction1 = { to, data, value }

_10

const transaction2 = { to, data, value }

_10

_10

// Build the transaction array

_10

const transactions = [transaction1, transaction2]

_10

_10

// Create the SafeOperation with all the transactions

_10

const safeOperation = await safe4337Pack.createTransaction({ transactions })`

The `safeOperation` object has the `data` and `signatures` properties, which contain all the information about the transaction batch and the signatures of the Safe owners, respectively.

### Sign the user operation

Before sending the user operation to the bundler, it's required to sign the `safeOperation` object with the connected signer. The `signSafeOperation()` method, which receives a `SafeOperation` object, generates a signature that will be checked when the `Safe4337Module` validates the user operation.

`_10

const signedSafeOperation = await safe4337Pack.signSafeOperation(identifiedSafeOperation)`

### Submit the user operation

Once the `safeOperation` object is signed, we can call the `executeTransaction()` method to submit the user operation to the bundler.

`_10

const userOperationHash = await safe4337Pack.executeTransaction({

_10

executable: signedSafeOperation

_10

})`

This method returns the hash of the user operation. With it, we can monitor the transaction status using a block explorer or the bundler's API.

### Check the transaction status

To check the transaction status, we can use the `getTransactionReceipt()` method, which returns the transaction receipt after it's executed.

`_10

let userOperationReceipt = null

_10

_10

while (!userOperationReceipt) {

_10

// Wait 2 seconds before checking the status again

_10

await new Promise((resolve) => setTimeout(resolve, 2000))

_10

userOperationReceipt = await safe4337Pack.getUserOperationReceipt(

_10

userOperationHash

_10

)

_10

}`

In addition, we can use the `getUserOperationByHash()` method with the returned hash to retrieve the user operation object we sent to the bundler.

`_10

const userOperationPayload = await safe4337Pack.getUserOperationByHash(

_10

userOperationHash

_10

)`

## Recap and further reading

After following this guide, we are able to deploy new Safe accounts and create, sign, and execute Safe transactions in a batch without the executor needing to have funds to pay for the transaction fees.

Learn more about the ERC-4337 standard and the `Safe4337Module` contract following these links:

- [ERC-4337 website (opens in a new tab)](https://www.erc4337.io)
- [EIP-4337 on Ethereum EIPs (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337)
- [Safe4337Module on GitHub (opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/4337)
- [Safe On-chain Identifiers on GitHub]([https://github.com/5afe/safe-onchain-identifiers (opens in a new tab)](https://github.com/5afe/safe-onchain-identifiers) showcases where and how to add the identifier at the end of your Safe transactions data if you are not using the Relay Kit. Check also the [specific code (opens in a new tab)](https://github.com/5afe/safe-onchain-identifiers/blob/main/test/OnchainIdentifier.ts#L197-L217) where the identifier is concatenated to the `callData`.

Supported Networks[Permissionless.js Quickstart](/advanced/erc-4337/guides/permissionless-quickstart "Permissionless.js Quickstart")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe accounts with the Safe4337Module
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Create a signer
    - Initialize theSafe4337Pack
    - Create a user operation
    - Sign the user operation
    - Submit the user operation
    - Check the transaction status
  - Recap and further reading

---

## Related Links

### Internal Links

- [ERC-4337](https://docs.safe.global/home/glossary)
- [Safe4337Module](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [Safe4337Module documentation](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [track your ERC-4337 Safe transactions on-chain](https://docs.safe.global/advanced/onchain-tracking)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [https://docs.safe.global/advanced/erc-4337/guides/safe-sdk](https://docs.safe.global/advanced/erc-4337/guides/safe-sdk)
- [Permissionless.js Quickstart](https://docs.safe.global/advanced/erc-4337/guides/permissionless-quickstart)

### External Links

- [Pimlico(opens in a new tab)](https://pimlico.io)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Pimlico account(opens in a new tab)](https://dashboard.pimlico.io)
- [ERC-4337 website(opens in a new tab)](https://www.erc4337.io)
- [EIP-4337 on Ethereum EIPs(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337)
- [Safe4337Module on GitHub(opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/4337)
- [https://github.com/5afe/safe-onchain-identifiers(opens in a new tab)](https://github.com/5afe/safe-onchain-identifiers)
- [specific code(opens in a new tab)](https://github.com/5afe/safe-onchain-identifiers/blob/main/test/OnchainIdentifier.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

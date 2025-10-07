---
title: Send User Operations – Safe Docs
url: https://docs.safe.global/sdk/starter-kit/guides/send-user-operations
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Send User Operations – Safe Docs

SDK

[Starter Kit](/sdk/starter-kit)

Guides

Send User Operations

# Send User Operations

In this guide, you will learn how to create Safe [user operations](/home/glossary#useroperation), sign them, collect the signatures from the different owners, and execute them.

For more detailed information, see the [Starter Kit Reference](/reference-sdk-starter-kit/overview).

[Pimlico (opens in a new tab)](https://pimlico.io) is used in this guide as the service provider, but any other provider compatible with the ERC-4337 can be used.

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- A [Pimlico account (opens in a new tab)](https://dashboard.pimlico.io) and an API key.

## Install dependencies

First, you need to install some dependencies.

`_10

pnpm add @safe-global/sdk-starter-kit`

## Steps

### Imports

Here are all the necessary imports for this guide.

`_10

import {

_10

createSafeClient,

_10

safeOperations,

_10

BundlerOptions

_10

} from '@safe-global/sdk-starter-kit'`

### Create a signer

Firstly, you need to get a signer, which will be the owner of a Safe account after it's deployed.

This example uses a private key, but any way to get an EIP-1193 compatible signer can be used.

`_10

const SIGNER_ADDRESS = // ...

_10

const SIGNER_PRIVATE_KEY = // ...

_10

const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'`

### Initialize the `SafeClient`

New Safe accountExisting Safe account

When deploying a new Safe account, you need to pass the configuration of the Safe in the `safeOptions` property. The Safe account is configured with your signer as the only owner in this case.

`_10

const safeClient = await createSafeClient({

_10

provider: RPC_URL,

_10

signer: SIGNER_PRIVATE_KEY,

_10

safeOptions: {

_10

owners: [SIGNER_ADDRESS],

_10

threshold: 1

_10

}

_10

})`

As this guide is related with ERC-4337 user operations, you need to add the `safeOperations` extension to the `safeClient` instance to support this functionality.

`` _12

const bundlerOptions: BundlerOptions = {

_12

bundlerUrl: `https://api.pimlico.io/v1/sepolia/rpc?add_balance_override&apikey=${PIMLICO_API_KEY}`

_12

}

_12

_12

const paymasterOptions: PaymasterOptions = {

_12

isSponsored: true,

_12

paymasterUrl: `https://api.pimlico.io/v2/sepolia/rpc?add_balance_override&apikey=${PIMLICO_API_KEY}`

_12

}

_12

_12

const safeClientWithSafeOperation = await safeClient.extend(

_12

safeOperations(bundlerOptions, paymasterOptions)

_12

) ``

The `safeClientWithSafeOperation` instance has now support for managing user operations.

### Create a Safe transaction

Create an array of Safe transactions to execute.

`_10

const transactions = [{

_10

to: '0x...',

_10

data: '0x',

_10

value: '0'

_10

}]`

### Send the Safe operation

If you configured your Safe with `threshold` equal to `1`, calling the [`sendSafeOperation`](/reference-sdk-starter-kit/safe-operations/sendsafeoperation) method will execute the user operation. However, if the `threshold` is greater than `1` the other owners of the Safe will need to confirm the user operation until the required number of signatures are collected.

`_10

const safeOperationResult = await safeClientWithSafeOperation.sendSafeOperation({

_10

transactions

_10

})

_10

_10

const safeOperationHash = safeOperationResult.safeOperations?.safeOperationHash`

### Confirm the Safe operations

If the user operation needs to be confirmed by other Safe owners, call the [`confirmSafeOperation`](/reference-sdk-starter-kit/safe-operations/confirmsafeoperation) method from a new `SafeClient` instance initialized with each of the signers that need to confirm it.

`` _14

const newSafeClient = await createSafeClient({

_14

provider: RPC_URL,

_14

signer,

_14

safeAddress: '0x...'

_14

})

_14

_14

const newSafeClientWithSafeOperation = await newSafeClient.extend(

_14

safeOperations({

_14

bundlerUrl: `https://api.pimlico.io/v1/sepolia/rpc?add_balance_override&apikey=${PIMLICO_API_KEY}`

_14

}, {

_14

isSponsored: true,

_14

paymasterUrl: `https://api.pimlico.io/v2/sepolia/rpc?add_balance_override&apikey=${PIMLICO_API_KEY}`

_14

})

_14

) ``

Finally, retrieve all the pending user operations from the Safe Transaction Service and confirm the one you just created with each missing owner.

`_11

const pendingSafeOperations =

_11

await newSafeClientWithSafeOperation.getPendingSafeOperations()

_11

_11

for (const safeOperation of pendingSafeOperations.results) {

_11

if (safeOperation.safeOperationHash !== safeOperationHash) {

_11

return

_11

}

_11

_11

const safeOperationResult =

_11

await newSafeClientWithSafeOperation.confirmSafeOperation({ safeOperationHash })

_11

}`

## Recap and further reading

After following this guide, you are able to deploy new Safe accounts and create, sign, and submit user operations with the Starter Kit.

[Send Transactions](/sdk/starter-kit/guides/send-transactions "Send Transactions")[Reference](/sdk/starter-kit/guides/send-user-operations# "Reference")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Send User Operations
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Create a signer
    - Initialize theSafeClient
    - Create a Safe transaction
    - Send the Safe operation
    - Confirm the Safe operations
  - Recap and further reading

---

## Related Links

### Internal Links

- [Starter Kit](https://docs.safe.global/sdk/starter-kit)
- [user operations](https://docs.safe.global/home/glossary)
- [Starter Kit Reference](https://docs.safe.global/reference-sdk-starter-kit/overview)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [sendSafeOperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [confirmSafeOperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation)
- [https://docs.safe.global/sdk/starter-kit/guides/send-user-operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)
- [Send Transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [Reference](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)

### External Links

- [Pimlico(opens in a new tab)](https://pimlico.io)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Pimlico account(opens in a new tab)](https://dashboard.pimlico.io)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

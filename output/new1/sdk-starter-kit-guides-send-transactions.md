---
title: Send Transactions – Safe Docs
url: https://docs.safe.global/sdk/starter-kit/guides/send-transactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Send Transactions – Safe Docs

SDK

[Starter Kit](/sdk/starter-kit)

Guides

Send Transactions

# Send Transactions

In this guide, you will learn how to create Safe transactions, sign them, collect the signatures from the different owners, and execute them.

For more detailed information, see the [Starter Kit Reference](/reference-sdk-starter-kit/overview).

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Install dependencies

First, you need to install some dependencies.

`_10

pnpm add @safe-global/sdk-starter-kit`

## Steps

### Imports

Here are all the necessary imports for this guide.

`_10

import { createSafeClient } from '@safe-global/sdk-starter-kit'`

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

### Send the Safe transaction

If you configured your Safe with `threshold` equal to `1`, calling the [`send`](/reference-sdk-starter-kit/safe-client/send) method will execute the Safe transaction. However, if the `threshold` is greater than `1` the other owners of the Safe will need to confirm the transaction until the required number of signatures are collected.

`_10

const txResult = await safeClient.send({ transactions })

_10

_10

const safeTxHash = txResult.transactions?.safeTxHash`

### Confirm the Safe transaction

If the Safe transaction needs to be confirmed by other Safe owners, call the [`confirm`](/reference-sdk-starter-kit/safe-client/confirm) method from a new `SafeClient` instance initialized with each of the signers that need to confirm it.

`_10

const newSafeClient = await createSafeClient({

_10

provider: RPC_URL,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

Finally, retrieve all the pending Safe transactions from the Safe Transaction Service and confirm the one you just created with each missing owner.

`_10

const pendingTransactions = await newSafeClient.getPendingTransactions()

_10

_10

for (const transaction of pendingTransactions.results) {

_10

if (transaction.safeTxHash !== safeTxHash) {

_10

return

_10

}

_10

_10

const txResult = await safeClient.confirm({ safeTxHash })

_10

}`

## Recap and further reading

After following this guide, you are able to deploy new Safe accounts and create, sign, and execute Safe transactions with the Starter Kit.

[Starter Kit](/sdk/starter-kit "Starter Kit")[Send User Operations](/sdk/starter-kit/guides/send-user-operations "Send User Operations")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Send Transactions
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Create a signer
    - Initialize theSafeClient
    - Create a Safe transaction
    - Send the Safe transaction
    - Confirm the Safe transaction
  - Recap and further reading

---

## Related Links

### Internal Links

- [Starter Kit](https://docs.safe.global/sdk/starter-kit)
- [Starter Kit Reference](https://docs.safe.global/reference-sdk-starter-kit/overview)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [confirm](https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm)
- [https://docs.safe.global/sdk/starter-kit/guides/send-transactions](https://docs.safe.global/sdk/starter-kit/guides/send-transactions)
- [Starter Kit](https://docs.safe.global/sdk/starter-kit)
- [Send User Operations](https://docs.safe.global/sdk/starter-kit/guides/send-user-operations)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

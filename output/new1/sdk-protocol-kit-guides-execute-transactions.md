---
title: Execute transactions – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Execute transactions – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Execute transactions

# Execute transactions

In this guide, you will learn how to create Safe transactions, sign them, collect the signatures from the different owners, and execute them.

See the [Protocol Kit reference](/reference-sdk-protocol-kit/overview) to find more details and configuration options.

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- An existing Safe with several signers.

## Install dependencies

First, you need to install some dependencies.

`_10

pnpm add @safe-global/api-kit \

_10

@safe-global/protocol-kit \

_10

@safe-global/types-kit`

## Steps

### Imports

Here are all the necessary imports for this guide.

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

### Setup

You need a Safe account setup with two or more signers and threshold two, so at least multiple signatures have to be collected when executing a transaction.

This example uses private keys, but any EIP-1193 compatible signers can be used.

`_10

const SAFE_ADDRESS = // ...

_10

_10

const OWNER_1_ADDRESS = // ...

_10

const OWNER_1_PRIVATE_KEY = // ...

_10

_10

const OWNER_2_PRIVATE_KEY = // ...

_10

_10

const RPC_URL = 'https://eth-sepolia.public.blastapi.io'`

This guide uses Sepolia, but you can use any chain from the Safe Transaction Service [supported networks](/advanced/smart-account-supported-networks?service=Transaction+Service&service=Safe%7BCore%7D+SDK).

### Initialize the Protocol Kit

To handle transactions and signatures, you need to create an instance of the Protocol Kit with the `provider`, `signer` and `safeAddress`.

Optionally, you can [track your Safe transactions on-chain](/sdk/onchain-tracking) by using the `onchainAnalytics` property.

`_10

const protocolKitOwner1 = await Safe.init({

_10

provider: RPC_URL,

_10

signer: OWNER_1_PRIVATE_KEY,

_10

safeAddress: SAFE_ADDRESS,

_10

onchainAnalytics // Optional

_10

})`

### Create a transaction

Create a `safeTransactionData` object with the properties of the transaction, add it to an array of transactions you want to execute, and pass it to the `createTransaction` method.

`_10

const safeTransactionData: MetaTransactionData = {

_10

to: '0x',

_10

value: '1', // 1 wei

_10

data: '0x',

_10

operation: OperationType.Call

_10

}

_10

_10

const safeTransaction = await protocolKitOwner1.createTransaction({

_10

transactions: [safeTransactionData]

_10

})`

For more details on what to include in a transaction, see the [`createTransaction`](/sdk/protocol-kit/reference/safe#createtransaction) method in the reference.

### Propose the transaction

Before a transaction can be executed, the signer who creates it needs to send it to the Safe Transaction Service so that it is accessible by the other owners, who can then give their approval and sign the transaction.

Firstly, you need to create an instance of the API Kit. In chains where the [Safe Transaction Service](/core-api/transaction-service-overview) is supported, it's enough to specify the `chainId` property.

`_10

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_10

const apiKit = new SafeApiKit({

_10

chainId: 11155111n,

_10

apiKey: 'YOUR_API_KEY'

_10

})`

You need to calculate the Safe transaction hash, sign the transaction hash, and call the `proposeTransaction` method from the API Kit instance to propose a transaction.

For a full list and description of the properties see [`proposeTransaction`](/reference-sdk-api-kit/proposetransaction) in the API Kit reference.

`_13

// Deterministic hash based on transaction parameters

_13

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)

_13

_13

// Sign transaction to verify that the transaction is coming from owner 1

_13

const senderSignature = await protocolKitOwner1.signHash(safeTxHash)

_13

_13

await apiKit.proposeTransaction({

_13

safeAddress,

_13

safeTransactionData: safeTransaction.data,

_13

safeTxHash,

_13

senderAddress: OWNER_1_ADDRESS,

_13

senderSignature: senderSignature.data

_13

})`

### Retrieve the pending transactions

The other signers need to retrieve the pending transactions from the Safe Transaction Service. Depending on the situation, different methods in the API Kit are available.

Call the [`getPendingTransactions`](/reference-sdk-api-kit/getpendingtransactions) method to retrieve all the pending transactions of a Safe account.

`_10

const pendingTransactions = (await apiKit.getPendingTransactions(safeAddress)).results`

### Confirm the transaction

Once a signer has the pending transaction, they need to sign it with the Protocol Kit and submit the signature to the service using the [`confirmTransaction`](/reference-sdk-api-kit/confirmtransaction) method.

`_14

const protocolKitOwner2 = await Safe.init({

_14

provider: RPC_URL,

_14

signer: OWNER_2_PRIVATE_KEY,

_14

safeAddress: SAFE_ADDRESS

_14

})

_14

_14

const safeTxHash = transaction.transactionHash

_14

const signature = await protocolKitOwner2.signHash(safeTxHash)

_14

_14

// Confirm the Safe transaction

_14

const signatureResponse = await apiKit.confirmTransaction(

_14

safeTxHash,

_14

signature.data

_14

)`

### Execute the transaction

The Safe transaction is now ready to be executed. This can be done using the [Safe{Wallet} (opens in a new tab)](https://app.safe.global) web interface, the [Protocol Kit](/reference-sdk-protocol-kit/transactions/executetransaction), the [Safe CLI](/advanced/cli-reference/tx-service-commands#execute-pending-transaction) or any other tool that's available.

In this guide, the first signer will get the transaction from the service by calling the [`getTransaction`](/reference-sdk-api-kit/gettransaction) method and execute it by passing the transaction with all the signatures to the [`executeTransaction`](/reference-sdk-protocol-kit/transactions/executetransaction) method.

`_10

const safeTransaction = await apiKit.getTransaction(safeTxHash)

_10

const executeTxResponse = await protocolKitOwner1.executeTransaction(safeTransaction)`

## Recap and further reading

After following this guide, you are able to create, sign, and execute Safe transactions with the Protocol Kit and share the signatures with the different signers using the API Kit.

[Multichain Safe deployment](/sdk/protocol-kit/guides/multichain-safe-deployment "Multichain Safe deployment")[Signatures](/sdk/protocol-kit/guides/signatures "Signatures")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Execute transactions
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Setup
    - Initialize the Protocol Kit
    - Create a transaction
    - Propose the transaction
    - Retrieve the pending transactions
    - Confirm the transaction
    - Execute the transaction
  - Recap and further reading

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Protocol Kit reference](https://docs.safe.global/reference-sdk-protocol-kit/overview)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [supported networks](https://docs.safe.global/advanced/smart-account-supported-networks?service=Transaction+Service&service=Safe%7BCore%7D+SDK)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [track your Safe transactions on-chain](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [createTransaction](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview)
- [proposeTransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [getPendingTransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [confirmTransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)
- [https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

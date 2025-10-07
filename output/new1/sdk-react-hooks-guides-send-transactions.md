---
title: Send Transactions – Safe Docs
url: https://docs.safe.global/sdk/react-hooks/guides/send-transactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Send Transactions – Safe Docs

SDK

[Safe React Hooks](/sdk/react-hooks)

Guides

Send Transactions

# Send Transactions

This guide will teach you how to deploy new Safe accounts and create, sign, and execute Safe transactions using the Safe React Hooks.

For more detailed information, see the [Safe React Hooks Reference](/reference-sdk-react-hooks/overview).

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Install dependencies

First, you need to install some dependencies.

`_10

pnpm add @safe-global/safe-react-hooks`

## Steps

### Imports

Here are all the necessary imports for this guide.

`_10

import {

_10

SafeProvider,

_10

createConfig,

_10

useSafe,

_10

useSendTransaction,

_10

SendTransactionVariables,

_10

useConfirmTransaction,

_10

ConfirmTransactionVariables

_10

} from '@safe-global/safe-react-hooks'

_10

import { sepolia } from 'viem/chains'`

### Create a signer and provider

Firstly, you need to get a signer, which will be the owner of a Safe account after it's deployed.

This example uses a private key, but any way to get an EIP-1193 compatible signer can be used.

`_10

const SIGNER_ADDRESS = // ...

_10

const SIGNER_PRIVATE_KEY = // ...

_10

_10

const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'`

### Initialize the Safe React Hooks

You need to wrap your app with the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) to have access to the different Safe React Hooks like `useSendTransaction()`, `useConfirmTransaction()`, and `usePendingTransactions()` that will provide the functionality you need in this guide.

`SafeProvider` receives a `config` object with different properties to create the global configuration that you can get from the [`createConfig`](/reference-sdk-react-hooks/createconfig) function.

New Safe accountExisting Safe account

When deploying a new Safe account for the connected signer, you need to pass the configuration of the Safe in the `safeOptions` property. In this case, the Safe account is configured with your signer as the only owner.

`_10

const config = createConfig({

_10

chain: sepolia,

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

To apply the global configuration to your app, pass the created `config` to the `SafeProvider`.

`_10

<SafeProvider config={config}>

_10

<App />

_10

</SafeProvider>`

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

Create a `SendTransaction` component in your application to create and send a transaction.

If you configured your Safe with `threshold` equal to `1`, calling the `sendTransaction` function from the [`useSendTransaction`](/reference-sdk-react-hooks/usesendtransaction) hook will execute the Safe transaction. However, if the `threshold` is greater than `1` the other owners of the Safe will need to confirm the transaction until the required number of signatures are collected.

SendTransaction.tsx

`_15

function SendTransaction() {

_15

const { sendTransaction } = useSendTransaction()

_15

_15

const sendTransactionParams: SendTransactionVariables = {

_15

transactions

_15

}

_15

_15

return (

_15

<button onClick={() => sendTransaction(sendTransactionParams)}>

_15

Send Transaction

_15

</button>

_15

)

_15

}

_15

_15

export default SendTransaction`

### Confirm the Safe transaction

Create a `ConfirmPendingTransactions` component in your application to check the transactions pending for confirmation in case the Safe transaction needs to be confirmed by other Safe owners.

Retrieve all the pending Safe transactions from the Safe Transaction Service by calling the [`getPendingTransaction`](/reference-sdk-react-hooks/usesafe/getpendingtransactions) function from the [`useSafe`](/reference-sdk-react-hooks/usesafe) hook, and call the `confirmTransaction` function from the [`useConfirmTransaction`](/reference-sdk-react-hooks/useconfirmtransaction) hook to confirm them.

Notice that the `SafeProvider` configuration needs to be initialized with a different Safe owner as the `signer` when confirming a transaction.

ConfirmPendingTransactions.tsx

`_20

function ConfirmPendingTransactions() {

_20

const { getPendingTransactions } = useSafe()

_20

const { data = [] } = getPendingTransactions()

_20

const { confirmTransaction } = useConfirmTransaction()

_20

_20

return (

_20

<>

_20

{data.length > 0 && data.map(tx => (

_20

<>

_20

{tx.safeTxHash}

_20

<button onClick={() => confirmTransaction({

_20

safeTxHash: tx.safeTxHash

_20

})} />

_20

</>

_20

))}

_20

</>

_20

)

_20

}

_20

_20

export default ConfirmPendingTransactions`

Once the total number of confirmations reaches the `threshold` of the Safe, the `confirmTransaction` will automatically execute the transaction.

## Recap and further reading

After following this guide, you are able to deploy new Safe accounts and create, sign, and execute Safe transactions using the Safe React Hooks.

[Safe React Hooks](/sdk/react-hooks "Safe React Hooks")[Reference](/sdk/react-hooks/guides/send-transactions# "Reference")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Send Transactions
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Create a signer and provider
    - Initialize the Safe React Hooks
    - Create a Safe transaction
    - Send the Safe transaction
    - Confirm the Safe transaction
  - Recap and further reading

---

## Related Links

### Internal Links

- [Safe React Hooks](https://docs.safe.global/sdk/react-hooks)
- [Safe React Hooks Reference](https://docs.safe.global/reference-sdk-react-hooks/overview)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [createConfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [useSendTransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [getPendingTransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getpendingtransactions)
- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [useConfirmTransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/sdk/react-hooks/guides/send-transactions](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)
- [Safe React Hooks](https://docs.safe.global/sdk/react-hooks)
- [Reference](https://docs.safe.global/sdk/react-hooks/guides/send-transactions)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

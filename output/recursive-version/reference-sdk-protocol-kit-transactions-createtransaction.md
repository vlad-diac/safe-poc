---
title: createTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createTransaction – Safe Docs

Protocol Kit Reference

Transactions

createTransaction

# `createTransaction`

Returns a Safe transaction ready to be signed by the owners and executed.

This method supports batch transactions by passing an array of `MetaTransactionData` objects with more than one element.

## Usage



example.tssetup.ts

`_25

import { SafeTransactionOptionalProps } from '@safe-global/protocol-kit'

_25

import { MetaTransactionData, OperationType } from '@safe-global/types-kit'

_25

import { protocolKit } from './setup.ts'

_25

_25

const transactions: MetaTransactionData[] = [{

_25

to: '0x...',

_25

value: '123',

_25

data: '0x',

_25

operation: OperationType.Call // Optional

_25

}]

_25

_25

const options: SafeTransactionOptionalProps = {

_25

safeTxGas: '123', // Optional

_25

baseGas: '123', // Optional

_25

gasPrice: '123', // Optional

_25

gasToken: '0x...', // Optional

_25

refundReceiver: '0x...', // Optional

_25

nonce: 123 // Optional

_25

}

_25

_25

const safeTransaction = await protocolKit.createTransaction({

_25

transactions,

_25

onlyCalls: true, // Optional

_25

options // Optional

_25

})`

## Parameters

### `transactions.to`

- **Type:** `string`

The address of the recipient.

`_10

const safeTransaction = await protocolKit.createTransaction({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x'

_10

}]

_10

})`

### `transactions.value`

- **Type:** `string`

The amount of native tokens that are transferred.

`_10

const safeTransaction = await protocolKit.createTransaction({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x'

_10

}]

_10

})`

### `transactions.data`

- **Type:** `string`

The encoded transaction data.

`_10

const safeTransaction = await protocolKit.createTransaction({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x'

_10

}]

_10

})`

### `transactions.operation` (Optional)

- **Type:** `OperationType`
- **Default:** `0`

The operation of the Safe transaction. `0` for a *Call* and `1` for a *DelegateCall*.

`_10

const safeTransaction = await protocolKit.createTransaction({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x',

_10

operation: 0

_10

}]

_10

})`

### `onlyCalls` (Optional)

- **Type**: `boolean`
- **Default**: `false`

A boolean variable that forces the use of the [`MultiSendCallOnly` (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/MultiSendCallOnly.sol) contract instead of the [`MultiSend` (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/MultiSend.sol) when sending a batch transaction.

`_10

const safeTransaction = await protocolKit.createTransaction(

_10

'0x...',

_10

onlyCalls: true

_10

)`

### `options.safeTxGas` (Optional)

- **Type**: `string`

The gas that should be used for the Safe transaction.

`_10

const safeTransaction = await protocolKit.createTransaction(

_10

'0x...',

_10

options: {

_10

safeTxGas: '123'

_10

}

_10

)`

### `options.baseGas` (Optional)

- **Type**: `string`

The gas costs for the data used to trigger the Safe transaction.

`_10

const safeTransaction = await protocolKit.createTransaction(

_10

'0x...',

_10

options: {

_10

baseGas: '123'

_10

}

_10

)`

### `options.gasPrice` (Optional)

- **Type**: `string`

The price in wei that the sender is willing to pay for each unit of gas.

`_10

const safeTransaction = await protocolKit.createTransaction(

_10

'0x...',

_10

options: {

_10

gasPrice: '123'

_10

}

_10

)`

### `options.gasToken` (Optional)

- **Type**: `string`

The token address that is used for the gas payment, or `0x0000000000000000000000000000000000000000` if there is no payment.

`_10

const safeTransaction = await protocolKit.createTransaction(

_10

'0x...',

_10

options: {

_10

gasToken: '0x...'

_10

}

_10

)`

### `options.refundReceiver` (Optional)

- **Type**: `string`

The address of the gas payment receiver or `0x0000000000000000000000000000000000000000` if there is no payment.

`_10

const safeTransaction = await protocolKit.createTransaction(

_10

'0x...',

_10

options: {

_10

refundReceiver: '0x...'

_10

}

_10

)`

### `options.nonce` (Optional)

- **Type**: `number`

The transaction nonce.

`_10

const safeTransaction = await protocolKit.createTransaction(

_10

'0x...',

_10

options: {

_10

nonce: 123

_10

}

_10

)`

## Returns

`Promise<SafeTransaction>`

The Safe transaction object ready to be signed.

[createRejectionTransaction](/reference-sdk-protocol-kit/transactions/createrejectiontransaction "createRejectionTransaction")[executeTransaction](/reference-sdk-protocol-kit/transactions/executetransaction "executeTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createTransaction
  - Usage
  - Parameters
    - transactions.to
    - transactions.value
    - transactions.data
    - transactions.operation(Optional)
    - onlyCalls(Optional)
    - options.safeTxGas(Optional)
    - options.baseGas(Optional)
    - options.gasPrice(Optional)
    - options.gasToken(Optional)
    - options.refundReceiver(Optional)
    - options.nonce(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [createRejectionTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction)
- [executeTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)

### External Links

- [MultiSendCallOnly(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/MultiSendCallOnly.sol)
- [MultiSend(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/MultiSend.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

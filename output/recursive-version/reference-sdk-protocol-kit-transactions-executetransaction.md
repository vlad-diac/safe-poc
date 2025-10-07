---
title: executeTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# executeTransaction – Safe Docs

Protocol Kit Reference

Transactions

executeTransaction

# `executeTransaction`

Executes a Safe transaction.

## Usage



example.tssetup.ts

`_30

import {

_30

MetaTransactionData,

_30

OperationType,

_30

TransactionOptions

_30

} from '@safe-global/types-kit'

_30

import { protocolKit } from './setup.ts'

_30

_30

const transactions: MetaTransactionData[] = [{

_30

to: '0x...',

_30

value: '123',

_30

data: '0x',

_30

operation: OperationType.Call // Optional

_30

}]

_30

const safeTransaction = await protocolKit.createTransaction({

_30

transactions

_30

})

_30

_30

const options: TransactionOptions = {

_30

from: '0x...', // Optional

_30

gasLimit: '123', // Optional

_30

gasPrice: '123', // Optional

_30

maxFeePerGas: '123', // Optional

_30

maxPriorityFeePerGas: '123', // Optional

_30

nonce: 123 // Optional

_30

}

_30

_30

const txResponse = await protocolKit.executeTransaction(

_30

safeTransaction,

_30

options // Optional

_30

)`

## Parameters

### `safeTransaction`

- **Type**: [`SafeTransaction` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L54-L60)

The Safe transaction.

`_10

const txResponse = await protocolKit.executeTransaction(

_10

safeTransaction

_10

)`

### `options.from` (Optional)

- **Type**: `string`

The address of the transaction sender.

`_10

const txResponse = await protocolKit.executeTransaction(

_10

safeTransaction,

_10

options: {

_10

from: '0x...'

_10

}

_10

)`

### `options.gasLimit` (Optional)

- **Type**: `number | string | bigint`

The maximum amount of gas the transaction can use.

`_10

const txResponse = await protocolKit.executeTransaction(

_10

safeTransaction,

_10

options: {

_10

gasLimit: '123'

_10

}

_10

)`

### `options.gasPrice` (Optional)

- **Type**: `number | string`

The price in wei that the sender is willing to pay for each unit of gas.

`_10

const txResponse = await protocolKit.executeTransaction(

_10

safeTransaction,

_10

options: {

_10

gasPrice: '123'

_10

}

_10

)`

### `options.maxFeePerGas` (Optional)

- **Type**: `number | string`

The maximum fee per gas the sender is willing to pay.

`_10

const txResponse = await protocolKit.executeTransaction(

_10

safeTransaction,

_10

options: {

_10

maxFeePerGas: '123'

_10

}

_10

)`

### `options.maxPriorityFeePerGas` (Optional)

- **Type**: `number | string`

The maximum priority fee per gas the sender is willing to pay.

`_10

const txResponse = await protocolKit.executeTransaction(

_10

safeTransaction,

_10

options: {

_10

maxPriorityFeePerGas: '123'

_10

}

_10

)`

### `options.nonce` (Optional)

- **Type**: `number`

The nonce of the transaction.

`_10

const txResponse = await protocolKit.executeTransaction(

_10

safeTransaction,

_10

options: {

_10

nonce: 123

_10

}

_10

)`

## Returns

`Promise<TransactionResult>`

The Safe transaction to execute.

[createTransaction](/reference-sdk-protocol-kit/transactions/createtransaction "createTransaction")[getTransactionHash](/reference-sdk-protocol-kit/transactions/gettransactionhash "getTransactionHash")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- executeTransaction
  - Usage
  - Parameters
    - safeTransaction
    - options.from(Optional)
    - options.gasLimit(Optional)
    - options.gasPrice(Optional)
    - options.maxFeePerGas(Optional)
    - options.maxPriorityFeePerGas(Optional)
    - options.nonce(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [createTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)
- [getTransactionHash](https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash)

### External Links

- [SafeTransaction(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

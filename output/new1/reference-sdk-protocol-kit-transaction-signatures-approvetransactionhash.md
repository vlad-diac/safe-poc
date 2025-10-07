---
title: approveTransactionHash – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# approveTransactionHash – Safe Docs

Protocol Kit Reference

Transaction Signatures

approveTransactionHash

# `approveTransactionHash`

Approves on-chain a Safe transaction hash with the connected signer.

## Usage



example.tssetup.ts

`_33

import {

_33

MetaTransactionData,

_33

OperationType,

_33

TransactionOptions

_33

} from '@safe-global/types-kit'

_33

import { protocolKit } from './setup.ts'

_33

_33

const transactions: MetaTransactionData[] = [{

_33

to: '0x...',

_33

value: '123',

_33

data: '0x',

_33

operation: OperationType.Call // Optional

_33

}]

_33

const safeTransaction = await protocolKit.createTransaction({

_33

transactions

_33

})

_33

const safeTransactionHash = await protocolKit.getTransactionHash(

_33

safeTransaction

_33

)

_33

_33

const options: TransactionOptions = {

_33

from: '0x...', // Optional

_33

gasLimit: '123', // Optional

_33

gasPrice: '123', // Optional

_33

maxFeePerGas: '123', // Optional

_33

maxPriorityFeePerGas: '123', // Optional

_33

nonce: 123 // Optional

_33

}

_33

_33

const txResponse = await protocolKit.approveTransactionHash(

_33

safeTransactionHash,

_33

options // Optional

_33

)`

## Parameters

### safeTransactionHash

- **Type**: `string`

The Safe transaction hash to approve.

`_10

const transactionResponse = await protocolKit.approveTransactionHash(

_10

'0x...'

_10

)`

### `options.from` (Optional)

- **Type**: `string`

The address of the transaction sender.

`_10

const transactionResponse = await protocolKit.approveTransactionHash(

_10

'0x...',

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

const transactionResponse = await protocolKit.approveTransactionHash(

_10

'0x...',

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

const transactionResponse = await protocolKit.approveTransactionHash(

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

### `options.maxFeePerGas` (Optional)

- **Type**: `number | string`

The maximum fee per gas the sender is willing to pay.

`_10

const transactionResponse = await protocolKit.approveTransactionHash(

_10

'0x...',

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

const transactionResponse = await protocolKit.approveTransactionHash(

_10

'0x...',

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

const transactionResponse = await protocolKit.approveTransactionHash(

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

`Promise<TransactionResult>`

The Safe transaction response.

[isValidTransaction](/reference-sdk-protocol-kit/transactions/isvalidtransaction "isValidTransaction")[signHash](/reference-sdk-protocol-kit/transaction-signatures/signhash "signHash")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- approveTransactionHash
  - Usage
  - Parameters
    - safeTransactionHash
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

- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [isValidTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/isvalidtransaction)
- [signHash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

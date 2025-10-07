---
title: getTransactionHash – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getTransactionHash – Safe Docs

Protocol Kit Reference

Transactions

getTransactionHash

# `getTransactionHash`

Returns the Safe transaction hash of a Safe transaction.

## Usage



example.tssetup.ts

`_17

import {

_17

MetaTransactionData,

_17

OperationType

_17

} from '@safe-global/types-kit'

_17

import { protocolKit } from './setup.ts'

_17

_17

const transactions: MetaTransactionData[] = [{

_17

to: '0x...',

_17

value: '123',

_17

data: '0x',

_17

operation: OperationType.Call // Optional

_17

}]

_17

const safeTransaction = await protocolKit.createTransaction({

_17

transactions

_17

})

_17

_17

const safeTransactionHash = await protocolKit.getTransactionHash(safeTransaction)`

## Parameters

### `safeTransaction`

- **Type**: [`SafeTransaction` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L54-L60)

The Safe transaction.

`_10

const safeTransactionHash = await protocolKit.getTransactionHash(

_10

safeTransaction

_10

)`

## Returns

`Promise<string>`

The Safe transaction hash of the Safe transaction.

[executeTransaction](/reference-sdk-protocol-kit/transactions/executetransaction "executeTransaction")[isValidTransaction](/reference-sdk-protocol-kit/transactions/isvalidtransaction "isValidTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getTransactionHash
  - Usage
  - Parameters
    - safeTransaction
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash](https://docs.safe.global/reference-sdk-protocol-kit/transactions/gettransactionhash)
- [executeTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/executetransaction)
- [isValidTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/isvalidtransaction)

### External Links

- [SafeTransaction(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

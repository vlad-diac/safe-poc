---
title: copyTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# copyTransaction – Safe Docs

Protocol Kit Reference

Transactions

copyTransaction

# `copyTransaction`

Copies a Safe transaction object.

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

const safeTransaction1 = await protocolKit.createTransaction({

_17

transactions

_17

})

_17

_17

const safeTransaction2 = await copyTransaction(safeTransaction1)`

## Parameters

### `safeTransaction`

- **Type**: [`SafeTransaction` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L54-L60)

The Safe transaction object to copy.

`_10

const safeTransaction2 = await copyTransaction(

_10

safeTransaction

_10

)`

## Returns

`Promise<SafeTransaction>`

The new object with a copy of the Safe transaction.

[isOwner](/reference-sdk-protocol-kit/safe-info/isowner "isOwner")[createRejectionTransaction](/reference-sdk-protocol-kit/transactions/createrejectiontransaction "createRejectionTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- copyTransaction
  - Usage
  - Parameters
    - safeTransaction
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction)
- [isOwner](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner)
- [createRejectionTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction)

### External Links

- [SafeTransaction(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

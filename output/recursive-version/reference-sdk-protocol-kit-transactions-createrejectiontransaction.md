---
title: createRejectionTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createRejectionTransaction – Safe Docs

Protocol Kit Reference

Transactions

createRejectionTransaction

# `createRejectionTransaction`

Returns a Safe transaction ready to be signed by the owners of the connected Safe that invalidates the pending Safe transactions with a specific nonce.

## Usage



example.tssetup.ts

`_10

import {

_10

MetaTransactionData,

_10

OperationType

_10

} from '@safe-global/types-kit'

_10

import { protocolKit } from './setup.ts'

_10

_10

const nonce = 123

_10

_10

const rejectionTransaction = await protocolKit.createRejectionTransaction(nonce)`

## Parameters

### `nonce`

- **Type**: `number`

The nonce of the transaction that will be rejected.

`_10

const rejectionTransaction = await protocolKit.createRejectionTransaction(

_10

123

_10

)`

## Returns

`Promise<SafeTransaction>`

The Safe transaction that invalidates the pending Safe transaction.

[copyTransaction](/reference-sdk-protocol-kit/transactions/copytransaction "copyTransaction")[createTransaction](/reference-sdk-protocol-kit/transactions/createtransaction "createTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createRejectionTransaction
  - Usage
  - Parameters
    - nonce
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createrejectiontransaction)
- [copyTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction)
- [createTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/createtransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

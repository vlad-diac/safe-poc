---
title: estimateSafeTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# estimateSafeTransaction – Safe Docs

API Kit Reference

estimateSafeTransaction

# `estimateSafeTransaction`

Estimates the safeTxGas for a given Safe multi-signature transaction.

## Usage



example.tssetup.ts

`_16

import { SafeMultisigTransactionEstimate } from '@safe-global/api-kit'

_16

import { apiKit } from './setup.ts'

_16

_16

const safeAddress = '0x...'

_16

_16

const safeTransaction: SafeMultisigTransactionEstimate = {

_16

to: '0x...',

_16

value: '0',

_16

data: '0x',

_16

operation: 0 // Optional

_16

}

_16

_16

const estimateTx = await apiKit.estimateSafeTransaction(

_16

safeAddress,

_16

safeTransaction

_16

)`

## Returns

`Promise<SafeMultisigTransactionEstimateResponse>`

The safeTxGas for the given Safe transaction.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const estimateTx = await apiKit.estimateSafeTransaction(

_10

'0x...',

_10

{

_10

to: '0x...',

_10

value: '0',

_10

data: '0x'

_10

}

_10

)`

### `safeTransaction.to`

- **Type:** `string`

The transaction recipient of the Safe transaction to estimate.

`_10

const estimateTx = await apiKit.estimateSafeTransaction(

_10

'0x...',

_10

{

_10

to: '0x...',

_10

value: '0',

_10

data: '0x'

_10

}

_10

)`

### `safeTransaction.value`

- **Type:** `string`

The value of the Safe transaction to estimate.

`_10

const estimateTx = await apiKit.estimateSafeTransaction(

_10

'0x...',

_10

{

_10

to: '0x...',

_10

value: '0',

_10

data: '0x'

_10

}

_10

)`

### `safeTransaction.data`

- **Type:** `string`

The data of the Safe transaction to estimate.

`_10

const estimateTx = await apiKit.estimateSafeTransaction(

_10

'0x...',

_10

{

_10

to: '0x...',

_10

value: '0',

_10

data: '0x'

_10

}

_10

)`

### `safeTransaction.operation` (Optional)

- **Type:** `OperationType`

The operation of the Safe transaction to estimate.

`_10

const estimateTx = await apiKit.estimateSafeTransaction(

_10

'0x...',

_10

{

_10

to: '0x...',

_10

value: '0',

_10

data: '0x',

_10

operation: 0

_10

}

_10

)`

[getSafeCreationInfo](/reference-sdk-api-kit/getsafecreationinfo "getSafeCreationInfo")[proposeTransaction](/reference-sdk-api-kit/proposetransaction "proposeTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- estimateSafeTransaction
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - safeTransaction.to
    - safeTransaction.value
    - safeTransaction.data
    - safeTransaction.operation(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [getSafeCreationInfo](https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo)
- [proposeTransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

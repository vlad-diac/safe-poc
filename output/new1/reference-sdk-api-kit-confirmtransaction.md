---
title: confirmTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/confirmtransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# confirmTransaction – Safe Docs

API Kit Reference

confirmTransaction

# `confirmTransaction`

Adds a confirmation for a Safe transaction.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeTxHash = '0x...'

_10

_10

const signature = '0x...'

_10

_10

const signature = await apiKit.confirmTransaction(safeTxHash, signature)`

## Returns

`Promise<SignatureResponse>`

The signature.

## Parameters

### `safeTxHash`

- **Type:** `string`

The hash of the Safe transaction that will be confirmed.

`_10

const signature = await apiKit.confirmTransaction(

_10

'0x...',

_10

'0x...'

_10

)`

### `signature`

- **Type:** `string`

The signature of the transaction.

`_10

const signature = await apiKit.confirmTransaction(

_10

'0x...',

_10

'0x...'

_10

)`

[getTransactionConfirmations](/reference-sdk-api-kit/gettransactionconfirmations "getTransactionConfirmations")[getSafeInfo](/reference-sdk-api-kit/getsafeinfo "getSafeInfo")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- confirmTransaction
  - Usage
  - Returns
  - Parameters
    - safeTxHash
    - signature

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/confirmtransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)
- [https://docs.safe.global/reference-sdk-api-kit/confirmtransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)
- [https://docs.safe.global/reference-sdk-api-kit/confirmtransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)
- [https://docs.safe.global/reference-sdk-api-kit/confirmtransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)
- [https://docs.safe.global/reference-sdk-api-kit/confirmtransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)
- [getTransactionConfirmations](https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations)
- [getSafeInfo](https://docs.safe.global/reference-sdk-api-kit/getsafeinfo)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: getTransactionConfirmations – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getTransactionConfirmations – Safe Docs

API Kit Reference

getTransactionConfirmations

# `getTransactionConfirmations`

Returns the list of confirmations for a given a Safe transaction.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeTxHash = '0x...'

_10

_10

const confirmations = await apiKit.getTransactionConfirmations(safeTxHash)`

## Returns

`Promise<SafeMultisigConfirmationListResponse>`

The list of confirmations.

## Parameters

### `safeTxHash`

- **Type:** `string`

The hash of the Safe transaction.

`_10

const confirmations = await apiKit.getTransactionConfirmations(

_10

'0x...'

_10

)`

[getTransaction](/reference-sdk-api-kit/gettransaction "getTransaction")[confirmTransaction](/reference-sdk-api-kit/confirmtransaction "confirmTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getTransactionConfirmations
  - Usage
  - Returns
  - Parameters
    - safeTxHash

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations](https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations](https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations](https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations](https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations)
- [getTransaction](https://docs.safe.global/reference-sdk-api-kit/gettransaction)
- [confirmTransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

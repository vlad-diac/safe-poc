---
title: getTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/gettransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getTransaction – Safe Docs

API Kit Reference

getTransaction

# `getTransaction`

Returns all the information of a Safe transaction.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeTxHash = '0x...'

_10

_10

const tx = await apiKit.getTransaction(safeTxHash)`

## Returns

`Promise<SafeMultisigTransactionResponse>`

The information of a Safe transaction.

## Parameters

### `safeTxHash`

- **Type:** `string`

The hash of the Safe transaction.

`_10

const tx = await apiKit.getTransaction(

_10

'0x...'

_10

)`

[getSafesByModule](/reference-sdk-api-kit/getsafesbymodule "getSafesByModule")[getTransactionConfirmations](/reference-sdk-api-kit/gettransactionconfirmations "getTransactionConfirmations")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getTransaction
  - Usage
  - Returns
  - Parameters
    - safeTxHash

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/gettransaction](https://docs.safe.global/reference-sdk-api-kit/gettransaction)
- [https://docs.safe.global/reference-sdk-api-kit/gettransaction](https://docs.safe.global/reference-sdk-api-kit/gettransaction)
- [https://docs.safe.global/reference-sdk-api-kit/gettransaction](https://docs.safe.global/reference-sdk-api-kit/gettransaction)
- [https://docs.safe.global/reference-sdk-api-kit/gettransaction](https://docs.safe.global/reference-sdk-api-kit/gettransaction)
- [getSafesByModule](https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule)
- [getTransactionConfirmations](https://docs.safe.global/reference-sdk-api-kit/gettransactionconfirmations)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

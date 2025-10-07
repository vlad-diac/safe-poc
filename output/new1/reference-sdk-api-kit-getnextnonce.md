---
title: getNextNonce – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getnextnonce
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getNextNonce – Safe Docs

API Kit Reference

getNextNonce

# `getNextNonce`

Returns the right nonce to propose a new transaction right after the last pending transaction.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeAddress = '0x...'

_10

_10

const nextNonce = await apiKit.getNextNonce(safeAddress)`

## Returns

`Promise<number>`

The right nonce to propose a new transaction after the last pending transaction.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const nextNonce = await apiKit.getNextNonce(

_10

'0x...'

_10

)`

[getAllTransactions](/reference-sdk-api-kit/getalltransactions "getAllTransactions")[getTokenList](/reference-sdk-api-kit/gettokenlist "getTokenList")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getNextNonce
  - Usage
  - Returns
  - Parameters
    - safeAddress

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getnextnonce](https://docs.safe.global/reference-sdk-api-kit/getnextnonce)
- [https://docs.safe.global/reference-sdk-api-kit/getnextnonce](https://docs.safe.global/reference-sdk-api-kit/getnextnonce)
- [https://docs.safe.global/reference-sdk-api-kit/getnextnonce](https://docs.safe.global/reference-sdk-api-kit/getnextnonce)
- [https://docs.safe.global/reference-sdk-api-kit/getnextnonce](https://docs.safe.global/reference-sdk-api-kit/getnextnonce)
- [getAllTransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)
- [getTokenList](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

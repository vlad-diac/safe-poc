---
title: getAllTransactions – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getalltransactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getAllTransactions – Safe Docs

API Kit Reference

getAllTransactions

# `getAllTransactions`

Returns a list of transactions for a given Safe account, with a different structure depending on the transaction type.

## Usage



example.tssetup.ts

`_14

import { AllTransactionsOptions } from '@safe-global/api-kit'

_14

import { apiKit } from './setup.ts'

_14

_14

const safeAddress = '0x...'

_14

_14

const options: AllTransactionsOptions = {

_14

limit: 10, // Optional: Maximum number of results to return per page

_14

offset: 0 // Optional: Initial index from which to return the results

_14

}

_14

_14

const allTxs = await apiKit.getAllTransactions(

_14

safeAddress,

_14

options // Optional

_14

)`

## Returns

`Promise<AllTransactionsListResponse>`

The list of transactions.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const allTxs = await apiKit.getAllTransactions('0x...')`

### `options.limit` (Optional)

- **Type:** `number`

Maximum number of results to return per page.

`_10

const allTxs = await apiKit.getAllTransactions(safeAddress, {

_10

limit: 10

_10

})`

### `options.offset` (Optional)

- **Type:** `number`

Initial index from which to return the results.

`_10

const allTxs = await apiKit.getAllTransactions(safeAddress, {

_10

offset: 20

_10

})`

[getPendingTransactions](/reference-sdk-api-kit/getpendingtransactions "getPendingTransactions")[getNextNonce](/reference-sdk-api-kit/getnextnonce "getNextNonce")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getAllTransactions
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getalltransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getalltransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getalltransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getalltransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getalltransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getalltransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)
- [getPendingTransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [getNextNonce](https://docs.safe.global/reference-sdk-api-kit/getnextnonce)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: getPendingTransactions – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getPendingTransactions – Safe Docs

API Kit Reference

getPendingTransactions

# `getPendingTransactions`

Returns the list of multi-signature transactions that are waiting for the confirmation of the Safe owners.

## Usage



example.tssetup.ts

`_12

import { apiKit } from './setup.ts'

_12

_12

const safeAddress = '0x...'

_12

const options = {

_12

currentNonce: 0,

_12

hasConfirmations: true,

_12

ordering: 'created',

_12

limit: 10,

_12

offset: 10

_12

}

_12

_12

const pendingTxs = await apiKit.getPendingTransactions(safeAddress, options)`

## Returns

`Promise<SafeMultisigTransactionListResponse>`

The list of transactions waiting for the confirmation of the Safe owners.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const pendingTxs = await apiKit.getPendingTransactions(

_10

'0x...'

_10

)`

### `options.currentNonce` (Optional)

- **Type:** `number`

The current nonce of the Safe.

### `options.hasConfirmations` (Optional)

- **Type:** `boolean`

Filter transactions with al least one confirmation.

### `options.ordering` (Optional)

- **Type:** `string`

The field used to sort the results.

### `options.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

### `options.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

[getMultisigTransactions](/reference-sdk-api-kit/getmultisigtransactions "getMultisigTransactions")[getAllTransactions](/reference-sdk-api-kit/getalltransactions "getAllTransactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getPendingTransactions
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - options.currentNonce(Optional)
    - options.hasConfirmations(Optional)
    - options.ordering(Optional)
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)
- [getMultisigTransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [getAllTransactions](https://docs.safe.global/reference-sdk-api-kit/getalltransactions)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

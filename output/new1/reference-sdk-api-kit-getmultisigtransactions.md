---
title: getMultisigTransactions – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getMultisigTransactions – Safe Docs

API Kit Reference

getMultisigTransactions

# `getMultisigTransactions`

Returns the history of multi-signature transactions of a Safe account.

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

executed: true,

_12

nonce: '0x...',

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

const multisigTxs = await apiKit.getMultisigTransactions(safeAddress, options)`

## Returns

`Promise<SafeMultisigTransactionListResponse>`

The history of multi-signature transactions.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const multisigTxs = await apiKit.getMultisigTransactions(

_10

'0x...'

_10

)`

### `options.executed` (Optional)

- **Type:** `boolean`

Filter the executed transactions if `true`.

### `options.nonce` (Optional)

- **Type:** `string`

The nonce used to return the results.

### `options.ordering` (Optional)

- **Type:** `string`

The field used to sort the results.

### `options.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

### `options.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

[getModuleTransactions](/reference-sdk-api-kit/getmoduletransactions "getModuleTransactions")[getPendingTransactions](/reference-sdk-api-kit/getpendingtransactions "getPendingTransactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getMultisigTransactions
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - options.executed(Optional)
    - options.nonce(Optional)
    - options.ordering(Optional)
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)
- [getModuleTransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [getPendingTransactions](https://docs.safe.global/reference-sdk-api-kit/getpendingtransactions)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

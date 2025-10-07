---
title: getModuleTransactions – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getModuleTransactions – Safe Docs

API Kit Reference

getModuleTransactions

# `getModuleTransactions`

Returns the history of module transactions of a Safe account.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeAddress = '0x...'

_10

const options = {

_10

module: '0x...',

_10

limit: 10,

_10

offset: 10

_10

}

_10

_10

const moduleTxs = await apiKit.getModuleTransactions(safeAddress, options)`

## Returns

`Promise<SafeModuleTransactionListResponse>`

The history of Safe transactions triggered by a module.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const moduleTxs = await apiKit.getModuleTransactions(

_10

'0x...'

_10

)`

### `options.module` (Optional)

- **Type:** `string`

The module to get the transactions from.

### `options.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

### `options.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

[getIncomingTransactions](/reference-sdk-api-kit/getincomingtransactions "getIncomingTransactions")[getMultisigTransactions](/reference-sdk-api-kit/getmultisigtransactions "getMultisigTransactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getModuleTransactions
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - options.module(Optional)
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)
- [getIncomingTransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [getMultisigTransactions](https://docs.safe.global/reference-sdk-api-kit/getmultisigtransactions)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

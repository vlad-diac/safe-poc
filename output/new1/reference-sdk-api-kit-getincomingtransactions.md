---
title: getIncomingTransactions – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getIncomingTransactions – Safe Docs

API Kit Reference

getIncomingTransactions

# `getIncomingTransactions`

Returns the history of incoming transactions of a Safe account.

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

_from: '0x...',

_10

limit: 10,

_10

offset: 10

_10

}

_10

_10

const incomingTxs = await apiKit.getIncomingTransactions(safeAddress, options)`

## Returns

`Promise<TransferListResponse>`

The history of incoming transactions.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const incomingTxs = await apiKit.getIncomingTransactions(

_10

'0x...'

_10

)`

### `options.from` (Optional)

- **Type:** `string`

The transaction sender address.

### `options.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

### `options.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

[proposeTransaction](/reference-sdk-api-kit/proposetransaction "proposeTransaction")[getModuleTransactions](/reference-sdk-api-kit/getmoduletransactions "getModuleTransactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getIncomingTransactions
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - options.from(Optional)
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)
- [proposeTransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [getModuleTransactions](https://docs.safe.global/reference-sdk-api-kit/getmoduletransactions)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

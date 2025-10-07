---
title: getTokenList – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/gettokenlist
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getTokenList – Safe Docs

API Kit Reference

getTokenList

# `getTokenList`

Returns the list of all the ERC-20 tokens handled by the Safe.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const tokens = await apiKit.getTokenList()`

## Returns

`Promise<TokenInfoListResponse>`

The list of ERC-20 tokens.

## Parameters

### `options.search` (Optional)

- **Type:** `string`

Filters the results by the token name or symbol.

### `options.address` (Optional)

- **Type:** `string`

Filters the results by the token address.

### `options.ordering` (Optional)

- **Type:** `string`

The field used to sort the results.

### `options.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

### `options.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

[getNextNonce](/reference-sdk-api-kit/getnextnonce "getNextNonce")[getToken](/reference-sdk-api-kit/gettoken "getToken")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getTokenList
  - Usage
  - Returns
  - Parameters
    - options.search(Optional)
    - options.address(Optional)
    - options.ordering(Optional)
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [https://docs.safe.global/reference-sdk-api-kit/gettokenlist](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [getNextNonce](https://docs.safe.global/reference-sdk-api-kit/getnextnonce)
- [getToken](https://docs.safe.global/reference-sdk-api-kit/gettoken)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

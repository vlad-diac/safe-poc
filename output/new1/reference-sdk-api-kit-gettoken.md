---
title: getToken – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/gettoken
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getToken – Safe Docs

API Kit Reference

getToken

# `getToken`

Returns the information of a given ERC-20 token.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const tokenAddress = '0x...'

_10

_10

const token = await apiKit.getToken(tokenAddress)`

## Returns

`Promise<TokenInfoResponse>`

The information of the given ERC-20 token.

## Parameters

### `tokenAddress`

- **Type:** `string`

The ERC-20 token address.

`_10

const token = await apiKit.getToken(

_10

'0x...'

_10

)`

[getTokenList](/reference-sdk-api-kit/gettokenlist "getTokenList")[getMessage](/reference-sdk-api-kit/getmessage "getMessage")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getToken
  - Usage
  - Returns
  - Parameters
    - tokenAddress

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/gettoken](https://docs.safe.global/reference-sdk-api-kit/gettoken)
- [https://docs.safe.global/reference-sdk-api-kit/gettoken](https://docs.safe.global/reference-sdk-api-kit/gettoken)
- [https://docs.safe.global/reference-sdk-api-kit/gettoken](https://docs.safe.global/reference-sdk-api-kit/gettoken)
- [https://docs.safe.global/reference-sdk-api-kit/gettoken](https://docs.safe.global/reference-sdk-api-kit/gettoken)
- [getTokenList](https://docs.safe.global/reference-sdk-api-kit/gettokenlist)
- [getMessage](https://docs.safe.global/reference-sdk-api-kit/getmessage)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

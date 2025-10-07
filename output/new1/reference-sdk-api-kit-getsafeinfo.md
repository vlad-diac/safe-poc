---
title: getSafeInfo – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafeinfo
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeInfo – Safe Docs

API Kit Reference

getSafeInfo

# `getSafeInfo`

Returns the information and configuration of the provided Safe address.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeAddress = '0x...'

_10

_10

const safeInfo = await apiKit.getSafeInfo(safeAddress)`

## Returns

`Promise<SafeInfoResponse>`

The information and configuration of the provided Safe address.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const safeInfo = await apiKit.getSafeInfo(

_10

'0x...'

_10

)`

[confirmTransaction](/reference-sdk-api-kit/confirmtransaction "confirmTransaction")[getSafeDelegates](/reference-sdk-api-kit/getsafedelegates "getSafeDelegates")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeInfo
  - Usage
  - Returns
  - Parameters
    - safeAddress

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getsafeinfo](https://docs.safe.global/reference-sdk-api-kit/getsafeinfo)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeinfo](https://docs.safe.global/reference-sdk-api-kit/getsafeinfo)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeinfo](https://docs.safe.global/reference-sdk-api-kit/getsafeinfo)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeinfo](https://docs.safe.global/reference-sdk-api-kit/getsafeinfo)
- [confirmTransaction](https://docs.safe.global/reference-sdk-api-kit/confirmtransaction)
- [getSafeDelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

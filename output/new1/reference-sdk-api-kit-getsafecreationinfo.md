---
title: getSafeCreationInfo – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeCreationInfo – Safe Docs

API Kit Reference

getSafeCreationInfo

# `getSafeCreationInfo`

Returns the creation information of a Safe.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeAddress = '0x...'

_10

_10

const safeCreationInfo = await apiKit.getSafeCreationInfo(

_10

safeAddress

_10

)`

## Returns

`Promise<SafeCreationInfoResponse>`

The creation information of a Safe account.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const safeCreationInfo = await apiKit.getSafeCreationInfo(

_10

'0x...'

_10

)`

[removeSafeDelegate](/reference-sdk-api-kit/removesafedelegate "removeSafeDelegate")[estimateSafeTransaction](/reference-sdk-api-kit/estimatesafetransaction "estimateSafeTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeCreationInfo
  - Usage
  - Returns
  - Parameters
    - safeAddress

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo](https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo)
- [https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo](https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo)
- [https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo](https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo)
- [https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo](https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo)
- [removeSafeDelegate](https://docs.safe.global/reference-sdk-api-kit/removesafedelegate)
- [estimateSafeTransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

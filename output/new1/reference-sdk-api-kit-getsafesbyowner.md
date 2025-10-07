---
title: getSafesByOwner – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafesByOwner – Safe Docs

API Kit Reference

getSafesByOwner

# `getSafesByOwner`

Returns the list of Safes where the address provided is an owner.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const ownerAddress = '0x...'

_10

_10

const decodedData = await apiKit.getSafesByOwner(ownerAddress)`

## Returns

`Promise<OwnerResponse>`

The list of Safes where the address provided is an owner.

## Parameters

### `ownerAddress`

- **Type:** `string`

The owner address.

`_10

const decodedData = await apiKit.getSafesByOwner(

_10

'0x...'

_10

)`

[decodeData](/reference-sdk-api-kit/decodedata "decodeData")[getSafesByModule](/reference-sdk-api-kit/getsafesbymodule "getSafesByModule")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafesByOwner
  - Usage
  - Returns
  - Parameters
    - ownerAddress

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner](https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner)
- [https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner](https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner)
- [https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner](https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner)
- [https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner](https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner)
- [decodeData](https://docs.safe.global/reference-sdk-api-kit/decodedata)
- [getSafesByModule](https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

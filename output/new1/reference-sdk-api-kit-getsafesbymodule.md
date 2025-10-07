---
title: getSafesByModule – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafesByModule – Safe Docs

API Kit Reference

getSafesByModule

# `getSafesByModule`

Returns the list of Safe accounts where the module address provided is enabled.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const moduleAddress = '0x...'

_10

_10

const safes = await getSafesByModule(moduleAddress)`

## Returns

`Promise<ModulesResponse>`

The list of Safe addresses where the module provided is enabled.

## Parameters

### `moduleAddress`

- **Type:** `string`

The Safe Module address.

`_10

const safes = await getSafesByModule(

_10

'0x...'

_10

)`

[getSafesByOwner](/reference-sdk-api-kit/getsafesbyowner "getSafesByOwner")[getTransaction](/reference-sdk-api-kit/gettransaction "getTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafesByModule
  - Usage
  - Returns
  - Parameters
    - moduleAddress

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule](https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule)
- [https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule](https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule)
- [https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule](https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule)
- [https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule](https://docs.safe.global/reference-sdk-api-kit/getsafesbymodule)
- [getSafesByOwner](https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner)
- [getTransaction](https://docs.safe.global/reference-sdk-api-kit/gettransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

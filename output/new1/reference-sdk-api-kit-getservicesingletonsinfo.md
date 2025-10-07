---
title: getServiceSingletonsInfo – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getservicesingletonsinfo
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getServiceSingletonsInfo – Safe Docs

API Kit Reference

getServiceSingletonsInfo

# `getServiceSingletonsInfo`

Returns the list of Safe Singleton contracts.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const singletons = await apiKit.getServiceSingletonsInfo()`

## Returns

`Promise<SafeSingletonResponse[]>`

The list of Safe Singleton contracts.

[getServiceInfo](/reference-sdk-api-kit/getserviceinfo "getServiceInfo")[decodeData](/reference-sdk-api-kit/decodedata "decodeData")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getServiceSingletonsInfo
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getservicesingletonsinfo](https://docs.safe.global/reference-sdk-api-kit/getservicesingletonsinfo)
- [https://docs.safe.global/reference-sdk-api-kit/getservicesingletonsinfo](https://docs.safe.global/reference-sdk-api-kit/getservicesingletonsinfo)
- [getServiceInfo](https://docs.safe.global/reference-sdk-api-kit/getserviceinfo)
- [decodeData](https://docs.safe.global/reference-sdk-api-kit/decodedata)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

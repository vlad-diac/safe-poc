---
title: getGuard – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/getguard
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getGuard – Safe Docs

Protocol Kit Reference

Safe Guards

getGuard

# `getGuard`

Returns the enabled Safe Guard or `0x0000000000000000000000000000000000000000` if no guards are enabled.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const guardAddress = await protocolKit.getGuard()`

## Returns

`Promise<string>`

The enabled Safe Guard or `0x0000000000000000000000000000000000000000` if no guards are enabled.

[createEnableGuardTx](/reference-sdk-protocol-kit/safe-guards/createenableguardtx "createEnableGuardTx")[createDisableFallbackHandlerTx](/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx "createDisableFallbackHandlerTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getGuard
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/getguard](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/getguard)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/getguard](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/getguard)
- [createEnableGuardTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [createDisableFallbackHandlerTx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

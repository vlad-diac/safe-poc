---
title: getModules – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/getmodules
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getModules – Safe Docs

Protocol Kit Reference

Safe Modules

getModules

# `getModules`

Returns the list of addresses of all the enabled Safe Modules.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const moduleAddresses = await protocolKit.getModules()`

## Returns

`Promise<string[]>`

The list of addresses of all the enabled Safe Modules.

[createEnableModuleTx](/reference-sdk-protocol-kit/safe-modules/createenablemoduletx "createEnableModuleTx")[isModuleEnabled](/reference-sdk-protocol-kit/safe-modules/ismoduleenabled "isModuleEnabled")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getModules
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/getmodules](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/getmodules)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/getmodules](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/getmodules)
- [createEnableModuleTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/createenablemoduletx)
- [isModuleEnabled](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

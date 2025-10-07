---
title: isModuleEnabled – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isModuleEnabled – Safe Docs

Protocol Kit Reference

Safe Modules

isModuleEnabled

# `isModuleEnabled`

Checks if a given Safe Module is enabled in the connected Safe.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const moduleAddress = '0x...'

_10

_10

const isEnabled = await protocolKit.isModuleEnabled(moduleAddress)`

## Parameters

### `moduleAddress`

- **Type**: `string`

The Safe Module address to check.

`_10

const isEnabled = await protocolKit.isModuleEnabled(

_10

'0x...'

_10

)`

## Returns

`Promise<boolean>`

The boolean value that indicates if the module is enabled in the connected Safe.

[getModules](/reference-sdk-protocol-kit/safe-modules/getmodules "getModules")[createDisableGuardTx](/reference-sdk-protocol-kit/safe-guards/createdisableguardtx "createDisableGuardTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isModuleEnabled
  - Usage
  - Parameters
    - moduleAddress
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/ismoduleenabled)
- [getModules](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/getmodules)
- [createDisableGuardTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createdisableguardtx)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

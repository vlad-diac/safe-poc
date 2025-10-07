---
title: isModuleEnabled – Safe Docs
url: https://docs.safe.global/reference-smart-account/modules/isModuleEnabled
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isModuleEnabled – Safe Docs

Smart Account Reference

Modules

isModuleEnabled

# `isModuleEnabled`

Returns if a module is enabled.

## Usage



example.sol

`_10

interface ISafe {

_10

function isModuleEnabled(address module) external view returns (bool);

_10

}

_10

_10

contract Example {

_10

function example() … {

_10

(ISafe safe).isModuleEnabled(0x...);

_10

}

_10

}`

## Returns

### `isModuleEnabled`

- **Type:** `bool`

Boolean flag indicating if the module is enabled.

## Parameters

### `module`

- **Type:** `address`

Address of the module.

`_10

(ISafe safe).isModuleEnabled(

_10

0x...

_10

);`

[getModulesPaginated](/reference-smart-account/modules/getModulesPaginated "getModulesPaginated")[setGuard](/reference-smart-account/guards/setGuard "setGuard")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isModuleEnabled
  - Usage
  - Returns
    - isModuleEnabled
  - Parameters
    - module

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/modules/isModuleEnabled](https://docs.safe.global/reference-smart-account/modules/isModuleEnabled)
- [https://docs.safe.global/reference-smart-account/modules/isModuleEnabled](https://docs.safe.global/reference-smart-account/modules/isModuleEnabled)
- [https://docs.safe.global/reference-smart-account/modules/isModuleEnabled](https://docs.safe.global/reference-smart-account/modules/isModuleEnabled)
- [https://docs.safe.global/reference-smart-account/modules/isModuleEnabled](https://docs.safe.global/reference-smart-account/modules/isModuleEnabled)
- [https://docs.safe.global/reference-smart-account/modules/isModuleEnabled](https://docs.safe.global/reference-smart-account/modules/isModuleEnabled)
- [getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [setGuard](https://docs.safe.global/reference-smart-account/guards/setGuard)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

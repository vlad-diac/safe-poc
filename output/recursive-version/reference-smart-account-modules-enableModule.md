---
title: enableModule – Safe Docs
url: https://docs.safe.global/reference-smart-account/modules/enableModule
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# enableModule – Safe Docs

Smart Account Reference

Modules

enableModule

# `enableModule`

Enables a new Safe Module in a Safe account.

⚠️

This action can only be done via a Safe transaction.

## Usage



example.sol

`_10

interface ISafe {

_10

function enableModule(address module) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).enableModule(0x...);

_10

}

_10

}`

## Parameters

### `module`

- **Type:** `address`

Safe Module to be enabled.

`_10

(ISafe safe).enableModule(

_10

0x...

_10

);`

## Events

### `EnabledModule`

`_10

event EnabledModule(address module);`

Emitted when a module is enabled for the Safe.

[simulateAndRevert](/reference-smart-account/transactions/simulateAndRevert "simulateAndRevert")[disableModule](/reference-smart-account/modules/disableModule "disableModule")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- enableModule
  - Usage
  - Parameters
    - module
  - Events
    - EnabledModule

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/modules/enableModule](https://docs.safe.global/reference-smart-account/modules/enableModule)
- [https://docs.safe.global/reference-smart-account/modules/enableModule](https://docs.safe.global/reference-smart-account/modules/enableModule)
- [https://docs.safe.global/reference-smart-account/modules/enableModule](https://docs.safe.global/reference-smart-account/modules/enableModule)
- [https://docs.safe.global/reference-smart-account/modules/enableModule](https://docs.safe.global/reference-smart-account/modules/enableModule)
- [https://docs.safe.global/reference-smart-account/modules/enableModule](https://docs.safe.global/reference-smart-account/modules/enableModule)
- [simulateAndRevert](https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert)
- [disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: disableModule – Safe Docs
url: https://docs.safe.global/reference-smart-account/modules/disableModule
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# disableModule – Safe Docs

Smart Account Reference

Modules

disableModule

# `disableModule`

Disables the module `module` for the Safe.

⚠️

This action can only be done via a Safe transaction.

## Usage



example.sol

`_10

interface ISafe {

_10

function disableModule(address prevModule, address module) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).disableModule(0x..., 0x...);

_10

}

_10

}`

## Parameters

### `prevModule`

- **Type:** `address`

Previous module in the modules linked list.

`_10

(ISafe safe).disableModule(

_10

0x...,

_10

0x...

_10

);`

### `module`

- **Type:** `address`

Module to be removed.

`_10

(ISafe safe).disableModule(

_10

0x...,

_10

0x...

_10

);`

## Events

### `DisabledModule`

`_10

event DisabledModule(address module);`

Emitted when a module is disabled for the Safe.

[enableModule](/reference-smart-account/modules/enableModule "enableModule")[execTransactionFromModule](/reference-smart-account/modules/execTransactionFromModule "execTransactionFromModule")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- disableModule
  - Usage
  - Parameters
    - prevModule
    - module
  - Events
    - DisabledModule

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/modules/disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)
- [https://docs.safe.global/reference-smart-account/modules/disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)
- [https://docs.safe.global/reference-smart-account/modules/disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)
- [https://docs.safe.global/reference-smart-account/modules/disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)
- [https://docs.safe.global/reference-smart-account/modules/disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)
- [https://docs.safe.global/reference-smart-account/modules/disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)
- [enableModule](https://docs.safe.global/reference-smart-account/modules/enableModule)
- [execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

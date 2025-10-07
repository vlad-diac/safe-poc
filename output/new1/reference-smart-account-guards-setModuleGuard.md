---
title: setModuleGuard – Safe Docs
url: https://docs.safe.global/reference-smart-account/guards/setModuleGuard
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# setModuleGuard – Safe Docs

Smart Account Reference

Guards

setModuleGuard

# `setModuleGuard`

Set a Module Guard that checks transactions initiated by the module before
execution.

⚠️

This action can only be done via a Safe transaction.

🚨

Since a guard has the full power to block Safe transaction executions, a
broken guard can cause a denial of service for the Safe. Make sure to
carefully audit the guard code, and design recovery mechanisms.

## Usage



example.sol

`_10

interface ISafe {

_10

function setModuleGuard(address moduleGuard) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).setModuleGuard(0x...);

_10

}

_10

}`

## Parameters

### `moduleGuard`

- **Type:** `address`

The address of the Module Guard to be used, or `address(0)` to disable the Module Guard.

`_10

(ISafe safe).setModuleGuard(

_10

0x...

_10

);`

## Events

### `ChangedModuleGuard`

`_10

event ChangedModuleGuard(address moduleGuard);`

Emitted when a Module Guard is set for the Safe.

[setGuard](/reference-smart-account/guards/setGuard "setGuard")[fallback](/reference-smart-account/fallback/fallback "fallback")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- setModuleGuard
  - Usage
  - Parameters
    - moduleGuard
  - Events
    - ChangedModuleGuard

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/guards/setModuleGuard](https://docs.safe.global/reference-smart-account/guards/setModuleGuard)
- [https://docs.safe.global/reference-smart-account/guards/setModuleGuard](https://docs.safe.global/reference-smart-account/guards/setModuleGuard)
- [https://docs.safe.global/reference-smart-account/guards/setModuleGuard](https://docs.safe.global/reference-smart-account/guards/setModuleGuard)
- [https://docs.safe.global/reference-smart-account/guards/setModuleGuard](https://docs.safe.global/reference-smart-account/guards/setModuleGuard)
- [https://docs.safe.global/reference-smart-account/guards/setModuleGuard](https://docs.safe.global/reference-smart-account/guards/setModuleGuard)
- [setGuard](https://docs.safe.global/reference-smart-account/guards/setGuard)
- [fallback](https://docs.safe.global/reference-smart-account/fallback/fallback)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

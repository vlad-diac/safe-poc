---
title: setGuard – Safe Docs
url: https://docs.safe.global/reference-smart-account/guards/setGuard
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# setGuard – Safe Docs

Smart Account Reference

Guards

setGuard

# `setGuard`

Set Transaction Guard `guard` that checks transactions before execution.

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

function setGuard(address guard) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).setGuard(0x...);

_10

}

_10

}`

## Parameters

### `guard`

- **Type:** `address`

The address of the guard to be used, or `address(0)` to disable the guard.

`_10

(ISafe safe).setGuard(

_10

0x...

_10

);`

## Events

### `ChangedGuard`

`_10

event ChangedGuard(address guard);`

Emitted when a guard is set for the Safe.

[isModuleEnabled](/reference-smart-account/modules/isModuleEnabled "isModuleEnabled")[setModuleGuard](/reference-smart-account/guards/setModuleGuard "setModuleGuard")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- setGuard
  - Usage
  - Parameters
    - guard
  - Events
    - ChangedGuard

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/guards/setGuard](https://docs.safe.global/reference-smart-account/guards/setGuard)
- [https://docs.safe.global/reference-smart-account/guards/setGuard](https://docs.safe.global/reference-smart-account/guards/setGuard)
- [https://docs.safe.global/reference-smart-account/guards/setGuard](https://docs.safe.global/reference-smart-account/guards/setGuard)
- [https://docs.safe.global/reference-smart-account/guards/setGuard](https://docs.safe.global/reference-smart-account/guards/setGuard)
- [https://docs.safe.global/reference-smart-account/guards/setGuard](https://docs.safe.global/reference-smart-account/guards/setGuard)
- [isModuleEnabled](https://docs.safe.global/reference-smart-account/modules/isModuleEnabled)
- [setModuleGuard](https://docs.safe.global/reference-smart-account/guards/setModuleGuard)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

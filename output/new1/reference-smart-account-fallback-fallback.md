---
title: fallback – Safe Docs
url: https://docs.safe.global/reference-smart-account/fallback/fallback
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# fallback – Safe Docs

Smart Account Reference

Fallback Handler

fallback

# `fallback`

This function emits the [`SafeReceived`](/reference-smart-account/fallback/fallback/receive#safereceived) event when it receives a payment.

## Usage



example.sol

`_10

interface ISafe {

_10

fallback() external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).fallback();

_10

}

_10

}`

## Events

### `SafeReceived`

`_10

event SafeReceived(address sender, uint256 value)`

Emitted when the Safe contract receives a payment.

[setModuleGuard](/reference-smart-account/guards/setModuleGuard "setModuleGuard")[receive](/reference-smart-account/fallback/receive "receive")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- fallback
  - Usage
  - Events
    - SafeReceived

---

## Related Links

### Internal Links

- [SafeReceived](https://docs.safe.global/reference-smart-account/fallback/fallback/receive)
- [https://docs.safe.global/reference-smart-account/fallback/fallback](https://docs.safe.global/reference-smart-account/fallback/fallback)
- [https://docs.safe.global/reference-smart-account/fallback/fallback](https://docs.safe.global/reference-smart-account/fallback/fallback)
- [https://docs.safe.global/reference-smart-account/fallback/fallback](https://docs.safe.global/reference-smart-account/fallback/fallback)
- [setModuleGuard](https://docs.safe.global/reference-smart-account/guards/setModuleGuard)
- [receive](https://docs.safe.global/reference-smart-account/fallback/receive)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

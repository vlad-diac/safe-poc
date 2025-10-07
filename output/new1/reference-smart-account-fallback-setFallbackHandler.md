---
title: setFallbackHandler – Safe Docs
url: https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# setFallbackHandler – Safe Docs

Smart Account Reference

Fallback Handler

setFallbackHandler

# `setFallbackHandler`

Set Fallback Handler to `handler` for the Safe.

⚠️

Only fallback calls without value and with data will be forwarded. This can
only be done via a Safe transaction. Cannot be set to the Safe itself.

## Usage



example.sol

`_10

interface ISafe {

_10

function setFallbackHandler(address handler) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).setFallbackHandler(0x...);

_10

}

_10

}`

## Parameters

### `handler`

- **Type:** `address`

Contract to handle fallback calls.

`_10

(ISafe safe).setFallbackHandler(

_10

0x...

_10

);`

## Events

### `ChangedFallbackHandler`

`_10

event ChangedFallbackHandler(address handler);`

Emitted when the Fallback Handler is changed.

[receive](/reference-smart-account/fallback/receive "receive")[approveHash](/reference-smart-account/signatures/approveHash "approveHash")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- setFallbackHandler
  - Usage
  - Parameters
    - handler
  - Events
    - ChangedFallbackHandler

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler](https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler)
- [https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler](https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler)
- [https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler](https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler)
- [https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler](https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler)
- [https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler](https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler)
- [receive](https://docs.safe.global/reference-smart-account/fallback/receive)
- [approveHash](https://docs.safe.global/reference-smart-account/signatures/approveHash)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

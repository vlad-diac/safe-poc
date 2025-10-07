---
title: receive – Safe Docs
url: https://docs.safe.global/reference-smart-account/fallback/receive
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# receive – Safe Docs

Smart Account Reference

Fallback Handler

receive

# `receive`

Receive function accepts native token transactions.

## Usage



example.sol

`_10

interface ISafe {

_10

receive() external payable;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).receive();

_10

}

_10

}`

## Events

### `SafeReceived`

`_10

event SafeReceived(address sender, uint256 value)`

Emitted when the Safe contract receives a payment.

[fallback](/reference-smart-account/fallback/fallback "fallback")[setFallbackHandler](/reference-smart-account/fallback/setFallbackHandler "setFallbackHandler")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- receive
  - Usage
  - Events
    - SafeReceived

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/fallback/receive](https://docs.safe.global/reference-smart-account/fallback/receive)
- [https://docs.safe.global/reference-smart-account/fallback/receive](https://docs.safe.global/reference-smart-account/fallback/receive)
- [https://docs.safe.global/reference-smart-account/fallback/receive](https://docs.safe.global/reference-smart-account/fallback/receive)
- [fallback](https://docs.safe.global/reference-smart-account/fallback/fallback)
- [setFallbackHandler](https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

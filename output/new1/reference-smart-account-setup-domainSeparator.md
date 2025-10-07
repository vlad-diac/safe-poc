---
title: domainSeparator – Safe Docs
url: https://docs.safe.global/reference-smart-account/setup/domainSeparator
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# domainSeparator – Safe Docs

Smart Account Reference

Setup

domainSeparator

# `domainSeparator`

Returns the domain separator for this contract, as defined in the [EIP-712 standard](/home/glossary#eip-712).

## Usage



example.sol

`_10

interface ISafe {

_10

function domainSeparator() external view returns (bytes32);

_10

}

_10

_10

contract Example {

_10

function example() … {

_10

(ISafe safe).domainSeparator();

_10

}

_10

}`

## Returns

- **Type:** `bytes32`

The domain separator hash.

[SafeSingleton](/reference-smart-account/deployment/SafeSingleton "SafeSingleton")[setup](/reference-smart-account/setup/setup "setup")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- domainSeparator
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [EIP-712 standard](https://docs.safe.global/home/glossary)
- [https://docs.safe.global/reference-smart-account/setup/domainSeparator](https://docs.safe.global/reference-smart-account/setup/domainSeparator)
- [https://docs.safe.global/reference-smart-account/setup/domainSeparator](https://docs.safe.global/reference-smart-account/setup/domainSeparator)
- [SafeSingleton](https://docs.safe.global/reference-smart-account/deployment/SafeSingleton)
- [setup](https://docs.safe.global/reference-smart-account/setup/setup)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

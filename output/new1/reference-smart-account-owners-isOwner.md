---
title: isOwner – Safe Docs
url: https://docs.safe.global/reference-smart-account/owners/isOwner
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isOwner – Safe Docs

Smart Account Reference

Owners

isOwner

# `isOwner`

Returns if `owner` is an owner of the Safe.

## Usage



example.sol

`_10

interface ISafe {

_10

function isOwner(address owner) external view returns (bool);

_10

}

_10

_10

contract Example {

_10

function example() … {

_10

(bool isOwner) = (ISafe safe).isOwner(0x...);

_10

}

_10

}`

## Returns

### `isOwner`

- **Type:** `bool`

Boolean flag indicating if `owner` is an owner of the Safe.

## Parameters

### `owner`

- **Type:** `address`

Owner address.

`_10

(ISafe safe).isOwner(

_10

0x...

_10

);`

[getThreshold](/reference-smart-account/owners/getThreshold "getThreshold")[removeOwner](/reference-smart-account/owners/removeOwner "removeOwner")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isOwner
  - Usage
  - Returns
    - isOwner
  - Parameters
    - owner

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/owners/isOwner](https://docs.safe.global/reference-smart-account/owners/isOwner)
- [https://docs.safe.global/reference-smart-account/owners/isOwner](https://docs.safe.global/reference-smart-account/owners/isOwner)
- [https://docs.safe.global/reference-smart-account/owners/isOwner](https://docs.safe.global/reference-smart-account/owners/isOwner)
- [https://docs.safe.global/reference-smart-account/owners/isOwner](https://docs.safe.global/reference-smart-account/owners/isOwner)
- [https://docs.safe.global/reference-smart-account/owners/isOwner](https://docs.safe.global/reference-smart-account/owners/isOwner)
- [getThreshold](https://docs.safe.global/reference-smart-account/owners/getThreshold)
- [removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

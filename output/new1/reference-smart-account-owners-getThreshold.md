---
title: getThreshold – Safe Docs
url: https://docs.safe.global/reference-smart-account/owners/getThreshold
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getThreshold – Safe Docs

Smart Account Reference

Owners

getThreshold

# `getThreshold`

Returns the threshold of the Safe account.

## Usage



example.sol

`_10

interface ISafe {

_10

function getThreshold() external view returns (uint256);

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(uint256 threshold) = (ISafe safe).getThreshold();

_10

}

_10

}`

## Returns

### `threshold`

- **Type:** `uint256`

Threshold number.

[getOwners](/reference-smart-account/owners/getOwners "getOwners")[isOwner](/reference-smart-account/owners/isOwner "isOwner")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getThreshold
  - Usage
  - Returns
    - threshold

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/owners/getThreshold](https://docs.safe.global/reference-smart-account/owners/getThreshold)
- [https://docs.safe.global/reference-smart-account/owners/getThreshold](https://docs.safe.global/reference-smart-account/owners/getThreshold)
- [https://docs.safe.global/reference-smart-account/owners/getThreshold](https://docs.safe.global/reference-smart-account/owners/getThreshold)
- [getOwners](https://docs.safe.global/reference-smart-account/owners/getOwners)
- [isOwner](https://docs.safe.global/reference-smart-account/owners/isOwner)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

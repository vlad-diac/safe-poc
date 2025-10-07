---
title: getOwners – Safe Docs
url: https://docs.safe.global/reference-smart-account/owners/getOwners
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getOwners – Safe Docs

Smart Account Reference

Owners

getOwners

# `getOwners`

Returns a list of Safe owners.

## Usage



example.sol

`_10

interface ISafe {

_10

function getOwners() external view returns (address[]);

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).getOwners();

_10

}

_10

}`

## Returns

### `owners`

- **Type:** `address[]`

Array of Safe owners.

[changeThreshold](/reference-smart-account/owners/changeThreshold "changeThreshold")[getThreshold](/reference-smart-account/owners/getThreshold "getThreshold")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getOwners
  - Usage
  - Returns
    - owners

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/owners/getOwners](https://docs.safe.global/reference-smart-account/owners/getOwners)
- [https://docs.safe.global/reference-smart-account/owners/getOwners](https://docs.safe.global/reference-smart-account/owners/getOwners)
- [https://docs.safe.global/reference-smart-account/owners/getOwners](https://docs.safe.global/reference-smart-account/owners/getOwners)
- [changeThreshold](https://docs.safe.global/reference-smart-account/owners/changeThreshold)
- [getThreshold](https://docs.safe.global/reference-smart-account/owners/getThreshold)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

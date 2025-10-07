---
title: changeThreshold – Safe Docs
url: https://docs.safe.global/reference-smart-account/owners/changeThreshold
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# changeThreshold – Safe Docs

Smart Account Reference

Owners

changeThreshold

# `changeThreshold`

Changes the threshold of the Safe to `_threshold`.

⚠️

This action can only be done via a Safe transaction.

## Usage



example.sol

`_10

interface ISafe {

_10

function changeThreshold(uint256 _threshold) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).changeThreshold(1);

_10

}

_10

}`

## Parameters

### `_threshold`

- **Type:** `uint256`

New threshold.

`_10

(ISafe safe).changeThreshold(

_10

1

_10

);`

## Events

### `ChangedThreshold`

`_10

event ChangedThreshold(uint256 threshold);`

Emitted when the threshold for confirmations is changed.

[addOwnerWithThreshold](/reference-smart-account/owners/addOwnerWithThreshold "addOwnerWithThreshold")[getOwners](/reference-smart-account/owners/getOwners "getOwners")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- changeThreshold
  - Usage
  - Parameters
    - _threshold
  - Events
    - ChangedThreshold

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/owners/changeThreshold](https://docs.safe.global/reference-smart-account/owners/changeThreshold)
- [https://docs.safe.global/reference-smart-account/owners/changeThreshold](https://docs.safe.global/reference-smart-account/owners/changeThreshold)
- [https://docs.safe.global/reference-smart-account/owners/changeThreshold](https://docs.safe.global/reference-smart-account/owners/changeThreshold)
- [https://docs.safe.global/reference-smart-account/owners/changeThreshold](https://docs.safe.global/reference-smart-account/owners/changeThreshold)
- [https://docs.safe.global/reference-smart-account/owners/changeThreshold](https://docs.safe.global/reference-smart-account/owners/changeThreshold)
- [addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [getOwners](https://docs.safe.global/reference-smart-account/owners/getOwners)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

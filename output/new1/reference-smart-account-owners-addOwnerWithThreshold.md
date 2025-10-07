---
title: addOwnerWithThreshold – Safe Docs
url: https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# addOwnerWithThreshold – Safe Docs

Smart Account Reference

Owners

addOwnerWithThreshold

# `addOwnerWithThreshold`

Adds the owner `owner` to the Safe and updates the threshold to `_threshold`.

⚠️

This action can only be done via a Safe transaction.

## Usage



example.sol

`_10

interface ISafe {

_10

function addOwnerWithThreshold(address owner, uint256 _threshold) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).addOwnerWithThreshold(0x..., 1);

_10

}

_10

}`

## Parameters

### `owner`

- **Type:** `address`

New owner address.

`_10

(ISafe safe).addOwnerWithThreshold(

_10

0x...,

_10

1

_10

);`

### `_threshold`

- **Type:** `uint256`

New threshold.

`_10

(ISafe safe).addOwnerWithThreshold(

_10

0x...,

_10

1

_10

);`

## Events

### `AddedOwner`

`_10

event AddedOwner(address owner);`

Emitted when an owner is added to the Safe.

### `ChangedThreshold`

`_10

event ChangedThreshold(uint256 threshold);`

Emitted when the threshold for confirmations is changed.

[setup](/reference-smart-account/setup/setup "setup")[changeThreshold](/reference-smart-account/owners/changeThreshold "changeThreshold")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- addOwnerWithThreshold
  - Usage
  - Parameters
    - owner
    - _threshold
  - Events
    - AddedOwner
    - ChangedThreshold

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)
- [setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [changeThreshold](https://docs.safe.global/reference-smart-account/owners/changeThreshold)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

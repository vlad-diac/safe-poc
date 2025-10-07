---
title: removeOwner – Safe Docs
url: https://docs.safe.global/reference-smart-account/owners/removeOwner
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# removeOwner – Safe Docs

Smart Account Reference

Owners

removeOwner

# `removeOwner`

## Overview

Removes the owner `owner` from the Safe and updates the threshold to `_threshold`.

⚠️

This action can only be done via a Safe transaction.

## Usage



example.sol

`_17

interface ISafe {

_17

function removeOwner(

_17

address prevOwner,

_17

address owner,

_17

uint256 _threshold

_17

) external;

_17

}

_17

_17

contract Example {

_17

function example() … {

_17

(ISafe safe).removeOwner(

_17

0x...,

_17

0x...,

_17

1

_17

);

_17

}

_17

}`

## Parameters

### `prevOwner`

- **Type:** `address`

Owner address that is pointing to the owner to be removed in the contract [linked list (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/7f79aaf05c33df71d9cb687f0bc8a73fa39d25d5/contracts/base/OwnerManager.sol#L19).

A linked list is a data structure that allows efficient insertion and removal
of elements in a list. Each element in it will point to the next one. In Safe
contracts, the owners are stored in a linked list.

`_10

(ISafe safe).removeOwner(

_10

0x...,

_10

0x...,

_10

1

_10

);`

### `owner`

- **Type:** `address`

Owner address to be removed.

`_10

(ISafe safe).removeOwner(

_10

0x...,

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

(ISafe safe).removeOwner(

_10

0x...,

_10

0x...,

_10

1

_10

);`

## Events

### `RemovedOwner`

`_10

event RemovedOwner(address owner);`

Emitted when an owner is removed from the Safe.

### `ChangedThreshold`

`_10

event ChangedThreshold(uint256 threshold);`

Emitted when the threshold for confirmations is changed.

[isOwner](/reference-smart-account/owners/isOwner "isOwner")[swapOwner](/reference-smart-account/owners/swapOwner "swapOwner")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- removeOwner
  - Overview
  - Usage
  - Parameters
    - prevOwner
    - owner
    - _threshold
  - Events
    - RemovedOwner
    - ChangedThreshold

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [https://docs.safe.global/reference-smart-account/owners/removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [isOwner](https://docs.safe.global/reference-smart-account/owners/isOwner)
- [swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)

### External Links

- [linked list(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/7f79aaf05c33df71d9cb687f0bc8a73fa39d25d5/contracts/base/OwnerManager.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

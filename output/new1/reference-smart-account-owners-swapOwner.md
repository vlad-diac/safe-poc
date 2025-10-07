---
title: swapOwner – Safe Docs
url: https://docs.safe.global/reference-smart-account/owners/swapOwner
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# swapOwner – Safe Docs

Smart Account Reference

Owners

swapOwner

# `swapOwner`

Replaces the owner `oldOwner` in the Safe with `newOwner`.

⚠️

This action can only be done via a Safe transaction.

## Usage



example.sol

`_17

interface ISafe {

_17

function swapOwner(

_17

address prevOwner,

_17

address oldOwner,

_17

address newOwner

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

(ISafe safe).swapOwner(

_17

0x...,

_17

0x...,

_17

0x...

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

(ISafe safe).swapOwner(

_10

0x...,

_10

0x...,

_10

0x...

_10

);`

### `oldOwner`

- **Type:** `address`

Owner address to be replaced.

`_10

(ISafe safe).swapOwner(

_10

0x...,

_10

0x...,

_10

0x...

_10

);`

### `newOwner`

- **Type:** `address`

New owner address.

`_10

(ISafe safe).swapOwner(

_10

0x...,

_10

0x...,

_10

0x...

_10

);`

## Events

### `AddedOwner`

`_10

event AddedOwner(address owner);`

Emitted when an owner is added to the Safe.

### `RemovedOwner`

`_10

event RemovedOwner(address owner);`

Emitted when an owner is removed from the Safe.

[removeOwner](/reference-smart-account/owners/removeOwner "removeOwner")[encodeTransactionData](/reference-smart-account/transactions/encodeTransactionData "encodeTransactionData")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- swapOwner
  - Usage
  - Parameters
    - prevOwner
    - oldOwner
    - newOwner
  - Events
    - AddedOwner
    - RemovedOwner

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [https://docs.safe.global/reference-smart-account/owners/swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [removeOwner](https://docs.safe.global/reference-smart-account/owners/removeOwner)
- [encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)

### External Links

- [linked list(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/7f79aaf05c33df71d9cb687f0bc8a73fa39d25d5/contracts/base/OwnerManager.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

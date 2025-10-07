---
title: setup – Safe Docs
url: https://docs.safe.global/reference-smart-account/setup/setup
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# setup – Safe Docs

Smart Account Reference

Setup

setup

# `setup`

Sets an initial storage of the Safe contract.

⚠️

This method can only be called once. If a proxy was created without setting
up, anyone can call setup and claim the proxy.

## Usage



example.sol

`_27

interface ISafe {

_27

function setup(

_27

address[] _owners,

_27

uint256 _threshold,

_27

address to,

_27

bytes data,

_27

address fallbackHandler,

_27

address paymentToken,

_27

uint256 payment,

_27

address payable paymentReceiver

_27

) external;

_27

}

_27

_27

contract Example {

_27

function example() ... {

_27

(ISafe safe).setup(

_27

[0x..., 0x...],

_27

1,

_27

0x...,

_27

"0x...",

_27

0x...,

_27

0x...,

_27

0,

_27

0x...

_27

);

_27

}

_27

}`

## Parameters

### `_owners`

- **Type:** `address[]`

List of Safe owners.

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

### `_threshold`

- **Type:** `uint256`

Number of required confirmations for a Safe transaction.

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

### `to`

- **Type:** `address`

Contract address used as the destination of an optional delegate call.

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

### `data`

- **Type:** `bytes`

Data payload for optional delegate call.

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

### `fallbackHandler`

- **Type:** `address`

Handler for fallback calls to this contract.

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

### `paymentToken`

- **Type:** `address`

Token contract address used for the payment of the Safe proxy contract deployment fees (`0` is the native token).

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

### `payment`

- **Type:** `uint256`

Amount of `paymentToken` to be paid for the Safe proxy contract deployment fees.

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

### `paymentReceiver`

- **Type:** `address`

Address that receives the payment for the Safe proxy contract deployment fees (or `0` if `tx.origin`).

`_10

(ISafe safe).setup(

_10

[0x..., 0x...],

_10

1,

_10

0x...,

_10

"0x...",

_10

0x...,

_10

0x...,

_10

0,

_10

0x...

_10

);`

## Events

### `SafeSetup`

`_10

event SafeSetup(

_10

address initiator,

_10

address[] owners,

_10

uint256 threshold,

_10

address initializer,

_10

address fallbackHandler

_10

);`

Emitted when the Safe is set up.

[domainSeparator](/reference-smart-account/setup/domainSeparator "domainSeparator")[addOwnerWithThreshold](/reference-smart-account/owners/addOwnerWithThreshold "addOwnerWithThreshold")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- setup
  - Usage
  - Parameters
    - _owners
    - _threshold
    - to
    - data
    - fallbackHandler
    - paymentToken
    - payment
    - paymentReceiver
  - Events
    - SafeSetup

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [https://docs.safe.global/reference-smart-account/setup/setup](https://docs.safe.global/reference-smart-account/setup/setup)
- [domainSeparator](https://docs.safe.global/reference-smart-account/setup/domainSeparator)
- [addOwnerWithThreshold](https://docs.safe.global/reference-smart-account/owners/addOwnerWithThreshold)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

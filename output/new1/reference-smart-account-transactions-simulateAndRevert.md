---
title: simulateAndRevert – Safe Docs
url: https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# simulateAndRevert – Safe Docs

Smart Account Reference

Transactions

simulateAndRevert

# `simulateAndRevert`

Performs a `delegatecall` on a `targetContract` in the context of `self`. Internally reverts execution to avoid side effects (making it static).

This method reverts with data equal to `abi.encode(bool(success), bytes(response))`. Specifically, the `returndata` after a call to this method will be: `success:bool || response.length:uint256 || response:bytes`.

## Usage



example.sol

`_12

interface ISafe {

_12

function simulateAndRevert(

_12

address targetContract,

_12

bytes calldata payload

_12

) external;

_12

}

_12

_12

contract Example {

_12

function example() ... {

_12

(ISafe safe).simulateAndRevert(0x..., "0x...");

_12

}

_12

}`

## Parameters

### `targetContract`

- **Type:** `address`

Address of the contract containing the code to execute.

`_10

(ISafe safe).simulateAndRevert(

_10

0x...,

_10

"0x..."

_10

);`

### `calldataPayload`

- **Type:** `bytes`

Payload to be executed.

`_10

(ISafe safe).simulateAndRevert(

_10

0x...,

_10

"0x..."

_10

);`

[getTransactionHash](/reference-smart-account/transactions/getTransactionHash "getTransactionHash")[enableModule](/reference-smart-account/modules/enableModule "enableModule")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- simulateAndRevert
  - Usage
  - Parameters
    - targetContract
    - calldataPayload

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert](https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert)
- [https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert](https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert)
- [https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert](https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert)
- [https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert](https://docs.safe.global/reference-smart-account/transactions/simulateAndRevert)
- [getTransactionHash](https://docs.safe.global/reference-smart-account/transactions/getTransactionHash)
- [enableModule](https://docs.safe.global/reference-smart-account/modules/enableModule)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

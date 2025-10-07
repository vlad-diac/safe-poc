---
title: encodeTransactionData – Safe Docs
url: https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# encodeTransactionData – Safe Docs

Smart Account Reference

Transactions

encodeTransactionData

# `encodeTransactionData`

Encodes the transaction data for `execTransaction`.

## Usage



example.sol

`_31

interface ISafe {

_31

function encodeTransactionData(

_31

address to,

_31

uint256 value,

_31

bytes data,

_31

Enum.Operation operation,

_31

uint256 safeTxGas,

_31

uint256 baseGas,

_31

uint256 gasPrice,

_31

address gasToken,

_31

address refundReceiver,

_31

uint256 _nonce

_31

) external view returns (bytes);

_31

}

_31

_31

contract Example {

_31

function example() ... {

_31

(ISafe safe).encodeTransactionData(

_31

0x...,

_31

0,

_31

"0x...",

_31

Enum.Operation.Call,

_31

100000,

_31

0,

_31

0,

_31

0x...,

_31

0x...,

_31

1

_31

);

_31

}

_31

}`

## Returns

- **Type:** `bytes`

Encoded transaction data.

## Parameters

### `to`

- **Type:** `address`

Destination address.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `value`

- **Type:** `uint256`

Native token value.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `data`

- **Type:** `bytes`

Data payload.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `operation`

- **Type:** `enum Enum.Operation`

Operation type.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `safeTxGas`

- **Type:** `uint256`

Gas that should be used for the Safe transaction.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `baseGas`

- **Type:** `uint256`

Gas costs for data used to trigger the Safe transaction.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `gasPrice`

- **Type:** `uint256`

Maximum gas price that should be used for this transaction.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `gasToken`

- **Type:** `address`

Token address (or `address(0)` if native token) that is used for the payment.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `refundReceiver`

- **Type:** `address`

Address of receiver of gas payment (or `address(0)` if `tx.origin`).

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

### `_nonce`

- **Type:** `uint256`

Transaction nonce.

`_12

(ISafe safe).encodeTransactionData(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

100000,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

1

_12

);`

[swapOwner](/reference-smart-account/owners/swapOwner "swapOwner")[execTransaction](/reference-smart-account/transactions/execTransaction "execTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- encodeTransactionData
  - Usage
  - Returns
  - Parameters
    - to
    - value
    - data
    - operation
    - safeTxGas
    - baseGas
    - gasPrice
    - gasToken
    - refundReceiver
    - _nonce

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [swapOwner](https://docs.safe.global/reference-smart-account/owners/swapOwner)
- [execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

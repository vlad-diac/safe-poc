---
title: execTransaction – Safe Docs
url: https://docs.safe.global/reference-smart-account/transactions/execTransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# execTransaction – Safe Docs

Smart Account Reference

Transactions

execTransaction

# `execTransaction`

Executes a Safe transaction to `to` with `value` (native currency) and pays `gasPrice` \* `gasLimit` in `gasToken` token to `refundReceiver`.

⚠️

The fees are always transferred, even if the user transaction fails. This
method doesn't perform any sanity check of the transaction, such as if the
contract at `to` address has code or not. It is the responsibility of the
caller to perform such checks.

## Usage



example.sol

`_31

interface ISafe {

_31

function execTransaction(

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

address payable refundReceiver,

_31

bytes signatures

_31

) external payable returns (bool success);

_31

}

_31

_31

contract Example {

_31

function example() ... {

_31

(ISafe safe).execTransaction(

_31

0x...,

_31

0,

_31

"0x...",

_31

Enum.Operation.Call,

_31

0,

_31

0,

_31

0,

_31

0x...,

_31

0x...,

_31

"0x..."

_31

);

_31

}

_31

}`

## Returns

- **Type:** `bool`

Boolean indicating transaction's success.

## Parameters

### `to`

- **Type:** `address`

Destination address of Safe transaction.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `value`

- **Type:** `uint256`

Native token value of Safe transaction.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `data`

- **Type:** `bytes`

Data payload of Safe transaction.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `operation`

- **Type:** `Enum.Operation`

Operation type of Safe transaction.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `safeTxGas`

- **Type:** `uint256`

Gas that should be used for the Safe transaction.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `baseGas`

- **Type:** `uint256`

Gas costs that are independent of the transaction execution (for example, the base transaction fee, signature check, and refund payment).

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `gasPrice`

- **Type:** `uint256`

Gas price that should be used for the payment calculation.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `gasToken`

- **Type:** `address`

Token address (or `0x` if native token) that is used for the payment.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `refundReceiver`

- **Type:** `address payable`

Address of receiver of gas payment (or `0` if `tx.origin`).

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

### `signatures`

- **Type:** `bytes`

Signature data that should be verified. Can be packed ECDSA signature `((bytes32 r)(bytes32 s)(uint8 v))`, contract signature ([EIP-1271](/home/glossary#eip-1271)), or approved hash.

`_12

(ISafe safe).execTransaction(

_12

0x...,

_12

0,

_12

"0x...",

_12

Enum.Operation.Call,

_12

0,

_12

0,

_12

0,

_12

0x...,

_12

0x...,

_12

"0x..."

_12

);`

## Events

### `ExecutionSuccess`

`_10

event ExecutionSuccess(bytes32 txHash, uint256 payment);`

Emitted when a transaction is executed successfully.

### `ExecutionFailure`

`_10

event ExecutionFailure(bytes32 txHash, uint256 payment);`

Emitted when a transaction fails.

[encodeTransactionData](/reference-smart-account/transactions/encodeTransactionData "encodeTransactionData")[getTransactionHash](/reference-smart-account/transactions/getTransactionHash "getTransactionHash")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- execTransaction
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
    - signatures
  - Events
    - ExecutionSuccess
    - ExecutionFailure

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [EIP-1271](https://docs.safe.global/home/glossary)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [https://docs.safe.global/reference-smart-account/transactions/execTransaction](https://docs.safe.global/reference-smart-account/transactions/execTransaction)
- [encodeTransactionData](https://docs.safe.global/reference-smart-account/transactions/encodeTransactionData)
- [getTransactionHash](https://docs.safe.global/reference-smart-account/transactions/getTransactionHash)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: execTransactionFromModuleReturnData – Safe Docs
url: https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# execTransactionFromModuleReturnData – Safe Docs

Smart Account Reference

Modules

execTransactionFromModuleReturnData

# `execTransactionFromModuleReturnData`

Executes a transaction from an enabled Safe Module and returns the result data.

## Usage



example.sol

`_19

interface ISafe {

_19

function execTransactionFromModuleReturnData(

_19

address to,

_19

uint256 value,

_19

bytes data,

_19

enum Enum.Operation operation

_19

) external returns (bool success, bytes returnData);

_19

}

_19

_19

contract Example {

_19

function example() … {

_19

(ISafe safe).execTransactionFromModuleReturnData(

_19

0x...,

_19

0,

_19

"0x...",

_19

Enum.Operation.Call

_19

);

_19

}

_19

}`

## Returns

### `success`

- **Type:** `bool`

Boolean flag indicating if the call succeeded.

### `returnData`

- **Type:** `bytes`

Data returned by the call.

## Parameters

### `to`

- **Type:** `address`

Destination address of the Safe Module transaction.

`_10

(ISafe safe).execTransactionFromModuleReturnData(

_10

0x...,

_10

0,

_10

"0x...",

_10

Enum.Operation.Call

_10

);`

### `value`

- **Type:** `uint256`

Value of the native token transferred in the module transaction.

`_10

(ISafe safe).execTransactionFromModuleReturnData(

_10

0x...,

_10

0,

_10

"0x...",

_10

Enum.Operation.Call

_10

);`

### `data`

- **Type:** `bytes`

Data payload of the module transaction.

`_10

(ISafe safe).execTransactionFromModuleReturnData(

_10

0x...,

_10

0,

_10

"0x...",

_10

Enum.Operation.Call

_10

);`

### `operation`

- **Type:** `enum Enum.Operation`

Operation type of the module transaction.

`_10

(ISafe safe).execTransactionFromModuleReturnData(

_10

0x...,

_10

0,

_10

"0x...",

_10

Enum.Operation.Call

_10

);`

## Events

### `ExecutionFromModuleSuccess`

`_10

event ExecutionFromModuleSuccess(address to, uint256 value, bytes data);`

Emitted when a transaction executed by a module succeeds.

### `ExecutionFromModuleFailure`

`_10

event ExecutionFromModuleFailure(address module);`

Emitted when a transaction executed by a module fails.

[execTransactionFromModule](/reference-smart-account/modules/execTransactionFromModule "execTransactionFromModule")[getModulesPaginated](/reference-smart-account/modules/getModulesPaginated "getModulesPaginated")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- execTransactionFromModuleReturnData
  - Usage
  - Returns
    - success
    - returnData
  - Parameters
    - to
    - value
    - data
    - operation
  - Events
    - ExecutionFromModuleSuccess
    - ExecutionFromModuleFailure

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

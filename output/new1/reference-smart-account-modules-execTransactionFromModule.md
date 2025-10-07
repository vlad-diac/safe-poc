---
title: execTransactionFromModule – Safe Docs
url: https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# execTransactionFromModule – Safe Docs

Smart Account Reference

Modules

execTransactionFromModule

# `execTransactionFromModule`

Execute `operation` (0: Call, 1: DelegateCall) to `to` with `value` (native token).

Function is virtual to allow overriding for L2 singleton to emit an event for
indexing.

## Usage



example.sol

`_19

interface ISafe {

_19

function execTransactionFromModule(

_19

address to,

_19

uint256 value,

_19

bytes data,

_19

enum Enum.Operation operation

_19

) external returns (bool success);

_19

}

_19

_19

contract Example {

_19

function example() … {

_19

(ISafe safe).execTransactionFromModule(

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

## Parameters

### `to`

- **Type:** `address`

Destination address of module transaction.

`_10

(ISafe safe).execTransactionFromModule(

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

The native token value transferred in the Safe Module transaction.

`_10

(ISafe safe).execTransactionFromModule(

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

(ISafe safe).execTransactionFromModule(

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

(ISafe safe).execTransactionFromModule(

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

[disableModule](/reference-smart-account/modules/disableModule "disableModule")[execTransactionFromModuleReturnData](/reference-smart-account/modules/execTransactionFromModuleReturnData "execTransactionFromModuleReturnData")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- execTransactionFromModule
  - Usage
  - Returns
    - success
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

- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModule)
- [disableModule](https://docs.safe.global/reference-smart-account/modules/disableModule)
- [execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

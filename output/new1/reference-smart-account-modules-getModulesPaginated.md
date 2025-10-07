---
title: getModulesPaginated – Safe Docs
url: https://docs.safe.global/reference-smart-account/modules/getModulesPaginated
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getModulesPaginated – Safe Docs

Smart Account Reference

Modules

getModulesPaginated

# `getModulesPaginated`

Returns an array of modules. If all entries fit into a single page, the next pointer will be `0x1`. If another page is present, next will be the last element of the returned array.

## Usage



example.sol

`_12

interface ISafe {

_12

function getModulesPaginated(

_12

address start,

_12

uint256 pageSize

_12

) external view returns (address[] array, address next);

_12

}

_12

_12

contract Example {

_12

function example() … {

_12

(ISafe safe).getModulesPaginated(0x..., 1);

_12

}

_12

}`

## Returns

### `array`

- **Type:** `address[]`

Array of modules.

### `next`

- **Type:** `address`

Start of the next page.

## Parameters

### `start`

- **Type:** `address`

Start of the page. Has to be a module or start pointer (`0x1` address).

`_10

(ISafe safe).getModulesPaginated(

_10

0x...,

_10

1

_10

);`

### `pageSize`

- **Type:** `uint256`

Maximum number of modules that should be returned. Has to be greater than zero.

`_10

(ISafe safe).getModulesPaginated(

_10

0x...,

_10

1

_10

);`

[execTransactionFromModuleReturnData](/reference-smart-account/modules/execTransactionFromModuleReturnData "execTransactionFromModuleReturnData")[isModuleEnabled](/reference-smart-account/modules/isModuleEnabled "isModuleEnabled")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getModulesPaginated
  - Usage
  - Returns
    - array
    - next
  - Parameters
    - start
    - pageSize

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/modules/getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [https://docs.safe.global/reference-smart-account/modules/getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [https://docs.safe.global/reference-smart-account/modules/getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [https://docs.safe.global/reference-smart-account/modules/getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [https://docs.safe.global/reference-smart-account/modules/getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [https://docs.safe.global/reference-smart-account/modules/getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [https://docs.safe.global/reference-smart-account/modules/getModulesPaginated](https://docs.safe.global/reference-smart-account/modules/getModulesPaginated)
- [execTransactionFromModuleReturnData](https://docs.safe.global/reference-smart-account/modules/execTransactionFromModuleReturnData)
- [isModuleEnabled](https://docs.safe.global/reference-smart-account/modules/isModuleEnabled)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

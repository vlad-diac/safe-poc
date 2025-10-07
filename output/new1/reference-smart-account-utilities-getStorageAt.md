---
title: getStorageAt – Safe Docs
url: https://docs.safe.global/reference-smart-account/utilities/getStorageAt
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getStorageAt – Safe Docs

Smart Account Reference

Utilities

getStorageAt

# `getStorageAt`

Reads bytes of storage of length `length` in the current contract, from the position defined by `offset`.

## Usage



example.sol

`_10

interface ISafe {

_10

function getStorageAt(uint256 offset, uint256 length) external view returns (bytes);

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).getStorageAt(0, 1);

_10

}

_10

}`

## Parameters

### `offset`

- **Type:** `uint256`

The offset in the current contract's storage in words to start reading from.

`_10

(ISafe safe).getStorageAt(

_10

0,

_10

1

_10

);`

### `length`

- **Type:** `uint256`

The number of words (32 bytes) of data to read.

`_10

(ISafe safe).getStorageAt(

_10

0,

_10

1

_10

);`

## Returns

- **Type:** `bytes`

The bytes that were read.

[signedMessages](/reference-smart-account/signatures/signedMessages "signedMessages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getStorageAt
  - Usage
  - Parameters
    - offset
    - length
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/utilities/getStorageAt](https://docs.safe.global/reference-smart-account/utilities/getStorageAt)
- [https://docs.safe.global/reference-smart-account/utilities/getStorageAt](https://docs.safe.global/reference-smart-account/utilities/getStorageAt)
- [https://docs.safe.global/reference-smart-account/utilities/getStorageAt](https://docs.safe.global/reference-smart-account/utilities/getStorageAt)
- [https://docs.safe.global/reference-smart-account/utilities/getStorageAt](https://docs.safe.global/reference-smart-account/utilities/getStorageAt)
- [https://docs.safe.global/reference-smart-account/utilities/getStorageAt](https://docs.safe.global/reference-smart-account/utilities/getStorageAt)
- [signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

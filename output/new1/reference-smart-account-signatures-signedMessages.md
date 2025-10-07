---
title: signedMessages – Safe Docs
url: https://docs.safe.global/reference-smart-account/signatures/signedMessages
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# signedMessages – Safe Docs

Smart Account Reference

Signatures

signedMessages

# `signedMessages`

Returns a `uint256` if the `messageHash` is signed by the owner.

## Usage



example.sol

`_10

interface ISafe {

_10

function signedMessages(bytes32 messageHash) external view returns (uint256);

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).signedMessages("0x...");

_10

}

_10

}`

## Parameters

### `messageHash`

- **Type:** `bytes32`

Hash of message that should be checked.

## Returns

- **Type:** `uint256`

Number denoting if an owner signed the hash.

## Events

### `SignMsg`

`_10

event SignMsg(bytes32 msgHash);`

Emitted when a message is signed by an owner.

[checkSignatures](/reference-smart-account/signatures/checkSignatures "checkSignatures")[getStorageAt](/reference-smart-account/utilities/getStorageAt "getStorageAt")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- signedMessages
  - Usage
  - Parameters
    - messageHash
  - Returns
  - Events
    - SignMsg

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/signatures/signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)
- [https://docs.safe.global/reference-smart-account/signatures/signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)
- [https://docs.safe.global/reference-smart-account/signatures/signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)
- [https://docs.safe.global/reference-smart-account/signatures/signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)
- [https://docs.safe.global/reference-smart-account/signatures/signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)
- [https://docs.safe.global/reference-smart-account/signatures/signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)
- [checkSignatures](https://docs.safe.global/reference-smart-account/signatures/checkSignatures)
- [getStorageAt](https://docs.safe.global/reference-smart-account/utilities/getStorageAt)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

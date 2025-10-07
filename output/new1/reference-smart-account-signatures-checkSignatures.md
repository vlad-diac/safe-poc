---
title: checkSignatures – Safe Docs
url: https://docs.safe.global/reference-smart-account/signatures/checkSignatures
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# checkSignatures – Safe Docs

Smart Account Reference

Signatures

checkSignatures

# `checkSignatures`

Checks whether the signature provided is valid for the provided data and hash. Reverts otherwise.

## Usage



example.sol

`_15

interface ISafe {

_15

function checkSignatures(

_15

bytes32 dataHash,

_15

bytes signatures

_15

) external view;

_15

}

_15

_15

contract Example {

_15

function example() ... {

_15

(ISafe safe).checkSignatures(

_15

"0x...",

_15

"0x..."

_15

);

_15

}

_15

}`

## Parameters

### `dataHash`

- **Type:** `bytes32`

Hash of the data (could be either a message hash or transaction hash).

`_10

(ISafe safe).checkSignatures(

_10

"0x...",

_10

"0x..."

_10

);`

### `signatures`

- **Type:** `bytes`

Signature data that should be verified. Can be packed ECDSA signature `((bytes32 r)(bytes32 s)(uint8 v))`, contract signature ([EIP-1271](/home/glossary#eip-1271)), or approved hash.

`_10

(ISafe safe).checkSignatures(

_10

"0x...",

_10

"0x..."

_10

);`

[checkNSignatures](/reference-smart-account/signatures/checkNSignatures "checkNSignatures")[signedMessages](/reference-smart-account/signatures/signedMessages "signedMessages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- checkSignatures
  - Usage
  - Parameters
    - dataHash
    - signatures

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/signatures/checkSignatures](https://docs.safe.global/reference-smart-account/signatures/checkSignatures)
- [https://docs.safe.global/reference-smart-account/signatures/checkSignatures](https://docs.safe.global/reference-smart-account/signatures/checkSignatures)
- [https://docs.safe.global/reference-smart-account/signatures/checkSignatures](https://docs.safe.global/reference-smart-account/signatures/checkSignatures)
- [https://docs.safe.global/reference-smart-account/signatures/checkSignatures](https://docs.safe.global/reference-smart-account/signatures/checkSignatures)
- [EIP-1271](https://docs.safe.global/home/glossary)
- [checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)
- [signedMessages](https://docs.safe.global/reference-smart-account/signatures/signedMessages)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

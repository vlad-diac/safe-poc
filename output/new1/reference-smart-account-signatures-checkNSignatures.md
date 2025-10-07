---
title: checkNSignatures – Safe Docs
url: https://docs.safe.global/reference-smart-account/signatures/checkNSignatures
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# checkNSignatures – Safe Docs

Smart Account Reference

Signatures

checkNSignatures

# `checkNSignatures`

Checks whether the signature provided is valid for the provided data and hash. Reverts otherwise.

Since the EIP-1271 makes an external call, be mindful of re-entrancy attacks.

## Usage



example.sol

`_20

interface ISafe {

_20

function checkNSignatures(

_20

address executor,

_20

bytes32 dataHash,

_20

bytes signatures,

_20

uint256 requiredSignatures

_20

) external view;

_20

}

_20

_20

_20

contract Example {

_20

function example() ... {

_20

(ISafe safe).checkNSignatures(

_20

0x...,

_20

"0x...",

_20

"0x...",

_20

1

_20

);

_20

}

_20

}`

## Parameters

### `executor`

- **Type:** `address`

Address executing the transaction.

⚠️

Make sure that the executor address is a legitimate executor. When incorrectly
passed, the executor might reduce the threshold by one signature.

`_10

(ISafe safe).checkNSignatures(

_10

0x...,

_10

"0x...",

_10

"0x...",

_10

1

_10

);`

### `dataHash`

- **Type:** `bytes32`

Hash of the data (could be either a message hash or transaction hash).

`_10

(ISafe safe).checkNSignatures(

_10

0x...,

_10

"0x...",

_10

"0x...",

_10

1

_10

);`

### `signatures`

- **Type:** `bytes`

Signature data that should be verified. Can be packed ECDSA signature `((bytes32 r)(bytes32 s)(uint8 v))`, contract signature ([EIP-1271](/home/glossary#eip-1271)), or approved hash.

`_10

(ISafe safe).checkNSignatures(

_10

0x...,

_10

"0x...",

_10

"0x...",

_10

1

_10

);`

### `requiredSignatures`

- **Type:** `uint256`

Amount of required valid signatures.

`_10

(ISafe safe).checkNSignatures(

_10

0x...,

_10

"0x...",

_10

"0x...",

_10

1

_10

);`

[approveHash](/reference-smart-account/signatures/approveHash "approveHash")[checkSignatures](/reference-smart-account/signatures/checkSignatures "checkSignatures")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- checkNSignatures
  - Usage
  - Parameters
    - executor
    - dataHash
    - signatures
    - requiredSignatures

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/signatures/checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)
- [https://docs.safe.global/reference-smart-account/signatures/checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)
- [https://docs.safe.global/reference-smart-account/signatures/checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)
- [https://docs.safe.global/reference-smart-account/signatures/checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)
- [https://docs.safe.global/reference-smart-account/signatures/checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)
- [EIP-1271](https://docs.safe.global/home/glossary)
- [https://docs.safe.global/reference-smart-account/signatures/checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)
- [approveHash](https://docs.safe.global/reference-smart-account/signatures/approveHash)
- [checkSignatures](https://docs.safe.global/reference-smart-account/signatures/checkSignatures)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: approveHash – Safe Docs
url: https://docs.safe.global/reference-smart-account/signatures/approveHash
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# approveHash – Safe Docs

Smart Account Reference

Signatures

approveHash

# `approveHash`

Marks hash `hashToApprove` as approved.

This can be used with a pre-approved hash transaction signature.

⚠️

The approved hash stays approved forever. There's no revocation mechanism, so
it behaves similarly to ECDSA signatures.

## Usage



example.sol

`_10

interface ISafe {

_10

function approveHash(bytes32 hashToApprove) external;

_10

}

_10

_10

contract Example {

_10

function example() ... {

_10

(ISafe safe).approveHash("0x...");

_10

}

_10

}`

## Parameters

### `hashToApprove`

- **Type:** `bytes32`

The hash to mark as approved for signatures that are verified by this contract.

`_10

(ISafe safe).approveHash(

_10

"0x..."

_10

);`

## Events

### `ApproveHash`

`_10

event ApproveHash(bytes32 approvedHash, address owner);`

Emitted when a hash is approved by an owner.

[setFallbackHandler](/reference-smart-account/fallback/setFallbackHandler "setFallbackHandler")[checkNSignatures](/reference-smart-account/signatures/checkNSignatures "checkNSignatures")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- approveHash
  - Usage
  - Parameters
    - hashToApprove
  - Events
    - ApproveHash

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/signatures/approveHash](https://docs.safe.global/reference-smart-account/signatures/approveHash)
- [https://docs.safe.global/reference-smart-account/signatures/approveHash](https://docs.safe.global/reference-smart-account/signatures/approveHash)
- [https://docs.safe.global/reference-smart-account/signatures/approveHash](https://docs.safe.global/reference-smart-account/signatures/approveHash)
- [https://docs.safe.global/reference-smart-account/signatures/approveHash](https://docs.safe.global/reference-smart-account/signatures/approveHash)
- [https://docs.safe.global/reference-smart-account/signatures/approveHash](https://docs.safe.global/reference-smart-account/signatures/approveHash)
- [setFallbackHandler](https://docs.safe.global/reference-smart-account/fallback/setFallbackHandler)
- [checkNSignatures](https://docs.safe.global/reference-smart-account/signatures/checkNSignatures)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

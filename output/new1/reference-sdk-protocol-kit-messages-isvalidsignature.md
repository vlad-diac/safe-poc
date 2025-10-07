---
title: isValidSignature – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isValidSignature – Safe Docs

Protocol Kit Reference

Messages

isValidSignature

# `isValidSignature`

Checks if a signature is valid by calling the [`isValidSignature` (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L57) method in the `CompatibilityFallbackHandler` contract.

## Usage



example.tssetup.ts

`_14

import { hashSafeMessage } from '@safe-global/protocol-kit'

_14

import { EIP712TypedData } from '@safe-global/types-kit'

_14

import { protocolKit } from './setup.ts'

_14

_14

const rawMessage: string | EIP712TypedData = 'Example message'

_14

const messageHash = hashSafeMessage(rawMessage)

_14

const safeMessageHash = await protocolKit.getSafeMessageHash(messageHash)

_14

_14

const signature = '0x...'

_14

_14

const isValidSignature = await protocolKit.isValidSignature(

_14

safeMessageHash,

_14

signature

_14

)`

## Parameters

### `safeMessageHash`

- **Type**: `string`

The Safe message hash.

`_10

const isValidSignature = await protocolKit.isValidSignature(

_10

'0x...',

_10

'0x...'

_10

)`

### `signature`

- **Type**: [`SafeSignature[]` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L46-L52) | `string`

The signature to be validated.

- `SafeSignature[]` to validate multiple Safe signatures.
- `string` to validate one or multiple signatures concatenated.
- `0x` to validate an on-chain message ([`approvedHashes` (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/Safe.sol#L69) in the Safe contract).

`_10

const isValidSignature = await protocolKit.isValidSignature(

_10

'0x...',

_10

'0x...'

_10

)`

## Returns

`Promise<boolean>`

The boolean value that indicates if the signature is valid.

[getSafeMessageHash](/reference-sdk-protocol-kit/messages/getsafemessagehash "getSafeMessageHash")[signMessage](/reference-sdk-protocol-kit/messages/signmessage "signMessage")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isValidSignature
  - Usage
  - Parameters
    - safeMessageHash
    - signature
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature](https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature](https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature](https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature](https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature](https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature)
- [getSafeMessageHash](https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash)
- [signMessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage)

### External Links

- [isValidSignature(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/CompatibilityFallbackHandler.sol)
- [SafeSignature[](opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [approvedHashes(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/Safe.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

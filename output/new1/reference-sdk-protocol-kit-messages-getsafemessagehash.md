---
title: getSafeMessageHash – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeMessageHash – Safe Docs

Protocol Kit Reference

Messages

getSafeMessageHash

# `getSafeMessageHash`

Returns the Safe message hash of a message ready to be signed.

It returns the same hash returned by the [`getMessageHash` (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L26) method in the `CompatibilityFallbackHandler` contract.

## Usage



example.tssetup.ts

`_10

import { hashSafeMessage } from '@safe-global/protocol-kit'

_10

import { EIP712TypedData } from '@safe-global/types-kit'

_10

import { protocolKit } from './setup.ts'

_10

_10

const rawMessage: string | EIP712TypedData = 'Example message'

_10

const messageHash = hashSafeMessage(rawMessage)

_10

_10

const safeMessageHash = await protocolKit.getSafeMessageHash(messageHash)`

## Parameters

### `messageHash`

- **Type**: `string`

The hash of the message.

`_10

const safeMessageHash = await protocolKit.getSafeMessageHash(

_10

'0x...'

_10

)`

## Returns

`Promise<string>`

The Safe message hash.

[createMessage](/reference-sdk-protocol-kit/messages/createmessage "createMessage")[isValidSignature](/reference-sdk-protocol-kit/messages/isvalidsignature "isValidSignature")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeMessageHash
  - Usage
  - Parameters
    - messageHash
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash](https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash](https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash](https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash](https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash)
- [createMessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage)
- [isValidSignature](https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature)

### External Links

- [getMessageHash(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/CompatibilityFallbackHandler.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: signMessage – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# signMessage – Safe Docs

Protocol Kit Reference

Messages

signMessage

# `signMessage`

Signs a Safe message with the connected signer.

## Usage



example.tssetup.ts

`_16

import { SigningMethod } from '@safe-global/protocol-kit'

_16

import { EIP712TypedData } from '@safe-global/types-kit'

_16

import { protocolKit } from './setup.ts'

_16

_16

const rawMessage: string | EIP712TypedData = 'Example message'

_16

const message = protocolKit.createMessage(rawMessage)

_16

_16

const signingMethod = SigningMethod.ETH_SIGN_TYPED_DATA_V4

_16

_16

const preimageSafeAddress = '0x...'

_16

_16

const signedMessage = await protocolKit.signMessage(

_16

message,

_16

signingMethod, // Optional

_16

preimageSafeAddress // Optional

_16

)`

## Parameters

### `message`

- **Type**: `string`

The message to be signed.

`_10

const signedMessage = await protocolKit.signMessage(

_10

'0x...'

_10

)`

### `signingMethod` (Optional)

- **Type**: [`SigningMethodType` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/signing.ts#L9)
- **Default**: `SigningMethod.ETH_SIGN_TYPED_DATA_V4`

The signature type.

You can use multiple signing methods, such as:

- `ETH_SIGN` (`eth_sign`): Regular hash signature.
- `ETH_SIGN_TYPED_DATA_V4` (`eth_signTypedData_v4`): Typed data signature `v4`.
- `ETH_SIGN_TYPED_DATA_V3` (`eth_signTypedData_v3`): Typed data signature `v3`.
- `ETH_SIGN_TYPED_DATA` (`eth_signTypedData`): Typed data signature.
- `SAFE_SIGNATURE`: Signature from another Safe that acts as a signer.

`_10

const signedMessage = await protocolKit.signMessage(

_10

'0x...',

_10

SigningMethod.ETH_SIGN_TYPED_DATA_V4

_10

)`

### `preimageSafeAddress` (Optional)

- **Type**: `string`

The address of the Safe that will be used to calculate the preimage.

Required parameter for `v1.3.0` and `v1.4.1` Safe smart accounts. These versions use the old EIP-1271 interface, which uses `bytes` instead of `bytes32` for the message. You need to use the pre-image of the message to calculate the message hash.

`_10

const signedMessage = await protocolKit.signMessage(

_10

'0x...',

_10

SigningMethod.ETH_SIGN_TYPED_DATA_V4,

_10

'0x...'

_10

)`

## Returns

`Promise<SafeMessage>`

The Safe message with the generated signature.

[isValidSignature](/reference-sdk-protocol-kit/messages/isvalidsignature "isValidSignature")[createDisableModuleTx](/reference-sdk-protocol-kit/safe-modules/createdisablemoduletx "createDisableModuleTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- signMessage
  - Usage
  - Parameters
    - message
    - signingMethod(Optional)
    - preimageSafeAddress(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/signmessage)
- [isValidSignature](https://docs.safe.global/reference-sdk-protocol-kit/messages/isvalidsignature)
- [createDisableModuleTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-modules/createdisablemoduletx)

### External Links

- [SigningMethodType(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/signing.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

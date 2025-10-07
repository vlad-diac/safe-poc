---
title: signTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# signTransaction – Safe Docs

Protocol Kit Reference

Transaction Signatures

signTransaction

# `signTransaction`

Returns a new `SafeTransaction` object that includes the signature of the current owner.

## Usage



example.tssetup.ts

`_23

import { SigningMethod } from '@safe-global/protocol-kit'

_23

import { MetaTransactionData, OperationType } from '@safe-global/types-kit'

_23

import { protocolKit } from './setup.ts'

_23

_23

const transactions: MetaTransactionData[] = [{

_23

to: '0x...',

_23

value: '123',

_23

data: '0x',

_23

operation: OperationType.Call // Optional

_23

}]

_23

const safeTransaction = await protocolKit.createTransaction({

_23

transactions

_23

})

_23

_23

const signingMethod = SigningMethod.ETH_SIGN_TYPED_DATA_V4

_23

_23

const preimageSafeAddress = '0x...'

_23

_23

const signedSafeTransaction = await protocolKit.signTransaction(

_23

safeTransaction,

_23

signingMethod, // Optional

_23

preimageSafeAddress // Optional

_23

)`

## Parameters

### `safeTransaction`

- **Type**: [`SafeTransaction` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L54-L60) | [`SafeMultisigTransactionResponse` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L208-L239)

The Safe transaction to sign.

`_10

const signedSafeTransaction = await protocolKit.signTransaction(

_10

safeTransaction

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

const signedSafeTransaction = await protocolKit.signTransaction(

_10

safeTransaction,

_10

SigningMethod.ETH_SIGN_TYPED_DATA_V4

_10

)`

### `preimageSafeAddress` (Optional)

- **Type**: `string`

The address of the Safe that will be used to calculate the preimage.

Required parameter for `v1.3.0` and `v1.4.1` Safe smart accounts. These versions use the old EIP-1271 interface, which uses `bytes` instead of `bytes32` for the message. You need to use the pre-image of the message to calculate the message hash.

`_10

const signedSafeTransaction = await protocolKit.signTransaction(

_10

safeTransaction,

_10

SigningMethod.ETH_SIGN_TYPED_DATA_V4,

_10

'0x...'

_10

)`

## Returns

`Promise<SafeTransaction>`

The signed Safe transaction.

[signHash](/reference-sdk-protocol-kit/transaction-signatures/signhash "signHash")[signTypedData](/reference-sdk-protocol-kit/transaction-signatures/signtypeddata "signTypedData")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- signTransaction
  - Usage
  - Parameters
    - safeTransaction
    - signingMethod(Optional)
    - preimageSafeAddress(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)
- [signHash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash)
- [signTypedData](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata)

### External Links

- [SafeTransaction(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [SafeMultisigTransactionResponse(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [SigningMethodType(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/signing.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: signTypedData – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# signTypedData – Safe Docs

Protocol Kit Reference

Transaction Signatures

signTypedData

# `signTypedData`

Signs a transaction with the current signer according to the EIP-712.

## Usage



example.tssetup.ts

`_22

import {

_22

MetaTransactionData,

_22

OperationType

_22

} from '@safe-global/types-kit'

_22

import { protocolKit } from './setup.ts'

_22

_22

const transactions: MetaTransactionData[] = [{

_22

to: '0x...',

_22

value: '123',

_22

data: '0x',

_22

operation: OperationType.Call // Optional

_22

}]

_22

const eip712Data = await protocolKit.createTransaction({

_22

transactions

_22

})

_22

_22

const methodVersion = 'v4'

_22

_22

const signature = await protocolKit.signTypedData(

_22

eip712Data,

_22

methodVersion // Optional

_22

)`

## Parameters

### `eip712Data`

- **Type**: [`SafeTransaction` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L54-L60) | [`SafeMessage` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L62-L68)

The Safe transaction or message to sign.

`_10

const signature = await protocolKit.signTypedData(

_10

eip712Data

_10

)`

### `methodVersion` (Optional)

- **Type**: `'v3' | 'v4'`

The EIP-712 version to use.

`_10

const signature = await protocolKit.signTypedData(

_10

eip712Data,

_10

'v4'

_10

)`

## Returns

`Promise<SafeSignature>`

The Safe signature.

[signTransaction](/reference-sdk-protocol-kit/transaction-signatures/signtransaction "signTransaction")[createMessage](/reference-sdk-protocol-kit/messages/createmessage "createMessage")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- signTypedData
  - Usage
  - Parameters
    - eip712Data
    - methodVersion(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata)
- [signTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)
- [createMessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage)

### External Links

- [SafeTransaction(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [SafeMessage(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

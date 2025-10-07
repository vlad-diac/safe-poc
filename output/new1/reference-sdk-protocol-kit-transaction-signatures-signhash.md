---
title: signHash – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# signHash – Safe Docs

Protocol Kit Reference

Transaction Signatures

signHash

# `signHash`

Signs a Safe transaction hash with the connected signer.

## Usage



example.tssetup.ts

`_20

import {

_20

MetaTransactionData,

_20

OperationType

_20

} from '@safe-global/types-kit'

_20

import { protocolKit } from './setup.ts'

_20

_20

const transactions: MetaTransactionData[] = [{

_20

to: '0x...',

_20

value: '123',

_20

data: '0x',

_20

operation: OperationType.Call // Optional

_20

}]

_20

const safeTransaction = await protocolKit.createTransaction({

_20

transactions

_20

})

_20

const safeTransactionHash = await protocolKit.getTransactionHash(

_20

safeTransaction

_20

)

_20

_20

const signature = await protocolKit.signHash(safeTransactionHash)`

## Parameters

### `safeTransactionHash`

- **Type**: `string`

The Safe transaction hash to sign.

`_10

const signature = await protocolKit.signHash(

_10

'0x...'

_10

)`

## Returns

`Promise<SafeSignature>`

The signature from the signer.

[approveTransactionHash](/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash "approveTransactionHash")[signTransaction](/reference-sdk-protocol-kit/transaction-signatures/signtransaction "signTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- signHash
  - Usage
  - Parameters
    - safeTransactionHash
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash)
- [https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signhash)
- [approveTransactionHash](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/approvetransactionhash)
- [signTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

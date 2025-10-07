---
title: proposeTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/proposetransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# proposeTransaction – Safe Docs

API Kit Reference

proposeTransaction

# `proposeTransaction`

Creates a new multi-signature transaction with its confirmations and stores it in the Safe Transaction Service.

## Usage



example.tssetup.ts

`_24

import { ProposeTransactionProps } from '@safe-global/api-kit'

_24

import { OperationType, SafeTransactionData } from '@safe-global/types-kit'

_24

import { apiKit } from './setup.ts'

_24

_24

const safeTransactionData: SafeTransactionData = {

_24

operation: OperationType.Call,

_24

safeTxGas: '0x...',

_24

baseGas: '123',

_24

gasPrice: '123',

_24

gasToken: '0x...',

_24

refundReceiver: '0x...',

_24

nonce: '10'

_24

}

_24

_24

const config: ProposeTransactionProps = {

_24

safeAddress: '0x...',

_24

safeTxHash: '0x...',

_24

safeTransactionData,

_24

senderAddress: '0x...',

_24

senderSignature: '0x...',

_24

origin: 'App name' // Optional

_24

}

_24

_24

await apiKit.proposeTransaction(config)`

## Parameters

### `config.safeAddress`

- **Type:** `string`

The Safe address.

`_10

await apiKit.proposeTransaction({

_10

safeAddress: '0x...',

_10

safeTxHash: '0x...',

_10

safeTransactionData,

_10

senderAddress: '0x...',

_10

senderSignature: '0x...'

_10

})`

### `config.safeTxHash`

- **Type:** `string`

The Safe transaction hash of the proposed transaction.

`_10

await apiKit.proposeTransaction({

_10

safeAddress: '0x...',

_10

safeTxHash: '0x...',

_10

safeTransactionData,

_10

senderAddress: '0x...',

_10

senderSignature: '0x...'

_10

})`

### `config.safeTransactionData.operation`

- **Type:** `OperationType`

The operation of the proposed transaction.

`_15

await apiKit.proposeTransaction({

_15

safeAddress: '0x...',

_15

safeTxHash: '0x...',

_15

safeTransactionData: {

_15

operation: OperationType.Call,

_15

safeTxGas: '0x...',

_15

baseGas: '123',

_15

gasPrice: '123',

_15

gasToken: '0x...',

_15

refundReceiver: '0x...',

_15

nonce: '10'

_15

},

_15

senderAddress: '0x...',

_15

senderSignature: '0x...'

_15

})`

### `config.safeTransactionData.safeTxGas`

- **Type:** `string`

The Safe transaction hash of the proposed transaction.

`_15

await apiKit.proposeTransaction({

_15

safeAddress: '0x...',

_15

safeTxHash: '0x...',

_15

safeTransactionData: {

_15

operation: OperationType.Call,

_15

safeTxGas: '0x...',

_15

baseGas: '123',

_15

gasPrice: '123',

_15

gasToken: '0x...',

_15

refundReceiver: '0x...',

_15

nonce: '10'

_15

},

_15

senderAddress: '0x...',

_15

senderSignature: '0x...'

_15

})`

### `config.safeTransactionData.baseGas`

- **Type:** `string`

The base gas of the proposed transaction.

`_15

await apiKit.proposeTransaction({

_15

safeAddress: '0x...',

_15

safeTxHash: '0x...',

_15

safeTransactionData: {

_15

operation: OperationType.Call,

_15

safeTxGas: '0x...',

_15

baseGas: '123',

_15

gasPrice: '123',

_15

gasToken: '0x...',

_15

refundReceiver: '0x...',

_15

nonce: '10'

_15

},

_15

senderAddress: '0x...',

_15

senderSignature: '0x...'

_15

})`

### `config.safeTransactionData.gasPrice`

- **Type:** `string`

The gas price of the proposed transaction.

`_15

await apiKit.proposeTransaction({

_15

safeAddress: '0x...',

_15

safeTxHash: '0x...',

_15

safeTransactionData: {

_15

operation: OperationType.Call,

_15

safeTxGas: '0x...',

_15

baseGas: '123',

_15

gasPrice: '123',

_15

gasToken: '0x...',

_15

refundReceiver: '0x...',

_15

nonce: '10'

_15

},

_15

senderAddress: '0x...',

_15

senderSignature: '0x...'

_15

})`

### `config.safeTransactionData.gasToken`

- **Type:** `string`

The address of the ERC-20 token sent to the refund receiver.

`_15

await apiKit.proposeTransaction({

_15

safeAddress: '0x...',

_15

safeTxHash: '0x...',

_15

safeTransactionData: {

_15

operation: OperationType.Call,

_15

safeTxGas: '0x...',

_15

baseGas: '123',

_15

gasPrice: '123',

_15

gasToken: '0x...',

_15

refundReceiver: '0x...',

_15

nonce: '10'

_15

},

_15

senderAddress: '0x...',

_15

senderSignature: '0x...'

_15

})`

### `config.safeTransactionData.refundReceiver`

- **Type:** `string`

The address of the refund receiver of the proposed transaction.

`_15

await apiKit.proposeTransaction({

_15

safeAddress: '0x...',

_15

safeTxHash: '0x...',

_15

safeTransactionData: {

_15

operation: OperationType.Call,

_15

safeTxGas: '0x...',

_15

baseGas: '123',

_15

gasPrice: '123',

_15

gasToken: '0x...',

_15

refundReceiver: '0x...',

_15

nonce: '10'

_15

},

_15

senderAddress: '0x...',

_15

senderSignature: '0x...'

_15

})`

### `config.safeTransactionData.nonce`

- **Type:** `string`

The nonce of the proposed transaction.

`_15

await apiKit.proposeTransaction({

_15

safeAddress: '0x...',

_15

safeTxHash: '0x...',

_15

safeTransactionData: {

_15

operation: OperationType.Call,

_15

safeTxGas: '0x...',

_15

baseGas: '123',

_15

gasPrice: '123',

_15

gasToken: '0x...',

_15

refundReceiver: '0x...',

_15

nonce: '10'

_15

},

_15

senderAddress: '0x...',

_15

senderSignature: '0x...'

_15

})`

### `config.senderAddress`

- **Type:** `string`

The address of the signer account that proposes the transaction.

`_10

await apiKit.proposeTransaction({

_10

safeAddress: '0x...',

_10

safeTxHash: '0x...',

_10

safeTransactionData,

_10

senderAddress: '0x...',

_10

senderSignature: '0x...'

_10

})`

### `config.senderSignature`

- **Type:** `string`

The signature of the sender, the signer account that proposes the transaction.

`_10

await apiKit.proposeTransaction({

_10

safeAddress: '0x...',

_10

safeTxHash: '0x...',

_10

safeTransactionData,

_10

senderAddress: '0x...',

_10

senderSignature: '0x...'

_10

})`

### `config.origin` (Optional)

- **Type:** `string`

The name of the application that proposes the transaction.

`_10

await apiKit.proposeTransaction({

_10

safeAddress: '0x...',

_10

safeTxHash: '0x...',

_10

safeTransactionData,

_10

senderAddress: '0x...',

_10

senderSignature: '0x...',

_10

origin: 'App name'

_10

})`

[estimateSafeTransaction](/reference-sdk-api-kit/estimatesafetransaction "estimateSafeTransaction")[getIncomingTransactions](/reference-sdk-api-kit/getincomingtransactions "getIncomingTransactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- proposeTransaction
  - Usage
  - Parameters
    - config.safeAddress
    - config.safeTxHash
    - config.safeTransactionData.operation
    - config.safeTransactionData.safeTxGas
    - config.safeTransactionData.baseGas
    - config.safeTransactionData.gasPrice
    - config.safeTransactionData.gasToken
    - config.safeTransactionData.refundReceiver
    - config.safeTransactionData.nonce
    - config.senderAddress
    - config.senderSignature
    - config.origin(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [https://docs.safe.global/reference-sdk-api-kit/proposetransaction](https://docs.safe.global/reference-sdk-api-kit/proposetransaction)
- [estimateSafeTransaction](https://docs.safe.global/reference-sdk-api-kit/estimatesafetransaction)
- [getIncomingTransactions](https://docs.safe.global/reference-sdk-api-kit/getincomingtransactions)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

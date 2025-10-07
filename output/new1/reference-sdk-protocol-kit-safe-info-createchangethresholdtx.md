---
title: createChangeThresholdTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createChangeThresholdTx – Safe Docs

Protocol Kit Reference

Safe Configuration

createChangeThresholdTx

# `createChangeThresholdTx`

Returns a Safe transaction to change the threshold of the connected Safe.

## Usage



example.tssetup.ts

`_15

import { SafeTransactionOptionalProps } from '@safe-global/protocol-kit'

_15

import { protocolKit } from './setup.ts'

_15

_15

const options: SafeTransactionOptionalProps = {

_15

safeTxGas: '123', // Optional

_15

baseGas: '123', // Optional

_15

gasPrice: '123', // Optional

_15

gasToken: '0x...', // Optional

_15

refundReceiver: '0x...', // Optional

_15

nonce: 123 // Optional

_15

}

_15

const safeTransaction = await protocolKit.createChangeThresholdTx(

_15

threshold: 3,

_15

options // Optional

_15

)`

## Parameters

### `threshold` (Optional)

- **Type**: `number`

The new threshold of the Safe.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx({

_10

threshold: 3

_10

})`

### `options.safeTxGas` (Optional)

- **Type**: `string`

The gas that should be used for the Safe transaction.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx(

_10

threshold: 3,

_10

{

_10

safeTxGas: '123'

_10

}

_10

)`

### `options.baseGas` (Optional)

- **Type**: `string`

The gas costs for the data used to trigger the Safe transaction.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx(

_10

threshold: 3,

_10

{

_10

baseGas: '123'

_10

}

_10

)`

### `options.gasPrice` (Optional)

- **Type**: `string`

The price in wei that the sender is willing to pay for each unit of gas.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx(

_10

threshold: 3,

_10

{

_10

gasPrice: '123'

_10

}

_10

)`

### `options.gasToken` (Optional)

- **Type**: `string`

The token address that is used for the gas payment, or `0x0000000000000000000000000000000000000000` if there is no payment.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx(

_10

threshold: 3,

_10

{

_10

gasToken: '0x...'

_10

}

_10

)`

### `options.refundReceiver` (Optional)

- **Type**: `string`

The address of the gas payment receiver or `0x0000000000000000000000000000000000000000` if there is no payment.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx(

_10

threshold: 3,

_10

{

_10

refundReceiver: '0x...'

_10

}

_10

)`

### `options.nonce` (Optional)

- **Type**: `number`

The transaction nonce.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx(

_10

threshold: 3,

_10

{

_10

nonce: 123

_10

}

_10

)`

## Returns

`Promise<SafeTransaction>`

The Safe transaction to update the threshold.

[createAddOwnerTx](/reference-sdk-protocol-kit/safe-info/createaddownertx "createAddOwnerTx")[createRemoveOwnerTx](/reference-sdk-protocol-kit/safe-info/createremoveownertx "createRemoveOwnerTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createChangeThresholdTx
  - Usage
  - Parameters
    - threshold(Optional)
    - options.safeTxGas(Optional)
    - options.baseGas(Optional)
    - options.gasPrice(Optional)
    - options.gasToken(Optional)
    - options.refundReceiver(Optional)
    - options.nonce(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)
- [createAddOwnerTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [createRemoveOwnerTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createremoveownertx)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

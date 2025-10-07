---
title: createEnableGuardTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createEnableGuardTx – Safe Docs

Protocol Kit Reference

Safe Guards

createEnableGuardTx

# `createEnableGuardTx`

Returns a Safe transaction to enable a Safe Guard.

## Usage



example.tssetup.ts

`_18

import { SafeTransactionOptionalProps } from '@safe-global/protocol-kit'

_18

import { protocolKit } from './setup.ts'

_18

_18

const guardAddress = '0x...'

_18

_18

const options: SafeTransactionOptionalProps = {

_18

safeTxGas: '123', // Optional

_18

baseGas: '123', // Optional

_18

gasPrice: '123', // Optional

_18

gasToken: '0x...', // Optional

_18

refundReceiver: '0x...', // Optional

_18

nonce: 123 // Optional

_18

}

_18

_18

const safeTransaction = await protocolKit.createEnableGuardTx(

_18

guardAddress,

_18

options // Optional

_18

)`

## Parameters

### `guardAddress`

- **Type**: `string`

The Safe Guard address to enable.

`_10

const safeTransaction = await protocolKit.createEnableGuardTx(

_10

'0x...'

_10

)`

### `options.safeTxGas` (Optional)

- **Type**: `string`

The gas that should be used for the Safe transaction.

`_10

const safeTransaction = await protocolKit.createEnableGuardTx(

_10

'0x...',

_10

options: {

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

const safeTransaction = await protocolKit.createEnableGuardTx(

_10

'0x...',

_10

options: {

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

const safeTransaction = await protocolKit.createEnableGuardTx(

_10

'0x...',

_10

options: {

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

const safeTransaction = await protocolKit.createEnableGuardTx(

_10

'0x...',

_10

options: {

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

const safeTransaction = await protocolKit.createEnableGuardTx(

_10

'0x...',

_10

options: {

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

const safeTransaction = await protocolKit.createEnableGuardTx(

_10

'0x...',

_10

options: {

_10

nonce: 123

_10

}

_10

)`

## Returns

`Promise<SafeTransaction>`

The Safe transaction to enable the Safe Guard.

[createDisableGuardTx](/reference-sdk-protocol-kit/safe-guards/createdisableguardtx "createDisableGuardTx")[getGuard](/reference-sdk-protocol-kit/safe-guards/getguard "getGuard")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createEnableGuardTx
  - Usage
  - Parameters
    - guardAddress
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

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createenableguardtx)
- [createDisableGuardTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/createdisableguardtx)
- [getGuard](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/getguard)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

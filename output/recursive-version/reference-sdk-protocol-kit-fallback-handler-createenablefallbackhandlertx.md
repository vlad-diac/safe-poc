---
title: createEnableFallbackHandlerTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createEnableFallbackHandlerTx – Safe Docs

Protocol Kit Reference

Fallback Handler

createEnableFallbackHandlerTx

# `createEnableFallbackHandlerTx`

Returns a Safe transaction to enable the fallback handler.

## Usage



example.tssetup.ts

`_18

import { SafeTransactionOptionalProps } from '@safe-global/protocol-kit'

_18

import { protocolKit } from './setup.ts'

_18

_18

const fallbackHandlerAddress = '0x...'

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

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

_18

fallbackHandlerAddress,

_18

options // Optional

_18

)`

## Parameters

### `fallbackHandlerAddress`

- **Type**: `string`

The fallback handler address to enable.

`_10

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

_10

'0x...'

_10

)`

### `options.safeTxGas` (Optional)

- **Type**: `string`

The gas that should be used for the Safe transaction.

`_10

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

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

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

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

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

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

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

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

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

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

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(

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

The Safe transaction to enable the fallback handler.

[createDisableFallbackHandlerTx](/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx "createDisableFallbackHandlerTx")[createPasskeySigner](/reference-sdk-protocol-kit/passkeys/createpasskeysigner "createPasskeySigner")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createEnableFallbackHandlerTx
  - Usage
  - Parameters
    - fallbackHandlerAddress
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

- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [createDisableFallbackHandlerTx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [createPasskeySigner](https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

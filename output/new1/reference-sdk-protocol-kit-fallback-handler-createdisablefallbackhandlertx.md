---
title: createDisableFallbackHandlerTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createDisableFallbackHandlerTx – Safe Docs

Protocol Kit Reference

Fallback Handler

createDisableFallbackHandlerTx

# `createDisableFallbackHandlerTx`

Returns a Safe transaction to disable the fallback handler.

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

_15

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx(

_15

options // Optional

_15

)`

## Parameters

### `safeTxGas` (Optional)

- **Type**: `string`

The gas that should be used for the Safe transaction.

`_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx({

_10

safeTxGas: '123'

_10

})`

### `baseGas` (Optional)

- **Type**: `string`

The gas costs for the data used to trigger the Safe transaction.

`_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx({

_10

baseGas: '123'

_10

})`

### `gasPrice` (Optional)

- **Type**: `string`

The price in wei that the sender is willing to pay for each unit of gas.

`_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx({

_10

gasPrice: '123'

_10

})`

### `gasToken` (Optional)

- **Type**: `string`

The token address that is used for the gas payment, or `0x0000000000000000000000000000000000000000` if there is no payment.

`_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx({

_10

gasToken: '0x...'

_10

})`

### `refundReceiver` (Optional)

- **Type**: `string`

The address of the gas payment receiver or `0x0000000000000000000000000000000000000000` if there is no payment.

`_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx({

_10

refundReceiver: '0x...'

_10

})`

### `nonce` (Optional)

- **Type**: `number`

The transaction nonce.

`_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx({

_10

nonce: 123

_10

})`

## Returns

`Promise<SafeTransaction>`

The Safe transaction to disable the fallback handler.

[getGuard](/reference-sdk-protocol-kit/safe-guards/getguard "getGuard")[createEnableFallbackHandlerTx](/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx "createEnableFallbackHandlerTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createDisableFallbackHandlerTx
  - Usage
  - Parameters
    - safeTxGas(Optional)
    - baseGas(Optional)
    - gasPrice(Optional)
    - gasToken(Optional)
    - refundReceiver(Optional)
    - nonce(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createdisablefallbackhandlertx)
- [getGuard](https://docs.safe.global/reference-sdk-protocol-kit/safe-guards/getguard)
- [createEnableFallbackHandlerTx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

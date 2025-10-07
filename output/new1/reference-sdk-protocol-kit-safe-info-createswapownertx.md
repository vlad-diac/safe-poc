---
title: createSwapOwnerTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createSwapOwnerTx – Safe Docs

Protocol Kit Reference

Safe Configuration

createSwapOwnerTx

# `createSwapOwnerTx`

Returns a Safe transaction to replace an owner of the connected Safe with a new one.

## Usage



example.tspasskeys-example.tssetup.ts

`_24

import {

_24

SwapOwnerTxParams,

_24

SafeTransactionOptionalProps

_24

} from '@safe-global/protocol-kit'

_24

import { protocolKit } from './setup.ts'

_24

_24

const params: SwapOwnerTxParams = {

_24

oldOwnerAddress,

_24

newOwnerAddress

_24

}

_24

_24

const options: SafeTransactionOptionalProps = {

_24

safeTxGas: '123', // Optional

_24

baseGas: '123', // Optional

_24

gasPrice: '123', // Optional

_24

gasToken: '0x...', // Optional

_24

refundReceiver: '0x...', // Optional

_24

nonce: 123 // Optional

_24

}

_24

_24

const safeTransaction = await protocolKit.createSwapOwnerTx(

_24

params,

_24

options // Optional

_24

)`

## Parameters

### `params.oldOwnerAddress`

- **Type**: `string`

The address of the owner to remove to the Safe.

`_10

const safeTransaction = await protocolKit.createSwapOwnerTx({

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

})`

### `params.newOwnerAddress` (Optional)

- **Type**: `string`

The address of the owner to add to the Safe.

`_10

const safeTransaction = await protocolKit.createSwapOwnerTx({

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

})`

### `params.newOwnerPasskey`

- **Type**: `PasskeyArgType`

The passkey associated with the owner to add to the Safe.

`_10

const safeTransaction = await protocolKit.createSwapOwnerTx({

_10

oldOwnerAddress: '0x...',

_10

newOwnerPasskey

_10

})`

### `options.safeTxGas` (Optional)

- **Type**: `string`

The gas that should be used for the Safe transaction.

`_10

const safeTransaction = await protocolKit.createSwapOwnerTx(

_10

{

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

},

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

const safeTransaction = await protocolKit.createSwapOwnerTx(

_10

{

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

},

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

const safeTransaction = await protocolKit.createSwapOwnerTx(

_10

{

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

},

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

const safeTransaction = await protocolKit.createSwapOwnerTx(

_10

{

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

},

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

const safeTransaction = await protocolKit.createSwapOwnerTx(

_10

{

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

},

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

const safeTransaction = await protocolKit.createSwapOwnerTx(

_10

{

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

},

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

The Safe transaction to replace an owner.

[createRemoveOwnerTx](/reference-sdk-protocol-kit/safe-info/createremoveownertx "createRemoveOwnerTx")[getAddress](/reference-sdk-protocol-kit/safe-info/getaddress "getAddress")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createSwapOwnerTx
  - Usage
  - Parameters
    - params.oldOwnerAddress
    - params.newOwnerAddress(Optional)
    - params.newOwnerPasskey
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

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createswapownertx)
- [createRemoveOwnerTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createremoveownertx)
- [getAddress](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getaddress)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

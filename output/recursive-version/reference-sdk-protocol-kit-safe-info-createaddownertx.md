---
title: createAddOwnerTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createAddOwnerTx – Safe Docs

Protocol Kit Reference

Safe Configuration

createAddOwnerTx

# `createAddOwnerTx`

Returns a Safe transaction to add an owner to the connected Safe and optionally change the threshold.

## Usage



example.tspasskeys-example.tssetup.ts

`_24

import {

_24

AddOwnerTxParams,

_24

SafeTransactionOptionalProps

_24

} from '@safe-global/protocol-kit'

_24

import { protocolKit } from './setup.ts'

_24

_24

const params: AddOwnerTxParams = {

_24

ownerAddress: '0x...'

_24

threshold: 123 // Optional

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

const safeTransaction = await protocolKit.createAddOwnerTx(

_24

params,

_24

options // Optional

_24

)`

## Parameters

### `params.ownerAddress`

- **Type**: `string`

The address of the owner to add to the Safe.

`_10

const safeTransaction = await protocolKit.createAddOwnerTx({

_10

ownerAddress: '0x...'

_10

})`

### `params.passkey`

- **Type**: `PasskeyArgType`

The passkey associated with the owner to add to the Safe.

`_10

const safeTransaction = await protocolKit.createAddOwnerTx({

_10

passkey

_10

})`

### `params.threshold` (Optional)

- **Type**: `number`

The new threshold of the Safe.

`_10

const safeTransaction = await protocolKit.createAddOwnerTx({

_10

ownerAddress: '0x...',

_10

threshold: 2

_10

})`

### `options.safeTxGas` (Optional)

- **Type**: `string`

The gas that should be used for the Safe transaction.

`_10

const safeTransaction = await protocolKit.createAddOwnerTx(

_10

{

_10

ownerAddress: '0x...'

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

const safeTransaction = await protocolKit.createAddOwnerTx(

_10

{

_10

ownerAddress: '0x...'

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

const safeTransaction = await protocolKit.createAddOwnerTx(

_10

{

_10

ownerAddress: '0x...'

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

const safeTransaction = await protocolKit.createAddOwnerTx(

_10

{

_10

ownerAddress: '0x...'

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

const safeTransaction = await protocolKit.createAddOwnerTx(

_10

{

_10

ownerAddress: '0x...'

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

const safeTransaction = await protocolKit.createAddOwnerTx(

_10

{

_10

ownerAddress: '0x...'

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

The Safe transaction to add an owner.

[getSafeAddressFromDeploymentTx](/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx "getSafeAddressFromDeploymentTx")[createChangeThresholdTx](/reference-sdk-protocol-kit/safe-info/createchangethresholdtx "createChangeThresholdTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createAddOwnerTx
  - Usage
  - Parameters
    - params.ownerAddress
    - params.passkey
    - params.threshold(Optional)
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

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)
- [getSafeAddressFromDeploymentTx](https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx)
- [createChangeThresholdTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createchangethresholdtx)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

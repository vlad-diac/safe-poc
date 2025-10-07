---
title: getSafeAddressFromDeploymentTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeAddressFromDeploymentTx – Safe Docs

Protocol Kit Reference

Deployment

getSafeAddressFromDeploymentTx

# `getSafeAddressFromDeploymentTx`

Returns the Safe address from a Safe deployment transaction receipt.

It scans the events emitted during the execution of the transaction to identify the [creation event (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/proxies/SafeProxyFactory.sol#L12) and return its address.

## Usage



example.tssetup.ts

`_21

import { getSafeAddressFromDeploymentTx } from '@safe-global/protocol-kit'

_21

import { createWalletClient, http } from 'viem'

_21

import { privateKeyToAccount } from 'viem/accounts'

_21

import { sepolia } from 'viem/chains'

_21

import { waitForTransactionReceipt } from 'viem/actions'

_21

import { protocolKit } from './setup.ts'

_21

_21

const account = privateKeyToAccount('0x...')

_21

const client = createWalletClient({

_21

account,

_21

chain: sepolia,

_21

transport: http('https://rpc.ankr.com/eth_sepolia')

_21

})

_21

const transactionReceipt = await waitForTransactionReceipt(client, {

_21

hash: '0x...'

_21

})

_21

_21

const safeAddress = getSafeAddressFromDeploymentTx(

_21

transactionReceipt,

_21

safeVersion: '1.4.1'

_21

)`

## Parameters

### `transactionReceipt`

- **Type**: `FormattedTransactionReceipt`

The transaction receipt of the Safe deployment.

`_10

const safeAddress = getSafeAddressFromDeploymentTx(

_10

transactionReceipt,

_10

'1.4.1'

_10

)`

### `safeVersion`

- **Type**: [`SafeVersion` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L3)

The version of the Safe account.

`_10

const safeAddress = getSafeAddressFromDeploymentTx(

_10

transactionReceipt,

_10

'1.4.1'

_10

)`

## Returns

`string`

The address of the deployed Safe account.

[createSafeDeploymentTransaction](/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction "createSafeDeploymentTransaction")[createAddOwnerTx](/reference-sdk-protocol-kit/safe-info/createaddownertx "createAddOwnerTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeAddressFromDeploymentTx
  - Usage
  - Parameters
    - transactionReceipt
    - safeVersion
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx](https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx)
- [https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx](https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx)
- [https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx](https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx)
- [https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx](https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx)
- [https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx](https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx)
- [createSafeDeploymentTransaction](https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction)
- [createAddOwnerTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/createaddownertx)

### External Links

- [creation event(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/proxies/SafeProxyFactory.sol)
- [SafeVersion(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

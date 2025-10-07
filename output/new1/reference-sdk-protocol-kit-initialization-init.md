---
title: init – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/initialization/init
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# init – Safe Docs

Protocol Kit Reference

Initialization

init

# `init`

Initializes the Protocol Kit instance and connects a Safe account.

## Usage

Depending on whether the Safe account is deployed or not, you can initialize the Protocol Kit in two different ways:



Existing SafeNew Safe

Initialization of a deployed Safe using the `safeAddress` property.

`_10

import Safe from '@safe-global/protocol-kit'

_10

_10

const protocolKit = await Safe.init({

_10

provider,

_10

signer,

_10

safeAddress: '0x...',

_10

isL1SafeSingleton: true, // Optional

_10

contractNetworks // Optional

_10

})`

## Parameters

### `provider`

- **Type**: [`Eip1193Provider` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts#L21-L23) | [`HttpTransport` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts#L51) | [`SocketTransport` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts#L52)

An [EIP-1193 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193) compatible provider, or an RPC URL.



url.tseip1193.ts

`_10

const protocolKit = await Safe.init({

_10

provider: 'https://eth-sepolia.public.blastapi.io',

_10

signer,

_10

safeAddress: '0x...'

_10

})`

### `signer`

- **Type**: `string` | [`PasskeyArgType` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/passkeys.ts#L6-L10) | [`PasskeyClient` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts#L38-L44)

A Safe owner address, its private key, or a passkey object.



AddressPrivate KeyPasskey

`_10

const protocolKit = await Safe.init({

_10

provider,

_10

signer: '0x...',

_10

safeAddress: '0x...'

_10

})`

### `safeAddress` (Optional)

- **Type**: `string`

The address of a Safe account.

Use this property to initialize the Protocol Kit with a Safe account that is already deployed.

`_10

const protocolKit = await Safe.init({

_10

provider,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

### `predictedSafe` (Optional)

- **Type**: [`PredictedSafeProps` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeConfig.ts#L25-L28)

An object that contains the Safe account configuration and deployment details.

Use this property to initialize the Protocol Kit with a Safe account that has yet to be deployed. This object contains the following properties:

- `safeAccountConfig`:
  - `owners`: An array of Safe owner addresses.
  - `threshold`: The number of signatures required to execute a Safe transaction.
  - `to` (optional): The contract address for optional delegate call.
  - `data` (optional): The data payload for optional delegate call.
  - `fallbackHandler` (optional): The fallback handler address.
  - `paymentToken` (optional): The token that should be used for the payment (use `0x0000000000000000000000000000000000000000` for the native token).
  - `payment` (optional): The value that should be paid.
  - `paymentReceiver` (optional): The address that should receive the payment (use `0x0000000000000000000000000000000000000000` for the `tx.origin`).
- `safeDeploymentConfig`:
  - `saltNonce` (optional): The salt nonce to use. Changing this value will update the predicted Safe account address.
  - `safeVersion` (optional): The Safe contract version to use.
  - `deploymentType` (optional): The Safe deployment type to use. It can be `canonical`, `eip155`, or `zksync`. Changing this value affects the search algorithm used to find the [Safe deployment address (opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets) for any Safe contract, resulting in a change to the predicted address.

`_10

const protocolKit = await Safe.init({

_10

provider,

_10

signer,

_10

predictedSafe

_10

})`

### `isL1SafeSingleton` (Optional)

- **Type**: `boolean`

A boolean variables that indicates if the Safe uses the [`Safe.sol` (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/Safe.sol) contract as the singleton contract (`true`), or uses the [`SafeL2.sol` (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/SafeL2.sol) contract instead (`false`).

`Safe.sol` version of the contract doesn't trigger events for each Safe transaction to save gas. `SafeL2.sol` version triggers events, which is more appropriate for L2 networks.

By default, `Safe.sol` is only used on Ethereum Mainnet. For the rest of the networks where the Safe contracts are already deployed, the `SafeL2.sol` contract is used unless you add the `isL1SafeSingleton` flag to force using the `Safe.sol` contract.

`_10

const protocolKit = await Safe.init({

_10

provider,

_10

signer,

_10

safeAddress,

_10

isL1SafeSingleton: true

_10

})`

### `contractNetworks` (Optional)

- **Type**: [`ContractNetworksConfig` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/contracts.ts#L131-L134)

If the Safe contracts aren't deployed to your current network, this property is required to point to the addresses of the Safe contracts previously deployed by you.

`_27

const protocolKit = await Safe.init({

_27

provider,

_27

signer,

_27

safeAddress,

_27

contractNetworks: {

_27

[chainId]: {

_27

safeSingletonAddress: '<SINGLETON_ADDRESS>',

_27

safeProxyFactoryAddress: '<PROXY_FACTORY_ADDRESS>',

_27

multiSendAddress: '<MULTI_SEND_ADDRESS>',

_27

multiSendCallOnlyAddress: '<MULTI_SEND_CALL_ONLY_ADDRESS>',

_27

fallbackHandlerAddress: '<FALLBACK_HANDLER_ADDRESS>',

_27

signMessageLibAddress: '<SIGN_MESSAGE_LIB_ADDRESS>',

_27

createCallAddress: '<CREATE_CALL_ADDRESS>',

_27

simulateTxAccessorAddress: '<SIMULATE_TX_ACCESSOR_ADDRESS>',

_27

safeWebAuthnSignerFactoryAddress:'<SAFE_WEB_AUTHN_SIGNER_FACTORY_ADDRESS>',

_27

safeSingletonAbi: '<SINGLETON_ABI>', // Optional. Only needed with web3.js

_27

safeProxyFactoryAbi: '<PROXY_FACTORY_ABI>', // Optional. Only needed with web3.js

_27

multiSendAbi: '<MULTI_SEND_ABI>', // Optional. Only needed with web3.js

_27

multiSendCallOnlyAbi: '<MULTI_SEND_CALL_ONLY_ABI>', // Optional. Only needed with web3.js

_27

fallbackHandlerAbi: '<FALLBACK_HANDLER_ABI>', // Optional. Only needed with web3.js

_27

signMessageLibAbi: '<SIGN_MESSAGE_LIB_ABI>', // Optional. Only needed with web3.js

_27

createCallAbi: '<CREATE_CALL_ABI>', // Optional. Only needed with web3.js

_27

simulateTxAccessorAbi: '<SIMULATE_TX_ACCESSOR_ABI>' // Optional. Only needed with web3.js

_27

safeWebAuthnSignerFactoryAbi: '<SAFE_WEB_AUTHN_SIGNER_FACTORY_ABI>' // Optional. Only needed with web3.js

_27

}

_27

}

_27

})`

## Returns

`Promise<Safe>`

An instance of the Protocol Kit

[connect](/reference-sdk-protocol-kit/initialization/connect "connect")[createSafeDeploymentTransaction](/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction "createSafeDeploymentTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- init
  - Usage
  - Parameters
    - provider
    - signer
    - safeAddress(Optional)
    - predictedSafe(Optional)
    - isL1SafeSingleton(Optional)
    - contractNetworks(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/reference-sdk-protocol-kit/initialization/init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [connect](https://docs.safe.global/reference-sdk-protocol-kit/initialization/connect)
- [createSafeDeploymentTransaction](https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction)

### External Links

- [Eip1193Provider(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts)
- [HttpTransport(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts)
- [SocketTransport(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts)
- [EIP-1193(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193)
- [PasskeyArgType(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/passkeys.ts)
- [PasskeyClient(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeProvider.ts)
- [PredictedSafeProps(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/protocol-kit/src/types/safeConfig.ts)
- [Safe deployment address(opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets)
- [Safe.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/Safe.sol)
- [SafeL2.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/SafeL2.sol)

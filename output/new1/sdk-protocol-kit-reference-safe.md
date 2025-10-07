---
title: Safe reference – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/reference/safe
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe reference – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

[Reference](/sdk/protocol-kit/reference)

Safe

# Safe reference

## Initialization

### `init`

The `init` method initializes the Protocol Kit instance and connects the Safe account.

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

safeAddress // or predictedSafe

_10

})`

- The `safeAddress` property is the address of the Safe account. Use this property if the Safe is already deployed.
- The `predictedSafe` property is an object that contains the Safe account configuration and deployment details. Using this property allows initializing the Protocol Kit with limited functionality, with a Safe account that has yet to be deployed. This object contains the following properties:

  - `safeAccountConfig`:
    - `owners`: An array of Safe owner addresses.
    - `threshold`: The number of signatures required to execute a Safe transaction.
    - `to` (optional): The contract address for optional delegate call.
    - `data` (optional): The data payload for optional delegate call.
    - `fallbackHandler` (optional): The fallback handler address.
    - `paymentToken` (optional): The token that should be used for the payment (0 is ETH).
    - `payment` (optional): The value that should be paid.
    - `paymentReceiver` (optional): The address that should receive the payment (or 0 if tx.origin).
  - `safeDeploymentConfig`:
    - `saltNonce` (optional): The salt nonce to use. Changing this value will update the predicted Safe account address.
    - `safeVersion` (optional): The Safe contract version to use.
    - `deploymentType` (optional): The Safe deployment type to use. It can be `canonical`, `eip155`, or `zksync`. Changing this value affects the search algorithm used to find the [Safe deployment address (opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets) for any Safe contract, resulting in a change to the predicted address.

Depending on whether the Safe account is deployed or not, you can initialize the Protocol Kit in two different ways:



deployed-safe.tsundeployed-safe.ts

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

safeAddress: '0x...'

_10

})`

- The `provider` property can be an [EIP-1193 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193) compatible provider or an RPC URL.



url.tseip1193.ts

`_10

import Safe from '@safe-global/protocol-kit'

_10

_10

const rpcURL = 'https://sepolia.infura.io/v3/...'

_10

_10

const protocolKit = await Safe.init({

_10

provider: rpcURL,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

- The `signer` property can be a Safe owner address, its private key or a passkey object.



address.tsprivate-key.tspasskey.ts

`_10

import Safe from '@safe-global/protocol-kit'

_10

_10

const signerAddress = '0x...'

_10

_10

const protocolKit = await Safe.init({

_10

provider,

_10

signer: signerAddress,

_10

safeAddress: '0x...'

_10

})`

- The `isL1SafeSingleton` flag

  Two versions of the Safe contracts are available: [Safe.sol (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/Safe.sol) that doesn't trigger events to save gas and [SafeL2.sol (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/SafeL2.sol) that does, which is more appropriate for L2 networks.

  By default `Safe.sol` will only be used on Ethereum Mainnet. For the rest of the networks where the Safe contracts are already deployed, the `SafeL2.sol` contract will be used unless you add the `isL1SafeSingleton` flag to force using the `Safe.sol` contract.

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
- The `contractNetworks` property

  If the Safe contracts aren't deployed to your current network, the `contractNetworks` property will be required to point to the addresses of the Safe contracts previously deployed by you.

  `_37

  import {

  _37

  ContractNetworksConfig,

  _37

  SafeProvider

  _37

  } from '@safe-global/protocol-kit'

  _37

  _37

  const safeProvider = new SafeProvider({ provider, signer })

  _37

  const chainId = await safeProvider.getChainId()

  _37

  _37

  const contractNetworks: ContractNetworksConfig = {

  _37

  [chainId]: {

  _37

  safeSingletonAddress: '<SINGLETON_ADDRESS>',

  _37

  safeProxyFactoryAddress: '<PROXY_FACTORY_ADDRESS>',

  _37

  multiSendAddress: '<MULTI_SEND_ADDRESS>',

  _37

  multiSendCallOnlyAddress: '<MULTI_SEND_CALL_ONLY_ADDRESS>',

  _37

  fallbackHandlerAddress: '<FALLBACK_HANDLER_ADDRESS>',

  _37

  signMessageLibAddress: '<SIGN_MESSAGE_LIB_ADDRESS>',

  _37

  createCallAddress: '<CREATE_CALL_ADDRESS>',

  _37

  simulateTxAccessorAddress: '<SIMULATE_TX_ACCESSOR_ADDRESS>',

  _37

  safeWebAuthnSignerFactoryAddress:'<SAFE_WEB_AUTHN_SIGNER_FACTORY_ADDRESS>',

  _37

  safeSingletonAbi: '<SINGLETON_ABI>', // Optional. Only needed with web3.js

  _37

  safeProxyFactoryAbi: '<PROXY_FACTORY_ABI>', // Optional. Only needed with web3.js

  _37

  multiSendAbi: '<MULTI_SEND_ABI>', // Optional. Only needed with web3.js

  _37

  multiSendCallOnlyAbi: '<MULTI_SEND_CALL_ONLY_ABI>', // Optional. Only needed with web3.js

  _37

  fallbackHandlerAbi: '<FALLBACK_HANDLER_ABI>', // Optional. Only needed with web3.js

  _37

  signMessageLibAbi: '<SIGN_MESSAGE_LIB_ABI>', // Optional. Only needed with web3.js

  _37

  createCallAbi: '<CREATE_CALL_ABI>', // Optional. Only needed with web3.js

  _37

  simulateTxAccessorAbi: '<SIMULATE_TX_ACCESSOR_ABI>' // Optional. Only needed with web3.js

  _37

  safeWebAuthnSignerFactoryAbi: '<SAFE_WEB_AUTHN_SIGNER_FACTORY_ABI>' // Optional. Only needed with web3.js

  _37

  }

  _37

  }

  _37

  _37

  const protocolKit = await Safe.init({

  _37

  provider,

  _37

  signer,

  _37

  safeAddress,

  _37

  contractNetworks

  _37

  })`

### `connect`

Returns a new instance of the Protocol Kit connected to a new Safe or a new signer. The new connected signer can be passed via the `signer` property while the new connected Safe can be passed using a `safeAddress` or a `predictedSafe`.

The `provider` property can be an [EIP-1193 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193) compatible provider or an RPC URL. The `signer` property can be the signer address or its private key.

Connection of a deployed Safe using the `safeAddress` property:

`_10

let protocolKit = await Safe.init({

_10

provider,

_10

signer,

_10

safeAddress

_10

})

_10

_10

protocolKit = await protocolKit.connect({

_10

signer: anotherSigner,

_10

safeAddress: anotherSafeAddress

_10

})`

Connection of an undeployed Safe using the `predictedSafe` property. Because Safes are deployed in a deterministic way, passing a `predictedSafe` will allow to connect a Safe to the SDK with the Safe configuration:

`_16

import { PredictedSafeProps } from '@safe-global/protocol-kit'

_16

_16

const predictedSafe: PredictedSafeProps = {

_16

safeAccountConfig,

_16

safeDeploymentConfig

_16

}

_16

_16

let protocolKit = await Safe.init({

_16

provider,

_16

signer,

_16

safeAddress

_16

})

_16

_16

// ...

_16

_16

protocolKit = await protocolKit.connect({ predictedSafe })`

- The `isL1SafeSingleton` flag

  Two versions of the Safe contracts are available: [Safe.sol (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/Safe.sol) that doesn't trigger events to save gas and [SafeL2.sol (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/SafeL2.sol) that does, which is more appropriate for L2 networks.

  By default `Safe.sol` will only be used on Ethereum Mainnet. For the rest of the networks where the Safe contracts are already deployed, the `SafeL2.sol` contract will be used unless you add the `isL1SafeSingleton` flag to force using the `Safe.sol` contract.

  `_10

  protocolKit = await protocolKit.connect({

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
- The `contractNetworks` property

  If the Safe contracts aren't deployed to your current network, the `contractNetworks` property will be required to point to the addresses of the Safe contracts previously deployed by you.

  `_40

  import {

  _40

  ContractNetworksConfig,

  _40

  SafeProvider

  _40

  } from '@safe-global/protocol-kit'

  _40

  _40

  const safeProvider = new SafeProvider({ provider, signer })

  _40

  const chainId = await safeProvider.getChainId()

  _40

  _40

  const contractNetworks: ContractNetworksConfig = {

  _40

  [chainId]: {

  _40

  safeSingletonAddress: '<SINGLETON_ADDRESS>',

  _40

  safeProxyFactoryAddress: '<PROXY_FACTORY_ADDRESS>',

  _40

  multiSendAddress: '<MULTI_SEND_ADDRESS>',

  _40

  multiSendCallOnlyAddress: '<MULTI_SEND_CALL_ONLY_ADDRESS>',

  _40

  fallbackHandlerAddress: '<FALLBACK_HANDLER_ADDRESS>',

  _40

  signMessageLibAddress: '<SIGN_MESSAGE_LIB_ADDRESS>',

  _40

  createCallAddress: '<CREATE_CALL_ADDRESS>',

  _40

  simulateTxAccessorAddress: '<SIMULATE_TX_ACCESSOR_ADDRESS>',

  _40

  safeWebAuthnSignerFactoryAddress:'<SAFE_WEB_AUTHN_SIGNER_FACTORY_ADDRESS>',

  _40

  safeSingletonAbi: '<SINGLETON_ABI>', // Optional. Only needed with web3.js

  _40

  safeProxyFactoryAbi: '<PROXY_FACTORY_ABI>', // Optional. Only needed with web3.js

  _40

  multiSendAbi: '<MULTI_SEND_ABI>', // Optional. Only needed with web3.js

  _40

  multiSendCallOnlyAbi: '<MULTI_SEND_CALL_ONLY_ABI>', // Optional. Only needed with web3.js

  _40

  fallbackHandlerAbi: '<FALLBACK_HANDLER_ABI>', // Optional. Only needed with web3.js

  _40

  signMessageLibAbi: '<SIGN_MESSAGE_LIB_ABI>', // Optional. Only needed with web3.js

  _40

  createCallAbi: '<CREATE_CALL_ABI>', // Optional. Only needed with web3.js

  _40

  simulateTxAccessorAbi: '<SIMULATE_TX_ACCESSOR_ABI>' // Optional. Only needed with web3.js

  _40

  safeWebAuthnSignerFactoryAbi: '<SAFE_WEB_AUTHN_SIGNER_FACTORY_ABI>' // Optional. Only needed with web3.js

  _40

  }

  _40

  }

  _40

  _40

  let protocolKit = await Safe.init({

  _40

  provider,

  _40

  signer,

  _40

  safeAddress

  _40

  })

  _40

  _40

  // ...

  _40

  _40

  protocolKit = await protocolKit.connect({ contractNetworks })`

## Safe Info

### `getAddress`

Returns the address of the current SafeProxy contract.

`_10

const safeAddress = await protocolKit.getAddress()`

### `getBalance`

Returns the ETH balance of the Safe.

`_10

const balance = await protocolKit.getBalance()`

### `getChainId`

Returns the chain ID of the connected network.

`_10

const chainId = await protocolKit.getChainId()`

### `getContractVersion`

Returns the Safe singleton contract version.

`_10

const contractVersion = await protocolKit.getContractVersion()`

### `getNonce`

Returns the Safe nonce.

`_10

const nonce = await protocolKit.getNonce()`

## Safe Deployment

The Protocol Kit has been updated to simplify the creation of new Safes. It now includes the `createSafeDeploymentTransaction` method for deploying Safes. This method returns an Ethereum transaction object that is ready to be executed using the Ethereum client of your choice.

### `createSafeDeploymentTransaction`

Returns a transaction object ready to be executed and deploy a new Safe.

Before deploying a new Safe, you must initialize and configure the Protocol Kit.

`` _26

const predictedSafe = {

_26

safeAccountConfig: {

_26

owners: ['0x...', '0x...', '0x...'],

_26

threshold: 2

_26

// ...

_26

},

_26

safeDeploymentConfig: {

_26

saltNonce, // Optional

_26

safeVersion, // Optional

_26

deploymentType // Optional

_26

}

_26

}

_26

_26

let protocolKit = await Safe.init({

_26

provider,

_26

signer,

_26

predictedSafe

_26

})

_26

_26

const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()

_26

_26

const txHash = await client.sendTransaction({

_26

to: deploymentTransaction.to,

_26

value: BigInt(deploymentTransaction.value),

_26

data: `0x${deploymentTransaction.data}`

_26

}) ``

**Reconnecting to the deployed Safe using the `connect` method**

Once the transaction is executed and the Safe has been successfully deployed, it is necessary to reconnect the Protocol Kit instance to the newly created Safe address by using the `connect` method.

`_10

const txReceipt = await client.waitForTransactionReceipt({ hash: txHash })

_10

_10

const safeAddress = getSafeAddressFromDeploymentTx(txReceipt, safeVersion)

_10

_10

protocolKit = await protocolKit.connect({ safeAddress })

_10

_10

console.log('Is Safe deployed:', await protocolKit.isSafeDeployed())

_10

console.log('Safe Address:', await protocolKit.getAddress())

_10

console.log('Safe Owners:', await protocolKit.getOwners())

_10

console.log('Safe Threshold:', await protocolKit.getThreshold())`

### `getSafeAddressFromDeploymentTx`

Returns the Safe address from a Safe deployment transaction receipt. It scans the events emitted during the transaction to identify the [creation event of a Safe account (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/proxies/SafeProxyFactory.sol#L12) and returns its address.

`_10

const txReceipt = await client.waitForTransactionReceipt({ hash: txHash })

_10

const safeAddress = getSafeAddressFromDeploymentTx(txReceipt, safeVersion)`

## Transactions

### `copyTransaction`

Copies a Safe transaction.

`_10

const safeTransaction1 = await protocolKit.createTransaction({ transactions })

_10

const safeTransaction2 = await copyTransaction(safeTransaction1)`

### `createRejectionTransaction`

Returns a Safe transaction ready to be signed by the owners that invalidates the pending Safe transaction(s) with a specific nonce.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const rejectionTransaction = await protocolKit.createRejectionTransaction(safeTransaction.data.nonce)`

### `createTransaction`

Returns a Safe transaction ready to be signed by the owners and executed. The Protocol Kit supports the creation of single Safe transactions but also MultiSend transactions.

This method takes an array of `MetaTransactionData` objects representing the individual transactions we want to include in our MultiSend transaction.

When the array contains only one transaction, it's not wrapped in the MultiSend.

`_16

const transactions: MetaTransactionData[] = [

_16

{

_16

to,

_16

data,

_16

value,

_16

operation // Optional

_16

},

_16

{

_16

to,

_16

data,

_16

value,

_16

operation // Optional

_16

}

_16

// ...

_16

]

_16

const safeTransaction = await protocolKit.createTransaction({ transactions })`

This method can also receive the `options` parameter to set the optional properties in the MultiSend transaction:

`_24

const transactions: MetaTransactionData[] = [

_24

{

_24

to,

_24

data,

_24

value,

_24

operation // Optional

_24

},

_24

{

_24

to,

_24

data,

_24

value,

_24

operation // Optional

_24

}

_24

// ...

_24

]

_24

const options: SafeTransactionOptionalProps = {

_24

safeTxGas, // Optional

_24

baseGas, // Optional

_24

gasPrice, // Optional

_24

gasToken, // Optional

_24

refundReceiver, // Optional

_24

nonce // Optional

_24

}

_24

const safeTransaction = await protocolKit.createTransaction({ transactions, options })`

In addition, the optional `onlyCalls` parameter, which is `false` by default, allows forcing the use of the `MultiSendCallOnly` instead of the `MultiSend` contract when sending a batch transaction:

`_10

const onlyCalls = true

_10

const safeTransaction = await protocolKit.createTransaction({

_10

transactions,

_10

options,

_10

onlyCalls

_10

})`

If the optional properties aren't manually set, the Safe transaction returned will have the default value for each one:

- `operation`: `OperationType.Call` (0) is the default value.
- `safeTxGas`: The right gas estimation is the default value.
- `baseGas`: 0 is the default value.
- `gasPrice`: 0 is the default value.
- `gasToken`: 0x address is the default value.
- `refundReceiver`: 0x address is the default value.
- `nonce`: The current Safe nonce is the default value.

### `executeTransaction`

Executes a Safe transaction.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

Optionally, some properties can be passed as execution options:

`_10

const options: TransactionOptions = {

_10

from, // Optional

_10

gasLimit, // Optional

_10

gasPrice, // Optional

_10

maxFeePerGas, // Optional

_10

maxPriorityFeePerGas // Optional

_10

nonce // Optional

_10

}`

`_10

const txResponse = await protocolKit.executeTransaction(safeTransaction, options)`

### `getTransactionHash`

Returns the transaction hash of a Safe transaction.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const txHash = await protocolKit.getTransactionHash(safeTransaction)`

### `isValidTransaction`

Checks if a Safe transaction can be executed successfully with no errors.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const isValidTx = await protocolKit.isValidTransaction(safeTransaction)`

Optionally, some properties can be passed as execution options:

`_10

const options: TransactionOptions = {

_10

from, // Optional

_10

gasLimit, // Optional

_10

gasPrice, // Optional

_10

maxFeePerGas, // Optional

_10

maxPriorityFeePerGas // Optional

_10

nonce // Optional

_10

}`

`_10

const isValidTx = await protocolKit.isValidTransaction(safeTransaction, options)`

## Transaction signatures

### `approveTransactionHash`

Approves a hash on-chain using the current owner account.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const txHash = await protocolKit.getTransactionHash(safeTransaction)

_10

const txResponse = await protocolKit.approveTransactionHash(txHash)

_10

await txResponse.transactionResponse?.wait()`

Optionally, some properties can be passed as execution options:

`_10

const options: TransactionOptions = {

_10

from, // Optional

_10

gasLimit, // Optional

_10

gasPrice, // Optional

_10

maxFeePerGas, // Optional

_10

maxPriorityFeePerGas // Optional

_10

nonce // Optional

_10

}`

`_10

const txResponse = await protocolKit.approveTransactionHash(txHash, options)`

### `signHash`

Signs a hash using the current owner account.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const txHash = await protocolKit.getTransactionHash(safeTransaction)

_10

const signature = await protocolKit.signHash(txHash)`

### `signTransaction`

Returns a new `SafeTransaction` object that includes the signature of the current owner.

You can use multiple signing methods, such as:

- ETH\_SIGN (`eth_sign`): Regular hash signature
- ETH\_SIGN\_TYPED\_DATA\_V4 (`eth_signTypedData_v4`): Typed data signature v4, The default method if no signing method is passed
- ETH\_SIGN\_TYPED\_DATA\_V3 `eth_signTypedData_v3`: Typed data signature v3
- ETH\_SIGN\_TYPED\_DATA `eth_signTypedData`: Typed data signature
- SAFE\_SIGNATURE: Signing with another Safe contract as signer

The third parameter (optional) is the preImageSafeAddress. If the preimage is required, this is the address of the Safe that will be used to calculate the preimage. It's a mandatory parameter for 1.3.0 and 1.4.1 contract versions. This is because the safe uses the old EIP-1271 interface, which uses `bytes` instead of `bytes32` for the message; we need to use the pre-image of the message to calculate the message hash. This parameter is used in conjunction with the SAFE\_SIGNATURE signing method.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const signedSafeTransaction = await protocolKit.signTransaction(safeTransaction)`

Optionally, an additional parameter can be passed to specify a different way of signing:

`_10

const signedSafeTransaction = await protocolKit.signTransaction(safeTransaction, SigningMethod.ETH_SIGN_TYPED_DATA_V4) // Default option

_10

const signedSafeTransaction = await protocolKit.signTransaction(safeTransaction, SigningMethod.ETH_SIGN)

_10

const signedSafeTransaction = await protocolKit.signTransaction(safeTransaction, SigningMethod.SAFE_SIGNATURE, parentSafeAddress).`

### `signTypedData`

Signs a transaction according to the EIP-712 using the current signer account.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const signature = await protocolKit.signTypedData(safeTransaction)`

## Owners

### `createAddOwnerTx`

Returns the Safe transaction to add an owner and optionally change the threshold.

`` _10

const params: AddOwnerTxParams = {

_10

ownerAddress,

_10

threshold // Optional. If `threshold` isn't provided the current threshold won't change.

_10

}

_10

const safeTransaction = await protocolKit.createAddOwnerTx(params)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait() ``

Instead of using an address, this method also supports the use of a passkey to set the address of the new owner:

`` _11

const passkey: PasskeyArgType = {

_11

rawId,

_11

coordinates

_11

}

_11

const params: AddPasskeyOwnerTxParams = {

_11

passkey,

_11

threshold // Optional. If `threshold` isn't provided the current threshold won't change.

_11

}

_11

const safeTransaction = await protocolKit.createAddOwnerTx(params)

_11

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_11

await txResponse.transactionResponse?.wait() ``

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createAddOwnerTx(params, options)`

### `createRemoveOwnerTx`

Returns the Safe transaction to remove an owner and optionally change the threshold.

`` _10

const params: RemoveOwnerTxParams = {

_10

ownerAddress,

_10

newThreshold // Optional. If `newThreshold` isn't provided, the current threshold will be decreased by one.

_10

}

_10

const safeTransaction = await protocolKit.createRemoveOwnerTx(params)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait() ``

Instead of using an address, this method also supports the use of a passkey to remove an owner:

`` _11

const passkey: PasskeyArgType = {

_11

rawId,

_11

coordinates

_11

}

_11

const params: AddPasskeyOwnerTxParams = {

_11

passkey,

_11

threshold // Optional. If `newThreshold` isn't provided, the current threshold will be decreased by one.

_11

}

_11

const safeTransaction = await protocolKit.createRemoveOwnerTx(params)

_11

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_11

await txResponse.transactionResponse?.wait() ``

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createRemoveOwnerTx(params, options)`

### `createSwapOwnerTx`

Returns the Safe transaction to replace an owner of the Safe with a new one.

`_10

const params: SwapOwnerTxParams = {

_10

oldOwnerAddress,

_10

newOwnerAddress

_10

}

_10

const safeTransaction = await protocolKit.createSwapOwnerTx(params)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

Instead of using an address, this method also supports any combination of passkey and address:

`_11

const newOwnerPasskey: PasskeyArgType = {

_11

rawId,

_11

coordinates

_11

}

_11

const params: SwapOwnerTxParams = {

_11

oldOwnerAddress,

_11

newOwnerPasskey

_11

}

_11

const safeTransaction = await protocolKit.createSwapOwnerTx(params)

_11

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_11

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createSwapOwnerTx(params, options)`

### `getOwners`

Returns the list of Safe owner accounts.

`_10

const ownerAddresses = await protocolKit.getOwners()`

### `getOwnersWhoApprovedTx`

Returns a list of owners who have approved a specific Safe transaction.

`_10

const transactions: MetaTransactionData[] = [{

_10

// ...

_10

}]

_10

const safeTransaction = await protocolKit.createTransaction({ transactions })

_10

const txHash = await protocolKit.getTransactionHash(safeTransaction)

_10

const ownerAddresses = await protocolKit.getOwnersWhoApprovedTx(txHash)`

### `isOwner`

Checks if a specific address is an owner of the current Safe.

`_10

const isOwner = await protocolKit.isOwner(address)`

## Threshold

### `createChangeThresholdTx`

Returns the Safe transaction to change the threshold.

`_10

const safeTransaction = await protocolKit.createChangeThresholdTx(newThreshold)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createChangeThresholdTx(newThreshold, options)`

### `getThreshold`

Returns the Safe threshold.

`_10

const threshold = await protocolKit.getThreshold()`

## Safe Guards

### `createDisableGuardTx`

Returns the Safe transaction to disable a Safe Guard.

`_10

const safeTransaction = await protocolKit.createDisableGuardTx()

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createDisableGuardTx(options)`

### `createEnableGuardTx`

Returns the Safe transaction to enable a Safe Guard.

`_10

const safeTransaction = await protocolKit.createEnableGuardTx(guardAddress)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = {

_10

safeTxGas, // Optional

_10

baseGas, // Optional

_10

gasPrice, // Optional

_10

gasToken, // Optional

_10

refundReceiver, // Optional

_10

nonce // Optional

_10

}

_10

const safeTransaction = await protocolKit.createEnableGuardTx(guardAddress, options)`

### `getGuard`

Returns the enabled Safe Guard or 0x address if no guards are enabled.

`_10

const guardAddress = await protocolKit.getGuard()`

## Safe Modules

### `createDisableModuleTx`

Returns a Safe transaction ready to be signed that will disable a Safe Module.

`_10

const safeTransaction = await protocolKit.createDisableModuleTx(moduleAddress)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createDisableModuleTx(moduleAddress, options)`

### `createEnableModuleTx`

Returns a Safe transaction ready to be signed that will enable a Safe Module.

`_10

const safeTransaction = await protocolKit.createEnableModuleTx(moduleAddress)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createEnableModuleTx(moduleAddress, options)`

### `getModules`

Returns the list of addresses of all the enabled Safe Modules.

`_10

const moduleAddresses = await protocolKit.getModules()`

### `isModuleEnabled`

Checks if a specific Safe Module is enabled for the current Safe.

`_10

const isEnabled = await protocolKit.isModuleEnabled(moduleAddress)`

## FallbackHandler

### `createDisableFallbackHandlerTx`

Returns the Safe transaction to disable the fallback handler.

`_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx()

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = { ... }

_10

const safeTransaction = await protocolKit.createDisableFallbackHandlerTx(options)`

### `createEnableFallbackHandlerTx`

Returns the Safe transaction to enable the fallback handler.

`_10

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(fallbackHandlerAddress)

_10

const txResponse = await protocolKit.executeTransaction(safeTransaction)

_10

await txResponse.transactionResponse?.wait()`

This method can optionally receive the `options` parameter:

`_10

const options: SafeTransactionOptionalProps = {

_10

safeTxGas, // Optional

_10

baseGas, // Optional

_10

gasPrice, // Optional

_10

gasToken, // Optional

_10

refundReceiver, // Optional

_10

nonce // Optional

_10

}

_10

const safeTransaction = await protocolKit.createEnableFallbackHandlerTx(fallbackHandlerAddress, options)`

## Messages

### `createMessage`

Returns a SafeMessage ready to be signed by the owners.

`_10

const rawMessage: string | EIP712TypedData = 'I am the owner of this Safe'

_10

const message = protocolKit.createMessage(rawMessage)`

### `getSafeMessageHash`

Retrieve the Safe message hash of a string, or EIP-712 typed data. It produces the identical hash as invoking the CompatibilityFallbackHandler's getMessageHash method.

`_10

const rawMessage = ... // String or EIP-712 typed data

_10

const messageHash = hashSafeMessage(rawMessage)

_10

_10

const safeMessageHash = await protocolKit.getSafeMessageHash(messageHash)`

### `isValidSignature`

Calls the CompatibilityFallbackHandler isValidSignature method (EIP-1271).

It requires two parameters:

- messageHash: The hash of the message
- signature: The signature to be validated or '0x'. You can send as signature one of the following:
  1. An array of SafeSignature. In this case the signatures are concatenated for validation (buildSignatureBytes())
  2. The concatenated signatures as string
  3. '0x' if you want to validate an on-chain message (Approved hash)

The method returns if the signature is valid

`_10

const rawMessage = ... // String or EIP-712 typed data

_10

const messageHash = hashSafeMessage(rawMessage)

_10

const safeMessageHash = await protocolKit.getSafeMessageHash(messageHash)

_10

_10

const isValidSignature = await protocolKit.isValidSignature(safeMessageHash, signature)

_10

...

_10

const isValidSignature = await protocolKit.isValidSignature(safeMessageHash, [signature1, signature2])

_10

...

_10

const isValidSignature = await protocolKit.isValidSignature(safeMessageHash, '0x')`

### `signMessage`

Returns a new `SafeMessage` object that includes the signature of the current owner.

You can use multiple signing methods, such as:

- ETH\_SIGN (`eth_sign`): Regular hash signature
- ETH\_SIGN\_TYPED\_DATA\_V4 (`eth_signTypedData_v4`): Typed data signature v4, The default method if no signing method is passed
- ETH\_SIGN\_TYPED\_DATA\_V3 `eth_signTypedData_v3`: Typed data signature v3
- ETH\_SIGN\_TYPED\_DATA `eth_signTypedData`: Typed data signature
- SAFE\_SIGNATURE: Signing with another Safe contract as signer

The third parameter (optional) is the preImageSafeAddress. If the preimage is required, this is the address of the Safe that will be used to calculate the preimage. It's a mandatory parameter for 1.3.0 and 1.4.1 contract versions. This is because the safe uses the old EIP-1271 interface, which uses `bytes` instead of `bytes32` for the message; we need to use the pre-image of the message to calculate the message hash. This parameter is used in conjunction with the SAFE\_SIGNATURE signing method.

`_10

const rawMessage: string | EIP712TypedData = 'I am the owner of this Safe'

_10

const message = protocolKit.createMessage(rawMessage)

_10

const signedMessage = await protocolKit.signMessage(message)`

Optionally, an additional parameter can be passed to specify a different way of signing:

`_10

const signedMessage = await protocolKit.signMessage(signedMessage, SigningMethod.ETH_SIGN_TYPED_DATA_V4) // Default option

_10

const signedMessage = await protocolKit.signMessage(signedMessage, SigningMethod.ETH_SIGN)

_10

const signedMessage = await protocolKit.signMessage(signedMessage, SigningMethod.SAFE_SIGNATURE, parentSafeAddress).`

[Reference](/sdk/protocol-kit/reference "Reference")[API Kit](/sdk/api-kit "API Kit")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe reference
  - Initialization
    - init
    - connect
  - Safe Info
    - getAddress
    - getBalance
    - getChainId
    - getContractVersion
    - getNonce
  - Safe Deployment
    - createSafeDeploymentTransaction
    - getSafeAddressFromDeploymentTx
  - Transactions
    - copyTransaction
    - createRejectionTransaction
    - createTransaction
    - executeTransaction
    - getTransactionHash
    - isValidTransaction
  - Transaction signatures
    - approveTransactionHash
    - signHash
    - signTransaction
    - signTypedData
  - Owners
    - createAddOwnerTx
    - createRemoveOwnerTx
    - createSwapOwnerTx
    - getOwners
    - getOwnersWhoApprovedTx
    - isOwner
  - Threshold
    - createChangeThresholdTx
    - getThreshold
  - Safe Guards
    - createDisableGuardTx
    - createEnableGuardTx
    - getGuard
  - Safe Modules
    - createDisableModuleTx
    - createEnableModuleTx
    - getModules
    - isModuleEnabled
  - FallbackHandler
    - createDisableFallbackHandlerTx
    - createEnableFallbackHandlerTx
  - Messages
    - createMessage
    - getSafeMessageHash
    - isValidSignature
    - signMessage

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Reference](https://docs.safe.global/sdk/protocol-kit/reference)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)
- [https://docs.safe.global/sdk/protocol-kit/reference/safe](https://docs.safe.global/sdk/protocol-kit/reference/safe)

### External Links

- [Safe deployment address(opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets)
- [EIP-1193(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193)
- [Safe.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/Safe.sol)
- [SafeL2.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/SafeL2.sol)
- [EIP-1193(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193)
- [Safe.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/Safe.sol)
- [SafeL2.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/contracts/SafeL2.sol)
- [creation event of a Safe account(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/proxies/SafeProxyFactory.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

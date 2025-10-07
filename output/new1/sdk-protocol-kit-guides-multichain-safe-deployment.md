---
title: Multichain Safe Deployment – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Multichain Safe Deployment – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Multichain Safe deployment

# Multichain Safe Deployment

This guide will teach you how to replicate a Safe address across different chains using the Protocol Kit. This process includes initializing the Protocol Kit, configuring the Safes to deploy, predicting its address on different chains, and executing the deployment transactions.

For more detailed information, see the [Protocol Kit Reference](/reference-sdk-protocol-kit/overview).

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Install dependencies

First, you need to install the Protocol Kit.

`_10

pnpm add @safe-global/protocol-kit viem`

## Steps

### Imports

Here are all the necessary imports for this guide.

`_10

import Safe, {

_10

PredictedSafeProps,

_10

SafeAccountConfig,

_10

SafeDeploymentConfig

_10

} from '@safe-global/protocol-kit'

_10

import { waitForTransactionReceipt } from 'viem/actions'

_10

import { gnosisChiado, sepolia } from 'viem/chains'`

### Create a signer

You need a signer to instantiate the Protocol Kit. This example uses a private key to obtain a signer, but other [EIP-1193 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193) compatible signers are also supported. For detailed information about signers, please refer to the [Protocol Kit reference](/reference-sdk-protocol-kit/overview).

`_10

const SIGNER_PRIVATE_KEY = // ...`

### Configure the Safe deployment

Define the [`predictedSafe`](/reference-sdk-protocol-kit/initialization/init#predictedsafe-optional) object with the configuration for all the Safe accounts you will deploy. Check the reference to learn about all the different configuration options.

`_10

const safeAccountConfig: SafeAccountConfig = {

_10

owners: ['0x...', '0x...', '0x...'],

_10

threshold: 2

_10

// ...

_10

}

_10

_10

const predictedSafe: PredictedSafeProps = {

_10

safeAccountConfig

_10

// ...

_10

}`

### Initialize the Protocol Kit

Initialize an instance of the Protocol Kit for each network where you want to deploy a new Safe smart account by calling the [`init`](/reference-sdk-protocol-kit/initialization/init) method. Pass the `provider` with its corresponding value depending on the network, the `signer` executing the deployment, and the [`predictedSafe`](/reference-sdk-protocol-kit/initialization/init#predictedsafe-optional) with the Safe account configuration.

`_15

const protocolKitSepolia = await Safe.init({

_15

provider: sepolia.rpcUrls.default.http[0],

_15

signer: SIGNER_PRIVATE_KEY,

_15

predictedSafe,

_15

onchainAnalytics // Optional

_15

// ...

_15

})

_15

_15

const protocolKitChiado = await Safe.init({

_15

provider: gnosisChiado.rpcUrls.default.http[0],

_15

signer: PRIVATE_KEY,

_15

predictedSafe,

_15

onchainAnalytics // Optional

_15

// ...

_15

})`

Optionally, you can [track your Safe deployments and transactions on-chain](/sdk/onchain-tracking) by using the `onchainAnalytics` property.

### Predict the Safe addresses

You can predict the Safe addresses by calling the [`getAddress`](/reference-sdk-protocol-kit/safe-info/getaddress) method from each Protocol Kit instance and ensure that the result addresses are the same.

`_10

const sepoliaPredictedSafeAddress = await protocolKitSepolia.getAddress()

_10

const chiadoPredictedSafeAddress = await protocolKitChiado.getAddress()`

### Deployment on Sepolia

Create the deployment transaction to deploy a new Safe account in Sepolia by calling the [`createSafeDeploymentTransaction`](/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction) method.

`_10

const sepoliaDeploymentTransaction =

_10

await protocolKitSepolia.createSafeDeploymentTransaction()`

Call the `sendTransaction` method from your Sepolia client instance and wait for the transaction to be executed.

`` _14

const sepoliaClient =

_14

await protocolKitSepolia.getSafeProvider().getExternalSigner()

_14

_14

const transactionHashSepolia = await sepoliaClient!.sendTransaction({

_14

to: sepoliaDeploymentTransaction.to,

_14

value: BigInt(sepoliaDeploymentTransaction.value),

_14

data: sepoliaDeploymentTransaction.data as `0x${string}`,

_14

chain: sepolia

_14

})

_14

_14

await waitForTransactionReceipt(

_14

sepoliaClient!,

_14

{ hash: transactionHashSepolia }

_14

) ``

Once the deployment transaction is executed, connect the new Safe address to the Protocol Kit instance by calling the [`connect`](/reference-sdk-protocol-kit/initialization/connect) method.

`_10

const newProtocolKitSepolia = await protocolKitSepolia.connect({

_10

safeAddress: sepoliaPredictedSafeAddress

_10

})

_10

_10

const isSepoliaSafeDeployed = await newProtocolKitSepolia.isSafeDeployed() // True

_10

const sepoliaDeployedSafeAddress = await newProtocolKitSepolia.getAddress()`

If everything went well, `isSepoliaSafeDeployed` should be `true`, and the `sepoliaDeployedSafeAddress` should equal the `sepoliaPredictedSafeAddress`.

### Deployment on Chiado

Repeat the same steps to deploy a Safe with the same configuration on Chiado testnet.

`` _24

const chiadoDeploymentTransaction =

_24

await protocolKitChiado.createSafeDeploymentTransaction()

_24

_24

const chiadoClient =

_24

await protocolKitChiado.getSafeProvider().getExternalSigner()

_24

_24

const transactionHashChiado = await chiadoClient!.sendTransaction({

_24

to: chiadoDeploymentTransaction.to,

_24

value: BigInt(chiadoDeploymentTransaction.value),

_24

data: chiadoDeploymentTransaction.data as `0x${string}`,

_24

chain: gnosisChiado

_24

})

_24

_24

await waitForTransactionReceipt(

_24

chiadoClient!,

_24

{ hash: transactionHashChiado }

_24

)

_24

_24

const newProtocolKitChiado = await protocolKitChiado.connect({

_24

safeAddress: chiadoPredictedSafeAddress

_24

})

_24

_24

const isChiadoSafeDeployed = await newProtocolKitChiado.isSafeDeployed() // True

_24

const chiadoDeployedSafeAddress = await newProtocolKitChiado.getAddress() ``

If everything went well, `isChiadoSafeDeployed` should be `true`, and the `chiadoDeployedSafeAddress` should equal the `chiadoPredictedSafeAddress`.

In addition, `chiadoDeployedSafeAddress` and `sepoliaDeployedSafeAddress` should have the same value.

## Recap and further reading

After following this guide, you are able to deploy multiple Safe accounts with the same address on different chains using the Protocol Kit.

[Safe deployment](/sdk/protocol-kit/guides/safe-deployment "Safe deployment")[Execute transactions](/sdk/protocol-kit/guides/execute-transactions "Execute transactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Multichain Safe Deployment
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Create a signer
    - Configure the Safe deployment
    - Initialize the Protocol Kit
    - Predict the Safe addresses
    - Deployment on Sepolia
    - Deployment on Chiado
  - Recap and further reading

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Protocol Kit Reference](https://docs.safe.global/reference-sdk-protocol-kit/overview)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [Protocol Kit reference](https://docs.safe.global/reference-sdk-protocol-kit/overview)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [predictedSafe](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [predictedSafe](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [track your Safe deployments and transactions on-chain](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [getAddress](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getaddress)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [createSafeDeploymentTransaction](https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction)
- [connect](https://docs.safe.global/reference-sdk-protocol-kit/initialization/connect)
- [https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [EIP-1193(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

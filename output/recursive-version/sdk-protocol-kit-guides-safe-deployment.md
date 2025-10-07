---
title: Safe Deployment – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe Deployment – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Safe deployment

# Safe Deployment

This guide will teach you how to deploy a new Safe using the Protocol Kit. This process includes initializing the Protocol Kit, setting up your Safe configuration, and executing the deployment.

For more detailed information, see the [Protocol Kit Reference](/reference-sdk-protocol-kit/overview).

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Install dependencies

First, you need to install some dependencies.

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

import { sepolia } from 'viem/chains'`

### Create a signer

You need a signer to instantiate the Protocol Kit. This example uses a private key to obtain a signer, but [EIP-1193 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193) compatible signers are also supported. For detailed information about signers, please refer to the [Protocol Kit reference](/reference-sdk-protocol-kit/overview).

`_10

const SIGNER_PRIVATE_KEY = // ...`

### Initialize the Protocol Kit

Initialize an instance of the Protocol Kit for each network where you want to deploy a new Safe smart account by calling the [`init`](/reference-sdk-protocol-kit/initialization/init) method. Pass the `provider` with its corresponding value depending on the network, the `signer` executing the deployment, and the [`predictedSafe`](/reference-sdk-protocol-kit/initialization/init#predictedsafe-optional) with the Safe account configuration.

Optionally, you can [track your Safe deployments and transactions on-chain](/sdk/onchain-tracking) by using the `onchainAnalytics` property.

`_17

const safeAccountConfig: SafeAccountConfig = {

_17

owners: ['0x...', '0x...', '0x...'],

_17

threshold: 2

_17

// More optional properties

_17

}

_17

_17

const predictedSafe: PredictedSafeProps = {

_17

safeAccountConfig

_17

// More optional properties

_17

}

_17

_17

const protocolKit = await Safe.init({

_17

provider: sepolia.rpcUrls.default.http[0],

_17

signer: SIGNER_PRIVATE_KEY,

_17

predictedSafe,

_17

onchainAnalytics // Optional

_17

})`

### Predict the Safe address

You can predict the Safe address using the [`getAddress`](/reference-sdk-protocol-kit/safe-info/getaddress) method in the Protocol Kit.

`_10

const safeAddress = await protocolKit.getAddress()`

### Create the deployment transaction

Create the deployment transaction to deploy a new Safe smart account by calling the [`createSafeDeploymentTransaction`](/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction) method.

`_10

const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()`

### Execute the deployment transaction

Once the deployment transaction object is ready, execute it using the provided signer or your preferred external Ethereum client.

`` _12

const client = await protocolKit.getSafeProvider().getExternalSigner()

_12

_12

const transactionHash = await client.sendTransaction({

_12

to: deploymentTransaction.to,

_12

value: BigInt(deploymentTransaction.value),

_12

data: deploymentTransaction.data as `0x${string}`,

_12

chain: sepolia

_12

})

_12

_12

const transactionReceipt = await client.waitForTransactionReceipt({

_12

hash: transactionHash

_12

}) ``

### Reinitialize the Protocol Kit

Once the deployment transaction is executed, connect the new Safe address to the Protocol Kit instance by calling the [`connect`](/reference-sdk-protocol-kit/initialization/connect) method.

`_10

const newProtocolKit = await protocolKit.connect({

_10

safeAddress

_10

})

_10

_10

const isSafeDeployed = await newProtocolKit.isSafeDeployed() // True

_10

const safeAddress = await newProtocolKit.getAddress()

_10

const safeOwners = await newProtocolKit.getOwners()

_10

const safeThreshold = await newProtocolKit.getThreshold()`

## Recap and further reading

After following this guide, you are able to deploy new Safe smart accounts with the Protocol Kit.

[Protocol Kit](/sdk/protocol-kit "Protocol Kit")[Multichain Safe deployment](/sdk/protocol-kit/guides/multichain-safe-deployment "Multichain Safe deployment")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe Deployment
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Create a signer
    - Initialize the Protocol Kit
    - Predict the Safe address
    - Create the deployment transaction
    - Execute the deployment transaction
    - Reinitialize the Protocol Kit
  - Recap and further reading

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Protocol Kit Reference](https://docs.safe.global/reference-sdk-protocol-kit/overview)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [Protocol Kit reference](https://docs.safe.global/reference-sdk-protocol-kit/overview)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [predictedSafe](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [track your Safe deployments and transactions on-chain](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [getAddress](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getaddress)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [createSafeDeploymentTransaction](https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)
- [connect](https://docs.safe.global/reference-sdk-protocol-kit/initialization/connect)
- [https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment](https://docs.safe.global/sdk/protocol-kit/guides/safe-deployment)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [EIP-1193(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

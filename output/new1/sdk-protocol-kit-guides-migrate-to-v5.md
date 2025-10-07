---
title: Migrate to v5 – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v5 – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Migrate to v5

# Migrate to v5

This guide references the major changes between v4 and v5 to help those migrating an existing app.

## Removing `SafeFactory` class

The `SafeFactory` class, previously used for deploying Safes, has been removed. The functionality to deploy Safes is now directly available in the `Safe` class through the new `createSafeDeploymentTransaction` method.

### Old Method Using `SafeFactory`

`_24

// old v4 code

_24

import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'

_24

_24

const safeFactory = await SafeFactory.init({

_24

provider,

_24

signer,

_24

safeVersion // Optional

_24

})

_24

_24

const safeAccountConfig: SafeAccountConfig = {

_24

owners: ['0x...', '0x...', '0x...'],

_24

threshold: 2

_24

}

_24

_24

const protocolKit = await safeFactory.deploySafe({

_24

safeAccountConfig,

_24

saltNonce // Optional

_24

})

_24

_24

// Confirm the Safe is deployed and fetch properties

_24

console.log('Is Safe deployed:', await protocolKit.isSafeDeployed())

_24

console.log('Safe Address:', await protocolKit.getAddress())

_24

console.log('Safe Owners:', await protocolKit.getOwners())

_24

console.log('Safe Threshold:', await protocolKit.getThreshold())`

### New Method Using `Safe` class

`` _45

// new v5 code

_45

import Safe, { PredictedSafeProps } from '@safe-global/protocol-kit'

_45

_45

const predictedSafe: PredictedSafeProps = {

_45

safeAccountConfig: {

_45

owners: ['0x...', '0x...', '0x...'],

_45

threshold: 2

_45

},

_45

safeDeploymentConfig: {

_45

saltNonce, // Optional

_45

safeVersion // Optional

_45

}

_45

}

_45

_45

let protocolKit = await Safe.init({

_45

provider,

_45

signer,

_45

predictedSafe

_45

})

_45

_45

// you can predict the address of your Safe if the Safe version is `v1.3.0` or above

_45

const safeAddress = await protocolKit.getAddress()

_45

_45

const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()

_45

_45

// Execute this transaction using the integrated signer or your preferred external Ethereum client

_45

const client = await protocolKit.getSafeProvider().getExternalSigner()

_45

_45

const txHash = await client.sendTransaction({

_45

to: deploymentTransaction.to,

_45

value: BigInt(deploymentTransaction.value),

_45

data: deploymentTransaction.data as `0x${string}`,

_45

chain: sepolia

_45

})

_45

_45

const txReceipt = await client.waitForTransactionReceipt({ hash: txHash })

_45

_45

// Reconnect to the newly deployed Safe using the protocol-kit

_45

protocolKit = await protocolKit.connect({ safeAddress })

_45

_45

// Confirm the Safe is deployed and fetch properties

_45

console.log('Is Safe deployed:', await protocolKit.isSafeDeployed())

_45

console.log('Safe Address:', await protocolKit.getAddress())

_45

console.log('Safe Owners:', await protocolKit.getOwners())

_45

console.log('Safe Threshold:', await protocolKit.getThreshold()) ``

### Predict the Safe Address

You can predict the address of a Safe account before its deployment, as long as you are using Safe `v1.3.0` or greater, by replacing the `SafeFactory.predictSafeAddress` method with the `Safe.getAddress` method:

`_10

// old v4 code

_10

const predictedSafeAddress = await safeFactory.predictSafeAddress(

_10

safeAccountConfig,

_10

saltNonce // optional

_10

)

_10

_10

// new v5 code

_10

const predictedSafeAddress = await protocolKit.getAddress()`

### Migration Steps

- Remove any import or reference of the `SafeFactory` class from your code.
- Replace the `SafeFactory.deploySafe` method with the `Safe.createSafeDeploymentTransaction` method where necessary. You can use your Ethereum client to execute this deployment transaction.
- To predict the Address of your Safe Account, replace the `SafeFactory.predictSafeAddress` method with the `Safe.getAddress` method.
- After the deployment transaction has been executed, it is necessary to reconnect the Protocol Kit instance to the newly created Safe address by using the `connect` method.

The removal of `SafeFactory` means there’s one less class to initialize and manage within your project. You can now directly use the `Safe` class to handle all operations related to Safes, including their deployment.

[Migrate to v4](/sdk/protocol-kit/guides/migrate-to-v4 "Migrate to v4")[Migrate to v6](/sdk/protocol-kit/guides/migrate-to-v6 "Migrate to v6")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v5
  - RemovingSafeFactoryclass
    - Old Method UsingSafeFactory
    - New Method UsingSafeclass
    - Predict the Safe Address
    - Migration Steps

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5)
- [Migrate to v4](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4)
- [Migrate to v6](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v6)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

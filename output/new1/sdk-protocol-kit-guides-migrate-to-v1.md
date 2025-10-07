---
title: Migrate to v1 – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v1 – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Migrate to v1

# Migrate to v1

This guide references the major changes between `safe-core-sdk` and `protocol-kit` v1 to help those migrating an existing application.

**Note:** Follow this guide before migrating to `protocol-kit` v2.

You can remove `@safe-global/safe-core-sdk` from your `package.json` after completing this guide.

## Adding the new dependency

To add the Protocol Kit to your project, run the following:

`_10

yarn add @safe-global/protocol-kit@1.3.0`

If you use the types library, you will need to update to v2.3.0:

`_10

yarn add @safe-global/safe-core-sdk-types@2.3.0`

## `EthAdapter`

### `EthersAdapter` (safe-ethers-lib)

`EthersAdapter` isn't in a separate package anymore. Now, it's provided inside the `protocol-kit` package.

**`protocol-kit v1` only supports `ethers v5`**

`_10

// old

_10

import EthersAdapter from '@safe-global/safe-ethers-lib'

_10

_10

// new

_10

import { EthersAdapter } from '@safe-global/protocol-kit'`

After this change, you can remove `@safe-global/safe-ethers-lib` from your `package.json`.

### `Web3Adapter` (safe-web3-lib)

`Web3Adapter` isn't in a separate package anymore. Now, it's part of the `protocol-kit` package.

**Note:** `protocol-kit` v1 only supports Web3.js v1.

`_10

// old

_10

import Web3Adapter from '@safe-global/safe-web3-lib'

_10

_10

// new

_10

import { Web3Adapter } from '@safe-global/protocol-kit'`

After this change, you can remove `@safe-global/safe-web3-lib` from your `package.json`.

### Type changes

Type changes are affecting the web3 and ethers adapter libraries.

`getSafeContract`, `getMultisendContract`, `getMultisendCallOnlyContract`, `getCompatibilityFallbackHandlerContract`, `getSafeProxyFactoryContract`, `getSignMessageLibContract` and `getCreateCallContract` don't need the `chainId` parameter anymore, they will use the chain set on the provider. Also, they return a `Promise` now.

`estimateGas` now returns a `string` instead of a `number`.

## `safeFactory.deploySafe()`

`SafeDeploymentConfig` was simplified. If you were using a `saltNonce` you should set it like this:

`_16

// old

_16

const safeAccountConfig: SafeAccountConfig = {

_16

...

_16

}

_16

const safeDeploymentConfig: SafeDeploymentConfig = { saltNonce }

_16

_16

const safeSdk = await safeFactory.deploySafe({ safeAccountConfig, safeDeploymentConfig })

_16

_16

// new

_16

const safeAccountConfig: SafeAccountConfig = {

_16

...

_16

}

_16

_16

const saltNonce = '<YOUR_CUSTOM_VALUE>'

_16

_16

const protocolKit = await safeFactory.deploySafe({ safeAccountConfig, saltNonce })`

## `getAddress()`

The `getAddress()` method now returns a `Promise`.

`_10

// old

_10

const safeAddress = safeSdk.getAddress()

_10

_10

// new

_10

const safeAddress = await protocolKit.getAddress()`

## General type changes

If you set `safeTxGas`, `baseGas`, or `gasPrice`, you must use the type `string` instead of `number`.

[Messages](/sdk/protocol-kit/guides/signatures/messages "Messages")[Migrate to v2](/sdk/protocol-kit/guides/migrate-to-v2 "Migrate to v2")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v1
  - Adding the new dependency
  - EthAdapter
    - EthersAdapter(safe-ethers-lib)
    - Web3Adapter(safe-web3-lib)
    - Type changes
  - safeFactory.deploySafe()
  - getAddress()
  - General type changes

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [Messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [Migrate to v2](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

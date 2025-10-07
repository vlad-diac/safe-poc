---
title: extend – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# extend – Safe Docs

Starter Kit Reference

SafeClient

extend

# `extend`

Extends the functionality of the `SafeClient` class.

The Starter Kit offers some extensions that allow this, but you can also implement your own.

- [`onChainMessages`](/reference-sdk-starter-kit/onchain-messages): Enables the use of on-chain messages.
- [`offChainMessages`](/reference-sdk-starter-kit/offchain-messages): Enables the use of off-chain messages.
- [`safeOperations`](/reference-sdk-starter-kit/safe-operations): Enables using a bundler and paymaster to submit ERC-4337 user operations.

## Usage



safe-operations.tscustom-feature.tssetup.ts

`_10

import { safeOperations } from '@safe-global/sdk-starter-kit'

_10

import { safeClient } from './setup.ts'

_10

_10

const safeOperationClient = await safeClient.extend(

_10

safeOperations({ bundlerUrl }, { isSponsored, paymasterUrl })

_10

)

_10

_10

const safeOperationResult = await safeOperationClient.sendSafeOperation({

_10

transactions

_10

})`

## Returns

`Promise<SafeClient & T> | SafeClient & T`

The `SafeClient` with the added functionality.

## Parameters

### `extendFunction`

- **Type:** `(client: SafeClient) => Promise<T> | (client: SafeClient) => T`

The extension function that receives the current `SafeClient` class and merges it with the added functionality.

`_10

const safeMessageClient = safeClient.extend(

_10

offChainMessages()

_10

)`

[createSwapOwnerTransaction](/reference-sdk-starter-kit/safe-client/createswapownertransaction "createSwapOwnerTransaction")[getAddress](/reference-sdk-starter-kit/safe-client/getaddress "getAddress")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- extend
  - Usage
  - Returns
  - Parameters
    - extendFunction

---

## Related Links

### Internal Links

- [onChainMessages](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages)
- [offChainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)
- [safeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend](https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend](https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend](https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend](https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend)
- [createSwapOwnerTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction)
- [getAddress](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getaddress)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

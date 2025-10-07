---
title: createSwapOwnerTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createSwapOwnerTransaction – Safe Docs

Starter Kit Reference

SafeClient

createSwapOwnerTransaction

# `createSwapOwnerTransaction`

Creates a Safe transaction to swap an owner of the connected Safe.

## Usage



example.tssetup.ts

`_10

import { safeClient } from './setup.ts'

_10

_10

const transaction = await safeClient.createSwapOwnerTransaction({

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

})

_10

_10

const txResult = await safeClient.send({

_10

transactions: [transaction]

_10

})`

## Returns

`Promise<TransactionBase>`

The Safe transaction to swap an owner of the connected Safe.

## Parameters

### `oldOwnerAddress`

- **Type:** `string`

The address to remove as an owner.

`_10

const transaction = await safeClient.createSwapOwnerTransaction({

_10

oldOwnerAddress: '0x...'

_10

})`

### `newOwnerAddress` (Optional)

- **Type:** `string`

The address to add as an owner.

`_10

const transaction = await safeClient.createSwapOwnerTransaction({

_10

oldOwnerAddress: '0x...',

_10

newOwnerAddress: '0x...'

_10

})`

[createRemoveOwnerTransaction](/reference-sdk-starter-kit/safe-client/createremoveownertransaction "createRemoveOwnerTransaction")[extend](/reference-sdk-starter-kit/safe-client/extend "extend")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createSwapOwnerTransaction
  - Usage
  - Returns
  - Parameters
    - oldOwnerAddress
    - newOwnerAddress(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createswapownertransaction)
- [createRemoveOwnerTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createremoveownertransaction)
- [extend](https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

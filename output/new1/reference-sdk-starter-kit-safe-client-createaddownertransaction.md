---
title: createAddOwnerTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createAddOwnerTransaction – Safe Docs

Starter Kit Reference

SafeClient

createAddOwnerTransaction

# `createAddOwnerTransaction`

Creates a Safe transaction to add an owner to the connected Safe.

## Usage



example.tssetup.ts

`_10

import { safeClient } from './setup.ts'

_10

_10

const transaction = await safeClient.createAddOwnerTransaction({

_10

ownerAddress: '0x...',

_10

threshold: 2

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

The Safe transaction to add an owner to the connected Safe.

## Parameters

### `ownerAddress`

- **Type:** `string`

The address to add as an owner.

`_10

const transaction = await safeClient.createAddOwnerTransaction({

_10

ownerAddress: '0x...'

_10

})`

### `threshold` (Optional)

- **Type:** `string`

The new threshold of the connected Safe. If not provided, the current threshold is used.

`_10

const transaction = await safeClient.createAddOwnerTransaction({

_10

ownerAddress: '0x...',

_10

threshold: 2

_10

})`

[confirm](/reference-sdk-starter-kit/safe-client/confirm "confirm")[createChangeThresholdTransaction](/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction "createChangeThresholdTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createAddOwnerTransaction
  - Usage
  - Returns
  - Parameters
    - ownerAddress
    - threshold(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction)
- [confirm](https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm)
- [createChangeThresholdTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

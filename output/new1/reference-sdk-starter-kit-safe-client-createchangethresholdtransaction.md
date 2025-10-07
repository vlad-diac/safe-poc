---
title: createChangeThresholdTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createChangeThresholdTransaction – Safe Docs

Starter Kit Reference

SafeClient

createChangeThresholdTransaction

# `createChangeThresholdTransaction`

Creates a Safe transaction to change the threshold of the connected Safe.

## Usage



example.tssetup.ts

`_10

import { safeClient } from './setup.ts'

_10

_10

const transaction = await safeClient.createChangeThresholdTransaction({

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

The Safe transaction to change the threshold of the connected Safe.

## Parameters

### `threshold`

- **Type:** `string`

The new threshold of the connected Safe. If not provided, the current threshold is used.

`_10

const transaction = await safeClient.createChangeThresholdTransaction({

_10

threshold

_10

})`

[createAddOwnerTransaction](/reference-sdk-starter-kit/safe-client/createaddownertransaction "createAddOwnerTransaction")[createRemoveOwnerTransaction](/reference-sdk-starter-kit/safe-client/createremoveownertransaction "createRemoveOwnerTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createChangeThresholdTransaction
  - Usage
  - Returns
  - Parameters
    - threshold

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createchangethresholdtransaction)
- [createAddOwnerTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction)
- [createRemoveOwnerTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createremoveownertransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

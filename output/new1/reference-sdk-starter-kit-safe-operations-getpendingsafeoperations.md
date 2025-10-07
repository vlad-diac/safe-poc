---
title: getPendingSafeOperations – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getPendingSafeOperations – Safe Docs

Starter Kit Reference

[safeOperations](/reference-sdk-starter-kit/safe-operations)

getPendingSafeOperations

# `getPendingSafeOperations`

Returns the pending Safe operations for the connected Safe account.

## Usage



example.tssetup.ts

`_10

import { safeOperationsClient } from './setup.ts'

_10

_10

const pendingSafeOperations = await safeOperationsClient.getPendingSafeOperations()`

## Returns

`Promise<GetSafeOperationListResponse>`

The paginated list of pending Safe operations for the connected Safe account.

[confirmSafeOperation](/reference-sdk-starter-kit/safe-operations/confirmsafeoperation "confirmSafeOperation")[offchainMessages](/reference-sdk-starter-kit/offchain-messages "offchainMessages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getPendingSafeOperations
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [safeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations)
- [confirmSafeOperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation)
- [offchainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

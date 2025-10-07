---
title: getPendingTransactions – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/getpendingtransactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getPendingTransactions – Safe Docs

Starter Kit Reference

SafeClient

getPendingTransactions

# `getPendingTransactions`

Returns the list of pending transactions from a Safe that require confirmation before they become executable.

## Usage



example.tssetup.ts

`_10

import { safeClient } from './setup.ts'

_10

_10

const pendingTransactions = await safeClient.getPendingTransactions()`

## Returns

`Promise<SafeMultisigConfirmationListResponse>`

The paginated list of the pending transactions.

[getOwnersWhoApprovedTransaction](/reference-sdk-starter-kit/safe-client/getownerswhoapprovedtransaction "getOwnersWhoApprovedTransaction")[getThreshold](/reference-sdk-starter-kit/safe-client/getthreshold "getThreshold")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getPendingTransactions
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/getpendingtransactions](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getpendingtransactions)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/getpendingtransactions](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getpendingtransactions)
- [getOwnersWhoApprovedTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getownerswhoapprovedtransaction)
- [getThreshold](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getthreshold)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

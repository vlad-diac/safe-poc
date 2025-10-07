---
title: getOwners – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/getowners
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getOwners – Safe Docs

Starter Kit Reference

SafeClient

getOwners

# `getOwners`

Returns the list of owners of the connected Safe.

## Usage



example.tssetup.ts

`_10

import { safeClient } from './setup.ts'

_10

_10

const owners = await safeClient.getOwners()`

## Returns

`Promise<string[]>`

The list of owners of the connected Safe.

[getNonce](/reference-sdk-starter-kit/safe-client/getnonce "getNonce")[getOwnersWhoApprovedTransaction](/reference-sdk-starter-kit/safe-client/getownerswhoapprovedtransaction "getOwnersWhoApprovedTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getOwners
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/getowners](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getowners)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/getowners](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getowners)
- [getNonce](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getnonce)
- [getOwnersWhoApprovedTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/getownerswhoapprovedtransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

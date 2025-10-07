---
title: getOwners – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getowners
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getOwners – Safe Docs

Protocol Kit Reference

Safe Configuration

getOwners

# `getOwners`

Returns the list of Safe owners.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const ownerAddresses = await protocolKit.getOwners()`

## Returns

`Promise<string[]>`

The list of Safe owners.

[getNonce](/reference-sdk-protocol-kit/safe-info/getnonce "getNonce")[getOwnersWhoApprovedTx](/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx "getOwnersWhoApprovedTx")

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

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getowners](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getowners)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getowners](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getowners)
- [getNonce](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getnonce)
- [getOwnersWhoApprovedTx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

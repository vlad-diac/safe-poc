---
title: getOwnersWhoApprovedTx – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getOwnersWhoApprovedTx – Safe Docs

Protocol Kit Reference

Safe Configuration

getOwnersWhoApprovedTx

# `getOwnersWhoApprovedTx`

Returns a list of owners who approved a given Safe transaction.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const safeTransactionHash = '0x...'

_10

_10

const ownerAddresses = await protocolKit.getOwnersWhoApprovedTx(

_10

safeTransactionHash

_10

)`

## Parameters

### `safeTransactionHash`

- **Type**: `string`

The Safe transaction hash of a Safe transaction.

`_10

const ownerAddresses = await protocolKit.getOwnersWhoApprovedTx(

_10

'0x...'

_10

)`

## Returns

`Promise<string[]>`

The list of owners who approved a given Safe transaction.

[getOwners](/reference-sdk-protocol-kit/safe-info/getowners "getOwners")[getThreshold](/reference-sdk-protocol-kit/safe-info/getthreshold "getThreshold")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getOwnersWhoApprovedTx
  - Usage
  - Parameters
    - safeTransactionHash
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getownerswhoapprovedtx)
- [getOwners](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getowners)
- [getThreshold](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getthreshold)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

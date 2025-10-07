---
title: isOwner – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isOwner – Safe Docs

Protocol Kit Reference

Safe Configuration

isOwner

# `isOwner`

Checks if a given address is an owner of the connected Safe.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const address = '0x...'

_10

_10

const isOwner = await protocolKit.isOwner(address)`

## Parameters

### `address`

- **Type**: `string`

The address to check.

`_10

const isOwner = await protocolKit.isOwner(

_10

'0x...'

_10

)`

## Returns

`Promise<string>`

The boolean value that indicates if the address is an owner of the Safe.

[getThreshold](/reference-sdk-protocol-kit/safe-info/getthreshold "getThreshold")[copyTransaction](/reference-sdk-protocol-kit/transactions/copytransaction "copyTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isOwner
  - Usage
  - Parameters
    - address
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/isowner)
- [getThreshold](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getthreshold)
- [copyTransaction](https://docs.safe.global/reference-sdk-protocol-kit/transactions/copytransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: isOwner – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isOwner – Safe Docs

Starter Kit Reference

SafeClient

isOwner

# `isOwner`

Checks if a given address is an owner of the connected Safe.

## Usage



example.tssetup.ts

`_10

import { safeClient } from './setup.ts'

_10

_10

const address = '0x...'

_10

_10

const isOwner = await safeClient.isOwner(address)`

## Returns

`Promise<boolean>`

The boolean value that indicates if the given address is an owner of the connected Safe.

## Parameters

### `address`

- **Type:** `string`

The address to check if it is an owner of the Safe.

`_10

const isOwner = await safeClient.isOwner(

_10

'0x...'

_10

)`

[isDeployed](/reference-sdk-starter-kit/safe-client/isdeployed "isDeployed")[send](/reference-sdk-starter-kit/safe-client/send "send")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isOwner
  - Usage
  - Returns
  - Parameters
    - address

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner](https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner](https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner](https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner](https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner)
- [isDeployed](https://docs.safe.global/reference-sdk-starter-kit/safe-client/isdeployed)
- [send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: addMessageSignature – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/addmessagesignature
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# addMessageSignature – Safe Docs

API Kit Reference

addMessageSignature

# `addMessageSignature`

Adds a signature to an existing message.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeMessageHash = '0x...'

_10

_10

const signature = '0x...'

_10

_10

await apiKit.addMessageSignature(safeMessageHash, signature)`

## Parameters

### `safeMessageHash`

- **Type:** `string`

The Safe message hash.

`_10

await apiKit.addMessageSignature(

_10

'0x...',

_10

'0x...'

_10

)`

### `signature`

- **Type:** `string`

The signature.

`_10

await apiKit.addMessageSignature(

_10

'0x...',

_10

'0x...'

_10

)`

[addMessage](/reference-sdk-api-kit/addmessage "addMessage")[getSafeOperationsByAddress](/reference-sdk-api-kit/getsafeoperationsbyaddress "getSafeOperationsByAddress")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- addMessageSignature
  - Usage
  - Parameters
    - safeMessageHash
    - signature

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/addmessagesignature](https://docs.safe.global/reference-sdk-api-kit/addmessagesignature)
- [https://docs.safe.global/reference-sdk-api-kit/addmessagesignature](https://docs.safe.global/reference-sdk-api-kit/addmessagesignature)
- [https://docs.safe.global/reference-sdk-api-kit/addmessagesignature](https://docs.safe.global/reference-sdk-api-kit/addmessagesignature)
- [https://docs.safe.global/reference-sdk-api-kit/addmessagesignature](https://docs.safe.global/reference-sdk-api-kit/addmessagesignature)
- [addMessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)
- [getSafeOperationsByAddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

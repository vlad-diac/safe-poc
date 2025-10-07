---
title: getSafeOperation – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafeoperation
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeOperation – Safe Docs

API Kit Reference

getSafeOperation

# `getSafeOperation`

Returns a Safe operation by its hash.

ℹ️

The SafeOperations methods are currently compatible with Entrypoint v0.6, which corresponds to `safeModuleVersion` v0.2.0. If you need to use v0.7, you should use the `relay-kit` `Safe4337Pack` class with `safeModuleVersion` v0.3.0, and collect the signatures yourself.

Examples of how to use the `Safe4337Pack` are provided in the following links:

- [Playgrounds (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Guide (opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const safeOperationHash = '0x...'

_10

_10

const safeOperation = await apiKit.getSafeOperation(safeOperationHash)`

## Returns

`Promise<SafeOperationResponse>`

The Safe operation.

## Parameters

### `safeOperationHash`

- **Type:** `string`

The Safe operation hash.

`_10

const safeOperation = await apiKit.getSafeOperation(

_10

'0x...'

_10

)`

[getPendingSafeOperations](/reference-sdk-api-kit/getpendingsafeoperations "getPendingSafeOperations")[addSafeOperation](/reference-sdk-api-kit/addsafeoperation "addSafeOperation")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeOperation
  - Usage
  - Returns
  - Parameters
    - safeOperationHash

---

## Related Links

### Internal Links

- [Guide(opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperation](https://docs.safe.global/reference-sdk-api-kit/getsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperation](https://docs.safe.global/reference-sdk-api-kit/getsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperation](https://docs.safe.global/reference-sdk-api-kit/getsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperation](https://docs.safe.global/reference-sdk-api-kit/getsafeoperation)
- [getPendingSafeOperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [addSafeOperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)

### External Links

- [Playgrounds(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

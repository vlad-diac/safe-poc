---
title: confirmSafeOperation – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# confirmSafeOperation – Safe Docs

API Kit Reference

confirmSafeOperation

# `confirmSafeOperation`

Adds a confirmation for a Safe operation. Once enough confirmations are collected, the Safe operation needs to be executed via the `executeTransaction` method from the `Safe4337Pack`.

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

const signature = '0x...'

_10

_10

await apiKit.confirmSafeOperation(safeOperationHash, signature)`

## Parameters

### `safeOperationHash`

- **Type:** `string`

The hash of the Safe operation that will be confirmed.

`_10

await apiKit.confirmSafeOperation(

_10

'0x...',

_10

'0x...'

_10

)`

### `signature`

- **Type:** `string`

The signature of the Safe operation.

It can be obtained by calling the `getSignature` method from the `SafeOperation` object.

`_10

await apiKit.confirmSafeOperation(

_10

'0x...',

_10

'0x...'

_10

)`

[getSafeOperationConfirmations](/reference-sdk-api-kit/getsafeoperationconfirmations "getSafeOperationConfirmations")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- confirmSafeOperation
  - Usage
  - Parameters
    - safeOperationHash
    - signature

---

## Related Links

### Internal Links

- [Guide(opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)
- [https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation](https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation](https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation](https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation](https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation)
- [getSafeOperationConfirmations](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations)

### External Links

- [Playgrounds(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

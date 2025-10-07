---
title: getSafeOperationConfirmations – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeOperationConfirmations – Safe Docs

API Kit Reference

getSafeOperationConfirmations

# `getSafeOperationConfirmations`

Returns the list of confirmations for a given a Safe operation.

ℹ️

The SafeOperations methods are currently compatible with Entrypoint v0.6, which corresponds to `safeModuleVersion` v0.2.0. If you need to use v0.7, you should use the `relay-kit` `Safe4337Pack` class with `safeModuleVersion` v0.3.0, and collect the signatures yourself.

Examples of how to use the `Safe4337Pack` are provided in the following links:

- [Playgrounds (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Guide (opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)

## Usage



example.tssetup.ts

`_14

import { ListOptions } from '@safe-global/api-kit'

_14

import { apiKit } from './setup.ts'

_14

_14

const safeOperationHash = '0x...'

_14

_14

const config: ListOptions = {

_14

limit: '3', // Optional

_14

offset: '2' // Optional

_14

}

_14

_14

const confirmationsResponse = await apiKit.getSafeOperationConfirmations(

_14

safeOperationHash,

_14

config

_14

)`

## Returns

`Promise<SafeOperationConfirmationListResponse>`

The paginated list of confirmations.

## Parameters

### `safeOperationHash`

- **Type:** `string`

The hash of the Safe operation to get confirmations for.

`_10

const confirmationsResponse = await apiKit.getSafeOperationConfirmations(

_10

'0x...'

_10

)`

### `config.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

`_10

const confirmationsResponse = await apiKit.getSafeOperationConfirmations(

_10

'0x...',

_10

{

_10

limit: 10

_10

}

_10

)`

### `config.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

`_10

const confirmationsResponse = await apiKit.getSafeOperationConfirmations(

_10

'0x...',

_10

{

_10

offset: 50

_10

}

_10

)`

[addSafeOperation](/reference-sdk-api-kit/addsafeoperation "addSafeOperation")[confirmSafeOperation](/reference-sdk-api-kit/confirmsafeoperation "confirmSafeOperation")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeOperationConfirmations
  - Usage
  - Returns
  - Parameters
    - safeOperationHash
    - config.limit(Optional)
    - config.offset(Optional)

---

## Related Links

### Internal Links

- [Guide(opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationconfirmations)
- [addSafeOperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [confirmSafeOperation](https://docs.safe.global/reference-sdk-api-kit/confirmsafeoperation)

### External Links

- [Playgrounds(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

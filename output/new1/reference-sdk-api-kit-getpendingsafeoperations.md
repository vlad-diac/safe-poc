---
title: getPendingSafeOperations – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getPendingSafeOperations – Safe Docs

API Kit Reference

getPendingSafeOperations

# `getPendingSafeOperations`

Returns the list of Safe operations which are pending to be executed through a bundler.

ℹ️

The SafeOperations methods are currently compatible with Entrypoint v0.6, which corresponds to `safeModuleVersion` v0.2.0. If you need to use v0.7, you should use the `relay-kit` `Safe4337Pack` class with `safeModuleVersion` v0.3.0, and collect the signatures yourself.

Examples of how to use the `Safe4337Pack` are provided in the following links:

- [Playgrounds (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Guide (opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)

## Usage



example.tssetup.ts

`_11

import { GetSafeOperationListProps } from '@safe-global/api-kit'

_11

import { apiKit } from './setup.ts'

_11

_11

const safeAddress = '0x...'

_11

const options: GetPendingSafeOperationListOptions = {

_11

ordering: 'created', // Optional

_11

limit: '10', // Optional

_11

offset: '50' // Optional

_11

}

_11

_11

const safeOperationsResponse = await apiKit.getPendingSafeOperations(safeAddress, options)`

## Returns

`Promise<GetSafeOperationListResponse>`

The paginated list of Safe operations.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const safeOperationsResponse = await apiKit.getPendingSafeOperations({

_10

safeAddress: '0x...'

_10

})`

### `options.ordering` (Optional)

- **Type:** `string`
- **Default:** `-user_operation__nonce`

The field used when ordering the results.

Can be one of: `-user_operation__nonce`, `-created`, `created`.

`_10

const safeOperationsResponse = await apiKit.getPendingSafeOperations(

_10

{

_10

safeAddress: '0x...',

_10

ordering: 'created'

_10

}

_10

)`

### `options.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

`_10

const safeOperationsResponse = await apiKit.getPendingSafeOperations(

_10

{

_10

safeAddress: '0x...',

_10

limit: 10

_10

}

_10

)`

### `options.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

`_10

const safeOperationsResponse = await apiKit.getPendingSafeOperations(

_10

{

_10

safeAddress: '0x...',

_10

offset: 50

_10

}

_10

)`

[getSafeOperationsByAddress](/reference-sdk-api-kit/getsafeoperationsbyaddress "getSafeOperationsByAddress")[getSafeOperation](/reference-sdk-api-kit/getsafeoperation "getSafeOperation")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getPendingSafeOperations
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - options.ordering(Optional)
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [Guide(opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)
- [getSafeOperationsByAddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [getSafeOperation](https://docs.safe.global/reference-sdk-api-kit/getsafeoperation)

### External Links

- [Playgrounds(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

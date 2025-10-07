---
title: getSafeOperationsByAddress – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeOperationsByAddress – Safe Docs

API Kit Reference

getSafeOperationsByAddress

# `getSafeOperationsByAddress`

Returns the list of Safe operations associated to a Safe account.

ℹ️

The SafeOperations methods are currently compatible with Entrypoint v0.6, which corresponds to `safeModuleVersion` v0.2.0. If you need to use v0.7, you should use the `relay-kit` `Safe4337Pack` class with `safeModuleVersion` v0.3.0, and collect the signatures yourself.

Examples of how to use the `Safe4337Pack` are provided in the following links:

- [Playgrounds (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Guide (opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)

## Usage



example.tssetup.ts

`_13

import { GetSafeOperationListProps } from '@safe-global/api-kit'

_13

import { apiKit } from './setup.ts'

_13

_13

const safeAddress = '0x...'

_13

const options: GetSafeOperationListOptions = {

_13

executed: false, // Optional,

_13

hasConfirmations: true, // Optional,

_13

ordering: 'created', // Optional

_13

limit: '10', // Optional

_13

offset: '50' // Optional

_13

}

_13

_13

const safeOperationsResponse = await apiKit.getSafeOperationsByAddress(safeAddress, options)`

## Returns

`Promise<GetSafeOperationListResponse>`

The paginated list of Safe operations.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const safeOperationsResponse = await apiKit.getSafeOperationsByAddress({

_10

safeAddress: '0x...'

_10

})`

### `options.executed` (Optional)

- **Type:** `boolean`

When `true` it will return the Safe operations whose associated User Operation was already executed in the bundler.
When `false` it will return the Safe operations that are pending to execute.

If omitted, it will return all the Safe operations.

`_10

const safeOperationsResponse = await apiKit.getSafeOperationsByAddress(

_10

{

_10

safeAddress: '0x...',

_10

executed: true,

_10

ordering: 'created'

_10

}

_10

)`

### `options.hasConfirmations` (Optional)

- **Type:** `string`

When `true` it will return the Safe operations that have confirmations from any owner.
When `false` it will return the Safe operations that don't have confirmations.

If omitted, it will return all the Safe operations.

`_10

const safeOperationsResponse = await apiKit.getSafeOperationsByAddress(

_10

{

_10

safeAddress: '0x...',

_10

hasConfirmations: true,

_10

ordering: 'created'

_10

}

_10

)`

### `options.ordering` (Optional)

- **Type:** `string`
- **Default:** `-user_operation__nonce`

The field used when ordering the results.

Can be one of: `-user_operation__nonce`, `-created`, `created`.

`_10

const safeOperationsResponse = await apiKit.getSafeOperationsByAddress(

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

const safeOperationsResponse = await apiKit.getSafeOperationsByAddress(

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

const safeOperationsResponse = await apiKit.getSafeOperationsByAddress(

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

[addMessageSignature](/reference-sdk-api-kit/addmessagesignature "addMessageSignature")[getPendingSafeOperations](/reference-sdk-api-kit/getpendingsafeoperations "getPendingSafeOperations")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeOperationsByAddress
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - options.executed(Optional)
    - options.hasConfirmations(Optional)
    - options.ordering(Optional)
    - options.limit(Optional)
    - options.offset(Optional)

---

## Related Links

### Internal Links

- [Guide(opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress](https://docs.safe.global/reference-sdk-api-kit/getsafeoperationsbyaddress)
- [addMessageSignature](https://docs.safe.global/reference-sdk-api-kit/addmessagesignature)
- [getPendingSafeOperations](https://docs.safe.global/reference-sdk-api-kit/getpendingsafeoperations)

### External Links

- [Playgrounds(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

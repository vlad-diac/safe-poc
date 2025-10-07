---
title: getTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getTransaction – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

getTransaction

# `getTransaction`

Returns a transaction by its Safe transaction hash or Ethereum transaction hash.

## Usage



example.tsx

`_20

import { useSafe } from '@safe-global/safe-react-hooks'

_20

_20

function TransactionStatus({ safeTxHash, ethereumTxHash }) {

_20

const { getTransaction } = useSafe()

_20

const {

_20

data,

_20

// ...

_20

} = getTransaction({

_20

safeTxHash // Optional

_20

// ethereumTxHash // Optional

_20

})

_20

_20

return (

_20

<>

_20

{data && JSON.stringify(data)}

_20

</>

_20

)

_20

}

_20

_20

export default TransactionStatus`

## Parameters

`UseTransactionParams`

Parameters to customize the hook behavior. Either `safeTxHash` or `ethereumTxHash` must be provided.

`_10

import { UseTransactionParams } from '@safe-global/safe-react-hooks'`

### `safeTxHash` (Optional)

- **Type**: `string`

Hash of the Safe transaction to be fetched.

`_10

const result = getTransaction({

_10

safeTxHash: '0x...'

_10

})`

### `ethereumTxHash` (Optional)

- **Type**: `string`

Hash of the Ethereum transaction to be fetched.

`_10

const result = getTransaction({

_10

ethereumTxHash: '0x...'

_10

})`

### `config` (Optional)

- **Type**: `SafeConfig`

The configuration used instead of the one from the nearest [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).



index.tsxconfig.ts

`_10

import { config } from './config.ts'

_10

_10

const result = getTransaction({

_10

safeTxHash: '0x...',

_10

config

_10

})`

## Returns

`UseTransactionReturnType<Params>`

`_10

import { UseTransactionReturnType } from '@safe-global/safe-react-hooks'`

[TanStack Query documentation (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery)

### `data`

- **Type**: [`SafeMultisigTransactionResponse` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L208-L239) | [`UseTransactionReturnTypeWagmi` (opens in a new tab)](https://github.com/safe-global/safe-react-hooks/blob/a0b08e3392e69e2bcf704bc64bae564e989ced8a/src/hooks/useTransaction.ts#L17)
- **Default**: `undefined`

The last successfully resolved data for the query.

If `safeTxHash` is provided, it returns the [`SafeMultisigTransactionResponse` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L208-L239) type.

If `ethereumTxHash` is provided, it returns the [`UseTransactionReturnTypeWagmi` (opens in a new tab)](https://github.com/safe-global/safe-react-hooks/blob/a0b08e3392e69e2bcf704bc64bae564e989ced8a/src/hooks/useTransaction.ts#L17) type.

### `dataUpdatedAt`

- **Type**: `number`

The timestamp for when the query most recently returned the `status` as `'success'`.

### `error`

- **Type**: `null | TError`
- **Default**: `null`

The error object for the query, if an error was thrown.

### `errorUpdatedAt`

- **Type**: `number`

The timestamp for when the query most recently returned the `status` as `'error'`.

### `errorUpdateCount`

- **Type**: `number`

The sum of all errors.

### `failureCount`

- **Type**: `number`

The failure count for the query.

Incremented every time the query fails.

Reset to `0` when the query succeeds.

### `failureReason`

- **Type**: `null | TError`

The failure reason for the query retry.

Reset to `null` when the query succeeds.

### `fetchStatus`

- **Type**: `'fetching' | 'idle' | 'paused'`

`fetching` Is true whenever the `queryFn` is executing, which includes initial pending as well as background refetches.

`paused` The query wanted to fetch, but has been paused.

`idle` The query is not fetching.

See [Network Mode (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode) for more information.

### `isError` / `isPending` / `isSuccess`

- **Type**: `boolean`

The boolean variables derived from `status`.

### `isFetched`

- **Type**: `boolean`

Will be true if the query has been fetched.

### `isFetchedAfterMount`

- **Type**: `boolean`

Will be `true` if the query has been fetched after the component mounted.

This property can be used to not show any previously cached data.

### `isFetching` / `isPaused`

- **Type**: `boolean`

The boolean variables derived from `fetchStatus`.

### `isLoading`

- **Type**: `boolean`

Is `true` whenever the first fetch for a query is in-flight.

Is the same as `isFetching && !isPending`.

### `isLoadingError`

- **Type**: `boolean`

Will be `true` if the query failed while fetching for the first time.

### `isPlaceholderData`

- **Type**: `boolean`

Will be `true` if the data shown is the placeholder data.

### `isRefetchError`

- **Type**: `boolean`

Will be `true` if the query failed while refetching.

### `isRefetching`

- **Type**: `boolean`

Is `true` whenever a background refetch is in-flight, which does not include initial `'pending'`.

Is the same as `isFetching && !isPending`.

### `isStale`

- **Type**: `boolean`

Will be `true` if the data in the cache is invalidated or if the data is older than the given `staleTime`.

### `refetch`

- **Type**: `(options: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>`

A function to manually refetch the query.

- `throwOnError`
  - When set to `true`, an error will be thrown if the query fails.
  - When set to `false`, an error will be logged if the query fails.
- `cancelRefetch`
  - When set to `true`, a currently running request will be cancelled before a new request is made.
  - When set to `false`, no refetch will be made if there is already a request running.
  - Defaults to `true`

### `status`

- **Type**: `'error' | 'pending' | 'success'`

`pending` if there's no cached data and no query attempt was finished yet.

`error` if the query attempt resulted in an error. The corresponding `error` property has the error received from the attempted fetch.

`success` if the query has received a response with no errors and is ready to display its data. The corresponding `data` property on the query is the data received from the successful fetch or if the query's `enabled` property is set to `false` and has not been fetched yet `data` is the first `initialData` supplied to the query on initialization.

[getSignerAddress](/reference-sdk-react-hooks/usesafe/getsigneraddress "getSignerAddress")[getTransactions](/reference-sdk-react-hooks/usesafe/gettransactions "getTransactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getTransaction
  - Usage
  - Parameters
    - safeTxHash(Optional)
    - ethereumTxHash(Optional)
    - config(Optional)
  - Returns
    - data
    - dataUpdatedAt
    - error
    - errorUpdatedAt
    - errorUpdateCount
    - failureCount
    - failureReason
    - fetchStatus
    - isError/isPending/isSuccess
    - isFetched
    - isFetchedAfterMount
    - isFetching/isPaused
    - isLoading
    - isLoadingError
    - isPlaceholderData
    - isRefetchError
    - isRefetching
    - isStale
    - refetch
    - status

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)

### External Links

- [TanStack Query documentation(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery)
- [SafeMultisigTransactionResponse(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [UseTransactionReturnTypeWagmi(opens in a new tab)](https://github.com/safe-global/safe-react-hooks/blob/a0b08e3392e69e2bcf704bc64bae564e989ced8a/src/hooks/useTransaction.ts)
- [SafeMultisigTransactionResponse(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [UseTransactionReturnTypeWagmi(opens in a new tab)](https://github.com/safe-global/safe-react-hooks/blob/a0b08e3392e69e2bcf704bc64bae564e989ced8a/src/hooks/useTransaction.ts)
- [Network Mode(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

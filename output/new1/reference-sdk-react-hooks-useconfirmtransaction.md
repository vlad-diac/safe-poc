---
title: useConfirmTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# useConfirmTransaction – Safe Docs

React Hooks Reference

useConfirmTransaction

# `useConfirmTransaction`

Confirms a pending multi-signature transaction shared via the Safe Transaction Service.

## Usage

- If the number of signatures collected in the Safe Transaction Service for a given Safe transaction hash hasn't met the `threshold`, it adds the signature from the connected signer.
- If the number of collected signatures reaches the `threshold`, it executes the Safe transaction.

This function is only relevant for Safes with their `threshold` greater than `1`.



App.tsxmain.tsx

`_24

import { useConfirmTransaction, ConfirmTransactionVariables } from '@safe-global/safe-react-hooks'

_24

_24

function App() {

_24

const {

_24

confirmTransaction,

_24

data,

_24

// ...

_24

} = useConfirmTransaction()

_24

_24

const confirmTransactionParams: ConfirmTransactionVariables = {

_24

safeTxHash: '0x...'

_24

}

_24

_24

return (

_24

<>

_24

<button onClick={() => confirmTransaction(confirmTransactionParams)}>

_24

Confirm Transaction

_24

</button>

_24

{data && JSON.stringify(data)}

_24

</>

_24

)

_24

}

_24

_24

export default App`

## Parameters

`UseConfirmTransactionParams`

Parameters to customize the hook behavior.

`_10

import { UseConfirmTransactionParams } from '@safe-global/safe-react-hooks'`

### `config` (Optional)

- **Type**: `SafeConfigWithSigner`

The configuration used instead of the one from the nearest [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).



index.tsxconfig.ts

`_10

import { config } from './config.ts'

_10

_10

const result = useConfirmTransaction({

_10

config

_10

})`

## Returns

`UseConfirmTransactionReturnType`

`_10

import { UseConfirmTransactionReturnType } from '@safe-global/safe-react-hooks'`

[TanStack Query mutation documentation (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### `confirmTransaction`

- **Type**: `UseMutateFunction<SafeClientResult, Error, ConfirmTransactionVariables, unknown>`

Function to confirm a Safe transaction from the connected Safe.

#### Parameters

`ConfirmTransactionVariables`

`_10

import { ConfirmTransactionVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useconfirmtransaction#data) property.

### `confirmTransactionAsync`

- **Type**: `UseMutateAsyncFunction<SafeClientResult, Error, ConfirmTransactionVariables, unknown>`

Asynchronous function to confirm a Safe transaction from the connected Safe.

#### Parameters

`ConfirmTransactionVariables`

`_10

import { ConfirmTransactionVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useconfirmtransaction#data) property.

### `data`

- **Type**: [`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)
- **Default**: `undefined`

The last successfully resolved data for the mutation.

### `error`

- **Type**: `null | TError`
- **Default**: `null`

The error object for the mutation, if an error was encountered.

### `failureCount`

- **Type**: `number`

The failure count for the mutation.

Incremented every time the mutation fails.

Reset to `0` when the mutation succeeds.

### `failureReason`

- **Type**: `null | TError`

The failure reason for the mutation retry.

Reset to `null` when the mutation succeeds.

### `isError` / `isIdle` / `isPending` / `isSuccess`

- **Type**: `boolean`

The boolean variables derived from `status`.

### `isPaused`

- **Type**: `boolean`

Will be `true` if the mutation has been `paused`.

See [Network Mode (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode) for more information.

### `reset`

- **Type**: `() => void`

A function to clean the mutation internal state (for example, it resets the mutation to its initial state).

### `status`

- **Type**: `'idle' | 'pending' | 'error' | 'success'`

`'idle'` initial status prior to the mutation function executing.

`'pending'` if the mutation is currently executing.

`'error'` if the last mutation attempt resulted in an error.

`'success'` if the last mutation attempt was successful.

### `submittedAt`

- **Type**: `number`
- **Default**: `0`

The timestamp for when the mutation was submitted.

### `variables`

- **Type**: `ConfirmTransactionVariables`
- **Default**: `undefined`

The `variables` object passed to the mutation function.

[createConfig](/reference-sdk-react-hooks/createconfig "createConfig")[useSafe](/reference-sdk-react-hooks/usesafe "useSafe")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- useConfirmTransaction
  - Usage
  - Parameters
    - config(Optional)
  - Returns
    - confirmTransaction
      - Parameters
      - Returns
    - confirmTransactionAsync
      - Parameters
      - Returns
    - data
    - error
    - failureCount
    - failureReason
    - isError/isIdle/isPending/isSuccess
    - isPaused
    - reset
    - status
    - submittedAt
    - variables

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)

### External Links

- [TanStack Query mutation documentation(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [Network Mode(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

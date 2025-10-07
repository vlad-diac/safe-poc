---
title: useUpdateThreshold – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# useUpdateThreshold – Safe Docs

React Hooks Reference

useUpdateThreshold

# `useUpdateThreshold`

Executes a Safe transaction to update the threshold of the Safe connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

## Usage

- If the `threshold` of the connected Safe is greater than `1`, it creates the Safe transaction and submits it to the Safe Transaction Service to collect the signatures from the Safe owners.
- If the `threshold` of the connected Safe is `1`, it executes the Safe transaction.

The connected Safe must be already deployed.



App.tsxmain.tsx

`_24

import { useUpdateThreshold, UpdateThresholdVariables } from '@safe-global/safe-react-hooks'

_24

_24

function App() {

_24

const {

_24

updateThreshold,

_24

data,

_24

// ...

_24

} = useUpdateThreshold()

_24

_24

const updateThresholdParams: UpdateThresholdVariables = {

_24

threshold: 3

_24

}

_24

_24

return (

_24

<>

_24

<button onClick={() => updateThreshold(updateThresholdParams)}>

_24

Update Threshold

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

`UseUpdateThresholdParams`

Parameters to customize the hook behavior.

`_10

import { UseUpdateThresholdParams } from '@safe-global/safe-react-hooks'`

### `config` (Optional)

- **Type**: `SafeConfigWithSigner`

The configuration used instead of the one from the nearest [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).



index.tsxconfig.ts

`_10

import { config } from './config.ts'

_10

_10

const result = useUpdateThreshold({

_10

config

_10

})`

## Returns

`UseUpdateThresholdReturnType`

`_10

import { UseUpdateThresholdReturnType } from '@safe-global/safe-react-hooks'`

[TanStack Query mutation documentation (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### `updateThreshold`

- **Type**: `UseMutateFunction<SafeClientResult, Error, UpdateThresholdVariables, unknown>`

Function to update the threshold of the connected Safe.

#### Parameters

`UpdateThresholdVariables`

`_10

import { UpdateThresholdVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useupdatethreshold#data) property.

### `updateThresholdAsync`

- **Type**: `UseMutateAsyncFunction<SafeClientResult, Error, UpdateThresholdVariables, unknown>`

Asynchronous function to update the threshold of the connected Safe.

#### Parameters

`UpdateThresholdVariables`

`_10

import { UpdateThresholdVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useupdatethreshold#data) property.

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

- **Type**: `UpdateThresholdVariables`
- **Default**: `undefined`

The `variables` object passed to the mutation function.

[swap](/reference-sdk-react-hooks/useupdateowners/swap "swap")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- useUpdateThreshold
  - Usage
  - Parameters
    - config(Optional)
  - Returns
    - updateThreshold
      - Parameters
      - Returns
    - updateThresholdAsync
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

- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold](https://docs.safe.global/reference-sdk-react-hooks/useupdatethreshold)

### External Links

- [TanStack Query mutation documentation(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [Network Mode(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

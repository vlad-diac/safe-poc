---
title: swap – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# swap – Safe Docs

React Hooks Reference

[useUpdateOwners](/reference-sdk-react-hooks/useupdateowners)

swap

# `swap`

Contains the `swapOwner` and `swapOwnerAsync` functions, which execute a Safe transaction to swap an owner of the Safe connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) or send it to the Safe Transaction Service if it isn't executable.

## Usage

- If the `threshold` of the connected Safe is greater than `1`, it creates the Safe transaction and submits it to the Safe Transaction Service to collect the signatures from the Safe owners.
- If the `threshold` of the connected Safe is `1`, it executes the Safe transaction.

The connected Safe must be already deployed.



App.tsxmain.tsx

`_26

import { useUpdateOwners, SwapOwnerVariables } from '@safe-global/safe-react-hooks'

_26

_26

function SwapOwner() {

_26

const { swap } = useUpdateOwners()

_26

const {

_26

swapOwner,

_26

data,

_26

// ...

_26

} = swap

_26

_26

const swapOwnerParams: SwapOwnerVariables = {

_26

oldOwnerAddress: '0x...',

_26

newOwnerAddress: '0x...'

_26

}

_26

_26

return (

_26

<>

_26

<button onClick={() => swapOwner(swapOwnerParams)}>

_26

Swap Owner

_26

</button>

_26

{data && JSON.stringify(data)}

_26

</>

_26

)

_26

}

_26

_26

export default SwapOwner`

## Structure

`UseSwapOwnerReturnType`

`_10

import { UseSwapOwnerReturnType } from '@safe-global/safe-react-hooks'`

[TanStack Query mutation documentation (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### `swapOwner`

- **Type**: `UseMutateFunction<SafeClientResult, Error, SwapOwnerVariables, unknown>`

Function to swap an owner of the connected Safe.

#### Parameters

`SwapOwnerVariables`

`_10

import { SwapOwnerVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useupdateowners/swap#data) property.

### `swapOwnerAsync`

- **Type**: `UseMutateAsyncFunction<SafeClientResult, Error, SwapOwnerVariables, unknown>`

Asynchronous function to swap an owner of the connected Safe.

#### Parameters

`SwapOwnerVariables`

`_10

import { SwapOwnerVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useupdateowners/swap#data) property.

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

- **Type**: `SwapOwnerVariables`
- **Default**: `undefined`

The `variables` object passed to the mutation function.

[remove](/reference-sdk-react-hooks/useupdateowners/remove "remove")[useUpdateThreshold](/reference-sdk-react-hooks/useupdatethreshold "useUpdateThreshold")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- swap
  - Usage
  - Structure
    - swapOwner
      - Parameters
      - Returns
    - swapOwnerAsync
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

- [useUpdateOwners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)

### External Links

- [TanStack Query mutation documentation(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [Network Mode(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

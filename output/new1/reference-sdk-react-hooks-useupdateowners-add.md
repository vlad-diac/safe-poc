---
title: add – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# add – Safe Docs

React Hooks Reference

[useUpdateOwners](/reference-sdk-react-hooks/useupdateowners)

add

# `add`

Contains the `addOwner` and `addOwnerAsync` functions, which execute a Safe transaction to add a new owner to the Safe connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) or send it to the Safe Transaction Service if it isn't executable.

## Usage

- If the `threshold` of the connected Safe is greater than `1`, it creates the Safe transaction and submits it to the Safe Transaction Service to collect the signatures from the Safe owners.
- If the `threshold` of the connected Safe is `1`, it executes the Safe transaction.

The connected Safe must be already deployed.



App.tsxmain.tsx

`_26

import { useUpdateOwners, AddOwnerVariables } from '@safe-global/safe-react-hooks'

_26

_26

function AddOwner() {

_26

const { add } = useUpdateOwners()

_26

const {

_26

addOwner,

_26

data,

_26

// ...

_26

} = add

_26

_26

const addOwnerParams: AddOwnerVariables = {

_26

ownerAddress: '0x...',

_26

threshold: 2 // Optional

_26

}

_26

_26

return (

_26

<>

_26

<button onClick={() => addOwner(addOwnerParams)}>

_26

Add Owner

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

export default AddOwner`

## Structure

`UseAddOwnerReturnType`

`_10

import { UseAddOwnerReturnType } from '@safe-global/safe-react-hooks'`

[TanStack Query mutation documentation (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### `addOwner`

- **Type**: `UseMutateFunction<SafeClientResult, Error, AddOwnerVariables, unknown>`

Function to add an owner to the connected Safe.

#### Parameters

`AddOwnerVariables`

`_10

import { AddOwnerVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useupdateowners/add#data) property.

### `addOwnerAsync`

- **Type**: `UseMutateAsyncFunction<SafeClientResult, Error, AddOwnerVariables, unknown>`

Asynchronous function to add an owner to the connected Safe.

#### Parameters

`AddOwnerVariables`

`_10

import { AddOwnerVariables } from '@safe-global/safe-react-hooks'`

Variables to update the threshold.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/useupdateowners/add#data) property.

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

- **Type**: `TVariables`
- **Default**: `undefined`

The `variables` object passed to the mutation function.

[useUpdateOwners](/reference-sdk-react-hooks/useupdateowners "useUpdateOwners")[remove](/reference-sdk-react-hooks/useupdateowners/remove "remove")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- add
  - Usage
  - Structure
    - addOwner
      - Parameters
      - Returns
    - addOwnerAsync
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
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [data](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)

### External Links

- [TanStack Query mutation documentation(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [Network Mode(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

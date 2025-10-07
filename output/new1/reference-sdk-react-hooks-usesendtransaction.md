---
title: useSendTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# useSendTransaction – Safe Docs

React Hooks Reference

useSendTransaction

# `useSendTransaction`

Executes a Safe transaction from the Safe connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) or sends it to the Safe Transaction Service if it isn't executable.

## Usage

- If the `threshold` of the connected Safe is greater than `1`, it creates the Safe transaction and submits it to the Safe Transaction Service to collect the signatures from the Safe owners.
- If the `threshold` of the connected Safe is `1`, it executes the Safe transaction.
- If the connected Safe is not deployed, it deploys it using the funds from the connected signer to pay for the transaction fees, and executes the transaction or sends it to the Safe Transaction Service, depending on the `threshold`.



App.tsxmain.tsx

`_28

import { useSendTransaction, SendTransactionVariables } from '@safe-global/safe-react-hooks'

_28

_28

function App() {

_28

const {

_28

sendTransaction,

_28

data,

_28

// ...

_28

} = useSendTransaction()

_28

_28

const sendTransactionParams: SendTransactionVariables = {

_28

transactions: [{

_28

to: '0x...',

_28

value: '123',

_28

data: '0x'

_28

}]

_28

}

_28

_28

return (

_28

<>

_28

<button onClick={() => sendTransaction(sendTransactionParams)}>

_28

Send Transaction

_28

</button>

_28

{data && JSON.stringify(data)}

_28

</>

_28

)

_28

}

_28

_28

export default App`

## Parameters

`UseSendTransactionParams`

Parameters to customize the hook behavior.

`_10

import { UseSendTransactionParams } from '@safe-global/safe-react-hooks'`

### `config` (Optional)

- **Type**: `SafeConfigWithSigner`

The configuration used instead of the one from the nearest [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).



index.tsxconfig.ts

`_10

import { config } from './config.ts'

_10

_10

const result = useSendTransaction({

_10

config

_10

})`

## Returns

`UseSendTransactionReturnType`

`_10

import { UseSendTransactionReturnType } from '@safe-global/safe-react-hooks'`

[TanStack Query mutation documentation (opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### `sendTransaction`

- **Type**: `UseMutateFunction<SafeClientResult, Error, SendTransactionVariables, unknown>`

Function to send a transaction with the connected Safe.

#### Parameters

`SendTransactionVariables`

`_10

import { SendTransactionVariables } from '@safe-global/safe-react-hooks'`

Variables to send the transactions.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/usesendtransaction#data) property.

### `sendTransactionAsync`

- **Type**: `UseMutateAsyncFunction<SafeClientResult, Error, SendTransactionVariables, unknown>`

Asynchronous function to send a transaction with the connected Safe.

#### Parameters

`SendTransactionVariables`

`_10

import { SendTransactionVariables } from '@safe-global/safe-react-hooks'`

Variables to send the transactions.

#### Returns

[`SafeClientResult` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts#L67-L85)

The result of the transaction in the [`data`](/reference-sdk-react-hooks/usesendtransaction#data) property.

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

- **Type**: `SendTransactionVariables`
- **Default**: `undefined`

The `variables` object passed to the mutation function.

[isSignerConnected](/reference-sdk-react-hooks/usesafe/issignerconnected "isSignerConnected")[useUpdateOwners](/reference-sdk-react-hooks/useupdateowners "useUpdateOwners")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- useSendTransaction
  - Usage
  - Parameters
    - config(Optional)
  - Returns
    - sendTransaction
      - Parameters
      - Returns
    - sendTransactionAsync
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
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [data](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [data](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)

### External Links

- [TanStack Query mutation documentation(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [SafeClientResult(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/types.ts)
- [Network Mode(opens in a new tab)](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

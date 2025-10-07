---
title: useUpdateOwners – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/useupdateowners
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# useUpdateOwners – Safe Docs

React Hooks Reference

useUpdateOwners

# `useUpdateOwners`

Updates the owners of the Safe connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

## Usage

The connected Safe must be already deployed.



App.tsxmain.tsx

`_10

import { useUpdateOwners } from '@safe-global/safe-react-hooks'

_10

_10

function App() {

_10

const { add, remove, swap } = useUpdateOwners()

_10

_10

// ...

_10

}`

## Parameters

`UseUpdateOwnersParams`

Parameters to customize the hook behavior.

`_10

import { UseUpdateOwnersParams } from '@safe-global/safe-react-hooks'`

### `config` (Optional)

- **Type**: `SafeConfigWithSigner`

The configuration used instead of the one from the nearest [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).



index.tsxconfig.ts

`_10

import { config } from './config.ts'

_10

_10

const result = useUpdateOwners({

_10

config

_10

})`

## Returns

`UseUpdateOwnersReturnType`

`_10

import { UseUpdateOwnersReturnType } from '@safe-global/safe-react-hooks'`

### [`add`](/reference-sdk-react-hooks/useupdateowners/add)

### [`remove`](/reference-sdk-react-hooks/useupdateowners/remove)

### [`swap`](/reference-sdk-react-hooks/useupdateowners/swap)

[useSendTransaction](/reference-sdk-react-hooks/usesendtransaction "useSendTransaction")[add](/reference-sdk-react-hooks/useupdateowners/add "add")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- useUpdateOwners
  - Usage
  - Parameters
    - config(Optional)
  - Returns
    - add
    - remove
    - swap

---

## Related Links

### Internal Links

- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [remove](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/remove)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [swap](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/swap)
- [https://docs.safe.global/reference-sdk-react-hooks/useupdateowners](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners)
- [useSendTransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)
- [add](https://docs.safe.global/reference-sdk-react-hooks/useupdateowners/add)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

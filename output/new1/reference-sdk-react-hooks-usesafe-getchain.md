---
title: getChain – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getChain – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

getChain

# `getChain`

Get the chain information of the Safe connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

## Usage



example.tsx

`_17

import { useSafe } from '@safe-global/safe-react-hooks'

_17

_17

function ChainInfo() {

_17

const { getChain } = useSafe()

_17

const {

_17

name,

_17

// ...

_17

} = getChain()

_17

_17

return (

_17

<>

_17

{name}

_17

</>

_17

)

_17

}

_17

_17

export default ChainInfo`

## Parameters

`UseChainParams`

Parameters to customize the hook behavior.

`_10

import { UseChainParams } from '@safe-global/safe-react-hooks'`

### `config` (Optional)

- **Type**: `SafeConfig`

The configuration used instead of the one from the nearest [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).



index.tsxconfig.ts

`_10

import { config } from './config.ts'

_10

_10

const result = getChain({

_10

config

_10

})`

## Returns

`UseChainReturnType`

Returns `UseChainReturnType = SafeConfig['chain']` being `SafeConfig['chain']` the viem's [Chain Type (opens in a new tab)](https://github.com/wevm/viem/blob/main/src/types/chain.ts).

`_10

import { UseChainReturnType } from '@safe-global/safe-react-hooks'`

[getBalance](/reference-sdk-react-hooks/usesafe/getbalance "getBalance")[getPendingTransactions](/reference-sdk-react-hooks/usesafe/getpendingtransactions "getPendingTransactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getChain
  - Usage
  - Parameters
    - config(Optional)
  - Returns

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain)
- [getBalance](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getbalance)
- [getPendingTransactions](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getpendingtransactions)

### External Links

- [Chain Type(opens in a new tab)](https://github.com/wevm/viem/blob/main/src/types/chain.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

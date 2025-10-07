---
title: useSafe – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# useSafe – Safe Docs

React Hooks Reference

useSafe

# `useSafe`

Provides a set of utilities to access different information about the Safe connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

## Usage



App.tsxmain.tsx

`_22

import { useSafe } from '@safe-global/safe-react-hooks'

_22

_22

function App() {

_22

const {

_22

isInitialized,

_22

connect,

_22

disconnect,

_22

isOwnerConnected,

_22

isSignerConnected,

_22

getBalance,

_22

getChain,

_22

getTransaction,

_22

getTransactions,

_22

getPendingTransactions,

_22

getSafeInfo,

_22

getSignerAddress

_22

} = useSafe()

_22

_22

// ...

_22

}

_22

_22

export default App`

## Returns

`UseSafeReturnType`

`_10

import { UseSafeReturnType } from '@safe-global/safe-react-hooks'`

### [`isInitialized`](/reference-sdk-react-hooks/usesafe/isinitialized)

### [`connect`](/reference-sdk-react-hooks/usesafe/connect)

### [`disconnect`](/reference-sdk-react-hooks/usesafe/disconnect)

### [`isOwnerConnected`](/reference-sdk-react-hooks/usesafe/isownerconnected)

### [`isSignerConnected`](/reference-sdk-react-hooks/usesafe/issignerconnected)

### [`getBalance`](/reference-sdk-react-hooks/usesafe/getbalance)

### [`getChain`](/reference-sdk-react-hooks/usesafe/getchain)

### [`getTransaction`](/reference-sdk-react-hooks/usesafe/gettransaction)

### [`getTransactions`](/reference-sdk-react-hooks/usesafe/gettransactions)

### [`getPendingTransactions`](/reference-sdk-react-hooks/usesafe/getpendingtransactions)

### [`getSafeInfo`](/reference-sdk-react-hooks/usesafe/getsafeinfo)

### [`getSignerAddress`](/reference-sdk-react-hooks/usesafe/getsigneraddress)

[useConfirmTransaction](/reference-sdk-react-hooks/useconfirmtransaction "useConfirmTransaction")[connect](/reference-sdk-react-hooks/usesafe/connect "connect")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- useSafe
  - Usage
  - Returns
    - isInitialized
    - connect
    - disconnect
    - isOwnerConnected
    - isSignerConnected
    - getBalance
    - getChain
    - getTransaction
    - getTransactions
    - getPendingTransactions
    - getSafeInfo
    - getSignerAddress

---

## Related Links

### Internal Links

- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [isInitialized](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isinitialized)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [connect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [disconnect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/disconnect)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [isOwnerConnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [isSignerConnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [getBalance](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getbalance)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [getChain](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getchain)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [getTransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [getTransactions](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransactions)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

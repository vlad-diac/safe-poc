---
title: isInitialized – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/isinitialized
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isInitialized – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

isInitialized

# `isInitialized`

Checks if the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) is initialized and ready to use.

This function must be called before interacting with the Safe.

## Usage



example.tsx

`_13

import { useSafe } from '@safe-global/safe-react-hooks'

_13

_13

function IsInitialized() {

_13

const { isInitialized } = useSafe()

_13

_13

return (

_13

<>

_13

{isInitialized ? 'Is initialized' : 'Not initialized'}

_13

</>

_13

)

_13

}

_13

_13

export default IsInitialized`

## Returns

`boolean`

The boolean value that indicates if the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) is initialized and ready to use.

[getTransactions](/reference-sdk-react-hooks/usesafe/gettransactions "getTransactions")[isOwnerConnected](/reference-sdk-react-hooks/usesafe/isownerconnected "isOwnerConnected")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isInitialized
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/isinitialized](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isinitialized)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/isinitialized](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isinitialized)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [getTransactions](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransactions)
- [isOwnerConnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

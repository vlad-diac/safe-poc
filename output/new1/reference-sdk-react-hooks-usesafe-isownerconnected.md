---
title: isOwnerConnected – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isOwnerConnected – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

isOwnerConnected

# `isOwnerConnected`

Checks if the signer connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) is an owner of the connected Safe.

Use the [`isSignerConnected`](/reference-sdk-react-hooks/usesafe/issignerconnected) function instead to avoid checking ownership.

## Usage



example.tsx

`_13

import { useSafe } from '@safe-global/safe-react-hooks'

_13

_13

function IsOwnerConnected() {

_13

const { isOwnerConnected } = useSafe()

_13

_13

return (

_13

<>

_13

{isOwnerConnected ? 'Owner is connected' : 'No owner connected'}

_13

</>

_13

)

_13

}

_13

_13

export default IsOwnerConnected`

## Returns

`boolean`

The boolean value that indicates if an owner of the Safe is connected as a signer.

[isInitialized](/reference-sdk-react-hooks/usesafe/isinitialized "isInitialized")[isSignerConnected](/reference-sdk-react-hooks/usesafe/issignerconnected "isSignerConnected")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isOwnerConnected
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [isSignerConnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected)
- [isInitialized](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isinitialized)
- [isSignerConnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

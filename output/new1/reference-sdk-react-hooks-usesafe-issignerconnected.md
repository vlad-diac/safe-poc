---
title: isSignerConnected – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# isSignerConnected – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

isSignerConnected

# `isSignerConnected`

Checks if a signer is connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

This function doesn't differentiate between signers who are owners of the connected Safe and those who aren't. Use the [`isOwnerConnected`](/reference-sdk-react-hooks/usesafe/isownerconnected) function instead to explicitly check ownership.

## Usage



example.tsx

`_13

import { useSafe } from '@safe-global/safe-react-hooks'

_13

_13

function IsSignerConnected() {

_13

const { isSignerConnected } = useSafe()

_13

_13

return (

_13

<>

_13

{isSignerConnected ? 'Signer is connected' : 'No signer connected'}

_13

</>

_13

)

_13

}

_13

_13

export default IsSignerConnected`

## Returns

`boolean`

The boolean value that indicates if a signer is connected.

[isOwnerConnected](/reference-sdk-react-hooks/usesafe/isownerconnected "isOwnerConnected")[useSendTransaction](/reference-sdk-react-hooks/usesendtransaction "useSendTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- isSignerConnected
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [isOwnerConnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/issignerconnected)
- [isOwnerConnected](https://docs.safe.global/reference-sdk-react-hooks/usesafe/isownerconnected)
- [useSendTransaction](https://docs.safe.global/reference-sdk-react-hooks/usesendtransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

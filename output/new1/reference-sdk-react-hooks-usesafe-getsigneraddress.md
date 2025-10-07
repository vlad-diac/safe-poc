---
title: getSignerAddress – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSignerAddress – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

getSignerAddress

# `getSignerAddress`

Returns the address of the signer connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

## Usage



example.tsx

`_14

import { useSafe } from '@safe-global/safe-react-hooks'

_14

_14

function SignerAddress() {

_14

const { getSignerAddress } = useSafe()

_14

const address = getSignerAddress()

_14

_14

return (

_14

<>

_14

{address ? address : 'No signer address'}

_14

</>

_14

)

_14

}

_14

_14

export default SignerAddress`

## Parameters

`UseAddressParams`

Parameters to customize the hook behavior.

`_10

import { UseAddressParams } from '@safe-global/safe-react-hooks'`

### `config` (Optional)

- **Type**: `SafeConfig`

The configuration used instead of the one from the nearest [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).



index.tsxconfig.ts

`_10

import { config } from './config.ts'

_10

_10

const result = getSignerAddress({

_10

config

_10

})`

## Returns

`UseSignerAddressReturnType | undefined`

The signer address.

`_10

import { UseSignerAddressReturnType } from '@safe-global/safe-react-hooks'`

[getSafeInfo](/reference-sdk-react-hooks/usesafe/getsafeinfo "getSafeInfo")[getTransaction](/reference-sdk-react-hooks/usesafe/gettransaction "getTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSignerAddress
  - Usage
  - Parameters
    - config(Optional)
  - Returns

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsigneraddress)
- [getSafeInfo](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getsafeinfo)
- [getTransaction](https://docs.safe.global/reference-sdk-react-hooks/usesafe/gettransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

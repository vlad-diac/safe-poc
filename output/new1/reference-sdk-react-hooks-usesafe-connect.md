---
title: connect – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# connect – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

connect

# `connect`

Connects a given signer to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

## Usage



example.tsx

`_15

import { useSafe } from '@safe-global/safe-react-hooks'

_15

_15

function Connect() {

_15

const { connect } = useSafe()

_15

_15

const signerAddress = '0x...'

_15

_15

return (

_15

<button onClick={() => connect(signerAddress)}>

_15

Connect

_15

</button>

_15

)

_15

}

_15

_15

export default Connect`

## Parameters

### `signer`

- **Type**: `string`

The address of the signer.

`_10

connect(

_10

'0x...'

_10

)`

[useSafe](/reference-sdk-react-hooks/usesafe "useSafe")[disconnect](/reference-sdk-react-hooks/usesafe/disconnect "disconnect")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- connect
  - Usage
  - Parameters
    - signer

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect)
- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [disconnect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/disconnect)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

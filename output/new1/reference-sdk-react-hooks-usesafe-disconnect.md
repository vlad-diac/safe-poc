---
title: disconnect – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/usesafe/disconnect
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# disconnect – Safe Docs

React Hooks Reference

[useSafe](/reference-sdk-react-hooks/usesafe)

disconnect

# `disconnect`

Disconnects the signer connected to the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider).

## Usage



example.tsx

`_13

import { useSafe } from '@safe-global/safe-react-hooks'

_13

_13

function Disconnect() {

_13

const { disconnect } = useSafe()

_13

_13

return (

_13

<button onClick={disconnect}>

_13

Disconnect

_13

</button>

_13

)

_13

}

_13

_13

export default Disconnect`

[connect](/reference-sdk-react-hooks/usesafe/connect "connect")[getBalance](/reference-sdk-react-hooks/usesafe/getbalance "getBalance")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- disconnect
  - Usage

---

## Related Links

### Internal Links

- [useSafe](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/usesafe/disconnect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/disconnect)
- [connect](https://docs.safe.global/reference-sdk-react-hooks/usesafe/connect)
- [getBalance](https://docs.safe.global/reference-sdk-react-hooks/usesafe/getbalance)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

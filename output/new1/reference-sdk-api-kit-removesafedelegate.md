---
title: removeSafeDelegate – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/removesafedelegate
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# removeSafeDelegate – Safe Docs

API Kit Reference

removeSafeDelegate

# `removeSafeDelegate`

Removes a delegate for a given Safe address.

## Usage



example.tssetup.ts

`_10

import { DeleteSafeDelegateProps } from '@safe-global/api-kit'

_10

import { apiKit } from './setup.ts'

_10

_10

const config: DeleteSafeDelegateProps = {

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

signer

_10

}

_10

_10

await apiKit.removeSafeDelegate(config)`

## Parameters

### `config.delegateAddress`

- **Type:** `string`

The address of the delegate that will be removed.

`_10

await apiKit.removeSafeDelegate({

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

signer

_10

})`

### `config.delegatorAddress`

- **Type:** `string`

The delegator address.

`_10

await apiKit.removeSafeDelegate({

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

signer

_10

})`

### `config.signer`

- **Type:** `Signer`

The signer.

`_10

await apiKit.removeSafeDelegate({

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

signer

_10

})`

[addSafeDelegate](/reference-sdk-api-kit/addsafedelegate "addSafeDelegate")[getSafeCreationInfo](/reference-sdk-api-kit/getsafecreationinfo "getSafeCreationInfo")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- removeSafeDelegate
  - Usage
  - Parameters
    - config.delegateAddress
    - config.delegatorAddress
    - config.signer

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/removesafedelegate](https://docs.safe.global/reference-sdk-api-kit/removesafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/removesafedelegate](https://docs.safe.global/reference-sdk-api-kit/removesafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/removesafedelegate](https://docs.safe.global/reference-sdk-api-kit/removesafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/removesafedelegate](https://docs.safe.global/reference-sdk-api-kit/removesafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/removesafedelegate](https://docs.safe.global/reference-sdk-api-kit/removesafedelegate)
- [addSafeDelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [getSafeCreationInfo](https://docs.safe.global/reference-sdk-api-kit/getsafecreationinfo)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

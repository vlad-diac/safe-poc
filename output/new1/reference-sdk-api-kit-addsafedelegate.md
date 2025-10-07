---
title: addSafeDelegate – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/addsafedelegate
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# addSafeDelegate – Safe Docs

API Kit Reference

addSafeDelegate

# `addSafeDelegate`

Adds a new delegate for a given Safe address.

## Usage



example.tssetup.ts

`_12

import { AddSafeDelegateProps } from '@safe-global/api-kit'

_12

import { apiKit } from './setup.ts'

_12

_12

const config: AddSafeDelegateProps = {

_12

safeAddress: '0x...', // Optional

_12

delegateAddress: '0x...',

_12

delegatorAddress: '0x...',

_12

label: 'abc',

_12

signer

_12

}

_12

_12

const config = await apiKit.addSafeDelegate(config)`

## Returns

`Promise<SafeDelegateResponse>`

The configuration of the new Safe delegate.

## Parameters

### `config.safeAddress` (Optional)

- **Type:** `string`

The Safe address.

`_10

const config = await apiKit.addSafeDelegate({

_10

safeAddress: '0x...',

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

label: 'abc',

_10

signer

_10

})`

### `config.delegateAddress`

- **Type:** `string`

The delegate address that will be added.

`_10

const config = await apiKit.addSafeDelegate({

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

label: 'abc',

_10

signer

_10

})`

### `config.delegatorAddress`

- **Type:** `string`

The delegator address.

`_10

const config = await apiKit.addSafeDelegate({

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

label: 'abc',

_10

signer

_10

})`

### `config.label`

- **Type:** `string`

The custom label.

`_10

const config = await apiKit.addSafeDelegate({

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

label: 'abc',

_10

signer

_10

})`

### `config.signer`

- **Type:** `Signer`

The signer.

`_10

const config = await apiKit.addSafeDelegate({

_10

delegateAddress: '0x...',

_10

delegatorAddress: '0x...',

_10

label: 'abc',

_10

signer

_10

})`

[getSafeDelegates](/reference-sdk-api-kit/getsafedelegates "getSafeDelegates")[removeSafeDelegate](/reference-sdk-api-kit/removesafedelegate "removeSafeDelegate")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- addSafeDelegate
  - Usage
  - Returns
  - Parameters
    - config.safeAddress(Optional)
    - config.delegateAddress
    - config.delegatorAddress
    - config.label
    - config.signer

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [https://docs.safe.global/reference-sdk-api-kit/addsafedelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)
- [getSafeDelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [removeSafeDelegate](https://docs.safe.global/reference-sdk-api-kit/removesafedelegate)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

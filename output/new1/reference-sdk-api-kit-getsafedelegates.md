---
title: getSafeDelegates – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getsafedelegates
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getSafeDelegates – Safe Docs

API Kit Reference

getSafeDelegates

# `getSafeDelegates`

Returns the list of delegates for a given Safe address.

## Usage



example.tssetup.ts

`_13

import { GetSafeDelegateProps } from '@safe-global/api-kit'

_13

import { apiKit } from './setup.ts'

_13

_13

const config: GetSafeDelegateProps = {

_13

safeAddress: '0x...', // Optional

_13

delegateAddress: '0x...', // Optional

_13

delegatorAddress: '0x...', // Optional

_13

label: 'abc', // Optional

_13

limit: '10', // Optional

_13

offset: '50' // Optional

_13

}

_13

_13

const delegates = await apiKit.getSafeDelegates(config)`

## Returns

`Promise<SafeDelegateListResponse>`

The list of delegates.

## Parameters

### `config.safeAddress` (Optional)

- **Type:** `string`

The Safe address.

`_10

const delegates = await apiKit.getSafeDelegates({

_10

safeAddress: '0x...'

_10

})`

### `config.delegateAddress` (Optional)

- **Type:** `string`

The delegate address.

`_10

const delegates = await apiKit.getSafeDelegates({

_10

delegateAddress: '0x...'

_10

})`

### `config.delegatorAddress` (Optional)

- **Type:** `string`

The delegator address.

`_10

const delegates = await apiKit.getSafeDelegates({

_10

delegatorAddress: '0x...'

_10

})`

### `config.label` (Optional)

- **Type:** `string`

The custom label.

`_10

const delegates = await apiKit.getSafeDelegates({

_10

label: 'abc'

_10

})`

### `config.limit` (Optional)

- **Type:** `string`

The number of results returned per page.

`_10

const delegates = await apiKit.getSafeDelegates({

_10

limit: '10'

_10

})`

### `config.offset` (Optional)

- **Type:** `string`

The initial index from which to return the results.

`_10

const delegates = await apiKit.getSafeDelegates({

_10

offset: '50'

_10

})`

[getSafeInfo](/reference-sdk-api-kit/getsafeinfo "getSafeInfo")[addSafeDelegate](/reference-sdk-api-kit/addsafedelegate "addSafeDelegate")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getSafeDelegates
  - Usage
  - Returns
  - Parameters
    - config.safeAddress(Optional)
    - config.delegateAddress(Optional)
    - config.delegatorAddress(Optional)
    - config.label(Optional)
    - config.limit(Optional)
    - config.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [https://docs.safe.global/reference-sdk-api-kit/getsafedelegates](https://docs.safe.global/reference-sdk-api-kit/getsafedelegates)
- [getSafeInfo](https://docs.safe.global/reference-sdk-api-kit/getsafeinfo)
- [addSafeDelegate](https://docs.safe.global/reference-sdk-api-kit/addsafedelegate)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

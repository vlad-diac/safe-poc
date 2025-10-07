---
title: constructor – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/constructor
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# constructor – Safe Docs

API Kit Reference

constructor

# `constructor`

Returns an instance of the API Kit.

## Usage

`_12

import SafeApiKit from '@safe-global/api-kit'

_12

_12

const chainId = 1n

_12

_12

const txServiceUrl = 'https://...'

_12

_12

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_12

const apiKit = new SafeApiKit({

_12

chainId,

_12

txServiceUrl, // Optional

_12

apiKey: 'YOUR_API_KEY' // Mandatory if txServiceUrl is not specified

_12

})`

## Returns

`SafeApiKit`

A new instance of the API Kit.

## Parameters

### `chainId`

- **Type:** `bigint`

The chain ID.

`_10

const apiKit = new SafeApiKit({

_10

chainId: 1n,

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `apiKey`

- **Type:** `string`

The API key. This parameter is mandatory when using default Safe provided services. It can be omitted if using a custom Transaction Service. [Check how to get one](/core-api/how-to-use-api-keys).

`_10

const apiKit = new SafeApiKit({

_10

chainId: 1n,

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `txServiceUrl` (Optional)

- **Type:** `string`

The URL of the Safe Transaction Service. This can be provided instead of `apiKey` to specify a custom Transaction Service endpoint, such as when running your own Safe Transaction Service instance.

`_10

const apiKit = new SafeApiKit({

_10

chainId: 1n,

_10

txServiceUrl: 'https://...'

_10

})`

[Overview](/reference-sdk-api-kit/overview "Overview")[getServiceInfo](/reference-sdk-api-kit/getserviceinfo "getServiceInfo")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- constructor
  - Usage
  - Returns
  - Parameters
    - chainId
    - apiKey
    - txServiceUrl(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/constructor](https://docs.safe.global/reference-sdk-api-kit/constructor)
- [https://docs.safe.global/reference-sdk-api-kit/constructor](https://docs.safe.global/reference-sdk-api-kit/constructor)
- [https://docs.safe.global/reference-sdk-api-kit/constructor](https://docs.safe.global/reference-sdk-api-kit/constructor)
- [https://docs.safe.global/reference-sdk-api-kit/constructor](https://docs.safe.global/reference-sdk-api-kit/constructor)
- [https://docs.safe.global/reference-sdk-api-kit/constructor](https://docs.safe.global/reference-sdk-api-kit/constructor)
- [Check how to get one](https://docs.safe.global/core-api/how-to-use-api-keys)
- [https://docs.safe.global/reference-sdk-api-kit/constructor](https://docs.safe.global/reference-sdk-api-kit/constructor)
- [Overview](https://docs.safe.global/reference-sdk-api-kit/overview)
- [getServiceInfo](https://docs.safe.global/reference-sdk-api-kit/getserviceinfo)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: decodeData – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/decodedata
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# decodeData – Safe Docs

API Kit Reference

decodeData

# `decodeData`

Decodes the specified Safe transaction data.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const data = '0x...'

_10

_10

const decodedData = await apiKit.decodeData(data)`

## Returns

`Promise<DataDecoded>`

The transaction data decoded.

`_10

type DataDecoded = {

_10

readonly method: string

_10

readonly parameters: DecodedParameters[]

_10

}`

## Parameters

### `data`

- **Type:** `string`

The Safe transaction data to decode.

`_10

const decodedData = await apiKit.decodeData('0x...')`

### `to` (Optional)

- **Type:** `string`

The address of the receiving contract. If provided, the decoded data will be more accurate, as in case of an ABI collision the Safe Transaction Service would know which ABI to use

`_10

const decodedData = await apiKit.decodeData(

_10

'0x...',

_10

'0x...'

_10

)`

[getServiceSingletonsInfo](/reference-sdk-api-kit/getservicesingletonsinfo "getServiceSingletonsInfo")[getSafesByOwner](/reference-sdk-api-kit/getsafesbyowner "getSafesByOwner")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- decodeData
  - Usage
  - Returns
  - Parameters
    - data
    - to(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/decodedata](https://docs.safe.global/reference-sdk-api-kit/decodedata)
- [https://docs.safe.global/reference-sdk-api-kit/decodedata](https://docs.safe.global/reference-sdk-api-kit/decodedata)
- [https://docs.safe.global/reference-sdk-api-kit/decodedata](https://docs.safe.global/reference-sdk-api-kit/decodedata)
- [https://docs.safe.global/reference-sdk-api-kit/decodedata](https://docs.safe.global/reference-sdk-api-kit/decodedata)
- [https://docs.safe.global/reference-sdk-api-kit/decodedata](https://docs.safe.global/reference-sdk-api-kit/decodedata)
- [getServiceSingletonsInfo](https://docs.safe.global/reference-sdk-api-kit/getservicesingletonsinfo)
- [getSafesByOwner](https://docs.safe.global/reference-sdk-api-kit/getsafesbyowner)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

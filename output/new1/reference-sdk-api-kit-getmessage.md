---
title: getMessage – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getmessage
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getMessage – Safe Docs

API Kit Reference

getMessage

# `getMessage`

Returns a message from its hash.

## Usage



example.tssetup.ts

`_10

import { apiKit } from './setup.ts'

_10

_10

const messageHash = '0x...'

_10

_10

const message = await apiKit.getMessage(messageHash)`

## Returns

`Promise<SafeMessage>`

The message.

## Parameters

### `messageHash`

- **Type:** `string`

The Safe message hash.

`_10

const message = await apiKit.getMessage(

_10

'0x...'

_10

)`

[getToken](/reference-sdk-api-kit/gettoken "getToken")[getMessages](/reference-sdk-api-kit/getmessages "getMessages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getMessage
  - Usage
  - Returns
  - Parameters
    - messageHash

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getmessage](https://docs.safe.global/reference-sdk-api-kit/getmessage)
- [https://docs.safe.global/reference-sdk-api-kit/getmessage](https://docs.safe.global/reference-sdk-api-kit/getmessage)
- [https://docs.safe.global/reference-sdk-api-kit/getmessage](https://docs.safe.global/reference-sdk-api-kit/getmessage)
- [https://docs.safe.global/reference-sdk-api-kit/getmessage](https://docs.safe.global/reference-sdk-api-kit/getmessage)
- [getToken](https://docs.safe.global/reference-sdk-api-kit/gettoken)
- [getMessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

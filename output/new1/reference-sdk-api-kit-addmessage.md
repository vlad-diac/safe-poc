---
title: addMessage – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/addmessage
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# addMessage – Safe Docs

API Kit Reference

addMessage

# `addMessage`

Creates a new message with an initial signature.

## Usage



example.tssetup.ts

`_12

import { AddMessageOptions } from '@safe-global/api-kit'

_12

import { apiKit } from './setup.ts'

_12

_12

const safeAddress = '0x...'

_12

_12

const config: AddMessageOptions = {

_12

message: '0x...',

_12

signature: '0x...',

_12

safeAppId: 1 // Optional

_12

}

_12

_12

await apiKit.addMessage(safeAddress, config)`

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

await apiKit.addMessage(

_10

'0x...',

_10

{

_10

message: '0x...',

_10

signature: '0x...'

_10

}

_10

)`

### `config.message`

- **Type:** `string | EIP712TypedData`

The raw message.

`_10

await apiKit.addMessage(

_10

'0x...',

_10

{

_10

message: '0x...',

_10

signature: '0x...'

_10

}

_10

)`

### `config.signature`

- **Type:** `string`

The message signature.

`_10

await apiKit.addMessage(

_10

'0x...',

_10

{

_10

message: '0x...',

_10

signature: '0x...'

_10

}

_10

)`

### `config.safeAppId` (Optional)

- **Type:** `number`

The Safe App ID.

`_10

await apiKit.addMessage(

_10

'0x...',

_10

{

_10

message: '0x...',

_10

signature: '0x...',

_10

safeAppId: 1

_10

}

_10

)`

[getMessages](/reference-sdk-api-kit/getmessages "getMessages")[addMessageSignature](/reference-sdk-api-kit/addmessagesignature "addMessageSignature")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- addMessage
  - Usage
  - Parameters
    - safeAddress
    - config.message
    - config.signature
    - config.safeAppId(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/addmessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)
- [https://docs.safe.global/reference-sdk-api-kit/addmessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)
- [https://docs.safe.global/reference-sdk-api-kit/addmessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)
- [https://docs.safe.global/reference-sdk-api-kit/addmessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)
- [https://docs.safe.global/reference-sdk-api-kit/addmessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)
- [https://docs.safe.global/reference-sdk-api-kit/addmessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)
- [getMessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [addMessageSignature](https://docs.safe.global/reference-sdk-api-kit/addmessagesignature)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

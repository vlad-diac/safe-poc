---
title: getMessages – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/getmessages
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getMessages – Safe Docs

API Kit Reference

getMessages

# `getMessages`

Returns the list of messages associated to a Safe account.

## Usage



example.tssetup.ts

`_12

import { GetSafeMessageListOptions } from '@safe-global/api-kit'

_12

import { apiKit } from './setup.ts'

_12

_12

const safeAddress = '0x...'

_12

_12

const config: GetSafeMessageListOptions = {

_12

ordering: 'created', // Optional

_12

limit: '10', // Optional

_12

offset: '50' // Optional

_12

}

_12

_12

const messagesResponse = await apiKit.getMessages(safeAddress, config)`

## Returns

`Promise<SafeMessageListResponse>`

The paginated list of messages.

## Parameters

### `safeAddress`

- **Type:** `string`

The Safe address.

`_10

const messagesResponse = await apiKit.getMessages(

_10

'0x...'

_10

)`

### `config.ordering` (Optional)

- **Type:** `string`

The field used when ordering the results.

`_10

const messagesResponse = await apiKit.getMessages(

_10

'0x...',

_10

{

_10

ordering: 'created'

_10

}

_10

)`

### `config.limit` (Optional)

- **Type:** `number`

The number of results to return per page.

`_10

const messagesResponse = await apiKit.getMessages(

_10

'0x...',

_10

{

_10

limit: 10

_10

}

_10

)`

### `config.offset` (Optional)

- **Type:** `number`

The initial index from which to return the results.

`_10

const messagesResponse = await apiKit.getMessages(

_10

'0x...',

_10

{

_10

offset: 50

_10

}

_10

)`

[getMessage](/reference-sdk-api-kit/getmessage "getMessage")[addMessage](/reference-sdk-api-kit/addmessage "addMessage")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getMessages
  - Usage
  - Returns
  - Parameters
    - safeAddress
    - config.ordering(Optional)
    - config.limit(Optional)
    - config.offset(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-api-kit/getmessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [https://docs.safe.global/reference-sdk-api-kit/getmessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [https://docs.safe.global/reference-sdk-api-kit/getmessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [https://docs.safe.global/reference-sdk-api-kit/getmessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [https://docs.safe.global/reference-sdk-api-kit/getmessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [https://docs.safe.global/reference-sdk-api-kit/getmessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [https://docs.safe.global/reference-sdk-api-kit/getmessages](https://docs.safe.global/reference-sdk-api-kit/getmessages)
- [getMessage](https://docs.safe.global/reference-sdk-api-kit/getmessage)
- [addMessage](https://docs.safe.global/reference-sdk-api-kit/addmessage)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

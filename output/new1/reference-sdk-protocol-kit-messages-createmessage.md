---
title: createMessage – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createMessage – Safe Docs

Protocol Kit Reference

Messages

createMessage

# `createMessage`

Returns a Safe message ready to be signed by the owners.

## Usage



example.tssetup.ts

`_10

import { EIP712TypedData } from '@safe-global/types-kit'

_10

import { protocolKit } from './setup.ts'

_10

_10

const rawMessage: string | EIP712TypedData = 'Example message'

_10

_10

const message = protocolKit.createMessage(rawMessage)`

## Parameters

### `rawMessage`

- **Type**: `string`

The message.

`_10

const message = protocolKit.createMessage(

_10

'Example message'

_10

)`

## Returns

[`SafeMessage` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L62-L68)

The Safe message.

[signTypedData](/reference-sdk-protocol-kit/transaction-signatures/signtypeddata "signTypedData")[getSafeMessageHash](/reference-sdk-protocol-kit/messages/getsafemessagehash "getSafeMessageHash")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createMessage
  - Usage
  - Parameters
    - rawMessage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage)
- [https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage](https://docs.safe.global/reference-sdk-protocol-kit/messages/createmessage)
- [signTypedData](https://docs.safe.global/reference-sdk-protocol-kit/transaction-signatures/signtypeddata)
- [getSafeMessageHash](https://docs.safe.global/reference-sdk-protocol-kit/messages/getsafemessagehash)

### External Links

- [SafeMessage(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

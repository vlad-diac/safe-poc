---
title: offChainMessages – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/offchain-messages
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# offChainMessages – Safe Docs

Starter Kit Reference

offchainMessages

# `offChainMessages`

This extension extends the `SafeClient` functionality by allowing off-chain messages.

Off-chain messages are the default option used by Safe.

## Usage



example.tssetup.ts

`_10

import { offChainMessages } from '@safe-global/sdk-starter-kit'

_10

import { safeClient } from './setup.ts'

_10

_10

const offchainMessagesClient = safeClient.extend(offChainMessages())`

## Returns

`SafeClient & { sendOffChainMessage, confirmOffChainMessage, getPendingOffChainMessages }`

The `SafeClient` instance with the extended functionality.

[getPendingSafeOperations](/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations "getPendingSafeOperations")[sendOffChainMessage](/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage "sendOffChainMessage")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- offChainMessages
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)
- [getPendingSafeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations)
- [sendOffChainMessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

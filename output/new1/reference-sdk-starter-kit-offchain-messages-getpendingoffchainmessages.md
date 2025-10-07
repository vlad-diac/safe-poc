---
title: getPendingOffChainMessages – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getPendingOffChainMessages – Safe Docs

Starter Kit Reference

[offchainMessages](/reference-sdk-starter-kit/offchain-messages)

getPendingOffChainMessages

# `getPendingOffChainMessages`

This method returns the list of pending off-chain messages that require confirmation by using the `confirmOffChainMessage` method.

## Usage



example.tssetup.ts

`_10

import { offchainMessageClient } from './setup.ts'

_10

_10

const pendingMessages = await offchainMessageClient.getPendingOffChainMessages()`

## Returns

`Promise<SafeMessageListResponse>`

A paginated list of the pending off-chain messages

[confirmOffChainMessage](/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage "confirmOffChainMessage")[onchainMessages](/reference-sdk-starter-kit/onchain-messages "onchainMessages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getPendingOffChainMessages
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [offchainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages)
- [confirmOffChainMessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage)
- [onchainMessages](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

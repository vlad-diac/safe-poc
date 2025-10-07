---
title: onChainMessages – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/onchain-messages
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# onChainMessages – Safe Docs

Starter Kit Reference

onchainMessages

# `onChainMessages`

This extension extends the `SafeClient` functionality by allowing on-chain messages.

On-chain messages are regular transactions created using the [SignMessageLib (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/SignMessageLib.sol) contract.

## Usage



example.tssetup.ts

`_10

import { onChainMessages } from '@safe-global/sdk-starter-kit'

_10

import { safeClient } from './setup.ts'

_10

_10

const onchainMessagesClient = safeClient.extend(onChainMessages())`

## Returns

`SafeClient & { sendOnChainMessage }`

The `SafeClient` instance with the extended functionality.

[getPendingOffChainMessages](/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages "getPendingOffChainMessages")[sendOnChainMessage](/reference-sdk-starter-kit/onchain-messages/sendonchainmessage "sendOnChainMessage")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- onChainMessages
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages)
- [getPendingOffChainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages)
- [sendOnChainMessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)

### External Links

- [SignMessageLib(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/SignMessageLib.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

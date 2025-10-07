---
title: confirmOffChainMessage – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# confirmOffChainMessage – Safe Docs

Starter Kit Reference

[offchainMessages](/reference-sdk-starter-kit/offchain-messages)

confirmOffChainMessage

# `confirmOffChainMessage`

If the number of signatures collected in the Safe Transaction Service for a given Safe message hash hasn't met the `threshold`, it will add the signature from the connected signer.

If the number of collected signatures reaches the `threshold`, the Safe message will be submitted instantly.

## Usage



example.tssetup.ts

`_10

import { offchainMessageClient } from './setup.ts'

_10

_10

const messageResult = await offchainMessageClient.confirmOffChainMessage({

_10

messageHash: '0x...'

_10

})`

## Returns

`Promise<SafeClientResult>`

The result of the confirmed message.

## Parameters

### `messageHash`

- **Type:** `string`

The hash of the message to sign.

`_10

const txResult = await safeMessageClient.confirmOffChainMessage({

_10

messageHash: '0x...'

_10

})`

[sendOffChainMessage](/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage "sendOffChainMessage")[getPendingOffChainMessages](/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages "getPendingOffChainMessages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- confirmOffChainMessage
  - Usage
  - Returns
  - Parameters
    - messageHash

---

## Related Links

### Internal Links

- [offchainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage)
- [sendOffChainMessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage)
- [getPendingOffChainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/getpendingoffchainmessages)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

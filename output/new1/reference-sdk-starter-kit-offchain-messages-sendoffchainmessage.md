---
title: sendOffChainMessage – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# sendOffChainMessage – Safe Docs

Starter Kit Reference

[offchainMessages](/reference-sdk-starter-kit/offchain-messages)

sendOffChainMessage

# `sendOffChainMessage`

If the `threshold` of the connected Safe is greater than 1, it will create the Safe message and store it in the Safe Transaction Service to collect the signatures from the Safe owners.

If the `threshold` of the connected Safe is 1, the Safe message will be submitted and be valid immediately.

If the Safe account is not deployed, it will be deployed when this method is called and funds will be required in the connected signer account.

## Usage



example.tssetup.ts

`_10

import { offchainMessageClient } from './setup.ts'

_10

_10

const messageResult = await offchainMessageClient.sendOffChainMessage({

_10

message: 'I am the owner of this Safe'

_10

})`

## Returns

`Promise<SafeClientResult>`

The result of the off-chain message sent.

## Parameters

### `message`

- **Type:** `string | EIP712TypedData`

The message to submit.

`_10

const messageResult = await offchainMessageClient.sendOffChainMessage({

_10

message: 'abc'

_10

})`

[offchainMessages](/reference-sdk-starter-kit/offchain-messages "offchainMessages")[confirmOffChainMessage](/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage "confirmOffChainMessage")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- sendOffChainMessage
  - Usage
  - Returns
  - Parameters
    - message

---

## Related Links

### Internal Links

- [offchainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/sendoffchainmessage)
- [offchainMessages](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages)
- [confirmOffChainMessage](https://docs.safe.global/reference-sdk-starter-kit/offchain-messages/confirmoffchainmessage)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

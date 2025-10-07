---
title: sendOnChainMessage – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# sendOnChainMessage – Safe Docs

Starter Kit Reference

[onchainMessages](/reference-sdk-starter-kit/onchain-messages)

sendOnChainMessage

# `sendOnChainMessage`

Creates and sends a message as a regular transaction using the [SignMessageLib (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/SignMessageLib.sol) contract. The message can be a string or an [`EIP712TypedData` (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-712) object.

## Usage



example.tssetup.ts

`_11

import { onchainMessageClient } from './setup.ts'

_11

_11

const messageResult = await onchainMessageClient.sendOnChainMessage({

_11

message: 'I am the owner of this Safe',

_11

from: '0x...', // Optional

_11

gasLimit: '123', // Optional

_11

gasPrice: '123', // Optional

_11

maxFeePerGas: '123', // Optional

_11

maxPriorityFeePerGas: '123', // Optional

_11

nonce: 123, // Optional

_11

})`

## Returns

`Promise<SafeClientResult>`

The result of the operation.

## Parameters

### `message`

- **Type:** `string | EIP712TypedData`

The message to submit.

`_10

const messageResult = await safeMessageClient.sendOnChainMessage({

_10

message: 'abc'

_10

})`

### `from` (Optional)

- **Type:** `string`

The sender's address.

`_10

const messageResult = await safeMessageClient.sendOnChainMessage({

_10

message: 'abc',

_10

from: '0x...'

_10

})`

### `gasLimit` (Optional)

- **Type:** `stringnumber | string | bigint`

The maximum amount of gas the transaction can use. Transactions will fail if they require more gas than specified.

`_10

const messageResult = await safeMessageClient.sendOnChainMessage({

_10

message: 'abc',

_10

gasLimit: '123'

_10

})`

### `gasPrice` (Optional)

- **Type:** `number | string`

The price in wei per unit of gas the sender is willing to pay.

`_10

const messageResult = await safeMessageClient.sendOnChainMessage({

_10

message: 'abc',

_10

gasPrice: '123'

_10

})`

### `maxFeePerGas` (Optional)

- **Type:** `number | string`

The maximum fee per gas the sender is willing to pay.

`_10

const messageResult = await safeMessageClient.sendOnChainMessage({

_10

message: 'abc',

_10

maxFeePerGas: '123'

_10

})`

### `maxPriorityFeePerGas` (Optional)

- **Type:** `number | string`

The maximum priority fee per gas the sender is willing to pay.

`_10

const messageResult = await safeMessageClient.sendOnChainMessage({

_10

message: 'abc',

_10

maxPriorityFeePerGas: '123'

_10

})`

### `nonce` (Optional)

- **Type:** `number | string`

The `nonce` refers to a unique number used in a transaction to prevent the same transaction from being processed more than once.

`_10

const messageResult = await safeMessageClient.sendOnChainMessage({

_10

message: 'abc',

_10

nonce: 5

_10

})`

[onchainMessages](/reference-sdk-starter-kit/onchain-messages "onchainMessages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- sendOnChainMessage
  - Usage
  - Returns
  - Parameters
    - message
    - from(Optional)
    - gasLimit(Optional)
    - gasPrice(Optional)
    - maxFeePerGas(Optional)
    - maxPriorityFeePerGas(Optional)
    - nonce(Optional)

---

## Related Links

### Internal Links

- [onchainMessages](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages/sendonchainmessage)
- [onchainMessages](https://docs.safe.global/reference-sdk-starter-kit/onchain-messages)

### External Links

- [SignMessageLib(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/SignMessageLib.sol)
- [EIP712TypedData(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-712)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

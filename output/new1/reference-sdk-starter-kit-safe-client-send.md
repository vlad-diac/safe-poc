---
title: send – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/send
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# send – Safe Docs

Starter Kit Reference

SafeClient

send

# `send`

Executes a Safe transaction from the connected Safe or sends it to the Safe Transaction Service if it isn't executable.

- If the `threshold` of the connected Safe is greater than `1`, it creates the Safe transaction and submits it to the Safe Transaction Service to collect the signatures from the Safe owners.
- If the `threshold` of the connected Safe is `1`, it executes the Safe transaction.
- If the connected Safe is not deployed, it deploys it using the funds from the connected signer to pay for the transaction fees, and executes the transaction or sends it to the Safe Transaction Service, depending on the `threshold`.

## Usage



example.tssetup.ts

`_24

import { safeClient } from './setup.ts'

_24

_24

const transactions = [{

_24

to: '0x...',

_24

data: '0x...',

_24

value: '0',

_24

operation: 1 // Optional

_24

},

_24

{

_24

to: '0x...',

_24

data: '0x...',

_24

value: '0',

_24

operation: 1 // Optional

_24

}]

_24

_24

const txResult = await safeClient.send({

_24

transactions,

_24

from: '0x...', // Optional

_24

gasLimit: '123', // Optional

_24

gasPrice: '123', // Optional

_24

maxFeePerGas: '123', // Optional

_24

maxPriorityFeePerGas: '123', // Optional

_24

nonce: 123 // Optional

_24

})`

## Returns

`Promise<SafeClientResult>`

The result of the Safe transaction sent.

## Parameters

### `transactions.to`

- **Type:** `string`

The address of the recipient.

`_10

const txResult = await safeClient.send({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x'

_10

}]

_10

})`

### `transactions.value`

- **Type:** `string`

The amount of native tokens that are transferred.

`_10

const txResult = await safeClient.send({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x'

_10

}]

_10

})`

### `transactions.data`

- **Type:** `string`

The encoded transaction data.

`_10

const txResult = await safeClient.send({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x'

_10

}]

_10

})`

### `transactions.operation` (Optional)

- **Type:** `OperationType`
- **Default:** `1`

The operation of the Safe transaction.

`_10

const txResult = await safeClient.send({

_10

transactions: [{

_10

to: '0x...',

_10

value: '123',

_10

data: '0x',

_10

operation: 0

_10

}]

_10

})`

### `from` (Optional)

- **Type:** `string`

The address of the transaction sender.

`_10

const txResult = await safeClient.send({

_10

transactions,

_10

from: '0x...'

_10

})`

### `gasLimit` (Optional)

- **Type:** `stringnumber | string | bigint`

The maximum amount of gas the transaction can use.

`_10

const txResult = await safeClient.send({

_10

transactions,

_10

gasLimit: '123'

_10

})`

### `gasPrice` (Optional)

- **Type:** `number | string`

The price in wei that the sender is willing to pay for each unit of gas.

`_10

const txResult = await safeClient.send({

_10

transactions,

_10

gasPrice: '123'

_10

})`

### `maxFeePerGas` (Optional)

- **Type:** `number | string`

The maximum fee per gas the sender is willing to pay.

`_10

const txResult = await safeClient.send({

_10

transactions,

_10

maxFeePerGas: '123'

_10

})`

### `maxPriorityFeePerGas` (Optional)

- **Type:** `number | string`

The maximum priority fee per gas the sender is willing to pay.

`_10

const txResult = await safeClient.send({

_10

maxPriorityFeePerGas: '123'

_10

})`

### `nonce` (Optional)

- **Type:** `number | string`

The nonce of the transaction.

`_10

const txResult = await safeClient.send({

_10

transactions,

_10

nonce: 123

_10

})`

[isOwner](/reference-sdk-starter-kit/safe-client/isowner "isOwner")[SafeClientResult](/reference-sdk-starter-kit/safe-client-result "SafeClientResult")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- send
  - Usage
  - Returns
  - Parameters
    - transactions.to
    - transactions.value
    - transactions.data
    - transactions.operation(Optional)
    - from(Optional)
    - gasLimit(Optional)
    - gasPrice(Optional)
    - maxFeePerGas(Optional)
    - maxPriorityFeePerGas(Optional)
    - nonce(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [isOwner](https://docs.safe.global/reference-sdk-starter-kit/safe-client/isowner)
- [SafeClientResult](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

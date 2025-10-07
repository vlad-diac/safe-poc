---
title: sendSafeOperation – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# sendSafeOperation – Safe Docs

Starter Kit Reference

[safeOperations](/reference-sdk-starter-kit/safe-operations)

sendSafeOperation

# `sendSafeOperation`

If the `threshold` of the connected Safe is greater than 1, it will create the Safe operation and store it in the Safe Transaction Service to collect the signatures from the Safe owners.

If the `threshold` of the connected Safe is 1, the Safe operation will be sent to the bundler and executed immediately.

If the Safe account is not deployed, it will be deployed when this method is called and funds will be required if the transaction is not sponsored by a paymaster.

## Usage



example.tssetup.ts

`_25

import { MetaTransactionData } from '@safe-global/types-kit'

_25

import { safeOperationsClient } from './setup.ts'

_25

_25

const transactions: MetaTransactionData[] = [{

_25

to: '0x...',

_25

value: '0',

_25

data: '0x'

_25

operation: 1 // Optional

_25

}, {

_25

to: '0x...',

_25

value: '0',

_25

data: '0x',

_25

operation: 1 // Optional

_25

}]

_25

_25

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

_25

transactions,

_25

validAfter: Number(timestamp - 60_000n), // Optional

_25

validUntil: Number(timestamp + 60_000n), // Optional

_25

amountToApprove: 123n, // Optional

_25

feeEstimator: {

_25

preEstimateUserOperationGas, // Optional

_25

postEstimateUserOperationGas, // Optional

_25

}

_25

})`

## Returns

`Promise<SafeClientResult>`

The result of the Safe operation sent.

## Parameters

### `transactions.to`

- **Type:** `string`

The address of the recipient.

`_10

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

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

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

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

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

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

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

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

### `amountToApprove` (Optional)

- **Type:** `bigint`

The amount to approve for the Safe operation.

`_10

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

_10

transactions,

_10

ammountToApprove

_10

})`

### `validAfter` (Optional)

- **Type:** `number`

The timestamp after which the Safe operation is valid.

`_10

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

_10

transactions,

_10

validAfter: Number(timestamp - 60_000n)

_10

})`

### `validUntil` (Optional)

- **Type:** `number`

The timestamp until which the Safe operation is valid.

`_10

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

_10

transactions,

_10

validUntil: Number(timestamp + 60_000n)

_10

})`

### `feeEstimator.preEstimateUserOperationGas` (Optional)

- **Type:** `EstimateFeeFunction`

Function called before `eth_estimateUserOperationGas` to setup the User operation for gas estimation.

`_10

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

_10

transactions,

_10

feeEstimator: {

_10

preEstimateUserOperationGas

_10

}

_10

})`

### `feeEstimator.postEstimateUserOperationGas` (Optional)

- **Type:** `EstimateFeeFunction`

Function called after `eth_estimateUserOperationGas` to adjust the User operations with the result of the gas estimation.

`_10

const safeOperationResult = await safeOperationsClient.sendSafeOperation({

_10

transactions,

_10

feeEstimator: {

_10

postEstimateUserOperationGas

_10

}

_10

})`

[safeOperations](/reference-sdk-starter-kit/safe-operations "safeOperations")[confirmSafeOperation](/reference-sdk-starter-kit/safe-operations/confirmsafeoperation "confirmSafeOperation")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- sendSafeOperation
  - Usage
  - Returns
  - Parameters
    - transactions.to
    - transactions.value
    - transactions.data
    - transactions.operation(Optional)
    - amountToApprove(Optional)
    - validAfter(Optional)
    - validUntil(Optional)
    - feeEstimator.preEstimateUserOperationGas(Optional)
    - feeEstimator.postEstimateUserOperationGas(Optional)

---

## Related Links

### Internal Links

- [safeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [safeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [confirmSafeOperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

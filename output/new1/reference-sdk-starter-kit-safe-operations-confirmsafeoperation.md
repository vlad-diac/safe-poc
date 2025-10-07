---
title: confirmSafeOperation – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# confirmSafeOperation – Safe Docs

Starter Kit Reference

[safeOperations](/reference-sdk-starter-kit/safe-operations)

confirmSafeOperation

# `confirmSafeOperation`

If the number of signatures collected in the Safe Transaction Service for a given Safe operation hash hasn't met the `threshold`, it will add the signature from the connected signer.

If the number of collected signatures reaches the `threshold`, the Safe operation will be submitted instantly.

## Usage



example.tssetup.ts

`_10

import { safeOperationsClient } from './setup.ts'

_10

_10

const safeOperationResult = await safeOperationsClient.confirmSafeOperation({

_10

safeOperationHash: '0x...'

_10

})`

## Returns

`Promise<SafeClientResult>`

The result of the confirmed Safe operation.

## Parameters

### `safeOperationHash`

- **Type:** `string`

The Safe transaction hash to sign.

`_10

const txResult = await safeOperationsClient.confirm({

_10

safeTxHash: '0x...'

_10

})`

[sendSafeOperation](/reference-sdk-starter-kit/safe-operations/sendsafeoperation "sendSafeOperation")[getPendingSafeOperations](/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations "getPendingSafeOperations")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- confirmSafeOperation
  - Usage
  - Returns
  - Parameters
    - safeOperationHash

---

## Related Links

### Internal Links

- [safeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/confirmsafeoperation)
- [sendSafeOperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)
- [getPendingSafeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/getpendingsafeoperations)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: SafeClientResult – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client-result
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# SafeClientResult – Safe Docs

Starter Kit Reference

SafeClientResult

# SafeClientResult

The type of the object returned by the following methods from the `SafeClient` class and its extensions:

- Transactions: `send` and `confirm`.
- On-chain messages: `sendOnChainMessage` and `confirm`.
- Off-chain messages: `sendOffChainMessage` and `confirmOffChainMessage`.
- Safe operations: `sendSafeOperation` and `confirmSafeOperation`.

## Properties

`_19

type SafeClientResult = {

_19

safeAddress: string

_19

description: string

_19

status: SafeClientTxStatus

_19

transactions?: {

_19

safeTxHash?: string

_19

ethereumTxHash?: string

_19

}

_19

messages?: {

_19

messageHash?: string

_19

}

_19

safeOperations?: {

_19

userOperationHash?: string

_19

safeOperationHash?: string

_19

}

_19

safeAccountDeployment?: {

_19

ethereumTxHash?: string

_19

}

_19

}`

### `safeAddress`

- **Type:** `string`

The connected Safe address.

### `description`

- **Type:** `string`

A human-readable description of the result. More details can be found [here (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/constants.ts).

### `status`

- **Type:** `SafeClientTxStatus`

The status of the operation.

- `PENDING_SIGNATURES`
- `DEPLOYED_AND_PENDING_SIGNATURES`
- `EXECUTED`
- `DEPLOYED_AND_EXECUTED`
- `MESSAGE_PENDING_SIGNATURES`
- `DEPLOYED_AND_MESSAGE_PENDING_SIGNATURES`
- `MESSAGE_CONFIRMED`
- `DEPLOYED_AND_MESSAGE_CONFIRMED`
- `SAFE_OPERATION_PENDING_SIGNATURE`
- `SAFE_OPERATION_EXECUTED`

### `transactions.safeTxHash` (Optional)

- **Type:** `string`

The hash of the transaction stored in the Safe Transaction Service.

### `transactions.ethereumTxHash` (Optional)

- **Type:** `string`

The transaction hash of the transaction once it's executed.

### `messages.messageHash` (Optional)

- **Type:** `string`

The hash of the message stored in the Safe Transaction Service.

### `safeOperations.safeOperationHash` (Optional)

- **Type:** `string`

The hash of the Safe operation stored in the Safe Transaction Service.

### `safeOperations.userOperationHash` (Optional)

- **Type:** `string`

The hash of the user operation sent to the bundler.

### `safeAccountDeployment.ethereumTxHash` (Optional)

- **Type:** `string`

The hash of the transaction that deployed the Safe, if a Safe is deployed during the operation.

[send](/reference-sdk-starter-kit/safe-client/send "send")[safeOperations](/reference-sdk-starter-kit/safe-operations "safeOperations")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- SafeClientResult
  - Properties
    - safeAddress
    - description
    - status
    - transactions.safeTxHash(Optional)
    - transactions.ethereumTxHash(Optional)
    - messages.messageHash(Optional)
    - safeOperations.safeOperationHash(Optional)
    - safeOperations.userOperationHash(Optional)
    - safeAccountDeployment.ethereumTxHash(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client-result](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [send](https://docs.safe.global/reference-sdk-starter-kit/safe-client/send)
- [safeOperations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)

### External Links

- [here(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/sdk-starter-kit/src/constants.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

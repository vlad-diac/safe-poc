---
title: addSafeOperation – Safe Docs
url: https://docs.safe.global/reference-sdk-api-kit/addsafeoperation
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# addSafeOperation – Safe Docs

API Kit Reference

addSafeOperation

# `addSafeOperation`

Adds a new ERC-4337 Safe operation for a given Safe account.

ℹ️

The SafeOperations methods are currently compatible with Entrypoint v0.6, which corresponds to `safeModuleVersion` v0.2.0. If you need to use v0.7, you should use the `relay-kit` `Safe4337Pack` class with `safeModuleVersion` v0.3.0, and collect the signatures yourself.

Examples of how to use the `Safe4337Pack` are provided in the following links:

- [Playgrounds (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Guide (opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)

## Usage

A Safe operation can be created by using the [createTransaction](/sdk/relay-kit/reference/safe-4337-pack#createtransactionsafe4337createtransactionprops) method from the `Safe4337Pack`.



example.tsexampleWith4337Pack.tssetup.ts

`_29

import { AddSafeOperationProps } from '@safe-global/api-kit'

_29

import { apiKit } from './setup.ts'

_29

_29

const userOperation = {

_29

sender: '0x...',

_29

nonce: '10',

_29

initCode: '0x...',

_29

callData: '0x...',

_29

callGasLimit: 123n,

_29

verificationGasLimit: 123n,

_29

preVerificationGas: 123n,

_29

maxFeePerGas: 123n,

_29

maxPriorityFeePerGas: 123n,

_29

paymasterAndData: '0x...',

_29

signature: '0x...'

_29

}

_29

_29

const config: AddSafeOperationProps = {

_29

entryPoint: '0x...',

_29

moduleAddress: '0x...',

_29

safeAddress: '0x...',

_29

userOperation,

_29

options: { // Optional

_29

validAfter: currentTimestamp - 60_000, // Optional

_29

validUntil: currentTimestamp + 60_000 // Optional

_29

}

_29

}

_29

_29

await apiKit.addSafeOperation(config)`

## Parameters

### `entryPoint`

- **Type:** `string`

Address of the `EntryPoint` contract.

`_10

await apiKit.addSafeOperation({

_10

entryPoint: '0x...',

_10

moduleAddress: '0x...',

_10

safeAddress: '0x...',

_10

userOperation

_10

})`

### `moduleAddress`

- **Type:** `string`

Address of the `Safe4337Module` contract.

`_10

await apiKit.addSafeOperation({

_10

entryPoint: '0x...',

_10

moduleAddress: '0x...',

_10

safeAddress: '0x...',

_10

userOperation

_10

})`

### `safeAddress`

- **Type:** `string`

Address of the Safe to add a Safe operation for.

`_10

await apiKit.addSafeOperation({

_10

entryPoint: '0x...',

_10

moduleAddress: '0x...',

_10

safeAddress: '0x...',

_10

userOperation

_10

})`

### `safeOperation.sender`

- **Type:** `string`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.nonce`

- **Type:** `string`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.initCode`

- **Type:** `string`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.callData`

- **Type:** `string`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.callGasLimit`

- **Type:** `bigint`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.verificationGasLimit`

- **Type:** `bigint`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.preVerificationGas`

- **Type:** `bigint`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.maxFeePerGas`

- **Type:** `bigint`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.maxPriorityFeePerGas`

- **Type:** `bigint`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.paymasterAndData`

- **Type:** `string`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `safeOperation.signature`

- **Type:** `string`

`_18

await apiKit.addSafeOperation({

_18

entryPoint: '0x...',

_18

moduleAddress: '0x...',

_18

safeAddress: '0x...',

_18

userOperation: {

_18

sender: '0x...',

_18

nonce: '10',

_18

initCode: '0x...',

_18

callData: '0x...',

_18

callGasLimit: 123n,

_18

verificationGasLimit: 123n,

_18

preVerificationGas: 123n,

_18

maxFeePerGas: 123n,

_18

maxPriorityFeePerGas: 123n,

_18

paymasterAndData: '0x...',

_18

signature: '0x...'

_18

}

_18

})`

### `options.validAfter` (Optional)

- **Type:** `number`

The user operation will be valid after this block's timestamp.

`_10

await apiKit.addSafeOperation({

_10

entryPoint: '0x...',

_10

moduleAddress: '0x...',

_10

safeAddress: '0x...',

_10

userOperation,

_10

options: {

_10

validAfter: currentTimestamp - 60_000

_10

}

_10

})`

### `options.validUntil` (Optional)

- **Type:** `number`

The user operation will remain valid until this block's timestamp.

`_10

await apiKit.addSafeOperation({

_10

entryPoint: '0x...',

_10

moduleAddress: '0x...',

_10

safeAddress: '0x...',

_10

userOperation,

_10

options: {

_10

validUntil: currentTimestamp + 60_000

_10

}

_10

})`

[getSafeOperation](/reference-sdk-api-kit/getsafeoperation "getSafeOperation")[getSafeOperationConfirmations](/reference-sdk-api-kit/getsafeoperationconfirmations "getSafeOperationConfirmations")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- addSafeOperation
  - Usage
  - Parameters
    - entryPoint
    - moduleAddress
    - safeAddress
    - safeOperation.sender
    - safeOperation.nonce
    - safeOperation.initCode
    - safeOperation.callData
    - safeOperation.callGasLimit
    - safeOperation.verificationGasLimit
    - safeOperation.preVerificationGas
    - safeOperation.maxFeePerGas
    - safeOperation.maxPriorityFeePerGas
    - safeOperation.paymasterAndData
    - safeOperation.signature
    - options.validAfter(Optional)
    - options.validUntil(Optional)

---

## Related Links

### Internal Links

- [Guide(opens in a new tab)](https://docs.safe.global/sdk/relay-kit/guides/4337-safe-sdk)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [createTransaction](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)
- [https://docs.safe.global/reference-sdk-api-kit/addsafeoperation](https://docs.safe.global/reference-sdk-api-kit/addsafeoperation)

### External Links

- [Playgrounds(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/playground/relay-kit)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

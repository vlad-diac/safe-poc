---
title: safeOperations – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-operations
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# safeOperations – Safe Docs

Starter Kit Reference

safeOperations

# `safeOperations`

This extension extends the `SafeClient` functionality by allowing a bundler and a paymaster to submit [ERC-4337 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337) user operations.

## Usage



example.tssetup.ts

`_20

import { PaymasterOptions } from '@safe-global/relay-kit'

_20

import { BundlerOptions, safeOperations } from '@safe-global/sdk-starter-kit'

_20

import { safeClient } from './setup.ts'

_20

_20

const bundlerOptions: BundlerOptions = {

_20

bundlerUrl: 'https://...'

_20

}

_20

_20

const paymasterOptions: PaymasterOptions = {

_20

isSponsored: true, // Optional

_20

paymasterUrl: 'https://...', // Optional

_20

sponsorshipPolicyId: 'abc', // Optional

_20

paymasterAddress: '0x...', // Optional

_20

paymasterTokenAddress: '0x...', // Optional

_20

amountToApprove: 123n // Optional

_20

}

_20

_20

const safeOperationsClient = await safeClient.extend(

_20

safeOperations(bundlerOptions, paymasterOptions)

_20

)`

## Returns

`Promise<SafeClient & { sendSafeOperation, confirmSafeOperation, getPendingSafeOperation }>`

The `SafeClient` instance with the extended functionality.

## Parameters

### `bundlerOptions.bundlerUrl`

- **Type:** `string`

The URL of the bundler.

`_11

safeOperations(

_11

{ bundlerUrl: 'https://...' },

_11

{

_11

isSponsored: true,

_11

paymasterUrl: 'https://...',

_11

sponsorshipPolicyId: 'abc',

_11

paymasterAddress: '0x...',

_11

paymasterTokenAddress: '0x...',

_11

amountToApprove: 123n

_11

}

_11

)`

### `paymasterOptions.isSponsored` (Optional)

- **Type:** `boolean`

A boolean variable that indicates if the user operation is sponsored or not.

`_11

safeOperations(

_11

{ bundlerUrl: 'https://...' },

_11

{

_11

isSponsored: true,

_11

paymasterUrl: 'https://...',

_11

sponsorshipPolicyId: 'abc',

_11

paymasterAddress: '0x...',

_11

paymasterTokenAddress: '0x...',

_11

amountToApprove: 123n

_11

}

_11

)`

### `paymasterOptions.paymasterUrl`

- **Type:** `string`

The URL of the paymaster.

`_11

safeOperations(

_11

{ bundlerUrl: 'https://...' },

_11

{

_11

isSponsored: true,

_11

paymasterUrl: 'https://...',

_11

sponsorshipPolicyId: 'abc',

_11

paymasterAddress: '0x...',

_11

paymasterTokenAddress: '0x...',

_11

amountToApprove: 123n

_11

}

_11

)`

### `paymasterOptions.sponsorshipPolicyId` (Optional)

- **Type:** `string`

The sponsorship policy id used in the user operation. You can get it from the selected paymaster provider.

`_11

safeOperations(

_11

{ bundlerUrl: 'https://...' },

_11

{

_11

isSponsored: true,

_11

paymasterUrl: 'https://...',

_11

sponsorshipPolicyId: 'abc',

_11

paymasterAddress: '0x...',

_11

paymasterTokenAddress: '0x...',

_11

amountToApprove: 123n

_11

}

_11

)`

### `paymasterOptions.paymasterAddress` (Optional)

- **Type:** `string`

The address of the paymaster.

`_11

safeOperations(

_11

{ bundlerUrl: 'https://...' },

_11

{

_11

isSponsored: true,

_11

paymasterUrl: 'https://...',

_11

sponsorshipPolicyId: 'abc',

_11

paymasterAddress: '0x...',

_11

paymasterTokenAddress: '0x...',

_11

amountToApprove: 123n

_11

}

_11

)`

### `paymasterOptions.paymasterTokenAddress` (Optional)

- **Type:** `string`

The address of the ERC-20 token used to pay for the user operation.

`_11

safeOperations(

_11

{ bundlerUrl: 'https://...' },

_11

{

_11

isSponsored: true,

_11

paymasterUrl: 'https://...',

_11

sponsorshipPolicyId: 'abc',

_11

paymasterAddress: '0x...',

_11

paymasterTokenAddress: '0x...',

_11

amountToApprove: 123n

_11

}

_11

)`

### `paymasterOptions.amountToApprove` (Optional)

- **Type:** `bigint`

The amount of ERC-20 tokens to approve to the paymaster to pay for the user operation.

`_11

safeOperations(

_11

{ bundlerUrl: 'https://...' },

_11

{

_11

isSponsored: true,

_11

paymasterUrl: 'https://...',

_11

sponsorshipPolicyId: 'abc',

_11

paymasterAddress: '0x...',

_11

paymasterTokenAddress: '0x...',

_11

amountToApprove: 123n

_11

}

_11

)`

[SafeClientResult](/reference-sdk-starter-kit/safe-client-result "SafeClientResult")[sendSafeOperation](/reference-sdk-starter-kit/safe-operations/sendsafeoperation "sendSafeOperation")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- safeOperations
  - Usage
  - Returns
  - Parameters
    - bundlerOptions.bundlerUrl
    - paymasterOptions.isSponsored(Optional)
    - paymasterOptions.paymasterUrl
    - paymasterOptions.sponsorshipPolicyId(Optional)
    - paymasterOptions.paymasterAddress(Optional)
    - paymasterOptions.paymasterTokenAddress(Optional)
    - paymasterOptions.amountToApprove(Optional)

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-operations](https://docs.safe.global/reference-sdk-starter-kit/safe-operations)
- [SafeClientResult](https://docs.safe.global/reference-sdk-starter-kit/safe-client-result)
- [sendSafeOperation](https://docs.safe.global/reference-sdk-starter-kit/safe-operations/sendsafeoperation)

### External Links

- [ERC-4337(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

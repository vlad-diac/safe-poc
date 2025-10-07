---
title: confirm – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# confirm – Safe Docs

Starter Kit Reference

SafeClient

confirm

# `confirm`

Confirms a pending multi-signature transaction shared via the Safe Transaction Service.

- If the number of signatures collected in the Safe Transaction Service for a given Safe transaction hash hasn't met the `threshold`, it adds the signature from the connected signer.
- If the number of collected signatures reaches the `threshold`, it executes the Safe transaction.

## Usage



example.tssetup.ts

`_10

import { safeClient } from './setup.ts'

_10

_10

const txResult = await safeClient.confirm({

_10

safeTxHash: '0x...'

_10

})`

## Returns

`Promise<SafeClientResult>`

The result of the confirmed transaction.

## Parameters

### `safeTxHash`

- **Type:** `string`

The hash of the Safe transaction to sign.

`_10

const txResult = await safeClient.confirm({

_10

safeTxHash: '0x...'

_10

})`

[constructor](/reference-sdk-starter-kit/safe-client/constructor "constructor")[createAddOwnerTransaction](/reference-sdk-starter-kit/safe-client/createaddownertransaction "createAddOwnerTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- confirm
  - Usage
  - Returns
  - Parameters
    - safeTxHash

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm](https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm](https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm](https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm](https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm)
- [constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [createAddOwnerTransaction](https://docs.safe.global/reference-sdk-starter-kit/safe-client/createaddownertransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

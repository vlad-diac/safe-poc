---
title: Migrate to v2 – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v2 – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Migrate to v2

# Migrate to v2

This guide references the major changes between v1 and v2 to help those migrating an existing app.

**Note:** When upgrading to `protocol-kit` v2, it's necessary to upgrade to `safe-core-sdk-types` v3.

## Mastercopy to Singleton

To avoid confusion between terms used as synonyms, we aligned all our code to use the word `singleton`.

- Rename `isL1SafeMasterCopy` to `isL1SafeSingleton`

`_10

// old:

_10

SafeFactory.create({ ethAdapter, isL1SafeMasterCopy: true })

_10

_10

// new:

_10

SafeFactory.create({ ethAdapter, isL1SafeSingleton: true })`

## Ethers v6

From `protocolKit v2`, `EthersAdapter` will only be compatible with ethers.js v6. If you still need to use v5, we recommend you keep `protocolKit v1`, but we encourage you to migrate to the latest version when you can.

## Protocol Kit createTransaction() accepts only transaction array

In `protocolKit v1`, the `createTransaction()` method accepted either an object or an array as a parameter. To avoid confusion, we changed it to accept only an array. Here is a migration example:

`_24

// old:

_24

const safeTransactionData = {

_24

to: '',

_24

data: '',

_24

value: '',

_24

nonce: '',

_24

safeTxGas: ''

_24

}

_24

const safeTransaction = protocolKit.createTransaction({ safeTransactionData })

_24

_24

// new:

_24

const safeTransactionData = {

_24

to: '',

_24

data: '',

_24

value: ''

_24

}

_24

const options = {

_24

nonce: '',

_24

safeTxGas: ''

_24

}

_24

const safeTransaction = protocolKit.createTransaction({

_24

transactions: [safeTransactionData],

_24

options

_24

})`

[Migrate to v1](/sdk/protocol-kit/guides/migrate-to-v1 "Migrate to v1")[Migrate to v3](/sdk/protocol-kit/guides/migrate-to-v3 "Migrate to v3")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v2
  - Mastercopy to Singleton
  - Ethers v6
  - Protocol Kit createTransaction() accepts only transaction array

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2)
- [Migrate to v1](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v1)
- [Migrate to v3](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v3)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

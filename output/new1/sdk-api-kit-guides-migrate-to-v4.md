---
title: Migrate to v4 – Safe Docs
url: https://docs.safe.global/sdk/api-kit/guides/migrate-to-v4
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v4 – Safe Docs

SDK

[API Kit](/sdk/api-kit)

Guides

Migrate to v4

# Migrate to v4

This guide references the major changes between v3 and v4 to help those migrating an existing app.

## Use API key for default services

Public unauthenticated endpoints will be deprecated. A new `apiKey` parameter was added to the constructor so you can set your API key when running on Safe default services.

Follow [our guide](/core-api/how-to-use-api-keys) to get an API key.

Once you get your API key, simply pass it to the constructor:

`_16

// old:

_16

import SafeApiKit from '@safe-global/api-kit'

_16

_16

const chainId: bigint = 1n

_16

const apiKit = new SafeApiKit({

_16

chainId

_16

})

_16

_16

//new:

_16

import SafeApiKit from '@safe-global/api-kit'

_16

_16

const chainId: bigint = 1n

_16

const apiKit = new SafeApiKit({

_16

chainId,

_16

apiKey: 'YOUR_API_KEY'

_16

})`

## Updated type

Endpoints returning `SafeMultisigTransactionListResponse` or types based in this one, have been updated to use the latest version. The following methods are affected:

- `getTransaction()`
- `getMultisigTransactions()`
- `getPendingTransactions()`
- `getAllTransactions()`
- `proposeTransaction()`

You can expect the following type changes:

- `nonce`: from `number` to `string`
- `safeTxGas`: from `number` to `string`
- `baseGas`: from `number` to `string`

[Migrate to v3](/sdk/api-kit/guides/migrate-to-v3 "Migrate to v3")[Reference](/sdk/api-kit/guides/migrate-to-v4# "Reference")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v4
  - Use API key for default services
  - Updated type

---

## Related Links

### Internal Links

- [API Kit](https://docs.safe.global/sdk/api-kit)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v4](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v4)
- [our guide](https://docs.safe.global/core-api/how-to-use-api-keys)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v4](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v4)
- [Migrate to v3](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v3)
- [Reference](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v4)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

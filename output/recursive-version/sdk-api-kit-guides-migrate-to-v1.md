---
title: Migrate to v1 – Safe Docs
url: https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v1 – Safe Docs

SDK

[API Kit](/sdk/api-kit)

Guides

Migrate to v1

# Migrate to v1

This guide references the major changes between `safe-service-client` and `api-kit` v1 to help those migrating an existing application.

**Note:** Follow this guide before migrating to `api-kit` v2.

After completing this guide, you can remove `@safe-global/safe-service-client` from your `package.json`.

## Adding the new dependency

To add the API Kit to your project, run the following:

`_10

yarn add @safe-global/api-kit@1.3.1`

Change your initialization like this:

`_15

// old

_15

import SafeServiceClient from '@safe-global/safe-service-client'

_15

_15

const safeService = new SafeServiceClient({

_15

txServiceUrl: 'https://your-transaction-service-url',

_15

ethAdapter

_15

})

_15

_15

// new

_15

import SafeApiKit from '@safe-global/api-kit'

_15

_15

const apiKit = new SafeApiKit({

_15

txServiceUrl: 'https://your-transaction-service-url',

_15

ethAdapter

_15

})`

## `getSafeDelegates()`

The `getSafeDelegates` was updated to accept more filtering parameters. Now, it accepts an object with multiple properties instead of only the `safeAddress` parameter.

`_10

const delegateConfig: GetSafeDelegateProps = {

_10

safeAddress, // Optional

_10

delegateAddress, // Optional

_10

delegatorAddress, // Optional

_10

label, // Optional

_10

limit, // Optional

_10

offset // Optional

_10

}

_10

const delegates: SafeDelegateListResponse = await apiKit.getSafeDelegates(delegateConfig)`

## `addSafeDelegate()`

Parameter object properties were updated as follows:

`_18

// old

_18

const delegateConfig: SafeDelegateConfig = {

_18

safe,

_18

delegate,

_18

label,

_18

signer

_18

}

_18

await safeService.addSafeDelegate(delegateConfig)

_18

_18

// new

_18

const delegateConfig: AddSafeDelegateProps = {

_18

safeAddress, // Optional

_18

delegateAddress,

_18

delegatorAddress,

_18

label,

_18

signer

_18

}

_18

await apiKit.addSafeDelegate(delegateConfig)`

## `removeAllSafeDelegates()`

The method was deprecated and removed.

## `removeSafeDelegate()`

Parameter object properties were updated as follows:

`_15

// old

_15

const delegateConfig: SafeDelegateDeleteConfig = {

_15

safe,

_15

delegate,

_15

signer

_15

}

_15

await safeService.removeSafeDelegate(delegateConfig)

_15

_15

// new

_15

const delegateConfig: DeleteSafeDelegateProps = {

_15

delegateAddress,

_15

delegatorAddress,

_15

signer

_15

}

_15

await apiKit.removeSafeDelegate(delegateConfig)`

## `getBalances()`

The method was deprecated and removed.

## `getUSDBalances()`

The method was deprecated and removed.

## `getCollectibles()`

The method was deprecated and removed.

[Propose and Confirm Transactions](/sdk/api-kit/guides/propose-and-confirm-transactions "Propose and Confirm Transactions")[Migrate to v2](/sdk/api-kit/guides/migrate-to-v2 "Migrate to v2")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v1
  - Adding the new dependency
  - getSafeDelegates()
  - addSafeDelegate()
  - removeAllSafeDelegates()
  - removeSafeDelegate()
  - getBalances()
  - getUSDBalances()
  - getCollectibles()

---

## Related Links

### Internal Links

- [API Kit](https://docs.safe.global/sdk/api-kit)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [Propose and Confirm Transactions](https://docs.safe.global/sdk/api-kit/guides/propose-and-confirm-transactions)
- [Migrate to v2](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

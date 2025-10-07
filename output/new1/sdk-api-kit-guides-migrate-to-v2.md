---
title: Migrate to v2 – Safe Docs
url: https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v2 – Safe Docs

SDK

[API Kit](/sdk/api-kit)

Guides

Migrate to v2

# Migrate to v2

This guide references the major changes between v1 and v2 to help those migrating an existing app.

## API Kit constructor

It won't be necessary to specify a `txServiceUrl` in environments where Safe has a Transaction Service running. Providing the chain ID will be enough. If you want to use your custom service or the kit in a chain not supported by a Safe Transaction Service, you can add the `txServiceUrl` parameter.

`_21

// old:

_21

import SafeApiKit from '@safe-global/api-kit'

_21

_21

const apiKit = new SafeApiKit({

_21

txServiceUrl: 'https://your-transaction-service-url',

_21

ethAdapter

_21

})

_21

_21

// new:

_21

import SafeApiKit from '@safe-global/api-kit'

_21

_21

const chainId: bigint = 1n

_21

const apiKit = new SafeApiKit({

_21

chainId

_21

})

_21

_21

// or set a custom Transaction Service

_21

const apiKit = new SafeApiKit({

_21

chainId,

_21

txServiceUrl: 'https://your-transaction-service-url'

_21

})`

## Use the route you prefer

API Kit v1 forced any custom service to be hosted under the `/api` route of the URL specified in `txServiceUrl`. This isn't the case anymore; you can specify any preferred route or subdomain.

Note that if you use a custom service running under `/api`, you will now need to migrate as follows:

`_13

// old:

_13

const txServiceUrl = 'https://your-transaction-service-domain/'

_13

const apiKit = new SafeApiKit({

_13

txServiceUrl,

_13

ethAdapter

_13

})

_13

// new:

_13

const chainId: bigint = 1n

_13

const txServiceUrl = 'https://your-transaction-service-domain/api'

_13

const apiKit = new SafeApiKit({

_13

chainId,

_13

txServiceUrl

_13

})`

## Mastercopy to Singleton

To avoid confusion between terms used as synonyms, we aligned all our code to use the word `singleton`.

- Rename type `MasterCopyResponse` to `SafeSingletonResponse`
- Rename method `getServiceMasterCopiesInfo()` to `getServiceSingletonsInfo()`

[Migrate to v1](/sdk/api-kit/guides/migrate-to-v1 "Migrate to v1")[Migrate to v3](/sdk/api-kit/guides/migrate-to-v3 "Migrate to v3")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v2
  - API Kit constructor
  - Use the route you prefer
  - Mastercopy to Singleton

---

## Related Links

### Internal Links

- [API Kit](https://docs.safe.global/sdk/api-kit)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2)
- [Migrate to v1](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v1)
- [Migrate to v3](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v3)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

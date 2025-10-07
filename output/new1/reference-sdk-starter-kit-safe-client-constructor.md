---
title: createSafeClient – Safe Docs
url: https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createSafeClient – Safe Docs

Starter Kit Reference

SafeClient

constructor

# `createSafeClient`

Returns an instance of the `SafeClient` class, which enables developers to configure new or existing Safe accounts and handle transactions.

The `SafeClient` class provides a mechanism to extend its functionality via the [`extend`](/reference-sdk-starter-kit/safe-client/extend) method.

## Usage



Existing SafeNew Safe

`_10

import { createSafeClient } from '@safe-global/sdk-starter-kit'

_10

_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeAddress: '0x...',

_10

apiKey: 'YOUR_API_KEY', // Necessary for Safe API interactions

_10

txServiceUrl = 'https://...' // Optional. Use it if you run your own service

_10

})`

Use the `safeAddress` property to use an existing Safe account.

## Returns

`Promise<SafeClient>`

A new instance of the `SafeClient` class.

## Parameters

### `provider`

- **Type:** `Eip1193Provider | HttpTransport | SocketTransport`

The provider connected to the blockchain.

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeAddress: '0x...',

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `signer`

- **Type:** `HexAddress | PrivateKey | PasskeyClient`

The signer connected to the Safe as an owner.

- If it's an address, the same address from the `provider` will be used to sign.
- If it's a private key, its derived address will be used to sign.
- If it's a passkey, the passkey will be used to sign.

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeAddress: '0x...',

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `safeAddress` (Optional)

- **Type:** `HexAddress`

The address of the connected Safe.

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeAddress: '0x...',

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `safeOptions.owners` (Optional)

- **Type:** `string[]`

The list of owners to configure in the Safe.

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeOptions: {

_10

owners: ['0x...', '0x...', '0x...'],

_10

threshold: 2,

_10

saltNonce: '123'

_10

},

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `safeOptions.threshold` (Optional)

- **Type:** `number`

The threshold of the Safe. It must be lower or equal to the number of owners.

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeOptions: {

_10

owners: ['0x...', '0x...', '0x...'],

_10

threshold: 2,

_10

saltNonce: '123'

_10

},

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `safeOptions.saltNonce` (Optional)

- **Type:** `string`

The salt introduces randomness or predictability when the Safe address is generated.

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeOptions: {

_10

owners: ['0x...', '0x...', '0x...'],

_10

threshold: 2,

_10

saltNonce: '123'

_10

}

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `apiKey` (Optional)

- **Type:** `string`

The API key for the Safe Transaction Service. This parameter is mandatory when using default Safe provided services. It can be omitted if using a custom Transaction Service. [Check how to get one](/core-api/how-to-use-api-keys).

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeAddress: '0x...',

_10

apiKey: 'YOUR_API_KEY'

_10

})`

### `txServiceUrl` (Optional)

- **Type:** `string`

The URL of the Safe Transaction Service. This can be provided instead of `apiKey` to specify a custom Transaction Service endpoint, such as when running your own Safe Transaction Service instance.

`_10

const safeClient = await createSafeClient({

_10

provider,

_10

signer,

_10

safeAddress: '0x...',

_10

txServiceUrl: 'https://...'

_10

})`

[Overview](/reference-sdk-starter-kit/overview "Overview")[confirm](/reference-sdk-starter-kit/safe-client/confirm "confirm")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createSafeClient
  - Usage
  - Returns
  - Parameters
    - provider
    - signer
    - safeAddress(Optional)
    - safeOptions.owners(Optional)
    - safeOptions.threshold(Optional)
    - safeOptions.saltNonce(Optional)
    - apiKey(Optional)
    - txServiceUrl(Optional)

---

## Related Links

### Internal Links

- [extend](https://docs.safe.global/reference-sdk-starter-kit/safe-client/extend)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [Check how to get one](https://docs.safe.global/core-api/how-to-use-api-keys)
- [https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor](https://docs.safe.global/reference-sdk-starter-kit/safe-client/constructor)
- [Overview](https://docs.safe.global/reference-sdk-starter-kit/overview)
- [confirm](https://docs.safe.global/reference-sdk-starter-kit/safe-client/confirm)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

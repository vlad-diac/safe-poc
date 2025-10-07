---
title: createConfig – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/createconfig
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createConfig – Safe Docs

React Hooks Reference

createConfig

# `createConfig`

Returns the configuration object required to initialize the Safe React Hooks.

## Usage

It can be used to initialize the [`SafeProvider`](/reference-sdk-react-hooks/safeprovider) or any of the Safe React Hooks. The global configuration will be overwritten within the scope of a hook if a hook is created with a custom configuration.



SafeProvider configurationHook configuration

`_15

import ReactDOM from 'react-dom/client'

_15

import { createConfig, SafeProvider } from '@safe-global/safe-react-hooks'

_15

import App from './App.tsx'

_15

_15

const config = createConfig({

_15

// ...

_15

})

_15

_15

const root = document.getElementById('root')

_15

_15

ReactDOM.createRoot(root).render(

_15

<SafeProvider config={config}>

_15

<App />

_15

</SafeProvider>

_15

)`

The `createConfig` parameters vary depending on if you want to connect a Safe account that is already deployed or you want to deploy a new one.



Existing SafeNew Safe

Use the `safeAddress` property to use an existing Safe account.

`_10

import { createConfig } from '@safe-global/safe-react-hooks'

_10

import { sepolia } from 'viem/chains'

_10

_10

const config = createConfig({

_10

chain: sepolia

_10

provider,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

## Parameters

`CreateConfigParams`

`_10

import { CreateConfigParams } from '@safe-global/safe-react-hooks'`

### `chain`

- **Type:** `Chain`

The connected chain.

`_10

const config = createConfig({

_10

chain: sepolia,

_10

provider,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

### `provider`

- **Type:** `Eip1193Provider | HttpTransport | SocketTransport`

The provider connected to the blockchain.

`_10

const config = createConfig({

_10

chain: sepolia,

_10

provider,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

### `signer`

- **Type:** `HexAddress | PrivateKey | PasskeyClient`

The signer connected to the Safe as an owner.

- If it's an address, the same address from the `provider` will be used to sign.
- If it's a private key, its derived address will be used to sign.
- If it's a passkey, the passkey will be used to sign.

`_10

const config = createConfig({

_10

chain: sepolia

_10

provider,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

### `safeAddress` (Optional)

- **Type:** `HexAddress`

The address of the connected Safe.

`_10

const config = createConfig({

_10

chain: sepolia

_10

provider,

_10

signer,

_10

safeAddress: '0x...'

_10

})`

### `safeOptions` (Optional)

#### `owners`

- **Type:** `string[]`

The list of owners to configure in the Safe.

`_10

const config = createConfig({

_10

chain: sepolia

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

saltNonce: 123n

_10

}

_10

})`

#### `threshold`

- **Type:** `number`

The threshold of the Safe. It must be lower or equal to the number of owners.

`_10

const config = createConfig({

_10

chain: sepolia

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

saltNonce: 123n

_10

}

_10

})`

#### `saltNonce` (Optional)

- **Type:** `string`

The salt introduces randomness or predictability when the Safe address is generated.

`_10

const config = createConfig({

_10

chain: sepolia

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

saltNonce: 123n

_10

}

_10

})`

## Returns

`SafeConfig`

The Safe React Hooks configuration.

`_10

import { SafeConfig } from '@safe-global/safe-react-hooks'`

[SafeProvider](/reference-sdk-react-hooks/safeprovider "SafeProvider")[useConfirmTransaction](/reference-sdk-react-hooks/useconfirmtransaction "useConfirmTransaction")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createConfig
  - Usage
  - Parameters
    - chain
    - provider
    - signer
    - safeAddress(Optional)
    - safeOptions(Optional)
      - owners
      - threshold
      - saltNonce(Optional)
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [https://docs.safe.global/reference-sdk-react-hooks/createconfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [SafeProvider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [useConfirmTransaction](https://docs.safe.global/reference-sdk-react-hooks/useconfirmtransaction)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

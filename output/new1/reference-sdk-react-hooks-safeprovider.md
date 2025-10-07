---
title: SafeProvider – Safe Docs
url: https://docs.safe.global/reference-sdk-react-hooks/safeprovider
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# SafeProvider – Safe Docs

React Hooks Reference

SafeProvider

# `SafeProvider`

The `SafeProvider` is a [context provider (opens in a new tab)](https://react.dev/reference/react/createContext#provider) that wraps a React application and makes all the Safe React Hooks available within the application with a global configuration.

## Usage

Any component that uses a Safe React Hook requires a `SafeProvider` to be present somewhere in its parent component tree.

`_22

import ReactDOM from 'react-dom/client'

_22

import { createConfig, SafeProvider } from '@safe-global/safe-react-hooks'

_22

import { sepolia } from 'viem/chains'

_22

import App from './App.tsx'

_22

_22

const config = createConfig({

_22

chain: sepolia,

_22

provider,

_22

signer,

_22

safeOptions: {

_22

owners: ['0x...', '0x...', '0x...'],

_22

threshold: 2

_22

}

_22

})

_22

_22

const root = document.getElementById('root')

_22

_22

ReactDOM.createRoot(root).render(

_22

<SafeProvider config={config}>

_22

<App />

_22

</SafeProvider>

_22

)`

## Parameters

### `config`

- **Type**: `SafeConfig`

The configuration object required to connect and setup a Safe account in the application.

Use the [`createConfig`](/reference-sdk-react-hooks/createconfig) function to create the configuration object.

[Overview](/reference-sdk-react-hooks/overview "Overview")[createConfig](/reference-sdk-react-hooks/createconfig "createConfig")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- SafeProvider
  - Usage
  - Parameters
    - config

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-react-hooks/safeprovider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/safeprovider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [https://docs.safe.global/reference-sdk-react-hooks/safeprovider](https://docs.safe.global/reference-sdk-react-hooks/safeprovider)
- [createConfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)
- [Overview](https://docs.safe.global/reference-sdk-react-hooks/overview)
- [createConfig](https://docs.safe.global/reference-sdk-react-hooks/createconfig)

### External Links

- [context provider(opens in a new tab)](https://react.dev/reference/react/createContext)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

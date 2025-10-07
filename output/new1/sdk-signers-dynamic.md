---
title: Dynamic Signer – Safe Docs
url: https://docs.safe.global/sdk/signers/dynamic
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Dynamic Signer – Safe Docs

SDK

[Signers](/sdk/signers)

Dynamic

# Dynamic Signer

In this guide, you will learn how to create a [Dynamic (opens in a new tab)](https://dynamic.xyz) signer that can be added as a Safe owner and used to initialize any of the kits from the Safe{Core} SDK.

Check out the [Safe Signers demo app (opens in a new tab)](https://github.com/5afe/safe-signers) on GitHub to follow along this guide with the completed code.

Note that this guide will focus on supporting Ethereum and EVM-compatible wallets. You can enable, import and add [more connectors (opens in a new tab)](https://docs.dynamic.xyz/chains/enabling-chains#enabling-a-chain-network) as needed.

## Prerequisites

- A [Dynamic account (opens in a new tab)](https://app.dynamic.xyz) and an environment ID.

## Install dependencies



npmyarnpnpm

`_10

npm install @dynamic-labs/sdk-react-core @dynamic-labs/ethereum`

## Steps

### Imports

Here are the necessary imports for this guide.

`_10

import {

_10

DynamicContextProvider,

_10

useDynamicContext,

_10

useIsLoggedIn

_10

} from '@dynamic-labs/sdk-react-core'

_10

import {

_10

EthereumWalletConnectors,

_10

isEthereumWallet

_10

} from '@dynamic-labs/ethereum'`

### Get the Environment ID

Once you create a new Dynamic project in [the dashboard (opens in a new tab)](https://app.dynamic.xyz), you will find your environment ID in [the SDK & API Keys page (opens in a new tab)](https://app.dynamic.xyz/dashboard/developer/api).

Once you have it, you need to initialize the `DYNAMIC_ENVIRONMENT_ID` variable with it.

`_10

const DYNAMIC_ENVIRONMENT_ID = // ...`

### Initialize Dynamic

Dynamic works with React hooks. This means you can wrap your app with the `DynamicContextProvider` and have access to several react hooks like `useDynamicContext()` that will provide all the functionality.

`DynamicContextProvider` receives an `environmentId` and other configuration options. Check [Dynamic React SDK documentation (opens in a new tab)](https://docs.dynamic.xyz/sdks/react-sdk/providers/dynamiccontextprovider) to learn more about all the different configuration options.

`_10

<DynamicContextProvider

_10

settings={{

_10

environmentId: DYNAMIC_ENVIRONMENT_ID,

_10

walletConnectors: [EthereumWalletConnectors],

_10

// Add other configuration options as needed

_10

}}

_10

>

_10

<App />

_10

</DynamicContextProvider>`

In this guide you will use the `primaryWallet` from the `useDynamicContext()` hook, and the `useIsLoggedIn()` hook.

`_10

const { primaryWallet } = useDynamicContext()

_10

const isLoggedIn = useIsLoggedIn()`

### Login

In the `App` component, add [the DynamicWidget component (opens in a new tab)](https://docs.dynamic.xyz/sdks/react-sdk/components/dynamicwidget) that will handle all the login and authentication logic for you.

`_10

import { DynamicWidget } from '@dynamic-labs/sdk-react-core'

_10

_10

const App = () => {

_10

return (

_10

<>

_10

// Your other content here

_10

<DynamicWidget />

_10

</>

_10

)

_10

}`

### Get the provider and signer

Once the user is logged in through the `DynamicWidget`, you can get the `provider` and `signer`, which is the externally-owned account of the user that was derived from its credentials.

To do that there is a `useEffect()` that executes when any of the `isLoggedIn` and `primaryWallet` variables have their values updated. Once they are all `true`, you have access to the user's connected signer. Note that you should also check that the wallet is an Ethereum wallet using the `isEthereumWallet()` function.

You can instantiate the provider and signer like so:

`_10

useEffect(() => {

_10

const init = async () => {

_10

if (isLoggedIn && primaryWallet && isEthereumWallet(primaryWallet)) {

_10

const provider = await primaryWallet.getWalletClient()

_10

_10

const signer = primaryWallet.address

_10

}

_10

}

_10

init()

_10

}, [isLoggedIn, primaryWallet])`

With the `provider` and `signer` you are ready to instantiate any of the kits from the Safe{Core} SDK and set up or use this signer as a Safe owner.

## Recap and further reading

After following this guide, you are able to create a Safe signer using Dynamic and get the `provider` and `signer` required to initialize the kits from the Safe{Core} SDK.

Learn more about Dynamic by checking the following resources:

- [Dynamic website (opens in a new tab)](https://dynamic.xyz)
- [Dynamic documentation (opens in a new tab)](https://docs.dynamic.xyz)
- [Dynamic quickstart guide (opens in a new tab)](https://docs.dynamic.xyz/quickstart)
- [Dynamic in a Safe App (opens in a new tab)](https://docs.dynamic.xyz/guides/integrations/safe-app)

[Signers](/sdk/signers "Signers")[Magic](/sdk/signers/magic "Magic")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Dynamic Signer
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Get the Environment ID
    - Initialize Dynamic
    - Login
    - Get the provider and signer
  - Recap and further reading

---

## Related Links

### Internal Links

- [Signers](https://docs.safe.global/sdk/signers)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [https://docs.safe.global/sdk/signers/dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [Signers](https://docs.safe.global/sdk/signers)
- [Magic](https://docs.safe.global/sdk/signers/magic)

### External Links

- [Dynamic(opens in a new tab)](https://dynamic.xyz)
- [Safe Signers demo app(opens in a new tab)](https://github.com/5afe/safe-signers)
- [more connectors(opens in a new tab)](https://docs.dynamic.xyz/chains/enabling-chains)
- [Dynamic account(opens in a new tab)](https://app.dynamic.xyz)
- [the dashboard(opens in a new tab)](https://app.dynamic.xyz)
- [the SDK & API Keys page(opens in a new tab)](https://app.dynamic.xyz/dashboard/developer/api)
- [Dynamic React SDK documentation(opens in a new tab)](https://docs.dynamic.xyz/sdks/react-sdk/providers/dynamiccontextprovider)
- [the DynamicWidget component(opens in a new tab)](https://docs.dynamic.xyz/sdks/react-sdk/components/dynamicwidget)
- [Dynamic website(opens in a new tab)](https://dynamic.xyz)
- [Dynamic documentation(opens in a new tab)](https://docs.dynamic.xyz)

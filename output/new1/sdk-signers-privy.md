---
title: Privy Signer – Safe Docs
url: https://docs.safe.global/sdk/signers/privy
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Privy Signer – Safe Docs

SDK

[Signers](/sdk/signers)

Privy

# Privy Signer

In this guide, you will learn how to create a [Privy (opens in a new tab)](https://privy.io) signer that can be added as a Safe owner and used to initialize any of the kits from the Safe{Core} SDK.

Check out the [Safe Signers demo app (opens in a new tab)](https://github.com/5afe/safe-signers) on GitHub to follow along this guide with the completed code.

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- A [Privy account (opens in a new tab)](https://dashboard.privy.io) and an App ID.

## Install dependencies



npmyarnpnpm

`_10

npm install @privy-io/react-auth`

## Steps

### Imports

Here are the necessary imports for this guide.

`_10

import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth'`

In addition, you will need to import a web3 library of your choice to use in the "Get the provider and signer" section. In this guide, we are using `viem`.

### Get the App ID

Check Privy documentation on how to create a new project in their [dashboard (opens in a new tab)](https://dashboard.privy.io) and [get the client ID (opens in a new tab)](https://docs.privy.io/guide/react/configuration/app-clients#app-clients).

Once you have it, you need to initialize the `PRIVY_APP_ID` variable with it.

`_10

const PRIVY_APP_ID = // ...`

### Initialize Privy

Privy works with React hooks. This means you can wrap your app with the `PrivyProvider` and have access to several react hooks like `usePrivy()` and `useWallets()` that will provide all the functionality.

`ProvyProvider` receives an `appId` and a `config` object with different properties. Check [Using the Privy React SDK (opens in a new tab)](https://docs.privy.io/guide/react/concepts/use-privy#the-privyprovider-component) from Privy documentation to learn more about all the different configuration options, appearance, login methods, etc.

`_10

<PrivyProvider

_10

appId={PRIVY_APP_ID}

_10

config={{

_10

embeddedWallets: {

_10

createOnLogin: 'users-without-wallets' // defaults to 'off'

_10

}

_10

}}

_10

>

_10

<App />

_10

</PrivyProvider>`

In this guide you will use the following variables and methods from the `usePrivy()` and `useWallets()` React hooks.

`_10

const { login, logout, ready, authenticated } = usePrivy()

_10

const { ready: readyWallets, wallets } = useWallets()`

### Login

To login with an email address or social account you need to call the following method, that will open the popup and request the user to submit the login form.

`_10

login()`

### Get the provider and signer

Once the user is logged in, you can get the `provider` and `signer`, which is the externally-owned account of the user that was derived from its credentials.

To do that there is a `useEffect()` that is executed when any of the `ready`, `authenticated`, `readyWallets` and `wallets` variables have its value updated. Once they all are `true` and `wallets` has a length greater than zero, you have access to the `wallets` first element, which is the user's connected signer.

viem

You can instantiate the provider using `viem` and the following imports:

`_10

import { createWalletClient, custom } from 'viem'

_10

import { sepolia } from 'viem/chains'`

`_15

useEffect(() => {

_15

const init = async () => {

_15

if (ready && authenticated && readyWallets && wallets.length > 0 ) {

_15

const ethereumProvider = await wallets[0].getEthereumProvider()

_15

_15

const provider = createWalletClient({

_15

chain: sepolia,

_15

transport: custom(ethereumProvider)

_15

})

_15

_15

const signer = wallets[0].address

_15

}

_15

}

_15

init()

_15

}, [ready, authenticated, readyWallets, wallets])`

With the `provider` and `signer` you are ready to instantiate any of the kits from the Safe{Core} SDK and set up or use this signer as a Safe owner.

### Logout

Finally, to logout the user, call the `logout()` method.

`_10

logout()`

## Recap and further reading

After following this guide, you are able to create a Safe signer using Privy and get the `provider` and `signer` required to initialize the kits from the Safe{Core} SDK.

Learn more about Privy by checking the following resources:

- [Privy website (opens in a new tab)](https://privy.io)
- [Privy documentation (opens in a new tab)](https://docs.privy.io)
- [Privy quickstart guide (opens in a new tab)](https://docs.privy.io/guide/react/quickstart)

[Passkeys](/sdk/signers/passkeys "Passkeys")[Web3Auth](/sdk/signers/web3auth "Web3Auth")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Privy Signer
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Get the App ID
    - Initialize Privy
    - Login
    - Get the provider and signer
    - Logout
  - Recap and further reading

---

## Related Links

### Internal Links

- [Signers](https://docs.safe.global/sdk/signers)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [https://docs.safe.global/sdk/signers/privy](https://docs.safe.global/sdk/signers/privy)
- [Passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [Web3Auth](https://docs.safe.global/sdk/signers/web3auth)

### External Links

- [Privy(opens in a new tab)](https://privy.io)
- [Safe Signers demo app(opens in a new tab)](https://github.com/5afe/safe-signers)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Privy account(opens in a new tab)](https://dashboard.privy.io)
- [dashboard(opens in a new tab)](https://dashboard.privy.io)
- [get the client ID(opens in a new tab)](https://docs.privy.io/guide/react/configuration/app-clients)
- [Using the Privy React SDK(opens in a new tab)](https://docs.privy.io/guide/react/concepts/use-privy)
- [Privy website(opens in a new tab)](https://privy.io)
- [Privy documentation(opens in a new tab)](https://docs.privy.io)
- [Privy quickstart guide(opens in a new tab)](https://docs.privy.io/guide/react/quickstart)

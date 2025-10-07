---
title: Web3Auth Signer – Safe Docs
url: https://docs.safe.global/sdk/signers/web3auth
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Web3Auth Signer – Safe Docs

SDK

[Signers](/sdk/signers)

Web3Auth

# Web3Auth Signer

In this guide, you will learn how to create a [Web3Auth (opens in a new tab)](https://web3auth.io) signer that can be added as a Safe owner and used to initialize any of the kits from the Safe{Core} SDK.

Check out the [Safe Signers demo app (opens in a new tab)](https://github.com/5afe/safe-signers) on GitHub to follow along this guide with the completed code.

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- A [Web3Auth account (opens in a new tab)](https://dashboard.web3auth.io) and a Client ID.

## Install dependencies



npmyarnpnpm

`_10

npm install @web3auth/modal @web3auth/base @web3auth/ethereum-provider`

## Steps

### Imports

Here are the necessary imports for this guide.

`_10

import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base'

_10

import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'

_10

import { Web3Auth } from '@web3auth/modal'`

In addition, you will need to import a web3 library of your choice to use in the "Get the provider and signer" section. In this guide, we are using `viem`.

### Get the Client ID

Check Web3Auth documentation on how to create a new project in their [dashboard (opens in a new tab)](https://dashboard.web3auth.io) and [get the client ID (opens in a new tab)](https://web3auth.io/docs/dashboard-setup/projects-and-analytics#client-id).

Once you have it, you need to initialize the `WEB3AUTH_CLIENT_ID` variable with it.

`_10

const WEB3AUTH_CLIENT_ID = // ...`

### Initialize Web3Auth

Web3Auth initialization is done by instantiating the `Web3Auth` class with a `clientId`, a `privateKeyProvider` and some other configuration parameters like `web3AuthNetwork`, depending on if you are using it in a development or production environment. The full list of parameters can be checked in the [Instantiating Web3Auth guide (opens in a new tab)](https://web3auth.io/docs/sdk/pnp/web/modal/initialize#instantiating-web3auth) from Web3Auth.

To instantiate the `privateKeyProvider` you need to define the configuration of the selected chain for the signer with several properties like the ones listed below as an example for Sepolia testnet.

After initializing the `web3auth` instance, you need to call the `initModal()` method.

`_22

const chainConfig = {

_22

chainNamespace: CHAIN_NAMESPACES.EIP155,

_22

chainId: '0xaa36a7',

_22

rpcTarget: 'https://ethereum-sepolia-rpc.publicnode.com',

_22

displayName: 'Ethereum Sepolia Testnet',

_22

blockExplorerUrl: 'https://sepolia.etherscan.io',

_22

ticker: 'ETH',

_22

tickerName: 'Ethereum',

_22

logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'

_22

}

_22

_22

const privateKeyProvider = new EthereumPrivateKeyProvider({

_22

config: { chainConfig }

_22

})

_22

_22

const web3auth = new Web3Auth({

_22

clientId: WEB3AUTH_CLIENT_ID,

_22

privateKeyProvider,

_22

web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET

_22

})

_22

_22

await web3auth.initModal()`

### Login

To login with an email address or social account you need to call the following method, that will open the popup and request the user to submit the login form.

`_10

const web3authProvider = await web3auth.connect()`

### Get the provider and signer

Once the user is logged in, you can get the `provider` and `signer`, which is the externally-owned account of the user that was derived from its credentials.

viem

You can instantiate the provider using `viem` and the following imports:

`_10

import { createWalletClient, custom } from 'viem'

_10

import { sepolia } from 'viem/chains'`

`_10

const provider = createWalletClient({

_10

chain: sepolia,

_10

transport: custom(web3authProvider)

_10

})

_10

_10

const signer = await provider.getAddresses())[0]`

With the `provider` and `signer` you are ready to instantiate any of the kits from the Safe{Core} SDK and set up or use this signer as a Safe owner.

### Logout

Finally, to logout the user, call the `logout()` method.

`_10

await web3auth.logout()`

## Recap and further reading

After following this guide, you are able to create a Safe signer using Web3Auth and get the `provider` and `signer` required to initialize the kits from the Safe{Core} SDK.

Learn more about Web3Auth by checking the following resources:

- [Web3Auth website (opens in a new tab)](https://web3auth.io)
- [Web3Auth documentation (opens in a new tab)](https://web3auth.io/docs)
- [Web3Auth quickstart guide (opens in a new tab)](https://web3auth.io/docs/quick-start?product=PNP&sdk=PNP_MODAL&framework=REACT&stepIndex=0&stepIndex=1)

[Privy](/sdk/signers/privy "Privy")[On-chain Tracking](/sdk/onchain-tracking "On-chain Tracking")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Web3Auth Signer
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Get the Client ID
    - Initialize Web3Auth
    - Login
    - Get the provider and signer
    - Logout
  - Recap and further reading

---

## Related Links

### Internal Links

- [Signers](https://docs.safe.global/sdk/signers)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [https://docs.safe.global/sdk/signers/web3auth](https://docs.safe.global/sdk/signers/web3auth)
- [Privy](https://docs.safe.global/sdk/signers/privy)
- [On-chain Tracking](https://docs.safe.global/sdk/onchain-tracking)

### External Links

- [Web3Auth(opens in a new tab)](https://web3auth.io)
- [Safe Signers demo app(opens in a new tab)](https://github.com/5afe/safe-signers)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Web3Auth account(opens in a new tab)](https://dashboard.web3auth.io)
- [dashboard(opens in a new tab)](https://dashboard.web3auth.io)
- [get the client ID(opens in a new tab)](https://web3auth.io/docs/dashboard-setup/projects-and-analytics)
- [Instantiating Web3Auth guide(opens in a new tab)](https://web3auth.io/docs/sdk/pnp/web/modal/initialize)
- [Web3Auth website(opens in a new tab)](https://web3auth.io)
- [Web3Auth documentation(opens in a new tab)](https://web3auth.io/docs)
- [Web3Auth quickstart guide(opens in a new tab)](https://web3auth.io/docs/quick-start?product=PNP&sdk=PNP_MODAL&framework=REACT&stepIndex=0&stepIndex=1)

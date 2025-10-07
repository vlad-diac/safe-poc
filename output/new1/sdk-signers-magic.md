---
title: Magic Signer – Safe Docs
url: https://docs.safe.global/sdk/signers/magic
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Magic Signer – Safe Docs

SDK

[Signers](/sdk/signers)

Magic

# Magic Signer

In this guide, you will learn how to create a [Magic (opens in a new tab)](https://magic.link/) signer that can be added as a Safe owner and used to initialize any of the kits from the Safe{Core} SDK.

Check out the [Safe Signers demo app (opens in a new tab)](https://github.com/5afe/safe-signers) on GitHub to follow along this guide with the completed code.

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- A [Magic account (opens in a new tab)](https://dashboard.magic.link) and an API key.

## Install dependencies



npmyarnpnpm

`_10

npm install magic-sdk`

## Steps

### Imports

Here are the necessary imports for this guide.

`_10

import { Magic } from 'magic-sdk'`

In addition, you will need to import a web3 library of your choice to use in the "Get the provider and signer" section. In this guide, we are using `viem`.

### Get the API Key

Check Magic documentation on how to create a new project in their [dashboard (opens in a new tab)](https://dashboard.magic.link) and [get the API key. (opens in a new tab)](https://magic.link/docs/home/quickstart/cli#add-your-api-key)

Once you have it, you need to initialize the `MAGIC_API_KEY` variable with it.

`_10

const MAGIC_API_KEY = // ...`

### Initialize Magic

Magic initialization is done by instantiating the `Magic` class with an `MAGIC_API_KEY`. Optionally, it also accepts some configuration parameters that can be checked in the [Magic Web API Reference (opens in a new tab)](https://magic.link/docs/api/client-side-sdks/web).

`_10

const magic = new Magic(MAGIC_API_KEY)`

### Login

To login with an email address or social account you need to call the following method, that will open the popup and request the user to submit the login form.

`_10

await magic.wallet.connectWithUI()`

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

transport: custom(magic.rpcProvider)

_10

})

_10

_10

const metadata = await magic.user.getInfo()

_10

const signer = metadata.publicAddress`

With the `provider` and `signer` you are ready to instantiate any of the kits from the Safe{Core} SDK and set up or use this signer as a Safe owner.

### Logout

Finally, to logout the user, call the `logout()` method.

`_10

await magic.user.logout()`

## Recap and further reading

After following this guide, you are able to create a Safe signer using Magic and get the `provider` and `signer` required to initialize the kits from the Safe{Core} SDK.

Learn more about Magic by checking the following resources:

- [Magic website (opens in a new tab)](https://magic.link)
- [Magic documentation (opens in a new tab)](https://magic.link/docs)
- [Magic quickstart guide (opens in a new tab)](https://magic.link/docs/home/quickstart/cli)

[Dynamic](/sdk/signers/dynamic "Dynamic")[Passkeys](/sdk/signers/passkeys "Passkeys")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Magic Signer
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Get the API Key
    - Initialize Magic
    - Login
    - Get the provider and signer
    - Logout
  - Recap and further reading

---

## Related Links

### Internal Links

- [Signers](https://docs.safe.global/sdk/signers)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [https://docs.safe.global/sdk/signers/magic](https://docs.safe.global/sdk/signers/magic)
- [Dynamic](https://docs.safe.global/sdk/signers/dynamic)
- [Passkeys](https://docs.safe.global/sdk/signers/passkeys)

### External Links

- [Magic(opens in a new tab)](https://magic.link)
- [Safe Signers demo app(opens in a new tab)](https://github.com/5afe/safe-signers)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Magic account(opens in a new tab)](https://dashboard.magic.link)
- [dashboard(opens in a new tab)](https://dashboard.magic.link)
- [get the API key.(opens in a new tab)](https://magic.link/docs/home/quickstart/cli)
- [Magic Web API Reference(opens in a new tab)](https://magic.link/docs/api/client-side-sdks/web)
- [Magic website(opens in a new tab)](https://magic.link)
- [Magic documentation(opens in a new tab)](https://magic.link/docs)
- [Magic quickstart guide(opens in a new tab)](https://magic.link/docs/home/quickstart/cli)

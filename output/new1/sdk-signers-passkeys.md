---
title: Passkeys Signer – Safe Docs
url: https://docs.safe.global/sdk/signers/passkeys
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Passkeys Signer – Safe Docs

SDK

[Signers](/sdk/signers)

Passkeys

# Passkeys Signer

In this guide, you will learn how to create a Passkey signer that can be added as a Safe owner and used to initialize any of the kits from the Safe{Core} SDK.

⚠️

Please always use a combination of passkeys and other authentication methods to ensure the security of your users' assets.

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- Passkeys feature is available only in [secure contexts (opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS), in some or all [supporting browsers (opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility).

## Install dependencies



npmyarnpnpm

`_10

npm install @safe-global/protocol-kit`

## Steps

### Imports

Here are the necessary imports for this guide.

`_10

import Safe from '@safe-global/protocol-kit'`

In addition, you will need to import a web3 library of your choice to use in the "Get the provider and signer" section. In this guide, we are using `viem`.

### Create a passkey

Firstly, you need to generate a passkey credential using the [WebAuthn API (opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) in a supporting browser environment.

`_25

const RP_NAME = 'Safe Smart Account'

_25

const USER_DISPLAY_NAME = 'User display name'

_25

const USER_NAME = 'User name'

_25

_25

const passkeyCredential = await navigator.credentials.create({

_25

publicKey: {

_25

pubKeyCredParams: [

_25

{

_25

alg: -7,

_25

type: 'public-key'

_25

}

_25

],

_25

challenge: crypto.getRandomValues(new Uint8Array(32)),

_25

rp: {

_25

name: RP_NAME

_25

},

_25

user: {

_25

displayName: USER_DISPLAY_NAME,

_25

id: crypto.getRandomValues(new Uint8Array(32)),

_25

name: USER_NAME

_25

},

_25

timeout: 60_000,

_25

attestation: 'none'

_25

}

_25

})`

After generating the `passkeyCredential` object, you need to create the signer. This signer will be a `PasskeyArgType` object containing the `rawId` and the `coordinates` information.

`_10

if (!passkeyCredential) {

_10

throw Error('Passkey creation failed: No credential was returned.')

_10

}

_10

_10

const passkeySigner = await Safe.createPasskeySigner(passkeyCredential)`

At this point, it's critical to securely store the information in the `passkeySigner` object in a persistent service. Losing access to this data will result in the user being unable to access their passkey and, therefore, their Safe Smart Account.

### Get the provider and signer

Once the passkey is created, you need the `provider` and `signer` properties required to instantiate the Safe{Core} SDK kits.

Check [how to initialize the Protocol Kit](/reference-sdk-protocol-kit/initialization/init)

viem

You can instantiate the provider using `viem` and the following imports:

`_10

import { createWalletClient, http } from 'viem'

_10

import { sepolia } from 'viem/chains

_10

_10

const provider = createWalletClient({

_10

chain: sepolia,

_10

transport: http('https://rpc.ankr.com/eth_sepolia')

_10

})

_10

const signer = passkey`

### Instantiate SDK

With the `provider` and `signer` you are ready to instantiate any of the kits from the Safe{Core} SDK and set up or use this signer as a Safe owner.

For example, you can instantiate the `protocol-kit` as follows and sign a transaction with the passkey signer:

`_10

const protocolKit = await Safe.init({ provider, signer, safeAddress })

_10

_10

const transaction = { to: '0x1234', value: '0x0', data: '0x' }

_10

const safeTransaction = await protocolKit.createTransaction({ transactions: [transaction] })

_10

const signedSafeTransaction = await protocolKit.signTransaction(safeTransaction)`

## Recap and further reading

After following this guide, you are able to create a Safe signer using passkeys and get the `provider` and `signer` required to initialize the kits from the Safe{Core} SDK.

- [Safe Passkeys contracts (opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/passkey)

[Magic](/sdk/signers/magic "Magic")[Privy](/sdk/signers/privy "Privy")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Passkeys Signer
  - Prerequisites
  - Install dependencies
  - Steps
    - Imports
    - Create a passkey
    - Get the provider and signer
    - Instantiate SDK
  - Recap and further reading

---

## Related Links

### Internal Links

- [Signers](https://docs.safe.global/sdk/signers)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [how to initialize the Protocol Kit](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [https://docs.safe.global/sdk/signers/passkeys](https://docs.safe.global/sdk/signers/passkeys)
- [Magic](https://docs.safe.global/sdk/signers/magic)
- [Privy](https://docs.safe.global/sdk/signers/privy)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [secure contexts(opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)
- [supporting browsers(opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
- [WebAuthn API(opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
- [Safe Passkeys contracts(opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/passkey)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

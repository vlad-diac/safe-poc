---
title: createPasskeySigner – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createPasskeySigner – Safe Docs

Protocol Kit Reference

Passkeys

createPasskeySigner

# `createPasskeySigner`

Creates a new passkey signer using a [WebAuthn credential (opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Credential).

## Usage

`_10

const rpcUrl = "https://..."

_10

const credential = window.navigator.credentials.create({ ... })

_10

_10

const passkeySigner = await Safe.createPasskeySigner(credential)

_10

_10

const protocolKit = await Safe.init({

_10

provider: rpcURL,

_10

signer: passkeySigner,

_10

safeAddress

_10

})`

## Parameters

### `credential`

- **Type**: `Credential`

The WebAuthn credential to use for signing.

`_10

const passkeySigner = await Safe.createPasskeySigner(

_10

credential

_10

)`

## Returns

`Promise<Pick<PasskeyArgType, 'rawId' | 'coordinates'>>`

An object containing the passkey signer that should be stored securely containing:

- `rawId`: The `rawId` of the credential.
- `coordinates`: The coordinates of the credential. The coordinates are used to sign using Safe smart contracts

[createEnableFallbackHandlerTx](/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx "createEnableFallbackHandlerTx")[getOnchainIdentifier](/reference-sdk-protocol-kit/onchain-tracking/getOnchainIdentifier "getOnchainIdentifier")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createPasskeySigner
  - Usage
  - Parameters
    - credential
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner](https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner)
- [https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner](https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner)
- [https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner](https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner)
- [https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner](https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner)
- [createEnableFallbackHandlerTx](https://docs.safe.global/reference-sdk-protocol-kit/fallback-handler/createenablefallbackhandlertx)
- [getOnchainIdentifier](https://docs.safe.global/reference-sdk-protocol-kit/onchain-tracking/getOnchainIdentifier)

### External Links

- [WebAuthn credential(opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Credential)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

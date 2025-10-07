---
title: Migrate to v3 – Safe Docs
url: https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v3
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v3 – Safe Docs

SDK

[Relay Kit](/sdk/relay-kit)

Guides

Migrate to v3

# Migrate to v3

This guide references the major changes between v2 and v3 to help those migrating an existing app.

## Remove the adapters

We have removed the concept of adapters from the `protocol-kit` to simplify the library. Instead of using specific library adapters, we use now an internal `SafeProvider` object to interact with the Safe. This `SafeProvider` will be created using:

- An Ethereum provider, an [EIP-1193 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193) compatible provider, or an RPC URL.
- An optional address of the signer that is connected to the provider or a private key. If not provided, the first account of the provider (`eth_accounts`) will be selected as the signer.

These changes affect the creation of the `Safe4337Pack` instance, as it was previously using an `ethAdapter` compatible object.

`_10

// old

_10

const safe4337Pack = await Safe4337Pack.init({

_10

ethAdapter: new EthersAdapter({ ethers, signerOrProvider }),

_10

// ...

_10

})`

`_12

// new

_12

const safe4337Pack = await Safe4337Pack.init({

_12

provider: window.ethereum, // Or any compatible EIP-1193 provider,

_12

signer: 'signerAddressOrPrivateKey', // Signer address or signer private key

_12

// ...

_12

})

_12

_12

const safe4337Pack = await Safe4337Pack.init({

_12

provider: 'http://rpc.url', // Or websocket

_12

signer: 'privateKey', // Signer private key

_12

// ...

_12

})`

[Migrate to v2](/sdk/relay-kit/guides/migrate-to-v2 "Migrate to v2")[Migrate to V4](/sdk/relay-kit/guides/migrate-to-v4 "Migrate to V4")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v3
  - Remove the adapters

---

## Related Links

### Internal Links

- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v3](https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v3)
- [Migrate to v2](https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v2)
- [Migrate to V4](https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v4)

### External Links

- [EIP-1193(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

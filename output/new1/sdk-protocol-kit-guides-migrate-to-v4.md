---
title: Migrate to v4 – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v4 – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Migrate to v4

# Migrate to v4

This guide references the major changes between v3 and v4 to help those migrating an existing app.

**Note:** When upgrading to `protocol-kit` v4, it's necessary to upgrade to `types-kit` v1.

## The create() method was renamed init() in the SafeFactory and Safe classes

We renamed the `create()` method to `init()` to better reflect the method's purpose. The term `create()` was misleading, suggesting a new Safe account would be created and deployed. However, this method only initializes the `Safe` class, so `init()` is a more accurate and descriptive name.

`_10

// old

_10

const protocolKit = await Safe.create({ ... })

_10

const safeFactory = await SafeFactory.create({ ... })

_10

_10

// new

_10

const protocolKit = await Safe.init({ ... })

_10

const safeFactory = await SafeFactory.init({ ... })`

## Remove the adapters

We have removed the concept of adapters from the `protocol-kit` to simplify the library. Instead of using specific library adapters, we use now an internal `SafeProvider` object to interact with the Safe. This `SafeProvider` will be created using:

- An Ethereum provider, an [EIP-1193 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193) compatible provider, or an RPC URL.
- An optional address of the signer that is connected to the provider or a private key. If not provided, the first account of the provider (`eth_accounts`) will be selected as the signer.

The `EthAdapter` interface, the `EthersAdapter` class, and the `Web3Adapter` class are no longer available. Similarly, `EthersAdapterConfig` and `Web3AdapterConfig` were removed as well.

`_24

// old

_24

const ethAdapter = new EthersAdapter({ ethers, signerOrProvider })

_24

// const ethAdapter = new Web3Adapter({ web3, signerAddress })

_24

await Safe.create({

_24

ethAdapter,

_24

safeAddress: '0xSafeAddress'

_24

...

_24

})

_24

_24

// new

_24

await Safe.init({

_24

provider: window.ethereum, // Or any compatible EIP-1193 provider

_24

signer: '0xSignerAddressOrPrivateKey', // Signer address or private key

_24

safeAddress: '0xSafeAddress'

_24

...

_24

})

_24

_24

// ...or...

_24

await Safe.init({

_24

provider: 'http://rpc.url', // Or websocket

_24

signer: '0xPrivateKey' // Signer private key

_24

safeAddress: '0xSafeAddress'

_24

...

_24

})`

## `EthersTransactionOptions` and `Web3TransactionOptions` types are now `TransactionOptions`

Together with the adapters, we also removed the specific transaction options objects for each library, leaving just a single `TransactionOptions` type.

We removed the `gas` property from the `TransactionOptions` object as it was a specific property for the web3.js library. Now, you should use the `gasLimit` property instead.

## `EthersTransactionResult` and `Web3TransactionResult` types are now `TransactionResult`

Together with the adapters, we also removed the specific transaction result objects for each library, leaving just a single `TransactionResult` type.

## Contract classes suffixed with Ethers and Web3

All the contract classes that were suffixed with `Ethers` or `Web3` were renamed to remove the suffix.

`_10

SafeBaseContractEthers, SafeBaseContractWeb3 -> SafeBaseContract

_10

MultiSendBaseContractEthers, MultiSendBaseContractWeb3 -> MultiSendBaseContract

_10

MultiSendCallOnlyBaseContractEthers, MultiSendCallOnlyBaseContractWeb3 -> MultiSendCallOnlyBaseContract

_10

SafeProxyFactoryBaseContractEthers, SafeProxyFactoryBaseContractWeb3 -> SafeProxyFactoryBaseContract

_10

SignMessageLibBaseContractEthers, SignMessageLibBaseContractWeb3 -> SignMessageLibBaseContract

_10

CreateCallBaseContractEthers, CreateCallBaseContractWeb3 -> CreateCallBaseContract`

[Migrate to v3](/sdk/protocol-kit/guides/migrate-to-v3 "Migrate to v3")[Migrate to v5](/sdk/protocol-kit/guides/migrate-to-v5 "Migrate to v5")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v4
  - The create() method was renamed init() in the SafeFactory and Safe classes
  - Remove the adapters
  - EthersTransactionOptionsandWeb3TransactionOptionstypes are nowTransactionOptions
  - EthersTransactionResultandWeb3TransactionResulttypes are nowTransactionResult
  - Contract classes suffixed with Ethers and Web3

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4)
- [Migrate to v3](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v3)
- [Migrate to v5](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5)

### External Links

- [EIP-1193(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1193)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Add or edit chains – Safe Docs
url: https://docs.safe.global/config-service-configuration/add-or-edit-chain
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Add or edit chains – Safe Docs

Config Service Reference

Add or edit chains

# Add or edit chains

Add (or edit) a blockchain network.

## Usage

You can add a new chain by visiting this address: [`http://localhost:8000/cfg/admin/chains/chain/add/` (opens in a new tab)](http://localhost:8000/cfg/admin/chains/chain/add/)

You can edit an existing chain by visiting this address: `http://localhost:8000/cfg/admin/chains/chain/{chain index}/change/` where `{chain index}` is the index of the chain you want to edit.

## Parameters

### `Chain Id`

The unique identifier for the chain.

### `Relevance`

The relative importance of this chain for your project. You can use this value between 0 and 100 to sort chains in the UI.

### `Chain name`

The name of the chain, in plain letters.

### `EIP-3770 short name`

The short name of the chain, as defined in [EIP-3770 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-3770). This corresponds to the letters that will be prepended to all addresses on this chain.

### `Description`

A brief description of the chain.

### `Chain logo uri`

The chain's logo to upload. This will be displayed in the UI.

### `L2`

Whether this chain is a Layer 2 chain.

### `Is testnet`

Whether this chain is a testnet. This will be indicated in the UI.

### `Rpc authentication`

Whether the RPC endpoint requires authentication to access its data.

### `Rpc uri`

The URI of the chain's RPC endpoint.

### `Safe apps rpc authentication`

Whether the RPC endpoint dedicated to Safe Apps will require authentication.

### `Safe Apps rpc uri`

The URI of the chain's RPC endpoint dedicated to Safe Apps.

### `Public rpc authentication`

Whether the fallback public RPC endpoint will require authentication.

### `Public rpc uri`

The URI of the chain's RPC public endpoint.

### `Block explorer uri address template`

The URI template for the chain's block explorer addresses. This will be used to generate address links to the block explorer. For example: `https://etherscan.io/address/{{address}}`.

### `Block explorer uri tx hash template`

The URI template for the chain's block explorer transaction hashes. This will be used to generate `txHash` links to the block explorer. For example: `https://etherscan.io/tx/{{txHash}}`.

### `Block explorer uri api template`

The URI template for the chain's block explorer API. This will be used to fetch data from the block explorer. For example: `https://api.etherscan.io/api`.

### `Beacon chain explorer uri public key template`

The URI template for the chain's beacon chain explorer public keys. This will be used to generate public key links to the beacon chain explorer. For example: `https://beaconscan.com/validator/{{publicKey}}`.

### `Currency name`

The name of the chain's native currency.

### `Currency symbol`

The symbol of the chain's native currency.

### `Currency decimals`

The number of decimals of the chain's native currency.

### `Currency logo uri`

The chain's native currency logo to upload. This will be displayed in the UI.

### `Transaction service uri`

The URI of the chain's [Transaction Service](/core-api/api-safe-transaction-service). This will be used to fetch transaction data from the chain. You will need to deploy one Transaction Service per chain, as well as `txs-db`, `amqp` and `celery` instances.

### `Vpc transaction service uri`

The URI of the chain's VPC Transaction Service. If you are using a Virtual Private Cloud (VPC) to run your Transaction Service, you can set this URI to fetch transaction data from the chain.

### `Theme text color`

The hexadecimal chain color to display the text in the UI.

### `Theme background color`

The hexadecimal chain color to display the background in the UI.

### `Ens registry address`

The address of the chain's ENS registry.

### `Recommended mastercopy version`

The recommended version of the chain's mastercopy. This will be used to display a warning if the mastercopy is outdated. For example: `1.4.1`.

### `Prices provider native coin`

The native coin used by the chain's price provider.

### `Prices provider chain name`

The name of the chain on CoinGecko.

### `Balances provider chain name`

The name of the chain on Zerion. (Not implemented.)

### `Balances provider enabled`

Whether the chain's balances provider is enabled.

### `Hidden`

Whether the chain is hidden in the UI.

### `Safe singleton address`

The address of the chain's Safe singleton.

### `Safe proxy factory address`

The address of the chain's Safe ProxyFactory.

### `MultiSend address`

The address of the chain's MultiSend contract.

### `MultiSend call only address`

The address of the chain's MultiSendCallOnly contract.

### `Fallback handler address`

The address of the chain's FallbackHandler contract.

### `Sign message lib address`

The address of the chain's SignMessageLib contract.

### `Create call address`

The address of the chain's CreateCall contract.

### `Simulate tx accessor address`

The address of the chain's SimulateTxAccessor contract.

### `Safe web authn signer factory address`

The address of the chain's SafeWebAuthnSignerFactory contract.

### Features enabled on this chain

A list of [features](/config-service-configuration/add-or-edit-feature) enabled on this chain. You can select as many as you want by clicking `+ Add another Feature-chain relationship`.

### Gas prices set for this chain

A list of [gas prices](/config-service-configuration/add-or-edit-gas-price) set for this chain. You can select as many as you want by clicking `+ Add another Gas price`.

### Wallets enabled for this chain

A list of [wallets](/config-service-configuration/add-or-edit-wallet) enabled for this chain. You can select as many as you want by clicking `+ Add another Wallet-chain relationship`.

[Edit users](/config-service-configuration/edit-user "Edit users")[Add or edit features](/config-service-configuration/add-or-edit-feature "Add or edit features")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Add or edit chains
  - Usage
  - Parameters
    - Chain Id
    - Relevance
    - Chain name
    - EIP-3770 short name
    - Description
    - Chain logo uri
    - L2
    - Is testnet
    - Rpc authentication
    - Rpc uri
    - Safe apps rpc authentication
    - Safe Apps rpc uri
    - Public rpc authentication
    - Public rpc uri
    - Block explorer uri address template
    - Block explorer uri tx hash template
    - Block explorer uri api template
    - Beacon chain explorer uri public key template
    - Currency name
    - Currency symbol
    - Currency decimals
    - Currency logo uri
    - Transaction service uri
    - Vpc transaction service uri
    - Theme text color
    - Theme background color
    - Ens registry address
    - Recommended mastercopy version
    - Prices provider native coin
    - Prices provider chain name
    - Balances provider chain name
    - Balances provider enabled
    - Hidden
    - Safe singleton address
    - Safe proxy factory address
    - MultiSend address
    - MultiSend call only address
    - Fallback handler address
    - Sign message lib address
    - Create call address
    - Simulate tx accessor address
    - Safe web authn signer factory address
    - Features enabled on this chain
    - Gas prices set for this chain
    - Wallets enabled for this chain

---

## Related Links

### Internal Links

- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)
- [https://docs.safe.global/config-service-configuration/add-or-edit-chain](https://docs.safe.global/config-service-configuration/add-or-edit-chain)

### External Links

- [http://localhost:8000/cfg/admin/chains/chain/add/(opens in a new tab)](http://localhost:8000/cfg/admin/chains/chain/add)
- [EIP-3770(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-3770)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

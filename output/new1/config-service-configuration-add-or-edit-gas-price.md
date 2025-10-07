---
title: Add or edit chain gas prices – Safe Docs
url: https://docs.safe.global/config-service-configuration/add-or-edit-gas-price
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Add or edit chain gas prices – Safe Docs

Config Service Reference

Add or edit gas prices

# Add or edit chain gas prices

Add (or edit) a new gas price to the configuration, so they can be attributed to chains.

## Usage

You can add a new gas price by visiting this address: `http://localhost:8000/cfg/admin/chains/gasprice/add/`

You can edit an existing gas price by visiting this address: `http://localhost:8000/cfg/admin/chains/gasprice/{gasprice index}/change/` where `{gasprice index}` is the index of the gas price you want to edit.

## Parameters

### `Chain`

The chain that will have this gas price enabled.

### `Oracle uri`

The URI of the oracle that will provide the gas price.

### `Oracle parameter`

The parameter that will be used to fetch the gas price from the oracle.

### `Gwei multiplier factor`

The factor that will be used to multiply the fetched gas price. This is useful when the oracle returns the gas price in a different unit than Gwei.

### `Fixed gas price (wei)`

A fixed gas price that will be used instead of fetching it from the oracle. This is useful when the oracle is not available.

### `Rank`

The relative importance of this gas price to your project. You can use this value between 0 and 100 to sort gas prices by priority.

### `Max fee per gas (wei)`

The `maxFeePerGas` that will be used to calculate the gas price. This is useful when the oracle returns a gas price that is too high.

### `Max priority fee per gas (wei)`

The `maxPriorityFeePerGas` that will be used to calculate the gas price. This is useful when the oracle returns a gas price that is too high.

[Add or edit features](/config-service-configuration/add-or-edit-feature "Add or edit features")[Add or edit wallets](/config-service-configuration/add-or-edit-wallet "Add or edit wallets")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Add or edit chain gas prices
  - Usage
  - Parameters
    - Chain
    - Oracle uri
    - Oracle parameter
    - Gwei multiplier factor
    - Fixed gas price (wei)
    - Rank
    - Max fee per gas (wei)
    - Max priority fee per gas (wei)

---

## Related Links

### Internal Links

- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [https://docs.safe.global/config-service-configuration/add-or-edit-gas-price](https://docs.safe.global/config-service-configuration/add-or-edit-gas-price)
- [Add or edit features](https://docs.safe.global/config-service-configuration/add-or-edit-feature)
- [Add or edit wallets](https://docs.safe.global/config-service-configuration/add-or-edit-wallet)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

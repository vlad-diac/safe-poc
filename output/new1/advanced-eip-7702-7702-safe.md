---
title: Safe and EIP-7702 – Safe Docs
url: https://docs.safe.global/advanced/eip-7702/7702-safe
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe and EIP-7702 – Safe Docs

Advanced

EIP-7702

Safe and EIP-7702

# Safe and EIP-7702

EIP-7702 doesn't specify how to initialise the storage of the account but only gives a way to set the code of the account. This means that the account will be created with an empty storage, and the user will have to set the storage manually.

Existing Safe contracts cannot be used with EIP-7702, because of following reasons:

- Delegating to Safe Singleton or the Safe Proxy contract will expose the EOA account to the risk of front-running during setup.
- In its current implementation, the Safe Singleton contract doesn't let itself to become an owner meaning that after delegating to the Safe Singleton, the EOA account cannot sign Safe transactions and will need to keep another private key to do so.

## Possible approaches

### Modified Safe Proxy

This approach uses the [SafeEIP7702Proxy (opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/safe-eip7702-contracts/contracts/SafeEIP7702Proxy.sol), a proxy contract derived from the [Safe Proxy (opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/safe-eip7702-contracts/contracts/SafeEIP7702Proxy.sol) with the following changes:

- The constructor of the `SafeEIP7702Proxy` contract has the additional `setupDataHash` parameter, which is the hash of the `setup` function call data. Thus, the address of the proxy contract also depends on the `setupDataHash` and not just the Safe Singleton contract address. The proxy contract uses this hash to verify that the `setup` function parameter values are unchanged during the initialization of storage.
- The proxy implements the `setup` function, which calls the `setup` function of the Safe Singleton contract and has additional logic:
  - Set the storage slot 0, that is, the address of the Safe Singleton in the EOA storage.
  - Verify that the `setupDataHash` equals the hash of the `setup` function call data.

This approach has a gas overhead as a new proxy contract has to be deployed for each EOA account, as the `setupDataHash` may be unique for each user. However, using this approach, users can use Safe{Wallet} with minor modifications and import the EOA account as a Safe account.

![diagram-7702-approach-1](/_next/static/media/diagram-7702-approach-1.d40e2fc0.png)

Follow the instructions here to use this approach to set code in EOA: [https://github.com/5afe/safe-eip7702/tree/main/safe-eip7702-contracts#execute-scripts (opens in a new tab)](https://github.com/5afe/safe-eip7702/tree/main/safe-eip7702-contracts#execute-scripts)

### Modified Safe Singleton

This approach uses the [SafeEIP7702 (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/feature/eip-7702/contracts/experimental/SafeEIP7702.sol) contract, a derived version of Safe Singleton that overrides the `setup` function and reverts when called. Instead, the contract's new `setupEIP7702` function has a `signature` parameter. The default owner will be set to the address of the EOA account that delegates to this Safe Singleton contract with a threshold of 1.

Because this approach doesn't use a proxy contract, storage slot 0 remains unused. The Safe Transaction Service and other services that depend on the value at storage slot 0 will not work with this approach.

![diagram-7702-approach-2](/_next/static/media/diagram-7702-approach-2.4e4d93d2.png)

### SafeLite

[SafeLite (opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/safe-eip7702-contracts/contracts/experimental/SafeLite.sol) is a lite version of Safe that is compatible with EIP-7702. The contract does not have a proxy and doesn't need initialization.

SafeLite supports ERC-4337 and can use features such as sponsored transactions and batch transactions. SafeLite also supports ERC-1271 for contract-based signatures.

SafeLite is not compatible with Safe{Wallet} as it doesn't use the same storage layout as the existing Safe contracts.

It doesn't have the features of the existing Safe contracts such as Modules, Fallback Handler, and Guards.

![diagram-7702-approach-3](/_next/static/media/diagram-7702-approach-3.f83aedd8.png)

‼️

All the above approaches are experimental and the contracts are not yet audited. Use them at your own risk.

## Other resources

- [SafeEIP7702Proxy GitHub repository (opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/README.md#demo-using-ui)
- [Safe + EIP-7702 tutorial (opens in a new tab)](https://www.youtube.com/watch?v=dx4mk6tKHCo)
- [Safe + EIP-7702 Slides (opens in a new tab)](https://docs.google.com/presentation/d/1blYoVXLdPUNXhfSlck5bgbs8-h9StI9om7wsxj1SxVM)

[Overview](/advanced/eip-7702/overview "Overview")[Overview](/advanced/passkeys/overview "Overview")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe and EIP-7702
  - Possible approaches
    - Modified Safe Proxy
    - Modified Safe Singleton
    - SafeLite
  - Other resources

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/eip-7702/7702-safe](https://docs.safe.global/advanced/eip-7702/7702-safe)
- [https://docs.safe.global/advanced/eip-7702/7702-safe](https://docs.safe.global/advanced/eip-7702/7702-safe)
- [https://docs.safe.global/advanced/eip-7702/7702-safe](https://docs.safe.global/advanced/eip-7702/7702-safe)
- [https://docs.safe.global/advanced/eip-7702/7702-safe](https://docs.safe.global/advanced/eip-7702/7702-safe)
- [https://docs.safe.global/advanced/eip-7702/7702-safe](https://docs.safe.global/advanced/eip-7702/7702-safe)
- [Overview](https://docs.safe.global/advanced/eip-7702/overview)
- [Overview](https://docs.safe.global/advanced/passkeys/overview)

### External Links

- [SafeEIP7702Proxy(opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/safe-eip7702-contracts/contracts/SafeEIP7702Proxy.sol)
- [Safe Proxy(opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/safe-eip7702-contracts/contracts/SafeEIP7702Proxy.sol)
- [https://github.com/5afe/safe-eip7702/tree/main/safe-eip7702-contracts#execute-scripts(opens in a new tab)](https://github.com/5afe/safe-eip7702/tree/main/safe-eip7702-contracts)
- [SafeEIP7702(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/feature/eip-7702/contracts/experimental/SafeEIP7702.sol)
- [SafeLite(opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/safe-eip7702-contracts/contracts/experimental/SafeLite.sol)
- [SafeEIP7702Proxy GitHub repository(opens in a new tab)](https://github.com/5afe/safe-eip7702/blob/main/README.md)
- [Safe + EIP-7702 tutorial(opens in a new tab)](https://www.youtube.com/watch?v=dx4mk6tKHCo)
- [Safe + EIP-7702 Slides(opens in a new tab)](https://docs.google.com/presentation/d/1blYoVXLdPUNXhfSlck5bgbs8-h9StI9om7wsxj1SxVM)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

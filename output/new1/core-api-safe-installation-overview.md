---
title: Install Safe on your chain – Safe Docs
url: https://docs.safe.global/core-api/safe-installation-overview
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# Install Safe on your chain – Safe Docs

API

Overview

# Install Safe on your chain

Safe's vision is to make every web3 account a smart account. Therefore, we prioritize teams and chains building with smart accounts, especially if they push account abstraction (for example, [ERC-4337](/advanced/erc-4337/4337-safe) or EIP-1271 adoption) with Safe.

Safe's security is based on the contracts deployed in EVM-compatible networks. For the time being, we are not looking to extend beyond EVM.

To have the full Safe stack running on your chain network, you need to consider the following steps:

## Deploy Safe canonical contracts

### Process

You can find detailed instructions under [contracts deployment](/core-api/safe-contracts-deployment).

### Cost

The contracts are fully open source, but you have to pay gas in the new chain's native currency for contract deployment.

### Timeline

Safe reviews registrations of canonical deployments on a two-week cadence.

## Deploy and maintain Safe{Wallet} and Safe{Core} Infrastructure

### Process

You have three options available:

1. [Use the Platform-as-a-Service run by Safe Core Contributors (opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt).
2. Use the Platform-as-a-Service run by third-party integrators.
3. Self-host the infrastructure.

You can find detailed instructions under [infrastructure deployment](/core-api/safe-infrastructure-deployment).

### Cost

- Safe is fully open source but requires someone to run and maintain the [web interface (opens in a new tab)](https://github.com/safe-global/safe-wallet-web) and [infrastructure (opens in a new tab)](https://github.com/safe-global/safe-infrastructure/blob/main/docs/running_production.md).
- Cost is based on the individual agreement (if run by any third party, including Safe).
- Primary cost factors:
  - Deployment costs.
  - Indexing.
  - Cloud storage and monitoring services.

### Timeline

- Based on the individual agreement with Safe or third-party integrators.
- Prioritisation for native integration ([app.safe.global (opens in a new tab)](https://app.safe.global)) is primarily based on the network's smart account/account abstraction strategy (for example, is every user account a Safe under the hood beyond the usage of Safe as a multi-signature for treasury management?) and [additional metrics (opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt).

[Zksync](/core-api/transaction-service-reference/zksync "Zksync")[Contracts Deployment](/core-api/safe-contracts-deployment "Contracts Deployment")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Install Safe on your chain
  - Deploy Safe canonical contracts
    - Process
    - Cost
    - Timeline
  - Deploy and maintain Safe{Wallet} and Safe{Core} Infrastructure
    - Process
    - Cost
    - Timeline

---

## Related Links

### Internal Links

- [ERC-4337](https://docs.safe.global/advanced/erc-4337/4337-safe)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [contracts deployment](https://docs.safe.global/core-api/safe-contracts-deployment)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [infrastructure deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [https://docs.safe.global/core-api/safe-installation-overview](https://docs.safe.global/core-api/safe-installation-overview)
- [Zksync](https://docs.safe.global/core-api/transaction-service-reference/zksync)
- [Contracts Deployment](https://docs.safe.global/core-api/safe-contracts-deployment)

### External Links

- [Use the Platform-as-a-Service run by Safe Core Contributors(opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt)
- [web interface(opens in a new tab)](https://github.com/safe-global/safe-wallet-web)
- [infrastructure(opens in a new tab)](https://github.com/safe-global/safe-infrastructure/blob/main/docs/running_production.md)
- [app.safe.global(opens in a new tab)](https://app.safe.global)
- [additional metrics(opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

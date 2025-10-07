---
title: Architecture – Safe Docs
url: https://docs.safe.global/safenet/architecture
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Architecture – Safe Docs

Safenet

Architecture

# Architecture

Safenet is a hybrid network that combines on-chain smart contracts across [multiple blockchains](/safenet/chains) and rollups with a decentralized network of off-chain actors that process transactions across these chains.

![Safenet-highlevel-overview](/_next/static/media/safenet-highlevel-overview.0298be11.png)

Safenet is composed of the following key components:

### Safe Smart Accounts

Each Safenet Account is spread across multiple blockchains, with one Safe Smart Account per chain.
Every Safenet Account is anchored by a [Home Safe Smart Account](/safenet/protocol/home-safe) deployed on the Ethereum mainnet.

### Safenet Smart Contracts

These contracts are deployed on every supported chain, with the Ethereum mainnet as the primary hub for configuration and coordination.

### Decentralized off-chain actors

Safenet introduces several key roles for off-chain transaction processing:

- **[Processors](/safenet/core-components/processor)**: Handle the heavy lifting of processing, signing, and [settling](/safenet/concepts/settlement) [transactions](/safenet/safenet-transaction).
- **[Validators](/safenet/core-components/validator)**: Ensure the security and correctness of transactions by validating the work of processors.
- **[Liquidity Providers](/safenet/core-components/liquidity-provider)**: Supply liquidity on-chain to facilitate seamless transactions across different blockchains.

### External Bridges

External bridges are only used for dispute resolution when a validator challenges a Safenet transaction.

[Multi-Chain](/safenet/chains "Multi-Chain")[Safenet Account](/safenet/safenet-account "Safenet Account")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Architecture
    - Safe Smart Accounts
    - Safenet Smart Contracts
    - Decentralized off-chain actors
    - External Bridges

---

## Related Links

### Internal Links

- [multiple blockchains](https://docs.safe.global/safenet/chains)
- [https://docs.safe.global/safenet/architecture](https://docs.safe.global/safenet/architecture)
- [Home Safe Smart Account](https://docs.safe.global/safenet/protocol/home-safe)
- [https://docs.safe.global/safenet/architecture](https://docs.safe.global/safenet/architecture)
- [https://docs.safe.global/safenet/architecture](https://docs.safe.global/safenet/architecture)
- [Processors](https://docs.safe.global/safenet/core-components/processor)
- [settling](https://docs.safe.global/safenet/concepts/settlement)
- [transactions](https://docs.safe.global/safenet/safenet-transaction)
- [Validators](https://docs.safe.global/safenet/core-components/validator)
- [Liquidity Providers](https://docs.safe.global/safenet/core-components/liquidity-provider)
- [https://docs.safe.global/safenet/architecture](https://docs.safe.global/safenet/architecture)
- [Multi-Chain](https://docs.safe.global/safenet/chains)
- [Safenet Account](https://docs.safe.global/safenet/safenet-account)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Multi-Chain – Safe Docs
url: https://docs.safe.global/safenet/chains
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Multi-Chain – Safe Docs

Safenet

Multi-Chain

# Multi-Chain

Safenet provides a unified user experience over multiple blockchains.
Safenet connects the liquidity of multiple chains, enabling users to spend their assets on any supported chain without the need for traditional bridging.
A Safenet transaction can happen on one or multiple chains.
In a [Safenet transaction](/safenet/safenet-transaction), chains can take up the following roles:

![Safenet-chains](/_next/static/media/safenet-chains.0de3a94d.png)

### Spend Chain

This is where the user wants to execute an action.
Safenet makes sure the required funds are available instantly on the spend chain.
Another name is *target chain*.

### Debit Chain

This is where a user owns the required assets for the action.
The user does not have to select the debit chain, as Safenet finds the required funds over all connected chains.
Another name is *source chain*.

### Home Chain

Safenet uses Ethereum Mainnet as the home chain for configuration and coordination.
For example, the configurable set of safety guarantees for a user's [Safenet account](/safenet/safenet-account) is stored on Ethereum Mainnet.

## Chains vary per transaction

For example, when a user wants to execute a transaction to spend funds on Optimism, while the funds are on Gnosis Chain, the spend chain will be Optimism, and the debit chain will be Gnosis Chain for this particular transaction.

When a user wants to execute a transaction on the same chain where the funds are, the spend chain and debit chain are the same.

Ethereum mainnet will always be Safenet's home chain.

[Why Safenet](/safenet/introduction "Why Safenet")[Architecture](/safenet/architecture "Architecture")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Multi-Chain
    - Spend Chain
    - Debit Chain
    - Home Chain
  - Chains vary per transaction

---

## Related Links

### Internal Links

- [Safenet transaction](https://docs.safe.global/safenet/safenet-transaction)
- [https://docs.safe.global/safenet/chains](https://docs.safe.global/safenet/chains)
- [https://docs.safe.global/safenet/chains](https://docs.safe.global/safenet/chains)
- [https://docs.safe.global/safenet/chains](https://docs.safe.global/safenet/chains)
- [Safenet account](https://docs.safe.global/safenet/safenet-account)
- [https://docs.safe.global/safenet/chains](https://docs.safe.global/safenet/chains)
- [Why Safenet](https://docs.safe.global/safenet/introduction)
- [Architecture](https://docs.safe.global/safenet/architecture)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

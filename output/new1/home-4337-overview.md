---
title: What is ERC-4337? – Safe Docs
url: https://docs.safe.global/home/4337-overview
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# What is ERC-4337? – Safe Docs

Advanced

ERC-4337

Overview

# What is ERC-4337?

[ERC-4337](/home/glossary#erc-4337) addresses the challenges associated with account abstraction without requiring changes to the consensus-layer protocol. It serves as a transaction relayer for smart accounts like Safe. It does so by introducing a pseudo-transaction object called a `UserOperation`, which sends a transaction on behalf of the user.

Nodes in Ethereum can act as a Bundler, which picks up multiple user operations and packs them into a single transaction known as a bundle transaction. The bundle transactions are then sent to a global smart contract on Ethereum (of which there is only one) called the `EntryPoint`.

ERC-4337 enhances usability by introducing paymasters. This decentralized mechanism allows users to pay gas fees using ERC-20 tokens (like USDC) instead of native tokens like ETH or to seek a third party to cover their gas fees entirely.

ERC-4337 is currently under development and still needs to be finalized, so developers should pay attention to new changes that may occur.

## Why ERC-4337?

ERC-4337 provides a bunch of benefits along with all the inherent advantages of utilizing smart accounts:

[#### Flexibility of payments

Users can decide how to pay the gas fees. Use native tokens like ETH, ERC-20 tokens, or even sponsored transactions.](/advanced/erc-4337/overview)

[#### Freedom of Authentication

It enables the use of different authentication mechanisms, such as multi-signature, passkeys, and future quantum-proof cryptography.](/advanced/erc-4337/overview)

[#### Decentralization

It's supported by various providers, avoiding lock-in to a single-relayer technology, offering an anti-fragile approach with no single point of failure.](/advanced/erc-4337/overview)

## Further reading

- [Official documentation (opens in a new tab)](https://www.erc4337.io)
- [EIP document (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337)

Reference[Safe and ERC-4337](/advanced/erc-4337/4337-safe "Safe and ERC-4337")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- What is ERC-4337?
  - Why ERC-4337?
      - Flexibility of payments
      - Freedom of Authentication
      - Decentralization
  - Further reading

---

## Related Links

### Internal Links

- [ERC-4337](https://docs.safe.global/home/glossary)
- [https://docs.safe.global/home/4337-overview](https://docs.safe.global/home/4337-overview)
- [Flexibility of paymentsUsers can decide how to pay the gas fees. Use native tokens like ETH, ERC-20 tokens, or even sponsored transactions.](https://docs.safe.global/advanced/erc-4337/overview)
- [Freedom of AuthenticationIt enables the use of different authentication mechanisms, such as multi-signature, passkeys, and future quantum-proof cryptography.](https://docs.safe.global/advanced/erc-4337/overview)
- [DecentralizationIt's supported by various providers, avoiding lock-in to a single-relayer technology, offering an anti-fragile approach with no single point of failure.](https://docs.safe.global/advanced/erc-4337/overview)
- [https://docs.safe.global/home/4337-overview](https://docs.safe.global/home/4337-overview)
- [Safe and ERC-4337](https://docs.safe.global/advanced/erc-4337/4337-safe)

### External Links

- [Official documentation(opens in a new tab)](https://www.erc4337.io)
- [EIP document(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

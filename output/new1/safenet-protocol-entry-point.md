---
title: Entry Point – Safe Docs
url: https://docs.safe.global/safenet/protocol/entry-point
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Entry Point – Safe Docs

Safenet

Protocol

Entry Point

# Entry Point

The Entry Point is a smart contract deployed on every supported [chain](/safenet/chains).
It is distinct from the [ERC-4337](/advanced/erc-4337/overview) entry point contract and is the primary gateway for [Safenet transactions](/safenet/safenet-transaction).
When the [processor](/safenet/core-components/processor) relays transactions, the entry point ensures on-chain bookkeeping and cross-chain communication.

It executes Safe transactions signed by the owners and co-signed by the processor, meaning no further authentication is required.

For on-chain bookkeeping, minimal data is stored in the form of storage and events, which validators use to verify the correctness of [settlements](/safenet/concepts/settlement).
If validity proofs are needed, information about executed Safenet transactions can be sent to the home chain to facilitate challenge resolution.
This requires additional authentication, as configured by the [Safe DAO](/safenet/protocol/safe-dao).

[Home Safe](/safenet/protocol/home-safe "Home Safe")[Guard](/safenet/protocol/guard "Guard")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Entry Point

---

## Related Links

### Internal Links

- [chain](https://docs.safe.global/safenet/chains)
- [ERC-4337](https://docs.safe.global/advanced/erc-4337/overview)
- [Safenet transactions](https://docs.safe.global/safenet/safenet-transaction)
- [processor](https://docs.safe.global/safenet/core-components/processor)
- [settlements](https://docs.safe.global/safenet/concepts/settlement)
- [Safe DAO](https://docs.safe.global/safenet/protocol/safe-dao)
- [Home Safe](https://docs.safe.global/safenet/protocol/home-safe)
- [Guard](https://docs.safe.global/safenet/protocol/guard)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

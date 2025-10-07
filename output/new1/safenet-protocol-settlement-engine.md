---
title: Settlement Engine – Safe Docs
url: https://docs.safe.global/safenet/protocol/settlement-engine
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Settlement Engine – Safe Docs

Safenet

Protocol

Settlement Engine

# Settlement Engine

The Settlement Engine is a smart contract that processes debit requests on the [debit chain](/safenet/chains).
It is responsible for transferring funds from a Safenet Safe to the [beneficiary](/safenet/protocol/beneficiary) designated by the [liquidity provider](/safenet/core-components/liquidity-provider) who fronted funds on the spending chain.

Once a [settlement](/safenet/concepts/settlement) is initiated, a delay period begins, allowing [validators](/safenet/core-components/validator) to verify the settlement's correctness.
If no [challenges](/safenet/concepts/challenge) are raised during this period, the processor can finalize the settlement, which triggers the debiting of the Safe and transfers funds to the beneficiary.

[Overview](/safenet/protocol/overview "Overview")[Transceiver](/safenet/protocol/transceiver "Transceiver")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Settlement Engine

---

## Related Links

### Internal Links

- [debit chain](https://docs.safe.global/safenet/chains)
- [beneficiary](https://docs.safe.global/safenet/protocol/beneficiary)
- [liquidity provider](https://docs.safe.global/safenet/core-components/liquidity-provider)
- [settlement](https://docs.safe.global/safenet/concepts/settlement)
- [validators](https://docs.safe.global/safenet/core-components/validator)
- [challenges](https://docs.safe.global/safenet/concepts/challenge)
- [Overview](https://docs.safe.global/safenet/protocol/overview)
- [Transceiver](https://docs.safe.global/safenet/protocol/transceiver)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

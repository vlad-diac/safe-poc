---
title: Processor – Safe Docs
url: https://docs.safe.global/safenet/core-components/processor
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Processor – Safe Docs

Safenet

Core Components

Processor

# Processor

The Processor is a service that executes [transactions](/safenet/safenet-transaction) on behalf of the End User when specific conditions are met:

- The [End User](/safenet/core-components/end-user) is registered with Safenet (locking assets through a [Guard](/safenet/protocol/guard) acting as a co-signing).
- The End User has sufficient locked funds to settle transactions across one or more [chains](/safenet/chains).
- The End User's [guarantees](/safenet/concepts/guarantee) are validated.
- The Processor or [liquidity provider](/safenet/core-components/liquidity-provider) has enough liquidity to pre-fund the End User's account on the spend chain.

After fulfillment, the Processor handles the [settlements](/safenet/concepts/settlement) by initiating an optimistic settlement process.
This process, subject to delay, can be [challenged](/safenet/concepts/challenge) by a [Validator](/safenet/core-components/validator).
The Processor refunds itself or the liquidity provider by pulling funds from the End User's account.

[Optimistic Validity Proof](/safenet/optimistic-validity-proof "Optimistic Validity Proof")[Validator](/safenet/core-components/validator "Validator")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Processor

---

## Related Links

### Internal Links

- [transactions](https://docs.safe.global/safenet/safenet-transaction)
- [End User](https://docs.safe.global/safenet/core-components/end-user)
- [Guard](https://docs.safe.global/safenet/protocol/guard)
- [chains](https://docs.safe.global/safenet/chains)
- [guarantees](https://docs.safe.global/safenet/concepts/guarantee)
- [liquidity provider](https://docs.safe.global/safenet/core-components/liquidity-provider)
- [settlements](https://docs.safe.global/safenet/concepts/settlement)
- [challenged](https://docs.safe.global/safenet/concepts/challenge)
- [Validator](https://docs.safe.global/safenet/core-components/validator)
- [Optimistic Validity Proof](https://docs.safe.global/safenet/optimistic-validity-proof)
- [Validator](https://docs.safe.global/safenet/core-components/validator)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

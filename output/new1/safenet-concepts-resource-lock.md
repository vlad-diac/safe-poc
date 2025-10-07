---
title: Resource lock – Safe Docs
url: https://docs.safe.global/safenet/concepts/resource-lock
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Resource lock – Safe Docs

Safenet

Concepts

Resource Lock

# Resource lock

The Resource Lock is a mechanism in Safenet that ensures the availability of user funds for transactions by locking a portion of the [End User's](/safenet/core-components/end-user) assets.
This lock guarantees that sufficient resources are set aside to [settle](/safenet/concepts/settlement) transactions securely and efficiently.

The resource lock is issued on the funds on the debit [chain](/safenet/chains) before the fulfillment is done on the spend chain. The lock is maintained until the transaction is settled on the debit chain.

The [processor](/safenet/core-components/processor) manages the resource lock, ensuring that no transactions can move funds out of the End User's Safe Smart Account on the debit chain while the resource lock is in effect.

[Guarantee](/safenet/concepts/guarantee "Guarantee")[Universal Balance](/safenet/concepts/universal-balance "Universal Balance")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Resource lock

---

## Related Links

### Internal Links

- [End User's](https://docs.safe.global/safenet/core-components/end-user)
- [settle](https://docs.safe.global/safenet/concepts/settlement)
- [chain](https://docs.safe.global/safenet/chains)
- [processor](https://docs.safe.global/safenet/core-components/processor)
- [Guarantee](https://docs.safe.global/safenet/concepts/guarantee)
- [Universal Balance](https://docs.safe.global/safenet/concepts/universal-balance)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

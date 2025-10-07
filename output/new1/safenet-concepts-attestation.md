---
title: Attestation – Safe Docs
url: https://docs.safe.global/safenet/concepts/attestation
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Attestation – Safe Docs

Safenet

Concepts

Attestation

# Attestation

The [processor](/safenet/core-components/processor) uses an attestation to prove the validity of a [settlement](/safenet/concepts/settlement).
It serves as a cryptographic proof that the fulfillment of a Safenet [transaction](/safenet/safenet-transaction) is valid under the specific conditions defined by the user's configured [guarantees](/safenet/concepts/guarantee).

The attestation has to be sent from the spend [chain](/safenet/chains) to the home chain, where it is validated by the [guarantee engine](/safenet/protocol/guarantee-engine).
It is then sent from the guarantee engine to the [settlement engine](/safenet/protocol/settlement-engine) on the debit chain to finalize the settlement.
The attestation data is sent through external bridges, which can be costly and slow.

The processor has to provide the attestation when a [validator](/safenet/core-components/validator) [challenges](/safenet/concepts/challenge) a [settlement](/safenet/concepts/settlement).
The processor can voluntarily provide the attestation with the settlement request to ensure the settlement is processed directly.

[Challenge](/safenet/concepts/challenge "Challenge")[Guarantee](/safenet/concepts/guarantee "Guarantee")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Attestation

---

## Related Links

### Internal Links

- [processor](https://docs.safe.global/safenet/core-components/processor)
- [settlement](https://docs.safe.global/safenet/concepts/settlement)
- [transaction](https://docs.safe.global/safenet/safenet-transaction)
- [guarantees](https://docs.safe.global/safenet/concepts/guarantee)
- [chain](https://docs.safe.global/safenet/chains)
- [guarantee engine](https://docs.safe.global/safenet/protocol/guarantee-engine)
- [settlement engine](https://docs.safe.global/safenet/protocol/settlement-engine)
- [validator](https://docs.safe.global/safenet/core-components/validator)
- [challenges](https://docs.safe.global/safenet/concepts/challenge)
- [settlement](https://docs.safe.global/safenet/concepts/settlement)
- [Challenge](https://docs.safe.global/safenet/concepts/challenge)
- [Guarantee](https://docs.safe.global/safenet/concepts/guarantee)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

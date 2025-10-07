---
title: Optimistic Validity Proof – Safe Docs
url: https://docs.safe.global/safenet/optimistic-validity-proof
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Optimistic Validity Proof – Safe Docs

Safenet

Optimistic Validity Proof

# Optimistic Validity Proof

Optimistic validity proofs are the core concept of Safenet, which enables the centralized world's speed and convenience with the decentralized world's security and self-custody.

They ensure that transactions are fast and gas-efficient in the vast majority of cases (the happy path) while still providing security [guarantees](/safenet/concepts/guarantee).
Only in rare dispute cases does the system return to a slow and gas-intense process.

Optimistic validity proofs work similarly to [slashing (opens in a new tab)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/#slashing) in proof-of-stake networks.
The processors risk losing their stake or pre-funded funds when they process invalid transactions.
The validator risks losing their collateral when they challenge valid transactions.

## Effects on transaction speed and gas efficiency

- A [Safenet transaction's](/safenet/safenet-transaction) **fulfillment is always fast and gas-efficient**, because neither the [processor](/safenet/core-components/processor) nor the [liquidity provider](/safenet/core-components/liquidity-provider) have the incentive to send out funds to a user that they would not receive back (and the processor does not want to lose its stakes).
- The **[settlement](/safenet/concepts/settlement) is gas-efficient but slightly slower**, as it has a [challenge](/safenet/concepts/challenge) delay, in which a [validator](/safenet/core-components/validator) can challenge the settlement request.
  It is gas-efficient, as the processor does not have to send a correctness proof ([attestation](/safenet/concepts/attestation)) initially (but is free to do so).
- Only a **challenged settlement is gas-intense and slow**. When a validator challenges the settlement request, the processor has to send an attestation.
  The attestation has to be sent from the spend chain to the debit chain with a cross-chain bridge, which is costly and slow.

## Economic incentives

Optimistic validity proofs build on the following economic incentives:

- The processor has an incentive to process transactions correctly, as they risk losing funds when they process invalid transactions.
- The stake of the processor secures the liquidity provider.
- The validator has an incentive to challenge invalid transactions, as they can earn a fee.
  They have an incentive not to challenge valid transactions, as they risk losing funds if the transaction is valid.

[Safenet Transaction](/safenet/safenet-transaction "Safenet Transaction")[Processor](/safenet/core-components/processor "Processor")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Optimistic Validity Proof
  - Effects on transaction speed and gas efficiency
  - Economic incentives

---

## Related Links

### Internal Links

- [guarantees](https://docs.safe.global/safenet/concepts/guarantee)
- [https://docs.safe.global/safenet/optimistic-validity-proof](https://docs.safe.global/safenet/optimistic-validity-proof)
- [Safenet transaction's](https://docs.safe.global/safenet/safenet-transaction)
- [processor](https://docs.safe.global/safenet/core-components/processor)
- [liquidity provider](https://docs.safe.global/safenet/core-components/liquidity-provider)
- [settlement](https://docs.safe.global/safenet/concepts/settlement)
- [challenge](https://docs.safe.global/safenet/concepts/challenge)
- [validator](https://docs.safe.global/safenet/core-components/validator)
- [attestation](https://docs.safe.global/safenet/concepts/attestation)
- [https://docs.safe.global/safenet/optimistic-validity-proof](https://docs.safe.global/safenet/optimistic-validity-proof)
- [Safenet Transaction](https://docs.safe.global/safenet/safenet-transaction)
- [Processor](https://docs.safe.global/safenet/core-components/processor)

### External Links

- [slashing(opens in a new tab)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

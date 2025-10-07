---
title: Settlement – Safe Docs
url: https://docs.safe.global/safenet/concepts/settlement
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Settlement – Safe Docs

Safenet

Concepts

Settlement

# Settlement

Settlement is the process by which a [processor](/safenet/core-components/processor) debits funds from a [Safenet account](/safenet/safenet-account) to repay the [liquidity provider](/safenet/core-components/liquidity-provider) for the short-term loan (pre-funding) used in a [Safenet transaction](/safenet/safenet-transaction).

The [settlement engine](/safenet/protocol/settlement-engine) handles debit requests on the debit [chain](/safenet/chains) by transferring funds from the Safenet Safe to a [beneficiary](/safenet/protocol/beneficiary) designated by the liquidity provider.
This occurs after the liquidity provider has fronted funds on the spend chain.

Once settlement is initiated, a delay period begins, during which [validators](/safenet/core-components/validator) can verify the settlement's correctness and challenge it if necessary.
If no challenge is made during this period, the processor completes the settlement, debiting the Safe and transferring the funds to the beneficiary, which includes repayment of the liquidity provision and relayer fees.

If a validator [challenges](/safenet/concepts/challenge) the settlement, the cross-chain challenge process begins:

## Challenge Process

### Challenge Initiation

The validator initiates a transaction with the settlement engine to start a challenge on the debit chain, with a separate challenge delay.
During this delay, the processor must prove the settlement's correctness.

### Correctness Proof

The processor sends an [attestation](/safenet/concepts/attestation) from the spend chain (where the Safenet transaction was executed) to the home chain to validate the settlement.

### Challenge Resolution

The processor proves the settlement's validity to the guarantee engine on the home chain, which then informs the settlement contract on the debit chain:

- If the settlement is validated, the settlement can proceed immediately, bypassing the remaining settlement delay.
- If the processor fails to prove the settlement's validity, the challenge delay expires, and the settlement is deemed invalid, meaning it can never be executed.

When a challenge is successful, the processor or liquidity provider loses the fronted funds, and the user does not pay anything.
The user could benefit from the outgoing transaction.

## Flow Diagrams

### Happy Flow

The happy flow diagram illustrates the process of a successful settlement.
The processor initiates the settlement process by debiting the Safe and transferring funds to the beneficiary.
The validator verifies the settlement's correctness and, if no challenge is made, the settlement is completed.

### Sad Flow

The sad flow diagram illustrates the process of a failed settlement.
The validator challenges the settlement, and the processor must prove the settlement's validity.
If the processor fails to provide proof, the settlement is deemed invalid, and the funds are not transferred.

### Correctness Proof (Attestation)

The correctness proof diagram illustrates the process of proving the settlement's validity.
The processor sends information from the spend chain to the home chain, where the guarantee engine validates the settlement.
If the settlement is proven correct, the settlement can proceed immediately.

The processor can voluntarily provide the attestation at the moment of settlement to bypass the challenge delay and ensure a faster settlement process.

[Transaction Service](/safenet/core-components/transaction-service "Transaction Service")[Challenge](/safenet/concepts/challenge "Challenge")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Settlement
  - Challenge Process
    - Challenge Initiation
    - Correctness Proof
    - Challenge Resolution
  - Flow Diagrams
    - Happy Flow
    - Sad Flow
    - Correctness Proof (Attestation)

---

## Related Links

### Internal Links

- [processor](https://docs.safe.global/safenet/core-components/processor)
- [Safenet account](https://docs.safe.global/safenet/safenet-account)
- [liquidity provider](https://docs.safe.global/safenet/core-components/liquidity-provider)
- [Safenet transaction](https://docs.safe.global/safenet/safenet-transaction)
- [settlement engine](https://docs.safe.global/safenet/protocol/settlement-engine)
- [chain](https://docs.safe.global/safenet/chains)
- [beneficiary](https://docs.safe.global/safenet/protocol/beneficiary)
- [validators](https://docs.safe.global/safenet/core-components/validator)
- [challenges](https://docs.safe.global/safenet/concepts/challenge)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [attestation](https://docs.safe.global/safenet/concepts/attestation)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [https://docs.safe.global/safenet/concepts/settlement](https://docs.safe.global/safenet/concepts/settlement)
- [Transaction Service](https://docs.safe.global/safenet/core-components/transaction-service)
- [Challenge](https://docs.safe.global/safenet/concepts/challenge)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Safenet Transaction – Safe Docs
url: https://docs.safe.global/safenet/safenet-transaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safenet Transaction – Safe Docs

Safenet

Safenet Transaction

# Safenet Transaction

This page describes the flow of a Safenet transaction.
The [Core Components](/safenet/core-components/processor) section provides further details on the components and roles involved in a Safenet transaction.

A Safenet transaction consists of three main phases:

![Safenet-transaction-phases](/_next/static/media/safenet-transaction-phases.85b2fac4.png)

### 1. Simulation

In the first phase, security checks are performed off-chain to ensure the transaction is valid.

1. The [processor](/safenet/core-components/processor) previews security checks.
2. The [End User](/safenet/core-components/end-user) signs the transactions. This involves signing a Safe transaction with enough Safe owners.
3. The transaction is published to [Safenet Transaction pool](/safenet/core-components/transaction-service).

### 2. Fulfillment

This is the main part of the transaction that the user is interested in. This part enables the users to send a transaction on the [spend chain](/safenet/chains) as if they possess the required funds on the spend chain.

1. A [resource lock](/safenet/concepts/resource-lock) is issued on the Safe Smart Account on the debit chain. This prevents the user from withdrawing funds from the Safe Smart Account on the debit chain before the [liquidity provider](/safenet/core-components/liquidity-provider) is reimbursed.
2. The liquidity provider sends funds to the user's Safe Smart Account on the spend chain (pre-funding).
3. The user's Smart Account executes the intended transaction on the spend chain with the funds.

### 3. The settlement

In the last phase, the [settlement](/safenet/concepts/settlement) is executed on the debit chain.
This phase ensures the liquidity provider gets reimbursed for the pre-funding plus a fee.

1. The processor requests a settlement on the debit chain.
2. The settlement request has a challenge delay, in which any [validator](/safenet/core-components/validator) can challenge the settlement request.
3. When the settlement is not challenged, the settlement is executed. The liquidity provider receives funds from the Safe Smart Account on the debit chain, and the Safe Smart Account is unlocked.

When the settlement is [challenged](/safenet/concepts/challenge), the processors must prove the validity of the transaction.

## Flow Diagram

This flow diagram illustrates the first two phases of a Safenet transaction:

[Safenet Account](/safenet/safenet-account "Safenet Account")[Optimistic Validity Proof](/safenet/optimistic-validity-proof "Optimistic Validity Proof")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safenet Transaction
    - 1. Simulation
    - 2. Fulfillment
    - 3. The settlement
  - Flow Diagram

---

## Related Links

### Internal Links

- [Core Components](https://docs.safe.global/safenet/core-components/processor)
- [https://docs.safe.global/safenet/safenet-transaction](https://docs.safe.global/safenet/safenet-transaction)
- [processor](https://docs.safe.global/safenet/core-components/processor)
- [End User](https://docs.safe.global/safenet/core-components/end-user)
- [Safenet Transaction pool](https://docs.safe.global/safenet/core-components/transaction-service)
- [https://docs.safe.global/safenet/safenet-transaction](https://docs.safe.global/safenet/safenet-transaction)
- [spend chain](https://docs.safe.global/safenet/chains)
- [resource lock](https://docs.safe.global/safenet/concepts/resource-lock)
- [liquidity provider](https://docs.safe.global/safenet/core-components/liquidity-provider)
- [https://docs.safe.global/safenet/safenet-transaction](https://docs.safe.global/safenet/safenet-transaction)
- [settlement](https://docs.safe.global/safenet/concepts/settlement)
- [validator](https://docs.safe.global/safenet/core-components/validator)
- [challenged](https://docs.safe.global/safenet/concepts/challenge)
- [https://docs.safe.global/safenet/safenet-transaction](https://docs.safe.global/safenet/safenet-transaction)
- [Safenet Account](https://docs.safe.global/safenet/safenet-account)
- [Optimistic Validity Proof](https://docs.safe.global/safenet/optimistic-validity-proof)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

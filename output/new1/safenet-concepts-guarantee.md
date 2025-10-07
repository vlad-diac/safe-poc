---
title: Guarantee – Safe Docs
url: https://docs.safe.global/safenet/concepts/guarantee
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Guarantee – Safe Docs

Safenet

Concepts

Guarantee

# Guarantee

One of Safenet's core value propositions is the **enhanced security** it provides to users.
This security goes beyond the simple mechanisms of pre-funding and settlement; it is deeply embedded in Safenet's architecture through its **guarantee system**, which enforces specific conditions before transactions can be executed.
These guarantees protect users from various external risks, including hacks, phishing attacks, address poisoning, and other forms of fraud.

Safenet introduces two types of guarantees, each serving a distinct purpose:

## Core Guarantees

Core guarantees are integral to Safenet's security model and form the foundation of the system.
They ensure the integrity of the pre-funding and settlement process, protecting users from malicious actors, such as a processor attempting to execute invalid transactions.
These guarantees are mandatory and automatically applied to all Safenet transactions.

### Examples of core Guarantees

- **Transaction Validity**: Ensures that all transactions executed by the processor are valid and follow the rules set by Safenet's validity-proof engine.
- **Settlement Fraud Protection**: Enables validators to intervene if they detect fraudulent or incorrect transactions during the settlement process.

## User-Configured Guarantees

In addition to the mandatory core guarantees, Safenet allows users to enhance their security by customizing transaction rules through **user-configured guarantees**.
These guarantees offer additional protection against external threats, giving users more control over how and where their funds are sent.

User-configured guarantees are optional and tailored to the user's specific needs.
They provide additional security layers that can be applied based on personal risk tolerance and transaction preferences.

### Examples of User-Configured Guarantees

- **Recipient Signature Enforcement**: Requires the recipient to sign a message before the transaction is executed, ensuring that funds are sent to the correct address (for example, to `0xb0b1` instead of a similar, malicious `0xbab1` address to prevent address poisoning).
- **Account Type Restrictions**: Limits the transaction to approved types, such as externally owned accounts (EOA) or smart accounts, preventing funds from being sent to unknown or exotic accounts.
- **Protocol Whitelisting**: Ensures that the transaction interacts only with trusted protocols, reducing the risk of sending funds to malicious or unverified contracts.
- **Third-Party Approval**: Requires the transaction to be signed by a trusted third party (for example, [BlockAid (opens in a new tab)](https://blockaid.xyz)) to protect against fraud.
- **Spending Limits**: Enforces a daily spending limit, restricting the amount that can be transferred in a single transaction and providing protection against unauthorized large transfers.
- **Address Book Validation**: Ensures that the recipient is part of an on-chain address book, adding another layer of verification to prevent sending funds to unintended recipients.

If a processor executes a transaction that violates one of these guarantees (for instance, by sending funds to an incorrect address), the transaction can be challenged, and the user can be refunded.
This functions similarly to a chargeback on a credit card, where the lock on the funds is removed, and the transaction does not [settle](/safenet/concepts/settlement), leaving the user's funds in the account.

## Technical details

A guarantee is implemented by a [guarantee implementation](/safenet/protocol/guarantee-implementation), registered within the [Guarantee Engine](/safenet/protocol/guarantee-engine) on the Home Chain by the [SafeDAO](/safenet/protocol/safe-dao), and installed individually by an [end user](/safenet/core-components/end-user).
They prove that a Safenet transaction is valid under the specific conditions defined by the user's configured guarantees.

Unlike atomic operations proven in a single Ethereum transaction, guarantees in Safenet are not necessarily atomic.
This allows for more complex guarantees, such as nested optimistic validity zero-knowledge (ZK) proofs, which can be used to ensure the validity of transactions in a more scalable and secure manner.

[Attestation](/safenet/concepts/attestation "Attestation")[Resource Lock](/safenet/concepts/resource-lock "Resource Lock")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Guarantee
  - Core Guarantees
    - Examples of core Guarantees
  - User-Configured Guarantees
    - Examples of User-Configured Guarantees
  - Technical details

---

## Related Links

### Internal Links

- [https://docs.safe.global/safenet/concepts/guarantee](https://docs.safe.global/safenet/concepts/guarantee)
- [https://docs.safe.global/safenet/concepts/guarantee](https://docs.safe.global/safenet/concepts/guarantee)
- [https://docs.safe.global/safenet/concepts/guarantee](https://docs.safe.global/safenet/concepts/guarantee)
- [https://docs.safe.global/safenet/concepts/guarantee](https://docs.safe.global/safenet/concepts/guarantee)
- [settle](https://docs.safe.global/safenet/concepts/settlement)
- [https://docs.safe.global/safenet/concepts/guarantee](https://docs.safe.global/safenet/concepts/guarantee)
- [guarantee implementation](https://docs.safe.global/safenet/protocol/guarantee-implementation)
- [Guarantee Engine](https://docs.safe.global/safenet/protocol/guarantee-engine)
- [SafeDAO](https://docs.safe.global/safenet/protocol/safe-dao)
- [end user](https://docs.safe.global/safenet/core-components/end-user)
- [Attestation](https://docs.safe.global/safenet/concepts/attestation)
- [Resource Lock](https://docs.safe.global/safenet/concepts/resource-lock)

### External Links

- [BlockAid(opens in a new tab)](https://blockaid.xyz)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

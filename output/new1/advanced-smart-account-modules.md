---
title: Safe Modules – Safe Docs
url: https://docs.safe.global/advanced/smart-account-modules
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe Modules – Safe Docs

Advanced

Safe Modules

# Safe Modules

## Overview

Safe Modules are smart contract extensions that enhance the functionality of Safe Smart Accounts by enabling additional features. They operate alongside Safe's core multi-signature mechanism, allowing automated actions or custom transaction logic. Multiple modules can be enabled simultaneously, offering highly customizable setups tailored to specific needs. These modules extend Safe contracts while keeping their logic separate from the core contracts. Although a basic Safe does not require any modules, they can be added or removed with confirmation from the required threshold of owners. Events are emitted whenever a module is added, removed, or when a module transaction succeeds or fails.

Safe Modules offer several benefits:

- **Automation**: Enable recurring transactions, DeFi interactions, or scheduled payments without manual approvals.
- **Enhanced Security**: Impose restrictions such as whitelists, rate limits, or spending caps to control fund usage.
- **Scalability**: Support complex operations by delegating responsibilities to specialized modules.
- **Flexibility**: Safes can be tailored to unique workflows or integrated with broader frameworks like DAOs or DeFi protocols.

By decoupling these features from the Safe Smart Account contract, modules allow developers to build and deploy new capabilities without compromising the Safe Smart Account's security guarantees.

Safe Modules can include daily spending allowances, amounts that can be spent without the approval of other owners, recurring transactions modules, and standing orders performed on a recurring date. For example, paying your rent or social recovery modules may allow you to recover a Safe if you lose access to owner accounts.

![diagram-safe-modules](/_next/static/media/diagram-safe-modules.f7e6c79f.png)

## How Safe Modules Work

1. **Enabling a Module**: A module is added to the Safe via the `enableModule()` function. The Safe maintains an internal registry of authorized modules.
2. **Transaction Execution**:
   - A user (can be a contract or an EOA) interacts with the Module by triggering a call to a module function.
   - The Module validates the request, ensuring the user is authorized and the operation complies with the Module's rules.
   - If valid, the Module calls `execTransactionFromModule` on the Safe which executes the transaction.

## How to create a Safe Module

A great way to understand how Safe Modules work is by creating one. An excellent place to start is [Safe Modding 101: Create your own Safe Module (opens in a new tab)](https://www.youTube.com/watch?v=nmDYc9PlAic).

## Examples

1. [Safe Modules (opens in a new tab)](https://github.com/safe-global/safe-modules)
2. [Zodiac-compliant modules (opens in a new tab)](https://www.zodiac.wiki/documentation)
3. [Pimlico (opens in a new tab)](https://docs.pimlico.io/permissionless/how-to/accounts/use-safe-account)

‼️

Safe Modules can be a security risk since they can execute arbitrary
transactions. Only add trusted and audited modules to a Safe. A malicious
module can take over a Safe.

## Reference

- [Safe Module Reference](/reference-smart-account/modules/enableModule)

[Concepts](/advanced/smart-account-concepts "Concepts")[Smart Account Modules Tutorial](/advanced/smart-account-modules/smart-account-modules-tutorial "Smart Account Modules Tutorial")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe Modules
  - Overview
  - How Safe Modules Work
  - How to create a Safe Module
  - Examples
  - Reference

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/smart-account-modules](https://docs.safe.global/advanced/smart-account-modules)
- [https://docs.safe.global/advanced/smart-account-modules](https://docs.safe.global/advanced/smart-account-modules)
- [https://docs.safe.global/advanced/smart-account-modules](https://docs.safe.global/advanced/smart-account-modules)
- [https://docs.safe.global/advanced/smart-account-modules](https://docs.safe.global/advanced/smart-account-modules)
- [https://docs.safe.global/advanced/smart-account-modules](https://docs.safe.global/advanced/smart-account-modules)
- [Safe Module Reference](https://docs.safe.global/reference-smart-account/modules/enableModule)
- [Concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [Smart Account Modules Tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)

### External Links

- [Safe Modding 101: Create your own Safe Module(opens in a new tab)](https://www.youTube.com/watch?v=nmDYc9PlAic)
- [Safe Modules(opens in a new tab)](https://github.com/safe-global/safe-modules)
- [Zodiac-compliant modules(opens in a new tab)](https://www.zodiac.wiki/documentation)
- [Pimlico(opens in a new tab)](https://docs.pimlico.io/permissionless/how-to/accounts/use-safe-account)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

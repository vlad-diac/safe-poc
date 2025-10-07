---
title: Safe and ERC-4337 – Safe Docs
url: https://docs.safe.global/advanced/erc-4337/4337-safe
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe and ERC-4337 – Safe Docs

Advanced

ERC-4337

Safe and ERC-4337

# Safe and ERC-4337

Safe has adopted a modular and flexible approach to integrating the ERC-4337, allowing users to turn their Safe account into an ERC-4337 smart account.

Safe ERC-4337 compatibility is provided via [Safe Modules](/home/glossary#safe-module) and the Fallback Handler. This means the functionality is not implemented directly in the Safe Smart Account, but in the [Safe4337Module (opens in a new tab)](https://github.com/safe-global/safe-modules/blob/main/modules/4337/contracts/Safe4337Module.sol) contract, which can be enabled in any Safe account at the Safe deployment time or afterward.

## Safe4337Module

This module is an extension to the Safe Smart Account that acts both as a Fallback Handler, meaning that the Safe Proxy contract will fallback to this contract when its functions are called in the proxy, and a Safe Module, having the right to execute Safe transactions once it's enabled in a Safe account.

It implements the ERC-4337 interface, including the functions to validate and execute the user operation, and it's limited to the `EntryPoint` address.

ℹ️

This module must only be used with Safe [v1.4.1 (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/CHANGELOG.md) or newer.

### UserOperation validation

The Safe Proxy contract receives a call to the `validateUserOp` function from the `EntryPoint` and forwards it to the `Safe4337Module`. The module validates the `UserOperation` object by checking that the Safe owners signed the `UserOperation` hash and returns the result. It also executes a module transaction to pay the fees back.

![diagram validate UserOp](/_next/static/media/diagram-4337-validate.729e77a4.png)

### UserOperation execution

After successful validation, the `EntryPoint` calls the `executeUserOp` function, forwarding it again to the module, which executes a module transaction with the target and data specified in the `UserOperation` object.

![diagram execute UserOp](/_next/static/media/diagram-4337-execute.e80fe771.png)

[Overview](/advanced/erc-4337/overview "Overview")Supported Networks

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe and ERC-4337
  - Safe4337Module
    - UserOperation validation
    - UserOperation execution

---

## Related Links

### Internal Links

- [Safe Modules](https://docs.safe.global/home/glossary)
- [https://docs.safe.global/advanced/erc-4337/4337-safe](https://docs.safe.global/advanced/erc-4337/4337-safe)
- [https://docs.safe.global/advanced/erc-4337/4337-safe](https://docs.safe.global/advanced/erc-4337/4337-safe)
- [https://docs.safe.global/advanced/erc-4337/4337-safe](https://docs.safe.global/advanced/erc-4337/4337-safe)
- [Overview](https://docs.safe.global/advanced/erc-4337/overview)

### External Links

- [Safe4337Module(opens in a new tab)](https://github.com/safe-global/safe-modules/blob/main/modules/4337/contracts/Safe4337Module.sol)
- [v1.4.1(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1/CHANGELOG.md)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

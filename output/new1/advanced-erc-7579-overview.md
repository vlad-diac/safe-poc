---
title: What is ERC-7579? – Safe Docs
url: https://docs.safe.global/advanced/erc-7579/overview
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# What is ERC-7579? – Safe Docs

Advanced

ERC-7579

Overview

# What is ERC-7579?

[ERC-7579 (opens in a new tab)](https://erc7579.com/) outlines the minimally required interfaces and behavior for modular smart accounts and modules to ensure interoperability across implementations.

ERC-7579 is a standard for accounts but does not specify how accounts work internally. Instead, it defines the account interface so developers can implement modules for all smart accounts that follow this standard. The primary consumers of ERC-7579 are module developers, not account implementers. However, the account implementers implement ERC-7579 so that module developers can support all account implementations that implement this standard. That being said, a module for Safe will work with the Biconomy wallet, ZeroDev wallet, etc.

![diagram-7579](/_next/static/media/diagram-7579.548f0613.png)

## Why ERC-7579?

Without ERC-7579, smart account implementations were fragmented as different implementations required unique adaptations. Different assumptions can lead to security bugs under one account implementation, creating barriers for developers and limiting the user experience. ERC-7579 offers a universal standard that ensures all modules can work across all smart account implementations supporting ERC-7579.

[#### Compatibility

It enables modules to work across different smart accounts.](/advanced/erc-7579/overview)

[#### User experience

It ensures smart accounts can be used with various wallet applications and SDKs.](/advanced/erc-7579/overview)

[#### Ecosystem

It helps prevent vendor lock-in for smart account users and application developers.](/advanced/erc-7579/overview)

## Further reading

- [Official documentation (opens in a new tab)](https://erc7579.com/)
- [EIP document (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-7579)

[Permissionless.js Detailed](/advanced/erc-4337/guides/permissionless-detailed "Permissionless.js Detailed")[Safe and ERC-7579](/advanced/erc-7579/7579-safe "Safe and ERC-7579")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- What is ERC-7579?
  - Why ERC-7579?
      - Compatibility
      - User experience
      - Ecosystem
  - Further reading

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/erc-7579/overview](https://docs.safe.global/advanced/erc-7579/overview)
- [CompatibilityIt enables modules to work across different smart accounts.](https://docs.safe.global/advanced/erc-7579/overview)
- [User experienceIt ensures smart accounts can be used with various wallet applications and SDKs.](https://docs.safe.global/advanced/erc-7579/overview)
- [EcosystemIt helps prevent vendor lock-in for smart account users and application developers.](https://docs.safe.global/advanced/erc-7579/overview)
- [https://docs.safe.global/advanced/erc-7579/overview](https://docs.safe.global/advanced/erc-7579/overview)
- [Permissionless.js Detailed](https://docs.safe.global/advanced/erc-4337/guides/permissionless-detailed)
- [Safe and ERC-7579](https://docs.safe.global/advanced/erc-7579/7579-safe)

### External Links

- [ERC-7579(opens in a new tab)](https://erc7579.com)
- [Official documentation(opens in a new tab)](https://erc7579.com)
- [EIP document(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-7579)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

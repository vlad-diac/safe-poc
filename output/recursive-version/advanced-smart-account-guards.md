---
title: Safe Guards – Safe Docs
url: https://docs.safe.global/advanced/smart-account-guards
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe Guards – Safe Docs

Advanced

Safe Guards

# Safe Guards

ℹ️

Safe Guards are introduced with [Safe contracts version
1.3.0 (opens in a new tab)](https://GitHub.com/safe-global/safe-smart-account/blob/v1.3.0/CHANGELOG.md).

Safe Guards are used when there are restrictions on top of the `n`-out-of-`m` scheme.

Safe Guards can make checks before and after a Safe transaction. The check before a transaction can programmatically check all the parameters of the respective transaction before execution. The check after a transaction is called at the end of the transaction execution and can be used to perform checks on the final state of the Safe.

To read about different examples of Safe Guards, see the implementations from [Zodiac (opens in a new tab)](https://github.com/gnosis/zodiac-guard-scope) and [Yearn (opens in a new tab)](https://mirror.xyz/yearn-finance-engineering.eth/9uInM_sCrogPBs5qkFSNF6qe-32-0XLN5bty5wKLVqU).

![diagram Safe Guards](/_next/static/media/diagram-safe-guards.f256b37f.png)

‼️

**Important:** Since a Safe Guard has full power to block Safe transaction
execution, a broken Guard can cause a denial of service for a Safe. Make sure
to audit the Guard code and pay attention to recovery mechanisms.

[Smart Account Modules Tutorial](/advanced/smart-account-modules/smart-account-modules-tutorial "Smart Account Modules Tutorial")[Smart Account Guard Tutorial](/advanced/smart-account-guards/smart-account-guard-tutorial "Smart Account Guard Tutorial")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe Guards

---

## Related Links

### Internal Links

- [Smart Account Modules Tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [Smart Account Guard Tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)

### External Links

- [Safe contracts version
1.3.0(opens in a new tab)](https://GitHub.com/safe-global/safe-smart-account/blob/v1.3.0/CHANGELOG.md)
- [Zodiac(opens in a new tab)](https://github.com/gnosis/zodiac-guard-scope)
- [Yearn(opens in a new tab)](https://mirror.xyz/yearn-finance-engineering.eth/9uInM_sCrogPBs5qkFSNF6qe-32-0XLN5bty5wKLVqU)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Migrate to v3 – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v3
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v3 – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Migrate to v3

# Migrate to v3

This guide references the major changes between v2 and v3 to help those migrating an existing app.

**Note:** When upgrading to `protocol-kit` v3, it's necessary to upgrade to `safe-core-sdk-types` v4.

## The signTransactionHash() was renamed signHash()

The `signTransactionHash()` method was renamed to `signHash()` to align with the method's purpose. The method is not strictly for transactions, as the parameter is a hash, so the new name is more accurate.

`_10

// old:

_10

protocolKit.signTransactionHash(safeTxHash)

_10

_10

// new:

_10

protocolKit.signHash(safeTxHash)`

## Type changes

The `SafeTransactionEIP712Args` was renamed `SafeEIP712Args` as the EIP-712 is not exclusive for transactions.

[Migrate to v2](/sdk/protocol-kit/guides/migrate-to-v2 "Migrate to v2")[Migrate to v4](/sdk/protocol-kit/guides/migrate-to-v4 "Migrate to v4")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v3
  - The signTransactionHash() was renamed signHash()
  - Type changes

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v3](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v3)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v3](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v3)
- [Migrate to v2](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v2)
- [Migrate to v4](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v4)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

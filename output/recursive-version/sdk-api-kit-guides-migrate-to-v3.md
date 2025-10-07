---
title: Migrate to v3 – Safe Docs
url: https://docs.safe.global/sdk/api-kit/guides/migrate-to-v3
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v3 – Safe Docs

SDK

[API Kit](/sdk/api-kit)

Guides

Migrate to v3

# Migrate to v3

This guide references the major changes between v2 and v3 to help those migrating an existing app.

## Changed method signature

We extracted `safeAddress` and renamed `xxxProps` types to `xxxOptions` types in the following method

- `getSafeOperationsByAddress(props: GetSafeOperationListProps)` is now `getSafeOperationsBySafeAddress(safeAddress, options: GetSafeOperationListOptions)`

## Renamed types

We renamed the `xxxProps` types to `xxxOptions` in the following methods:

- `addMessage(safeAddress: string, addMessageProps: AddMessageProps)` is now `addMessage(safeAddress: string, addMessageOptions: AddMessageOptions)`
- `getMessages(safeAddress: string, props: GetSafeMessageListProps)` is now `getMessages(safeAddress: string, options: GetSafeMessageListOptions)`

[Migrate to v2](/sdk/api-kit/guides/migrate-to-v2 "Migrate to v2")[Migrate to v4](/sdk/api-kit/guides/migrate-to-v4 "Migrate to v4")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v3
  - Changed method signature
  - Renamed types

---

## Related Links

### Internal Links

- [API Kit](https://docs.safe.global/sdk/api-kit)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v3](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v3)
- [https://docs.safe.global/sdk/api-kit/guides/migrate-to-v3](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v3)
- [Migrate to v2](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v2)
- [Migrate to v4](https://docs.safe.global/sdk/api-kit/guides/migrate-to-v4)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Migrate to v2 – Safe Docs
url: https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v2
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v2 – Safe Docs

SDK

[Relay Kit](/sdk/relay-kit)

Guides

Migrate to v2

# Migrate to v2

This guide references the major changes between v1 and v2 to help those migrating an existing app.

## GelatoRelayPack

- The `GelatoRelayPack` constructor now includes a mandatory `protocolKit` parameter. It's required for any new pack extending the `RelayKitBasePack`.

`_10

constructor({ apiKey, protocolKit }: GelatoOptions)`

- We removed the `protocolKit` parameter from the `createTransactionWithHandlePayment()`, `createTransactionWithTransfer()`, and `executeRelayTransaction()` methods in the `GelatoRelayPack` as now it's included in the constructor.
- Removed the `export interface RelayPack` type as we now use an abstract class.

[Gelato Relay](/sdk/relay-kit/guides/gelato-relay "Gelato Relay")[Migrate to v3](/sdk/relay-kit/guides/migrate-to-v3 "Migrate to v3")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v2
  - GelatoRelayPack

---

## Related Links

### Internal Links

- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v2](https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v2)
- [Gelato Relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [Migrate to v3](https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v3)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

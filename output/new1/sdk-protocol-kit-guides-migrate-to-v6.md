---
title: Migrate to v6 – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v6
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Migrate to v6 – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Migrate to v6

# Migrate to v6

This guide references the major changes between v5 and v6 to help those migrating an existing app.

## Removing `SigningMethod` and `SigningMethodType`

We moved these types to the `api-kit`.

`_10

// old v5 code

_10

import { SigningMethod, SigningMethodType } from '@safe-global/protocol-kit'

_10

_10

// new v6 code

_10

import { SigningMethod, SigningMethodType } from '@safe-global/types-kit'`

[Migrate to v5](/sdk/protocol-kit/guides/migrate-to-v5 "Migrate to v5")[Reference](/sdk/protocol-kit/guides/migrate-to-v6# "Reference")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Migrate to v6
  - RemovingSigningMethodandSigningMethodType

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v6](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v6)
- [Migrate to v5](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v5)
- [Reference](https://docs.safe.global/sdk/protocol-kit/guides/migrate-to-v6)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

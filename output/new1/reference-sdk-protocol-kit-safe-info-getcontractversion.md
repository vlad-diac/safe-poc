---
title: getContractVersion – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getcontractversion
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getContractVersion – Safe Docs

Protocol Kit Reference

Safe Configuration

getContractVersion

# `getContractVersion`

Returns the contract version of the connected Safe.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const contractVersion = protocolKit.getContractVersion()`

## Returns

[`SafeVersion` (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts#L3)

The Safe contract version.

[getChainId](/reference-sdk-protocol-kit/safe-info/getchainid "getChainId")[getNonce](/reference-sdk-protocol-kit/safe-info/getnonce "getNonce")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getContractVersion
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getcontractversion](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getcontractversion)
- [https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getcontractversion](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getcontractversion)
- [getChainId](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getchainid)
- [getNonce](https://docs.safe.global/reference-sdk-protocol-kit/safe-info/getnonce)

### External Links

- [SafeVersion(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/main/packages/types-kit/src/types.ts)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

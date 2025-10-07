---
title: getOnchainIdentifier – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/onchain-tracking/getOnchainIdentifier
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# getOnchainIdentifier – Safe Docs

Protocol Kit Reference

On-chain Tracking

getOnchainIdentifier

# `getOnchainIdentifier`

Returns the on-chain identifier generated internally. This identifier is appended to the `data` field of transactions to enable on-chain tracking.

## Usage



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const onchainIdentifier = await protocolKit.getOnchainIdentifier()

_10

_10

console.log(onchainIdentifier) // e.g., '5afe006562303761323539616336346466346135306537646561393238383963'`

## Returns

`string`

The on-chain identifier in hexadecimal format (`5afe00...`), which includes hashed metadata such as project name, platform, tool, and tool version.

For more details about the identifier format, please refer to the [On-chain identifier](/sdk/onchain-tracking#on-chain-identifier-format) section.

[createPasskeySigner](/reference-sdk-protocol-kit/passkeys/createpasskeysigner "createPasskeySigner")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- getOnchainIdentifier
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/onchain-tracking/getOnchainIdentifier](https://docs.safe.global/reference-sdk-protocol-kit/onchain-tracking/getOnchainIdentifier)
- [https://docs.safe.global/reference-sdk-protocol-kit/onchain-tracking/getOnchainIdentifier](https://docs.safe.global/reference-sdk-protocol-kit/onchain-tracking/getOnchainIdentifier)
- [On-chain identifier](https://docs.safe.global/sdk/onchain-tracking)
- [createPasskeySigner](https://docs.safe.global/reference-sdk-protocol-kit/passkeys/createpasskeysigner)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

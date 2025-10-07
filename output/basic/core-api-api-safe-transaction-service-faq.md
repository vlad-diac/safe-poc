---
title: FAQ – Safe Docs
url: https://docs.safe.global/core-api/api-safe-transaction-service/faq
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# FAQ – Safe Docs

API

[Running the Safe Transaction Service](/core-api/api-safe-transaction-service)

FAQ

# FAQ

## How can I interact with the service?

Aside from using standard HTTP requests:

- [Safe{Core} API Kit (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/packages/api-kit)
- [Safe-eth-py (opens in a new tab)](https://github.com/safe-global/safe-eth-py)
- [Safe CLI (opens in a new tab)](https://github.com/safe-global/safe-cli): It has a `tx-service` mode to gather off-chain signatures.

More information is available in the Guides section of this documentation.

## If I add my chain to [safe-eth-py (opens in a new tab)](https://github.com/safe-global/safe-eth-py/blob/main/safe_eth/safe/addresses.py) will you support it?

No, for a chain to be supported, we need to set up a dedicated infra for that network and have a [proper RPC (opens in a new tab)](https://docs.safe.global/safe-core-api/rpc-requirements).

## How do you handle reorgs?

When indexing, every block is marked as `not confirmed` unless it has some depth (configured via `ETH_REORG_BLOCKS` environment variable). `Not confirmed` blocks are checked periodically to check if the blockchain `blockHash` for that `number` changed before it reaches the desired number of `confirmations`. If that's the case, all blocks from that block and the related transactions are deleted, and indexing is restarted to the last `confirmed` block.

## What does the banned field mean in SafeContract model?

The `banned` field in the `SafeContract` model is used to prevent indexing certain Safes with an unsupported `MasterCopy` or unverified proxies that have issues during indexing. This field does not remove the banned Safe, and indexing can be resumed once the problem is solved.

## Why does the /v1/safes/{address} endpoint show a nonce indicating that a transaction was executed while it is not shown or marked as executed in the other endpoints?

`/v1/safes/{address}` endpoint uses `eth_call` from the RPC to get the current information for a Safe, so there's no delay, and as soon as a transaction is executed, it will be updated. The other endpoints rely on polling, indexing, decoding, and processing of traces/events, taking longer (shouldn't be more than half a minute).

[RPC Requirements](/core-api/api-safe-transaction-service/rpc-requirements "RPC Requirements")[Overview](/core-api/transaction-service-overview "Overview")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- FAQ
  - How can I interact with the service?
  - If I add my chain tosafe-eth-py(opens in a new tab)will you support it?
  - How do you handle reorgs?
  - What does the banned field mean in SafeContract model?
  - Why does the /v1/safes/{address} endpoint show a nonce indicating that a transaction was executed while it is not shown or marked as executed in the other endpoints?

---

## Related Links

### Internal Links

- [Running the Safe Transaction Service](https://docs.safe.global/core-api/api-safe-transaction-service)
- [https://docs.safe.global/core-api/api-safe-transaction-service/faq#how-can-i-interact-with-the-service](https://docs.safe.global/core-api/api-safe-transaction-service/faq#how-can-i-interact-with-the-service)
- [https://docs.safe.global/core-api/api-safe-transaction-service/faq#if-i-add-my-chain-tosafe-eth-py-will-you-support-it](https://docs.safe.global/core-api/api-safe-transaction-service/faq#if-i-add-my-chain-tosafe-eth-py-will-you-support-it)
- [proper RPC(opens in a new tab)](https://docs.safe.global/safe-core-api/rpc-requirements)
- [https://docs.safe.global/core-api/api-safe-transaction-service/faq#how-do-you-handle-reorgs](https://docs.safe.global/core-api/api-safe-transaction-service/faq#how-do-you-handle-reorgs)
- [https://docs.safe.global/core-api/api-safe-transaction-service/faq#what-does-the-banned-field-mean-in-safecontract-model](https://docs.safe.global/core-api/api-safe-transaction-service/faq#what-does-the-banned-field-mean-in-safecontract-model)
- [https://docs.safe.global/core-api/api-safe-transaction-service/faq#whydoes-the-v1safesaddressendpoint-show-a-nonce-indicating-that-a-transaction-was-executed-while-it-is-not-shown-or-marked-as-executed-in-the-other-endpoints](https://docs.safe.global/core-api/api-safe-transaction-service/faq#whydoes-the-v1safesaddressendpoint-show-a-nonce-indicating-that-a-transaction-was-executed-while-it-is-not-shown-or-marked-as-executed-in-the-other-endpoints)
- [RPC Requirements](https://docs.safe.global/core-api/api-safe-transaction-service/rpc-requirements)
- [Overview](https://docs.safe.global/core-api/transaction-service-overview)

### External Links

- [Safe{Core} API Kit(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/packages/api-kit)
- [Safe-eth-py(opens in a new tab)](https://github.com/safe-global/safe-eth-py)
- [Safe CLI(opens in a new tab)](https://github.com/safe-global/safe-cli)
- [safe-eth-py(opens in a new tab)](https://github.com/safe-global/safe-eth-py/blob/main/safe_eth/safe/addresses.py)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

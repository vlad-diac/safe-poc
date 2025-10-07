---
title: Safe Signatures – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/signatures
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe Signatures – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

Signatures

# Safe Signatures

This guide shows how Safe signatures work and how to generate them using the Protocol Kit.

## Setup

Safe accounts can be configured with different threshold values and types of owners. Safe owners can be any Ethereum address, such as:

- Externally-owned accounts (EOAs). They generate an ECDSA signature to approve Safe transactions.
- Smart accounts that implement the [EIP-1271 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271) for signature validation, like Safe does. They use a different signature algorithm depending on the implementation of the smart account.

In the following guides, there are different accounts involved that will be used as an example:

| Who | Description | Address for this example |
| --- | --- | --- |
| `SAFE_3_4_ADDRESS` | 3/4 Safe (3 signatures required out of 4 owners) | 0xb3b3862D8e38a1E965eb350B09f2167B2371D652 |
| `OWNER_1_ADDRESS` | EOA and owner of `SAFE_3_4_ADDRESS` | 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 |
| `OWNER_2_ADDRESS` | EOA and owner of `SAFE_3_4_ADDRESS` | 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0 |
| `SAFE_1_1_ADDRESS` | 1/1 Safe and owner of `SAFE_3_4_ADDRESS` | 0x215033cdE0619D60B7352348F4598316Cc39bC6E |
| `OWNER_3_ADDRESS` | EOA and owner of `SAFE_1_1_ADDRESS` | 0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b |
| `SAFE_2_3_ADDRESS` | 2/3 Safe and owner of `SAFE_3_4_ADDRESS` | 0xf75D61D6C27a7CC5788E633c1FC130f0F4a62D33 |
| `OWNER_4_ADDRESS` | EOA and owner of `SAFE_2_3_ADDRESS` | 0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d |
| `OWNER_5_ADDRESS` | EOA and owner of `SAFE_2_3_ADDRESS` | 0xd03ea8624C8C5987235048901fB614fDcA89b117 |

We need to instantiate all the signers based on the Safe owner accounts.

`_10

// https://chainlist.org/?search=sepolia&testnets=true

_10

const RPC_URL = 'https://eth-sepolia.public.blastapi.io'

_10

_10

// Initialize signers

_10

const OWNER_1_PRIVATE_KEY = // ...

_10

const OWNER_2_PRIVATE_KEY = // ...

_10

const OWNER_3_PRIVATE_KEY = // ...

_10

const OWNER_4_PRIVATE_KEY = // ...

_10

const OWNER_5_PRIVATE_KEY = // ...`

## Guides

### Transaction signatures

- The [Transaction signatures](/sdk/protocol-kit/guides/signatures/transactions) guide explains how transactions are signed by Safe owners using the Protocol Kit.

### Message signatures

- Using the Protocol Kit, the [Message signatures](/sdk/protocol-kit/guides/signatures/messages) guide explains how to generate and sign messages, including plain string messages and EIP-712 JSON messages.

[Execute transactions](/sdk/protocol-kit/guides/execute-transactions "Execute transactions")[Transactions](/sdk/protocol-kit/guides/signatures/transactions "Transactions")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe Signatures
  - Setup
  - Guides
    - Transaction signatures
    - Message signatures

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [Transaction signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [Message signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [Execute transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)
- [Transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)

### External Links

- [EIP-1271(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

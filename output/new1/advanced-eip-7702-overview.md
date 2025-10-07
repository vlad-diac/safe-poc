---
title: What is EIP-7702? – Safe Docs
url: https://docs.safe.global/advanced/eip-7702/overview
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# What is EIP-7702? – Safe Docs

Advanced

EIP-7702

Overview

# What is EIP-7702?

EIP-7702 is a step towards account abstraction, enabling EOAs (Externally Owned Accounts) to have both code and storage. This enhancement allows EOAs to function as smart contract accounts, unlocking new features such as:

- **Transaction batching**.
- **Gas sponsorship**.
- **Delegated actions**: Granting other addresses limited access to act on behalf of the EOA.

## Signing Process

In its current implementation, EIP-7702 requires the EOA to sign a special hash calculated using the following parameters:

- `chain_id`: The identifier of the blockchain network.
- `address`: The account address to which calls will be delegated.
- `nonce`: Current nonce of the account.

Once the EOA signs the hash, an authorization list is sent to the EVM node through a new transaction type, the set code transaction, introduced in EIP-7702.

The execution client then performs the following checks:

- Verifies the signature.
- Checks the account's nonce.
- Confirms the chain ID (`0` or the current chain ID).

If all checks pass, the execution client sets the EOA's code in the format `(0xef0100 ++ address)`.

EIP-7702 is available on devnets and testnets such as Pectra Devnet, Ithaca and will be enabled on Ethereum Mainnet after the Pectra upgrade.

An important consideration that applies for EOAs that have code set is that the private key can still be used to sign transactions and even change delegations. Hence, it is important to keep the private key secure even after the authorization has been signed.

ℹ️

This signing method is not compatible with the EIP-712 or EIP-191 standards. Wallet providers must add support
for this specific signing method.

## Further reading

- [EIP-7702 on Ethereum EIPs (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-7702)

[Build an app with Safe and ERC-7579](/advanced/erc-7579/tutorials/7579-tutorial "Build an app with Safe and ERC-7579")[Safe and EIP-7702](/advanced/eip-7702/7702-safe "Safe and EIP-7702")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- What is EIP-7702?
  - Signing Process
  - Further reading

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/eip-7702/overview](https://docs.safe.global/advanced/eip-7702/overview)
- [https://docs.safe.global/advanced/eip-7702/overview](https://docs.safe.global/advanced/eip-7702/overview)
- [Build an app with Safe and ERC-7579](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [Safe and EIP-7702](https://docs.safe.global/advanced/eip-7702/7702-safe)

### External Links

- [EIP-7702 on Ethereum EIPs(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-7702)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

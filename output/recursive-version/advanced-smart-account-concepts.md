---
title: Smart Account Concepts – Safe Docs
url: https://docs.safe.global/advanced/smart-account-concepts
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Smart Account Concepts – Safe Docs

Advanced

Concepts

### Concepts

#### Owners

Each Safe account maintains its own list of [owners](/home/glossary#owner) in the storage in the form of Ethereum addresses. Owners can be added or removed by other owners.

#### Threshold

Safe Smart Account maintains a [threshold](/home/glossary#threshold), the minimum number of owners required to confirm a transaction before it gets executed. The threshold of owners required to confirm a transaction is also stored in the storage. Owners of a Safe account can change the threshold value as well. A Safe account can have any number of owners, and the threshold value can be set between one and the total number of owners.

#### Signature verification

Safe Smart Account, being a contract account, does not have a private key to sign transactions, and EVM cannot verify incoming transactions to a contract account. Hence, a contract account has to do the authentication and authorization in its code. When a transaction is submitted to a Safe account, it is first verified by the Safe account to ensure that the transaction is valid. If the required number of owners has signed the transaction, the transaction is allowed to be executed. If the required number of owners has not signed the transaction, the transaction reverts to the signature validation step.
A Safe Smart Account verifies if each signer is an owner of the Safe account and verifies the signature based on the signature type. To learn more about the signature types supported by Safe and encoding, refer to the [Signatures](/advanced/smart-account-signatures) page.

#### Transaction flow

Transactions through a Safe Smart Account can be primarily divided into two types:

##### Safe Transaction

Safe Smart Account contract provides `execTransaction` function to submit and execute a Safe transaction which is signed by the owners of the Safe Smart Account.

To execute a transaction with the Safe Smart Account, the `execTransaction` method needs to be called with the following parameters:

- `to`: The recipient address of the transaction.
- `value`: The amount of Ether (in wei) to send with the transaction.
- `data`: The data payload of the transaction, typically used to call a function on the recipient contract.
- `operation`: Safe Smart Account supports `CALL` and `DELEGATECALL.`
- `safeTxGas`: Gas that should be used for the Safe transaction.
- `baseGas`: This is the amount of gas independent of the specific Safe transactions, but used for general things such as signature checks and the base transaction fee. `SafeTxGas` and `baseGas` combined are comparable to the gas limit of a regular transaction.
- `gasPrice`: Same like for a regular Ethereum transaction. Setting the gas price to 0 means that no refund is paid out.
- `gasToken`: For regular Ethereum transactions, gas is always paid in Ether. A Safe Smart Account enables users to pay in ERC20 tokens or Ether. The desired token is specified here. If `0x0`, then Ether is used. Gas costs are calculated by `(baseGas + txGas) * gasPrice`.
- `refundReceiver`: The refund does not necessarily have to go to the account submitting the transaction but can be paid out to any account specified here. If set to `0`, `tx.origin` will be used.
- `signatures`: All parameters are used to generate a transaction hash and signed by the owners of the Safe Smart Account. A list of hex encoded signatures is expected (`execTransaction` expects that the signatures are sorted by owner address. This is required to easily validate no confirmation duplicates exist).

##### Module Transaction

Safe Smart Account contract provides `execTransactionFromModule` and `execTransactionFromModuleReturnData` functions to accept transactions from modules. A module can be any Ethereum address and can bypass signature verification logic to execute transactions through a Safe Smart Account.

- `to`: The recipient address of the transaction.
- `value`: The amount of Ether (in wei) to send with the transaction.
- `data`: The data payload of the transaction, typically used to call a function on the recipient contract.
- `operation`: The type of operation to execute, either `CALL` or `DELEGATECALL.`

Here are some core components of a Safe Smart Account that you will learn about:

#### Safe Modules

[Safe Modules](/home/glossary#safe-module) are smart contracts that extend Safe's functionality with added custom features while the module logic remains separate from Safe's core contracts.

More information is available in the [Safe Modules](/advanced/smart-account-modules) page.

#### Safe Guards

[Safe Guards](/home/glossary#safe-guard) make checks before and after a Safe transaction.

More information is available in the [Safe Guards](/advanced/smart-account-guards) page.

#### Signatures

Safe Smart Account support alternative signature schemes such as [EIP-1271 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271) and [EIP-712 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-712) and relaying by making the confirmation/verification logic independent of `msg.sender`. Read more about the [signature schemes (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/docs/signatures.md) supported by Safe.

[Overview](/advanced/smart-account-overview "Overview")[Safe Modules](/advanced/smart-account-modules "Safe Modules")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

    - Concepts
      - Owners
      - Threshold
      - Signature verification
      - Transaction flow
        - Safe Transaction
        - Module Transaction
      - Safe Modules
      - Safe Guards
      - Signatures

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [owners](https://docs.safe.global/home/glossary)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [threshold](https://docs.safe.global/home/glossary)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [Signatures](https://docs.safe.global/advanced/smart-account-signatures)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [Safe Modules](https://docs.safe.global/home/glossary)
- [Safe Modules](https://docs.safe.global/advanced/smart-account-modules)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [Safe Guards](https://docs.safe.global/home/glossary)
- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards)
- [https://docs.safe.global/advanced/smart-account-concepts](https://docs.safe.global/advanced/smart-account-concepts)
- [Overview](https://docs.safe.global/advanced/smart-account-overview)
- [Safe Modules](https://docs.safe.global/advanced/smart-account-modules)

### External Links

- [EIP-1271(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271)
- [EIP-712(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-712)
- [signature schemes(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/docs/signatures.md)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

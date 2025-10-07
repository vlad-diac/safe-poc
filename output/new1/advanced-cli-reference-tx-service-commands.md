---
title: Commands specific to the tx-service mode – Safe Docs
url: https://docs.safe.global/advanced/cli-reference/tx-service-commands
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Commands specific to the tx-service mode – Safe Docs

Advanced

[Reference](/advanced/cli-reference)

Commands specific to the tx-service mode

# Commands specific to the `tx-service` mode

Here's a reference for commands specific to the `tx-service` mode.

## Return balance

Returns a list of balances for ERC-20 tokens and ether.

`_10

balances`

## Transactions

### Return transaction history

Returns history of multi-signature transactions (including pending).

`_10

history`

### Execute pending transaction

Execute a pending transaction with enough signatures.

`_10

execute-tx <safe-tx-hash>`

### Sign transaction

Sign a transaction with the loaded owners for the provided Safe transaction hash.

`_10

sign-tx <safe-tx-hash>`

### Sign message

Sign the string message provided by the standard input or the EIP-712 provided by the file.

`_10

sign_message [--eip191_message <str>] [--eip712_path <file-path>]`

### Batch transactions

Batch transactions into one multi-signature transaction using the provided `safe-nonce.` Any `safe-tx` can be used, like transactions from other Safe accounts, already executed transactions, pending execution, etc. The only limitation is that the transactions from other networks cannot be used. The batching order will follow the same order of the `safe-tx-hashes` provided.

`_10

batch-txs <safe-nonce> <safe-tx-hash> [ <safe-tx-hash> ... ]`

### Remove proposed transaction

Removes a proposed non-executed transaction with the owner's signature that proposed the transaction.

`_10

remove_proposed_transaction <safe_tx_hsh>`

## Delegates

### Return delegates

Returns a list of delegates for the Safe. A delegate can be used when you trust an address to post transactions to the tx-service on your behalf. If a transaction is not trusted (posted to the service and not signed by a delegate or an owner of the Safe), it will be stored in the service but not shown in Safe {Wallet}.

`_10

get_delegates`

### Add delegate

Adds a new delegate `address` for the `owner` of the Safe.

`_10

add_delegate <address> <label> <owner-address>`

### Remove delegate

Removes a delegate `address` from the Safe.

`_10

remove_delegate <address> <owner-address>`

⚠️

Only use the following operation if you are sure about what you are doing, as they can result in all your funds getting lost.

## Drain account

Sends all ether and ERC-20 funds to the provided account.

`_10

drain <address>`

[Common commands for both modes](/advanced/cli-reference/common-commands "Common commands for both modes")[Commands available in unattended mode](/advanced/cli-reference/unattended-commands "Commands available in unattended mode")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Commands specific to thetx-servicemode
  - Return balance
  - Transactions
    - Return transaction history
    - Execute pending transaction
    - Sign transaction
    - Sign message
    - Batch transactions
    - Remove proposed transaction
  - Delegates
    - Return delegates
    - Add delegate
    - Remove delegate
  - Drain account

---

## Related Links

### Internal Links

- [Reference](https://docs.safe.global/advanced/cli-reference)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/tx-service-commands](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [Common commands for both modes](https://docs.safe.global/advanced/cli-reference/common-commands)
- [Commands available in unattended mode](https://docs.safe.global/advanced/cli-reference/unattended-commands)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

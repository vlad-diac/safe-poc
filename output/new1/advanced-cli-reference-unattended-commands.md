---
title: Commands available in unattended mode – Safe Docs
url: https://docs.safe.global/advanced/cli-reference/unattended-commands
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Commands available in unattended mode – Safe Docs

Advanced

[Reference](/advanced/cli-reference)

Commands available in unattended mode

# Commands available in unattended mode

In addition to the use cases referenced in the sections [Common commands for both modes](/advanced/cli-reference/common-commands) and [Commands specific to the tx-service mode](/advanced/cli-reference/tx-service-commands) it is possible to execute some commands without using the interactive prompt. This facilitates the use of `safe-cli` in generating scripts or automated processes.

The commands available for direct execution without the use of the interactive prompt are:

- send-custom
- send-ether
- send-erc20
- send-erc721
- tx-builder

These commands are executed in the same way as the interactive prompt commands in `blockchain` mode.

## Usage and common parameters

`_10

safe-cli command [OPTIONS] ARG1 ARG2 ARGN`

All commands available without using the interactive prompt share the following common arguments:

- `--private-key`: The list of private keys necessary for each operation. The `--private-key` option must be added as keys are often necessary. It is possible to specify the key value directly after the `--private-key`, or to pass the name of an environment variable containing the private key.
- `--interactive / --non-interactive`: Indicates if the execution of the command requires user interaction, such as a confirmation before executing a transaction. By default, it has the value `--interactive`, but it is possible to avoid any confirmation by using `--non-interactive`. This is useful for scripting and automation, where no user intervention is required.

## Transactions

### Send custom transactions

Sends a custom transaction from the Safe account to a contract. If `--delegate` is set, a `delegatecall` will be triggered.

`_15

safe-cli send-custom [OPTIONS] SAFE_ADDRESS NODE_URL TO VALUE DATA

_15

_15

╭─ Arguments ──────────────────────────────────────────────────────────────────────────────────────────────────╮

_15

│ * safe_address CHECKSUMADDRESS The address of the Safe. [required] │

_15

│ * node_url TEXT Ethereum node url. [required] │

_15

│ * to CHECKSUMADDRESS The address of destination. [required] │

_15

│ * value INTEGER Value to send. [required] │

_15

│ * data HEXBYTES HexBytes data to send. [required] │

_15

╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

_15

╭─ Options ────────────────────────────────────────────────────────────────────────────────────────────────────╮

_15

│ --private-key TEXT List of private keys of signers. │

_15

│ --safe-nonce INTEGER Force nonce for tx_sender │

_15

│ --delegate --no-delegate Use DELEGATE_CALL. By default use CALL [default: no-delegate] │

_15

│ --interactive --non-interactive Enable/disable interactive mode. │

_15

╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯`

### Send ether

Sends ether from the Safe to another account.

`_13

safe-cli send-ether [OPTIONS] SAFE_ADDRESS NODE_URL TO VALUE

_13

_13

╭─ Arguments ────────────────────────────────────────────────────────────────────────╮

_13

│ * safe_address CHECKSUMADDRESS The address of the Safe. [required] |

_13

│ * node_url TEXT Ethereum node url. [required] │

_13

│ * to CHECKSUMADDRESS The address of destination. [required] │

_13

│ * value INTEGER Amount of ether in wei to send. [required] │

_13

╰────────────────────────────────────────────────────────────────────────────────────╯

_13

╭─ Options ──────────────────────────────────────────────────────────────────────────╮

_13

│ --private-key TEXT List of private keys of signers. │

_13

│ --safe-nonce INTEGER Force nonce for tx_sender │

_13

│ --interactive --non-interactive Enable/disable interactive mode. │

_13

╰────────────────────────────────────────────────────────────────────────────────────╯`

### Send ERC-20 tokens

Sends an ERC-20 token from the Safe account to a different one.

`_14

safe-cli send-erc20 [OPTIONS] SAFE_ADDRESS NODE_URL TO TOKEN_ADDRESS AMOUNT

_14

_14

╭─ Arguments ────────────────────────────────────────────────────────────────────────────────╮

_14

│ * safe_address CHECKSUMADDRESS The address of the Safe. [required] |

_14

│ * node_url TEXT Ethereum node url. [required] │

_14

│ * to CHECKSUMADDRESS The address of destination. [required] │

_14

│ * token_address CHECKSUMADDRESS Erc20 token address. [required] │

_14

│ * amount INTEGER Amount of erc20 tokens in wei to send. [required] │

_14

╰────────────────────────────────────────────────────────────────────────────────────────────╯

_14

╭─ Options ──────────────────────────────────────────────────────────────────────────────────╮

_14

│ --private-key TEXT List of private keys of signers. │

_14

│ --safe-nonce INTEGER Force nonce for tx_sender │

_14

│ --interactive --non-interactive Enable/disable interactive mode. │

_14

╰────────────────────────────────────────────────────────────────────────────────────────────╯`

### Send ERC-721 tokens

Sends an ERC-721 token from the Safe account to a different one.

`_14

safe-cli send-erc721 [OPTIONS] SAFE_ADDRESS NODE_URL TO TOKEN_ADDRESS TOKEN_ID

_14

_14

╭─ Arguments ───────────────────────────────────────────────────────────────────────╮

_14

│ * safe_address CHECKSUMADDRESS The address of the Safe. [required] |

_14

│ * node_url TEXT Ethereum node url. [required] │

_14

│ * to CHECKSUMADDRESS The address of destination. [required] │

_14

│ * token_address CHECKSUMADDRESS Erc20 token address. [required] │

_14

│ * token_id INTEGER Erc721 token id. [required] │

_14

╰───────────────────────────────────────────────────────────────────────────────────╯

_14

╭─ Options ─────────────────────────────────────────────────────────────────────────╮

_14

│ --private-key TEXT List of private keys of signers. │

_14

│ --safe-nonce INTEGER Force nonce for tx_sender │

_14

│ --interactive --non-interactive Enable/disable interactive mode. │

_14

╰───────────────────────────────────────────────────────────────────────────────────╯`

### Transaction builder

Execute a transaction or transaction batch from a `JSON` file. The format of the file is the same as the one used from the [Safe{Wallet} (opens in a new tab)](https://app.safe.global) website in the `Transaction Builder` application.

This [guide (opens in a new tab)](https://help.safe.global/en/articles/40841-transaction-builder) explains how to use the tx-builder application.

`_11

safe-cli tx-builder [OPTIONS] SAFE_ADDRESS NODE_URL FILE_PATH

_11

_11

╭─ Arguments ────────────────────────────────────────────────────────────────────────╮

_11

│ * safe_address CHECKSUMADDRESS The address of the Safe. [required] │

_11

│ * node_url TEXT Ethereum node url. [required] │

_11

│ * file_path FILE File path with tx_builder data. [required] |

_11

╰────────────────────────────────────────────────────────────────────────────────────╯

_11

╭─ Options ──────────────────────────────────────────────────────────────────────────╮

_11

│ --private-key TEXT List of private keys of signers. │

_11

│ --interactive --non-interactive Enable/disable interactive mode. │

_11

╰────────────────────────────────────────────────────────────────────────────────────╯`

[Commands specific to the tx-service mode](/advanced/cli-reference/tx-service-commands "Commands specific to the tx-service mode")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Commands available in unattended mode
  - Usage and common parameters
  - Transactions
    - Send custom transactions
    - Send ether
    - Send ERC-20 tokens
    - Send ERC-721 tokens
    - Transaction builder

---

## Related Links

### Internal Links

- [Reference](https://docs.safe.global/advanced/cli-reference)
- [Common commands for both modes](https://docs.safe.global/advanced/cli-reference/common-commands)
- [Commands specific to the tx-service mode](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference/unattended-commands](https://docs.safe.global/advanced/cli-reference/unattended-commands)
- [https://docs.safe.global/advanced/cli-reference/unattended-commands](https://docs.safe.global/advanced/cli-reference/unattended-commands)
- [https://docs.safe.global/advanced/cli-reference/unattended-commands](https://docs.safe.global/advanced/cli-reference/unattended-commands)
- [https://docs.safe.global/advanced/cli-reference/unattended-commands](https://docs.safe.global/advanced/cli-reference/unattended-commands)
- [https://docs.safe.global/advanced/cli-reference/unattended-commands](https://docs.safe.global/advanced/cli-reference/unattended-commands)
- [https://docs.safe.global/advanced/cli-reference/unattended-commands](https://docs.safe.global/advanced/cli-reference/unattended-commands)
- [https://docs.safe.global/advanced/cli-reference/unattended-commands](https://docs.safe.global/advanced/cli-reference/unattended-commands)
- [Commands specific to the tx-service mode](https://docs.safe.global/advanced/cli-reference/tx-service-commands)

### External Links

- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [guide(opens in a new tab)](https://help.safe.global/en/articles/40841-transaction-builder)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Common commands for both modes – Safe Docs
url: https://docs.safe.global/advanced/cli-reference/common-commands
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Common commands for both modes – Safe Docs

Advanced

[Reference](/advanced/cli-reference)

Common commands for both modes

# Common commands for both modes

Here's a reference for commands common to the `blockchain` and the `tx-service` modes.

ℹ️

You must first load the sender's private key. When loading an owner, it will be set automatically.

## Safe

### Create new Safe

You can create a new Safe by running the following command:

`_10

safe-creator <node_url> <private_key> --owners <checksummed_address_1> <checksummed_address_2> --threshold <uint> --salt-nonce <uint256>`

### Load Safe

To load a Safe, use the following command:

`_10

safe-cli <checksummed_safe_address> <ethereum_node_url>`

Then you should be on the prompt and see information about the Safe, like the owners, version, etc.

The next step would be loading some owners for the Safe. At least `threshold` owners need to be loaded to do operations on the Safe, and at least one should have funds to send transactions.

### Update Safe

Updates the Safe to the latest version (if you are on a known network like Mainnet).

`_10

update`

## Transactions

### Send custom transactions

Sends a custom transaction from the Safe account to a contract. If `--delegate` is set, a `delegatecall` will be triggered.

`_10

send_custom <address> <value-wei> <data-hex-str> [--delegate] [--safe-nonce <int>]`

### Send ether

Sends ether from the Safe to another account.

`_10

send_ether <address> <value-wei> [--safe-nonce <int>]`

### Send ERC-20 tokens

Sends an ERC-20 token from the Safe account to a different one.

`_10

send_erc20 <address> <token-address> <value-wei> [--safe-nonce <int>]`

### Send ERC-721 tokens

Sends an ERC-721 token from the Safe account to a different one.

`_10

send_erc721 <address> <token-address> <token-id> [--safe-nonce <int>]`

### Approve Safe transaction hash

Approves a `safe-tx-hash` for the provided sender address.

`_10

approve_hash <keccak-hexstr-hash> <sender-address>`

## Owners

### Add new owner

Adds a new owner `address` to the Safe.

`_10

add_owner <address>`

### Load owners

#### From private key

Loading owners is unnecessary if you want to do `read-only` operations.

To load owners:

`_10

> load_cli_owners <account_private_key>

_10

Loaded account 0xab...cd with balance=123 ether

_10

Set account 0xab..cd as default sender of txs`

You can also load owners from your environment variables before running the Safe CLI:

`_10

export MY_PRIVATE_KEY=YOUR_EOA_PRIVATE_KEY`

Run the Safe CLI, then:

`_10

> load_cli_owners MY_PRIVATE_KEY

_10

Loaded account 0xab...cd with balance=123 ether

_10

Set account 0xab..cd as default sender of txs`

To check the loaded owners:

`_10

> show_cli_owners`

To unload an owner:

`_10

> unload_cli_owners <ethereum_checksummed_address>`

#### From hardware wallets

ℹ️

Before signing anything, ensure that the data on your hardware wallet device is the same as the Safe CLI data.

If you want to use both Ledger and Trezor, you need to run the following command:

`_10

pip install "safe-cli[ledger, trezor]"`

##### Ledger

The Ledger module is an optional feature of the Safe CLI to sign transactions with the help of [ledgereth (opens in a new tab)](https://github.com/mikeshultz/ledger-eth-lib) library based on [ledgerblue (opens in a new tab)](https://github.com/LedgerHQ/blue-loader-python).

To enable, the Safe CLI must be installed as follows:

`_10

pip install "safe-cli[ledger]"`

When running on Linux, make sure the following rules have been added to `/etc/udev/rules.d/`:

`_10

SUBSYSTEMS=="usb", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0000", MODE="0660", TAG+="uaccess", TAG+="udev-acl" OWNER="<UNIX username>"

_10

SUBSYSTEMS=="usb", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0001", MODE="0660", TAG+="uaccess", TAG+="udev-acl" OWNER="<UNIX username>"

_10

SUBSYSTEMS=="usb", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0004", MODE="0660", TAG+="uaccess", TAG+="udev-acl" OWNER="<UNIX username>"`

**Ledger commands**

- `load_ledger_cli_owners [--legacy-accounts] [--derivation-path <str>]`: shows a list of the first five accounts (`--legacy-accounts` search using legacy derivation) or loads an account from the provided derivation path.

##### Trezor

The Trezor module is an optional feature of the Safe CLI to sign transactions from the Trezor hardware wallet using the [trezor (opens in a new tab)](https://pypi.org/project/trezor/) library.

To enable, the Safe CLI must be installed as follows:

`_10

pip install "safe-cli[trezor]"`

**Trezor commands**

- `load_trezor_cli_owners [--legacy-accounts] [--derivation-path <str>]`: shows a list of the first five accounts (`--legacy-accounts` search using legacy derivation) or loads an account from provided derivation path.

### Remove owner

Removes an owner `address` from the Safe.

`_10

remove_owner <address>`

## Change threshold

Changes the `threshold` of the Safe.

`_10

change_threshold <integer>`

## Modules

### Enable module

Enable module `address`.

`_10

enable_module <address>`

### Disable module

Disable module `address`.

`_10

disable_module <address>`

## Refresh Safe CLI

If the information in the information bar is outdated or there's any problem, you can force the Safe CLI to update the information about the Safe.

`_10

refresh`

⚠️

Only use the following operations if you are sure about what you are doing, as they can result in all your funds getting lost.

## Update fallback handler

Updates the fallback handler to be `address`. Supported by Safes with `version >= v1.1.0`.

`_10

change_fallback_handler <address>`

## Update Safe Guard

Updates the Safe Guard to be `address`. Supported by Safes with `version >= v1.3.0`.

`_10

change_guard <address>`

## Update master copy

Updates the master copy to be `address`. It's used to update the Safe.

`_10

change_master_copy <address>`

## Update to L2

⚠️

A non-L2 Safe can only be migrated to L2 if the non-L2 Safe was not used before (nonce must be zero).

Updates a `v1.1.1`, `v1.3.0`, or `v1.4.1` non-L2 Safe to an L2 Safe supported by Safe {Wallet}.
The migration contract address needs to be provided.
It can be found [here (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1-3/contracts/libraries/SafeToL2Migration.sol).
The nonce for the Safe must be 0, and supported versions are `v1.1.1`, `v1.3.0`, and `v1.4.1`.

`_10

update_version_to_l2 <address>`

where `address` is the address of the migration contract.

[Reference](/advanced/cli-reference "Reference")[Commands specific to the tx-service mode](/advanced/cli-reference/tx-service-commands "Commands specific to the tx-service mode")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Common commands for both modes
  - Safe
    - Create new Safe
    - Load Safe
    - Update Safe
  - Transactions
    - Send custom transactions
    - Send ether
    - Send ERC-20 tokens
    - Send ERC-721 tokens
    - Approve Safe transaction hash
  - Owners
    - Add new owner
    - Load owners
      - From private key
      - From hardware wallets
        - Ledger
        - Trezor
    - Remove owner
  - Change threshold
  - Modules
    - Enable module
    - Disable module
  - Refresh Safe CLI
  - Update fallback handler
  - Update Safe Guard
  - Update master copy
  - Update to L2

---

## Related Links

### Internal Links

- [Reference](https://docs.safe.global/advanced/cli-reference)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [https://docs.safe.global/advanced/cli-reference/common-commands](https://docs.safe.global/advanced/cli-reference/common-commands)

### External Links

- [ledgereth(opens in a new tab)](https://github.com/mikeshultz/ledger-eth-lib)
- [ledgerblue(opens in a new tab)](https://github.com/LedgerHQ/blue-loader-python)
- [trezor(opens in a new tab)](https://pypi.org/project/trezor)
- [here(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/v1.4.1-3/contracts/libraries/SafeToL2Migration.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

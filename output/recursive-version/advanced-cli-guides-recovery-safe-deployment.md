---
title: Deploy a Recovery Safe – Safe Docs
url: https://docs.safe.global/advanced/cli-guides/recovery-safe-deployment
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Deploy a Recovery Safe – Safe Docs

Advanced

Guides

Deploy a Recovery Safe

# Deploy a Recovery Safe

This guide will walk you through recreating a Safe with the same address on the desired network if you send funds to your Safe address in an incorrect chain.

ℹ️

It's not always possible to recover a Safe, learn more [here (opens in a new tab)](https://help.safe.global/en/articles/40812-i-sent-assets-to-a-safe-address-on-the-wrong-network-any-chance-to-recover).

## Recreate Safe 1.3.0 or 1.1.1

To recreate a Safe (version 1.3.0 or 1.1.1), you'll need the following essential data:

- The `Singleton` address
- The `ProxyFactory` address
- The `FallbackHandler` address
- The `Owners` addresses with which Safe was created
- The `SaltNonce` value
- The `Threshold` value
- RPC node provider for the target chain.
- The private-key of the deployer address

The necessary addresses can be collected from [safe-deployments (opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets) and the salt nonce from the Safe creation transaction in a block explorer.

⚠️

Ensure that the `Singleton`, `ProxyFactory`, and `FallbackHandler` are deployed in the target chain in the same addresses as the origin chain.

To recreate the Safe, it is necessary to execute the `safe-creator` as follows:

`_10

safe-creator --owners <owners-addresses> --safe-contract <singleton-address>

_10

--callback-handler <fallback-handler-address> --proxy-factory <proxy-factory-address>

_10

--threshold <threshold-value> --salt-nonce <salt-nonce-value> <url-rpc-node> <deployer-private-key>`

The Safe should have been successfully recreated with the same address on the target chain. If not, double-check the data collected from the transaction and ensure that all the necessary contracts are deployed in the chain.

## Migrate a Safe from non-L2 to L2

Our services cannot index if you've recreated a Safe from an L1 network (like mainnet) on an L2 network. That's because for L1, we use trace-based indexing, and for L2 events indexing, L1 Safe singleton does not emit events.

To address this, you'll need to update it to the L2 singleton with the command `update_version_to_l2` or consider transferring the funds to a new Safe on L2 that you control with the `drain` command.
For detailed instructions on running these commands, please refer to the [common commands](/advanced/cli-reference/common-commands) section for more information.

[Demos](/advanced/cli-demos "Demos")[Reference](/advanced/cli-reference "Reference")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Deploy a Recovery Safe
  - Recreate Safe 1.3.0 or 1.1.1
  - Migrate a Safe from non-L2 to L2

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/cli-guides/recovery-safe-deployment](https://docs.safe.global/advanced/cli-guides/recovery-safe-deployment)
- [https://docs.safe.global/advanced/cli-guides/recovery-safe-deployment](https://docs.safe.global/advanced/cli-guides/recovery-safe-deployment)
- [common commands](https://docs.safe.global/advanced/cli-reference/common-commands)
- [Demos](https://docs.safe.global/advanced/cli-demos)
- [Reference](https://docs.safe.global/advanced/cli-reference)

### External Links

- [here(opens in a new tab)](https://help.safe.global/en/articles/40812-i-sent-assets-to-a-safe-address-on-the-wrong-network-any-chance-to-recover)
- [safe-deployments(opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

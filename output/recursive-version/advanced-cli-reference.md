---
title: Reference – Safe Docs
url: https://docs.safe.global/advanced/cli-reference
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Reference – Safe Docs

Advanced

Reference

# Reference

The Safe CLI has two operation modes:

- **blockchain**: The default mode. Use the `blockchain` command to enable it. Transactions are sent to the blockchain.
- **tx-service**: Use the `tx-service` command to enable it. Transactions are sent to the Safe Transaction Service (if available on the network), and you can see them on Safe{Wallet}. At least one signer is needed to send transactions to the service. Transactions are not executed. It requires Safe{Core} API running on the network; also, set your [API key](/core-api/how-to-use-api-keys) using an environment variable `export SAFE_TRANSACTION_SERVICE_API_KEY=YOUR_API_KEY`.

[#### Common commands for both modes](/advanced/cli-reference/common-commands)

[#### Commands specific to the tx-service mode](/advanced/cli-reference/tx-service-commands)

## Configuration

### Use custom contracts

The Safe CLI comes with the official deterministic Safe Smart Account addresses deployed on multiple chains configured by default. You can edit the `safe_cli/safe_addresses.py` file if you want to use your own.

Be careful when modifying these addresses, as the funds in a Safe can get stuck if an invalid address is used when updating to an invalid Safe Master Copy.

[Deploy a Recovery Safe](/advanced/cli-guides/recovery-safe-deployment "Deploy a Recovery Safe")[Common commands for both modes](/advanced/cli-reference/common-commands "Common commands for both modes")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Reference
      - Common commands for both modes
      - Commands specific to the tx-service mode
  - Configuration
    - Use custom contracts

---

## Related Links

### Internal Links

- [API key](https://docs.safe.global/core-api/how-to-use-api-keys)
- [Common commands for both modes](https://docs.safe.global/advanced/cli-reference/common-commands)
- [Commands specific to the tx-service mode](https://docs.safe.global/advanced/cli-reference/tx-service-commands)
- [https://docs.safe.global/advanced/cli-reference](https://docs.safe.global/advanced/cli-reference)
- [https://docs.safe.global/advanced/cli-reference](https://docs.safe.global/advanced/cli-reference)
- [Deploy a Recovery Safe](https://docs.safe.global/advanced/cli-guides/recovery-safe-deployment)
- [Common commands for both modes](https://docs.safe.global/advanced/cli-reference/common-commands)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

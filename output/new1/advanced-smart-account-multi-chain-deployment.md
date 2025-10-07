---
title: Deploying Safe Account on Multiple Chains – Safe Docs
url: https://docs.safe.global/advanced/smart-account-multi-chain-deployment
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Deploying Safe Account on Multiple Chains – Safe Docs

Advanced

Multi-Chain Deployment

# Deploying Safe Account on Multiple Chains

## Why?

Deploying a Safe account on multiple chains can be useful in scenarios such as:

- **Accidental Fund Transfers**: If funds are accidentally sent to a chain where the Safe does not exist, having the ability to deploy the Safe on that chain can help recover those funds.
- **Cross-Chain Operations**: For users who operate on multiple chains, having the same Safe address on different chains can simplify operations and management.

## How?

Apart from building transaction with appropriate parameters to deploy a Safe on multiple chains at the same address, it is also possible to use the following methods:

- **Safe Wallet UI**: The Safe Wallet UI allows users to deploy a Safe on multiple chains at the same address.
- **Safe Protocol Kit**: The Safe Protocol Kit supports deploying a Safe on multiple chains at the same address. For more details, refer to the [Safe Protocol Kit documentation (opens in a new tab)](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment).

### Deployment Process

The deployment process happens through a Proxy Factory contract using deterministic deployment (that is, the `create2` opcode). The address of the deployed Safe depends on the following factors:

- The address of the factory
- The singleton contract
- The salt
- The `initializer` data used
- Proxy `creationcode`

## Exceptions

- **Non-EVM Compatible Chains**: Chains that are not EVM compatible (for example, ZKSyncEra) will not be able to use this method.
- **Compatibility**: Safe created using v1.3.0 and above are compatible with this method. Safes created from singletons v1.0.0, v1.1.1, and v1.2.0 will not be able to use this method.

## Considerations

When deploying a Safe on multiple chains, there are several important considerations to keep in mind:

- **Identical Configuration**: The Safe deployed on other chains will have an identical configuration, such as owners, threshold, modules, etc., as the Safe on the original chain during deployment. Therefore, to access the Safe on the new chain, the private keys of the other owners should be available.
- **Security**: It is not recommended to use this method if the private keys of the initial owners are compromised.
- **Version Consistency**: The version of the Safe singleton contract cannot be updated while replaying the deployment on other chains.

## References

For more detailed information, refer to the following resources:

- [Deploying a Multi-Chain Safe (opens in a new tab)](https://help.safe.global/en/articles/222612-deploying-a-multi-chain-safe)

By following these guidelines and considerations, users can effectively deploy and manage Safe accounts across multiple chains.

[Signatures](/advanced/smart-account-signatures "Signatures")[Supported Networks](/advanced/smart-account-supported-networks "Supported Networks")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Deploying Safe Account on Multiple Chains
  - Why?
  - How?
    - Deployment Process
  - Exceptions
  - Considerations
  - References

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/smart-account-multi-chain-deployment](https://docs.safe.global/advanced/smart-account-multi-chain-deployment)
- [https://docs.safe.global/advanced/smart-account-multi-chain-deployment](https://docs.safe.global/advanced/smart-account-multi-chain-deployment)
- [Safe Protocol Kit documentation(opens in a new tab)](https://docs.safe.global/sdk/protocol-kit/guides/multichain-safe-deployment)
- [https://docs.safe.global/advanced/smart-account-multi-chain-deployment](https://docs.safe.global/advanced/smart-account-multi-chain-deployment)
- [https://docs.safe.global/advanced/smart-account-multi-chain-deployment](https://docs.safe.global/advanced/smart-account-multi-chain-deployment)
- [https://docs.safe.global/advanced/smart-account-multi-chain-deployment](https://docs.safe.global/advanced/smart-account-multi-chain-deployment)
- [https://docs.safe.global/advanced/smart-account-multi-chain-deployment](https://docs.safe.global/advanced/smart-account-multi-chain-deployment)
- [Signatures](https://docs.safe.global/advanced/smart-account-signatures)
- [Supported Networks](https://docs.safe.global/advanced/smart-account-supported-networks)

### External Links

- [Deploying a Multi-Chain Safe(opens in a new tab)](https://help.safe.global/en/articles/222612-deploying-a-multi-chain-safe)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: SafeProxy – Safe Docs
url: https://docs.safe.global/reference-smart-account/deployment/SafeProxy
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# SafeProxy – Safe Docs

Smart Account Reference

Deployment

SafeProxy

# SafeProxy

Users save deployment gas cost by deploying a `SafeProxy` contract instead of a deploying complete bytecode of Smart Account and associated contracts. The `SafeProxy` delegates all calls to a singleton contract, whose address is stored at `slot(0)` of the proxy contract. This means that the proxy contract itself is lightweight and inexpensive to deploy, while the actual logic is handled by the singleton contract.

For more information on how the proxy is deployed and the factors that determine the address of the proxy, see the `SafeProxyFactory`.

## Reference

- [SafeProxy.sol (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/release/v1.4.1/contracts/proxies/SafeProxy.sol)

[Overview](/reference-smart-account/overview "Overview")[SafeProxyFactory](/reference-smart-account/deployment/SafeProxyFactory "SafeProxyFactory")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- SafeProxy
  - Reference

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/deployment/SafeProxy](https://docs.safe.global/reference-smart-account/deployment/SafeProxy)
- [Overview](https://docs.safe.global/reference-smart-account/overview)
- [SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)

### External Links

- [SafeProxy.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/release/v1.4.1/contracts/proxies/SafeProxy.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

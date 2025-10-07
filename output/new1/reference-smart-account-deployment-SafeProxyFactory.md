---
title: SafeProxyFactory – Safe Docs
url: https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# SafeProxyFactory – Safe Docs

Smart Account Reference

Deployment

SafeProxyFactory

# SafeProxyFactory

The `SafeProxyFactory` contract is used to deploy `SafeProxy` contracts. The `SafeProxyFactory` contract provides various functions to deploy a `SafeProxy` contract which are given below.
The address of the proxy depends on the address of the `SafeProxyFactory` contract, `intializer` data, and the salt used to deploy the proxy.

## Functions available to deploy a `SafeProxy` contract

### `createProxyWithNonce`

`_10

function createProxyWithNonce(address _singleton, bytes memory initializer, uint256 saltNonce) public returns (SafeProxy proxy);`

Deploys a new proxy with the given singleton and nonce. Optionally executes a call to the new proxy. Emits `ProxyCreation` event on successful proxy creation.

### `createChainSpecificProxyWithNonce`

`_10

function createChainSpecificProxyWithNonce(address _singleton, bytes memory initializer, uint256 saltNonce) public returns (SafeProxy proxy);`

Deploys a chain-specific proxy with `_singleton` and `saltNonce`, ensuring it cannot be replayed on other networks. Emits `ProxyCreation` event on successful proxy creation.

### `createProxyWithCallback`

🚨

The `createProxyWithCallback` method in the Safe proxy factory contract is deprecated. The callback execution is not guaranteed, and this method is no longer recommended for use. Developers should avoid relying on this functionality in production deployments.

`_10

function createProxyWithCallback(address _singleton, bytes memory initializer, uint256 saltNonce, IProxyCreationCallback callback) public returns (SafeProxy proxy);`

Deploys a new proxy, executes an optional call to the proxy, and invokes a specified callback. Emits `ProxyCreation` event on successful proxy creation.

## Events

### `ProxyCreation`

`_10

event ProxyCreation(SafeProxy indexed proxy, address singleton);`

Emitted when a new proxy contract is successfully created.

---

## Reference

- [SafeProxyFactory.sol (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/release/v1.4.1/contracts/proxies/SafeProxyFactory.sol)
- [IProxyCreationCallback (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/release/v1.4.1/contracts/proxies/IProxyCreationCallback.sol)

[SafeProxy](/reference-smart-account/deployment/SafeProxy "SafeProxy")[SafeSingleton](/reference-smart-account/deployment/SafeSingleton "SafeSingleton")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- SafeProxyFactory
  - Functions available to deploy aSafeProxycontract
    - createProxyWithNonce
    - createChainSpecificProxyWithNonce
    - createProxyWithCallback
  - Events
    - ProxyCreation
  - Reference

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)
- [https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)
- [https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)
- [https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)
- [https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)
- [https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)
- [https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory](https://docs.safe.global/reference-smart-account/deployment/SafeProxyFactory)
- [SafeProxy](https://docs.safe.global/reference-smart-account/deployment/SafeProxy)
- [SafeSingleton](https://docs.safe.global/reference-smart-account/deployment/SafeSingleton)

### External Links

- [SafeProxyFactory.sol(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/release/v1.4.1/contracts/proxies/SafeProxyFactory.sol)
- [IProxyCreationCallback(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/release/v1.4.1/contracts/proxies/IProxyCreationCallback.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

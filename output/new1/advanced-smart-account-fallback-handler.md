---
title: Safe Fallback Handler – Safe Docs
url: https://docs.safe.global/advanced/smart-account-fallback-handler
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe Fallback Handler – Safe Docs

Advanced

Safe Fallback Handler

# Safe Fallback Handler

‼️

Using a Safe Fallback Handler can introduce security risks, as it enables
execution of arbitrary external functions within the Safe Smart Account. Only
integrate fallback handlers from trusted sources that have undergone thorough
security audits.

The Safe Fallback Handler enables extending the functionality of a Safe Smart Account without modifying its core contract code. It addresses Ethereum's 24KB contract size limitation by delegating additional logic to external smart contracts. Fallback Handlers clearly separate modular logic from the core Safe implementation.

A basic Safe Smart Account does not require any fallback handler by default. The addition or removal of fallback handler must be confirmed by a predefined threshold of Safe owners. To maintain transparency and security, an event is emitted whenever the fallback handler is updated.

## How it works

If configured, the fallback handler contract is invoked whenever the function signature in the provided calldata does not match any existing function in the core Singleton contract.

When forwarding a call to a fallback handler, the Safe Smart Account appends the original caller's address to the calldata. This allows the fallback handler to identify who initiated the request.

![diagram-fallback-handler](/_next/static/media/diagram-fallback-handler.d31b44f4.png)

## Examples

Below are several practical examples of fallback handlers that extend the functionality of Safe Smart Accounts. Each handler demonstrates specific capabilities and integration scenarios, highlighting how fallback handlers can be effectively utilized in various use cases.

### TokenCallbackHandler

Source code: [TokenCallbackHandler (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/TokenCallbackHandler.sol)

Manages callbacks from supported token standards, allowing Safe accounts to directly receive tokens.

Supports the following token interfaces:

- `ERC1155TokenReceiver`
- `ERC777TokensRecipient`
- `ERC721TokenReceiver`

### CompatibilityFallbackHandler

Source code: [CompatibilityFallbackHandler (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/CompatibilityFallbackHandler.sol)

- Extends `TokenCallbackHandler` functionality.
- Implements ERC-1271 via the `isValidSignature` method, enabling secure on-chain signature verification.
- Provides a `simulate` function, which executes a static `delegatecall` to a target contract and intentionally reverts afterward to avoid unintended state changes.
- Includes additional utility functions:
  - **`getMessageHash`:** Generates message hashes specific to the calling Safe instance.
  - **`encodeMessageDataForSafe`:** Encodes messages using the Smart Account's domain separator and a predefined message type hash.
  - **`getMessageHashForSafe`:** Combines message encoding and hashing into a final message hash.
  - **`getModules`:** Retrieves a paginated list (first 10 entries) of modules associated with the Safe.

### ExtensibleFallbackHandler

Source code: [ExtensibleFallbackHandler (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/ExtensibleFallbackHandler.sol)

The ExtensibleFallbackHandler enables assigning individual fallback handlers to specific function signatures, allowing for more granular control over fallback behavior.

### Safe4337Module as Fallback Handler

Source code: [Safe4337Module (opens in a new tab)](https://github.com/safe-global/safe-modules/blob/main/modules/4337/contracts/Safe4337Module.sol)

This fallback handler implements the `validateUserOp` function defined by ERC-4337, enabling Safe Smart Accounts to be used as ERC-4337 compatible smart contract wallets.

[Smart Account Guard Tutorial](/advanced/smart-account-guards/smart-account-guard-tutorial "Smart Account Guard Tutorial")[Smart Account Fallback Handler Tutorial](/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial "Smart Account Fallback Handler Tutorial")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe Fallback Handler
  - How it works
  - Examples
    - TokenCallbackHandler
    - CompatibilityFallbackHandler
    - ExtensibleFallbackHandler
    - Safe4337Module as Fallback Handler

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/smart-account-fallback-handler](https://docs.safe.global/advanced/smart-account-fallback-handler)
- [https://docs.safe.global/advanced/smart-account-fallback-handler](https://docs.safe.global/advanced/smart-account-fallback-handler)
- [https://docs.safe.global/advanced/smart-account-fallback-handler](https://docs.safe.global/advanced/smart-account-fallback-handler)
- [https://docs.safe.global/advanced/smart-account-fallback-handler](https://docs.safe.global/advanced/smart-account-fallback-handler)
- [https://docs.safe.global/advanced/smart-account-fallback-handler](https://docs.safe.global/advanced/smart-account-fallback-handler)
- [https://docs.safe.global/advanced/smart-account-fallback-handler](https://docs.safe.global/advanced/smart-account-fallback-handler)
- [Smart Account Guard Tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [Smart Account Fallback Handler Tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)

### External Links

- [TokenCallbackHandler(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/TokenCallbackHandler.sol)
- [CompatibilityFallbackHandler(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/CompatibilityFallbackHandler.sol)
- [ExtensibleFallbackHandler(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/handler/ExtensibleFallbackHandler.sol)
- [Safe4337Module(opens in a new tab)](https://github.com/safe-global/safe-modules/blob/main/modules/4337/contracts/Safe4337Module.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

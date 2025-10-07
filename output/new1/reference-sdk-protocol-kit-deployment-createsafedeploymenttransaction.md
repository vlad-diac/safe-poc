---
title: createSafeDeploymentTransaction – Safe Docs
url: https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# createSafeDeploymentTransaction – Safe Docs

Protocol Kit Reference

Deployment

createSafeDeploymentTransaction

# `createSafeDeploymentTransaction`

Returns a transaction to deploy a new Safe smart account.

## Usage

Before deploying a new Safe, you must initialize and configure the Protocol Kit accordingly.



example.tssetup.ts

`_10

import { protocolKit } from './setup.ts'

_10

_10

const transaction = await protocolKit.createSafeDeploymentTransaction()`

## Returns

`Promise<Transaction>`

The transaction that deploys the new Safe account when executed.

[init](/reference-sdk-protocol-kit/initialization/init "init")[getSafeAddressFromDeploymentTx](/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx "getSafeAddressFromDeploymentTx")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- createSafeDeploymentTransaction
  - Usage
  - Returns

---

## Related Links

### Internal Links

- [https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction](https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction)
- [https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction](https://docs.safe.global/reference-sdk-protocol-kit/deployment/createsafedeploymenttransaction)
- [init](https://docs.safe.global/reference-sdk-protocol-kit/initialization/init)
- [getSafeAddressFromDeploymentTx](https://docs.safe.global/reference-sdk-protocol-kit/deployment/getsafeaddressfromdeploymenttx)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

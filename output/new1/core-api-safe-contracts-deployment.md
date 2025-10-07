---
title: Safe{Core} contracts deployment – Safe Docs
url: https://docs.safe.global/core-api/safe-contracts-deployment
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# Safe{Core} contracts deployment – Safe Docs

API

Contracts Deployment

# Safe{Core} contracts deployment

In this section, you will deploy the Safe{Core} contracts on your chain. All Safe contract deployments on any network follow the same procedure to ensure a deterministic address for all singleton contracts (proxy-factory, mastercopy, etc.) and verify the deployment.

ℹ️

You can also use the [Platform-as-a-Service deployment run by Safe Core Contributors (opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt) or third-party integrators.

## Prerequisites

Open a [pull request (opens in a new tab)](https://github.com/ethereum-lists/chains) to add your chain to [chainlist.org (opens in a new tab)](https://chainlist.org/).

## Steps

### Singleton factory contract deployment

ℹ️

You do not need to perform these tasks if your network is based on a rollup framework with Safe contracts already deployed (for example, OP Stack).

1. Create a new issue in the [safe-singleton-factory (opens in a new tab)](https://github.com/safe-global/safe-singleton-factory/issues/new?assignees=&labels=&projects=&template=new_chain.yml&title=%5BNew+chain%5D%3A+) repository.
2. A bot will reply to the issue with the [deployer address (opens in a new tab)](https://github.com/safe-global/safe-singleton-factory/?tab=readme-ov-file#expected-addresses) and the amount of native token you need to send to this address.
3. Once funded, mark the checkbox on the GitHub issue.
4. The review of the issues happens every two weeks. Our team will perform the deterministic deployment of the `safe-singleton-factory` contract and publish a new npm release of [@safe-global/safe-singleton-factory (opens in a new tab)](https://www.npmjs.com/package/@safe-global/safe-singleton-factory).

### Singleton contracts deployment

ℹ️

You do not need to perform these tasks if your network is based on a rollup framework with Safe contracts already deployed (for example, OP Stack).

1. Clone the [safe-smart-account (opens in a new tab)](https://github.com/safe-global/safe-smart-account) repository by running the following command:

   `_10

   git clone --branch v1.3.0-libs.0 https://github.com/safe-global/safe-smart-account.git

   _10

   cd safe-smart-account`
2. Get the latest version of [@safe-global/safe-singleton-factory (opens in a new tab)](https://www.npmjs.com/package/@safe-global/safe-singleton-factory), by running the following command:

   `_10

   npm i --save-dev @safe-global/safe-singleton-factory`

   Ensure the latest version includes your [safe-singleton-factory deployment](/core-api/safe-contracts-deployment#singleton-factory-contract-deployment) from before.
3. Deploy Contracts.



   Infura supports your chainInfura does not support your chain

   Create a `.env` file in the root of the repository with the following content:

   `_10

   MNEMONIC=funded_account_on_this_network

   _10

   INFURA_KEY=your_Infura_project_API_key`

   If you deploy to a ZKsync chain, add the following line to the `.env` file:

   `_10

   HARDHAT_ENABLE_ZKSYNC=1`

   Deploy the contracts by running this command:

   `_10

   npm run deploy-all your_chain_id`
4. The script should deploy all the singleton contracts (nine contracts in total). Write down each address (example addresses for v1.3.0 could look like):

   `` _10

   compatibility_fallback_handler: `0x017062a1dE2FE6b99BE3d9d37841FeD19F573804`

   _10

   create_call: `0xB19D6FFc2182150F8Eb585b79D4ABcd7C5640A9d`

   _10

   gnosis_safe: `0x69f4D1788e39c87893C980c06EdF4b7f686e2938`

   _10

   gnosis_safe_l2: `0xfb1bffC9d739B8D520DaF37dF666da4C687191EA`

   _10

   multi_send: `0x998739BFdAAdde7C933B942a68053933098f9EDa`

   _10

   multi_send_call_only: `0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B`

   _10

   proxy_factory: `0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC`

   _10

   sign_message_lib: `0x98FFBBF51bb33A056B08ddf711f289936AafF717`

   _10

   simulate_tx_accessor: `0x727a77a074D1E6c4530e814F89E618a3298FC044` ``

### Record your contracts in the official registry

You must share your singleton contract deployment addresses in the official public registry.

1. Fork the [safe-deployments (opens in a new tab)](https://github.com/safe-global/safe-deployments) GitHub repository.
2. Add your chain ID to each of the nine JSON files in `src/assets/<version>`. If you deployed with the singleton deployment from above, you have to mark your chain's deployment as "canonical".
   For example, add this line to `gnosis_safe.json` to indicate the gnosis safe has the canonical address on your chain:

   `_10

   "<your_chain_id>": "canonical"`
3. Open a pull request. Your pull request should follow this [example pull request (opens in a new tab)](https://github.com/safe-global/safe-deployments/pull/679).

Now, you have deployed the Safe{Core} contracts on your chain.

In the next step, you have to install the [Safe{Core} Infrastructure](/core-api/safe-infrastructure-deployment).

[Overview](/core-api/safe-installation-overview "Overview")[Infrastructure Deployment](/core-api/safe-infrastructure-deployment "Infrastructure Deployment")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe{Core} contracts deployment
  - Prerequisites
  - Steps
    - Singleton factory contract deployment
    - Singleton contracts deployment
    - Record your contracts in the official registry

---

## Related Links

### Internal Links

- [https://docs.safe.global/core-api/safe-contracts-deployment](https://docs.safe.global/core-api/safe-contracts-deployment)
- [https://docs.safe.global/core-api/safe-contracts-deployment](https://docs.safe.global/core-api/safe-contracts-deployment)
- [https://docs.safe.global/core-api/safe-contracts-deployment](https://docs.safe.global/core-api/safe-contracts-deployment)
- [https://docs.safe.global/core-api/safe-contracts-deployment](https://docs.safe.global/core-api/safe-contracts-deployment)
- [safe-singleton-factory deployment](https://docs.safe.global/core-api/safe-contracts-deployment)
- [https://docs.safe.global/core-api/safe-contracts-deployment](https://docs.safe.global/core-api/safe-contracts-deployment)
- [Safe{Core} Infrastructure](https://docs.safe.global/core-api/safe-infrastructure-deployment)
- [Overview](https://docs.safe.global/core-api/safe-installation-overview)
- [Infrastructure Deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)

### External Links

- [Platform-as-a-Service deployment run by Safe Core Contributors(opens in a new tab)](https://noteforms.com/forms/request-safe-ui-and-infra-support-4weugt)
- [pull request(opens in a new tab)](https://github.com/ethereum-lists/chains)
- [chainlist.org(opens in a new tab)](https://chainlist.org)
- [safe-singleton-factory(opens in a new tab)](https://github.com/safe-global/safe-singleton-factory/issues/new?assignees=&labels=&projects=&template=new_chain.yml&title=%5BNew+chain%5D%3A+)
- [deployer address(opens in a new tab)](https://github.com/safe-global/safe-singleton-factory/?tab=readme-ov-file)
- [@safe-global/safe-singleton-factory(opens in a new tab)](https://www.npmjs.com/package/@safe-global/safe-singleton-factory)
- [safe-smart-account(opens in a new tab)](https://github.com/safe-global/safe-smart-account)
- [@safe-global/safe-singleton-factory(opens in a new tab)](https://www.npmjs.com/package/@safe-global/safe-singleton-factory)
- [safe-deployments(opens in a new tab)](https://github.com/safe-global/safe-deployments)
- [example pull request(opens in a new tab)](https://github.com/safe-global/safe-deployments/pull/679)

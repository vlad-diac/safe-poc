---
title: On-chain Tracking – Safe Docs
url: https://docs.safe.global/sdk/onchain-tracking
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# On-chain Tracking – Safe Docs

SDK

On-chain Tracking

# On-chain Tracking

We aim to understand better and recognise our key contributors who are driving the adoption of smart accounts within our ecosystem.

Implementing a Safe on-chain identifier enables tracking of complex data, such as whether a Safe transaction is executed via our SDK or another, whether it originates from a platform like a Safe App or widget (for example, the CoW Swap widget in our Safe interface), the tool version, the project, and more.

By submitting your on-chain identifier through the form provided at the end of this page, you will help us accurately attribute activity and allow us to return value to our Ecosystem Partners in the future.

ℹ️

On-chain tracking is supported starting from [Protocol Kit](/sdk/protocol-kit) `v5.2.0` and [Relay Kit](/sdk/relay-kit) `v3.4.0`.

## On-chain identifier format

The identifiers used to track Safe deployments and transactions are 50 bytes in length and follow the format below:

`5afe` `00` `6363643438383836663461336661366162653539` `646561` `393238` `653366`

Check the last 50 bytes of the `data` field in this [example transaction (opens in a new tab)](https://sepolia.etherscan.io/tx/0xe0192eedd1fc2d06be0561d57380d610dd6d162af0f3cfbd6c08f9062d738761) to see how the identifier appears after the transaction is executed.

### Prefix hash

- **Type:** `2 bytes`
- **Example:** `5afe`

Static prefix to identify the Safe on-chain identifier.

### Version hash

- **Type:** `1 byte`
- **Example:** `00`

Version number of the Safe on-chain identifier format.

### Project hash

- **Type:** `20 bytes`
- **Example:** `6363643438383836663461336661366162653539`

Truncated hash of the project's name (for example, "Gnosis", "CoW Swap").

### Platform hash

- **Type:** `3 bytes`
- **Example:** `646561`

Truncated hash of the platform's name (for example, "Web", "Mobile", "Safe App", "Widget").

### Tool hash

- **Type:** `3 bytes`
- **Example:** `393238`

Truncated hash of the tool's name (for example, "protocol-kit", "relay-kit", or any custom tool built by projects).

### Tool version hash

- **Type:** `3 bytes`
- **Example:** `653366`

Truncated hash of the tool's version (for example, "1.0.0", "1.0.1").

## Steps

The on-chain identifier allows tracking the deployment of Safe accounts, the execution of Safe transactions, and the execution of Safe user operations:

### Generate an on-chain identifier

Feel free to skip this section if you use the Protocol Kit or Relay Kit from the Safe{Core} SDK, as this is handled internally.

To create an on-chain identifier with the format described above, you need to implement a function that receives the `project`, `platform`, `tool`, and `toolVersion` used; and returns the correct identifier after hashing, truncating, and concatenating all these parameters.

`` _20

function generateOnChainIdentifier({

_20

project,

_20

platform = 'Web',

_20

tool,

_20

toolVersion

_20

}: OnChainIdentifierParamsType): string {

_20

const identifierPrefix = '5afe' // Safe identifier prefix

_20

const identifierVersion = '00' // First version

_20

const projectHash = generateHash(project, 20) // Take the last 20 bytes

_20

const platformHash = generateHash(platform, 3) // Take the last 3 bytes

_20

const toolHash = generateHash(tool, 3) // Take the last 3 bytes

_20

const toolVersionHash = generateHash(toolVersion, 3) // Take the last 3 bytes

_20

_20

return `${identifierPrefix}${identifierVersion}${projectHash}${platformHash}${toolHash}${toolVersionHash}`

_20

}

_20

_20

function generateHash(input: string, size: number): string {

_20

const fullHash = keccak256(toHex(input))

_20

return toHex(fullHash.slice(-size)).replace('0x', '') // Take the last X bytes

_20

} ``

This identifier will be added to all your Safe transactions and become searchable on-chain.

### Track Safe deployments

Safe deployments can be tracked by concatenating the on-chain identifier at the end of the deployment transaction `data`. This way Safe deployment transactions will include the identifier.

If you use the [Protocol Kit](/sdk/protocol-kit) or the [Relay Kit](/sdk/relay-kit) to deploy a Safe, adding the `onchainAnalytics` property to the initialization method will automatically handle this.

If you use a custom implementation, remember to manually add the on-chain identifier at the end of the deployment transaction `data`.

Protocol KitRelay Kit

`_13

import Safe, { OnchainAnalyticsProps } from '@safe-global/protocol-kit'

_13

_13

const onchainAnalytics: OnchainAnalyticsProps = {

_13

project: 'YOUR_PROJECT_NAME' // Required. Always use the same value for your project.

_13

platform: 'CURRENT_PLATFORM' // Optional

_13

}

_13

_13

const protocolKit = await Safe.init({

_13

// ...

_13

onchainAnalytics

_13

})

_13

_13

// Execute the deployment`

### Track Safe transactions

Safe transactions can be tracked by concatenating the on-chain identifier at the end of the transaction `data` or user operation `callData` properties. This way Safe transactions will include the identifier.

If you use the [Protocol Kit](/sdk/protocol-kit) or the [Relay Kit](/sdk/relay-kit) to execute the Safe transactions, adding the `onchainAnalytics` property to the initialization method will automatically handle this.

If you use a custom implementation, remember to manually add the on-chain identifier at the end of the transaction `data`/`callData`.

Protocol KitRelay Kit

`_13

import Safe, { OnchainAnalyticsProps } from '@safe-global/protocol-kit'

_13

_13

const onchainAnalytics: OnchainAnalyticsProps = {

_13

project: 'YOUR_PROJECT_NAME'

_13

platform: 'CURRENT_PLATFORM' // Optional

_13

}

_13

_13

const protocolKit = await Safe.init({

_13

// ...

_13

onchainAnalytics

_13

})

_13

_13

// Execute the transaction`

### Get the on-chain identifier

If you use the Protocol Kit or the Relay Kit, call the `getOnchainIdentifier` method from an initialized instance of the Protocol Kit to get the current Safe on-chain identifier.

`_10

const onchainIdentifier = protocolKit.getOnchainIdentifier()`

## Submission Form

You can fill out the form by clicking [this link (opens in a new tab)](https://forms.gle/NYkorYebc6Fz1fMW6) or using the form below:

  
Loading…

[Web3Auth](/sdk/signers/web3auth "Web3Auth")[Onramp](/sdk/onramp "Onramp")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- On-chain Tracking
  - On-chain identifier format
    - Prefix hash
    - Version hash
    - Project hash
    - Platform hash
    - Tool hash
    - Tool version hash
  - Steps
    - Generate an on-chain identifier
    - Track Safe deployments
    - Track Safe transactions
    - Get the on-chain identifier
  - Submission Form

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [https://docs.safe.global/sdk/onchain-tracking](https://docs.safe.global/sdk/onchain-tracking)
- [Web3Auth](https://docs.safe.global/sdk/signers/web3auth)

### External Links

- [example transaction(opens in a new tab)](https://sepolia.etherscan.io/tx/0xe0192eedd1fc2d06be0561d57380d610dd6d162af0f3cfbd6c08f9062d738761)
- [this link(opens in a new tab)](https://forms.gle/NYkorYebc6Fz1fMW6)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

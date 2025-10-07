---
title: Basic setup to equip your AI agent with a Smart Account – Safe Docs
url: https://docs.safe.global/home/ai-agent-quickstarts/basic-agent-setup
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Basic setup to equip your AI agent with a Smart Account – Safe Docs

Home

Quickstart Guides

Setup your Agent with a Safe account

# Basic setup to equip your AI agent with a Smart Account

Get started with Safe AI integration in just a few steps.

This guide will help you set up a Safe Smart Account with the AI agent as the only signer.
This 1-out-of-1 signer setup is discouraged by Safe, as it is not the most secure.
However, many projects choose this setup for simplicity.

## Installation

First, add the Safe [Protocol Kit](/sdk/protocol-kit) to your project:

`_10

import Safe from '@safe-global/protocol-kit'`

## Creating a Safe Smart Account for your AI agent

When your AI agent is ready to interact with the blockchain, you can create a Safe Smart Account for it.

`_16

import Safe from '@safe-global/protocol-kit'

_16

_16

const SIGNER_ADDRESS = // ...

_16

const SIGNER_PRIVATE_KEY = // ...

_16

const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'

_16

_16

const safeClient = await Safe.init({

_16

provider: RPC_URL,

_16

signer: SIGNER_PRIVATE_KEY,

_16

predictedSafe: {

_16

safeAccountConfig: {

_16

owners: [SIGNER_ADDRESS],

_16

threshold: 1

_16

}

_16

}

_16

})`

This creates a Safe Smart Account, but the actual smart contract will be deployed when you send the first transaction.

[Introduction](/home/ai-agent-quickstarts/introduction "Introduction")[Human approval for agent action](/home/ai-agent-quickstarts/human-approval "Human approval for agent action")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Basic setup to equip your AI agent with a Smart Account
  - Installation
  - Creating a Safe Smart Account for your AI agent

---

## Related Links

### Internal Links

- [https://docs.safe.global/home/ai-agent-quickstarts/basic-agent-setup](https://docs.safe.global/home/ai-agent-quickstarts/basic-agent-setup)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/home/ai-agent-quickstarts/basic-agent-setup](https://docs.safe.global/home/ai-agent-quickstarts/basic-agent-setup)
- [Introduction](https://docs.safe.global/home/ai-agent-quickstarts/introduction)
- [Human approval for agent action](https://docs.safe.global/home/ai-agent-quickstarts/human-approval)

### External Links

- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

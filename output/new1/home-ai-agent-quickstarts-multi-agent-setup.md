---
title: Multi-Agent Setup – Safe Docs
url: https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Multi-Agent Setup – Safe Docs

Home

Quickstart Guides

Multiple Agent setup

# Multi-Agent Setup

In this guide, you'll learn how to set up and manage a Safe Smart Account with multiple agents.
This setup ensures that every transaction proposed by one agent is approved by at least one other agent.
To maintain full functionality, we recommend including human signers in addition to the AI agents.

Below, we demonstrate a 2-out-of-4 setup as an example.

# Two Agents Propose, Check, and Execute Transactions

### Setup Safe Smart Account with agent one

You will use the Safe [Protocol Kit](/sdk/protocol-kit).

`_17

import Safe from '@safe-global/protocol-kit'

_17

_17

const AGENT_1_ADDRESS = // ...

_17

const AGENT_1_PRIVATE_KEY = // ...

_17

const AGENT_2_ADDRESS = // ...

_17

const HUMAN_SIGNER_1_ADDRESS = // ...

_17

const HUMAN_SIGNER_2_ADDRESS = // ...

_17

const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'

_17

_17

const newSafe = await Safe.init({

_17

provider: RPC_URL,

_17

signer: AGENT_1_PRIVATE_KEY,

_17

safeOptions: {

_17

owners: [AGENT_1_ADDRESS, AGENT_2_ADDRESS, HUMAN_SIGNER_1_ADDRESS, HUMAN_SIGNER_2_ADDRESS],

_17

threshold: 2

_17

}

_17

})`

The Smart Account is now created with a fixed address. If the account has not been deployed yet, it will automatically deploy when the first transaction is executed.

### Propose a Transaction with Agent One

Agent One can now propose transactions. We recommend sending these transactions to the [Safe Transaction Service](/core-api/transaction-service-overview). Using this service provides several benefits:

- It allows Agent Two to easily receive, sign, and execute the transaction.
- Transactions appear in the Safe Wallet interface, where human signers can review, approve, and execute them.

You can use the [API Kit](/sdk/api-kit) to propose transactions to the Safe Transaction Service.

Here's an example of how Agent One can propose a simple transaction to the zero address:

`_31

import SafeApiKit from '@safe-global/api-kit'

_31

_31

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_31

const apiKit = new SafeApiKit({

_31

chainId: 11155111n,

_31

apiKey: 'YOUR_API_KEY'

_31

})

_31

_31

const tx = await newSafe.createTransaction({

_31

transactions: [

_31

{

_31

to: '0x0000000000000000000000000000000000000000',

_31

data: '0x',

_31

value: '0'

_31

}

_31

]

_31

})

_31

_31

// Every transaction has a Safe (Smart Account) Transaction Hash different than the final transaction hash

_31

const safeTxHash = await newSafe.getTransactionHash(tx)

_31

// The AI agent signs this Safe (Smart Account) Transaction Hash

_31

const signature = await newSafe.signHash(safeTxHash)

_31

_31

// Now the transaction with the signature is sent to the Transaction Service with the Api Kit:

_31

await apiKit.proposeTransaction({

_31

safeAddress: safeAddress,

_31

safeTransactionData: tx.data,

_31

safeTxHash,

_31

senderSignature: signature.data,

_31

senderAddress: AGENT_ADDRESS

_31

})`

### Receive and sign transaction with agent two

In the next step, the second AI agent needs to receive the transaction and, after performing any necessary checks, sign and execute it.

The second AI agent will run on its own machine, so you would have to initialize the Safe instance with the Smart Account's address.

`_18

const SAFE_ADDRESS = '0x...' // The address of the Smart Account from step one

_18

_18

// Initialize the Safe object with the same address, but a different signer

_18

const existingSafe = await Safe.init({

_18

provider: RPC_URL,

_18

signer: AGENT_2_PRIVATE_KEY,

_18

safeAddress: SAFE_ADDRESS

_18

})

_18

_18

// Get pending transactions that need a signature

_18

const pendingTransactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)

_18

// We assume there is only one pending transaction

_18

const transaction = pendingTransactions.results[0]

_18

_18

// Here, your AI agent could check this transaction.

_18

_18

// As only one more signater is required, AI agent two can execute the transaction:

_18

existingSafe.executeTransaction(transaction)`

## Next steps

Your AI agents can make autonomous decisions, and the human signers can do so, too.
We are exited to see what you will build.

If you have a technical question, feel free to reach out on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the safe-core tag.

[Human approval for agent action](/home/ai-agent-quickstarts/human-approval "Human approval for agent action")[Agent with spending limit](/home/ai-agent-quickstarts/agent-with-spending-limit "Agent with spending limit")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Multi-Agent Setup
- Two Agents Propose, Check, and Execute Transactions
    - Setup Safe Smart Account with agent one
    - Propose a Transaction with Agent One
    - Receive and sign transaction with agent two
  - Next steps

---

## Related Links

### Internal Links

- [https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup](https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup](https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup)
- [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview)
- [API Kit](https://docs.safe.global/sdk/api-kit)
- [https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup](https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup)
- [https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup](https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup)
- [Human approval for agent action](https://docs.safe.global/home/ai-agent-quickstarts/human-approval)
- [Agent with spending limit](https://docs.safe.global/home/ai-agent-quickstarts/agent-with-spending-limit)

### External Links

- [Stack Exchange(opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

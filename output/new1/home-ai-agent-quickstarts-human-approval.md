---
title: Human approval for AI agent actions – Safe Docs
url: https://docs.safe.global/home/ai-agent-quickstarts/human-approval
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Human approval for AI agent actions – Safe Docs

Home

Quickstart Guides

Human approval for agent action

# Human approval for AI agent actions

This page describes a setup, where an autonomous agent proposes transactions, and one or more human signers approve and execute the transaction.

This setup benefits from increased security, as the Smart Account can not be compromised by convincing the agent to execute a malicious transaction.

On the other hand, it can take minutes or hours to collect the necessary approvals, which reduces the agility of this setup.

## Setup the Smart Account

For this setup, we recommend a 2-out-of-3, 3-out-of-5, or 5-out-of-7 threshold.
The important considerations are:

- The AI agent should be one signer
- The threshold should be two more, so at least one human approval is required
- The amount of signers should be higher than the threshold to make sure the Safe Smart Account is functional when one key is lost

Here is an example setup:

### Deploy Safe

You can add the AI agent as a signer in the [Safe Wallet (opens in a new tab)](https://app.safe.global/).

You can also setup the Safe Smart Account programmatically like this using the Safe [Protocol Kit](/sdk/protocol-kit):

`_16

import Safe from '@safe-global/protocol-kit'

_16

_16

const AGENT_ADDRESS = // ...

_16

const AGENT_PRIVATE_KEY = // ...

_16

const HUMAN_SIGNER_1_ADDRESS = // ...

_16

const HUMAN_SIGNER_2_ADDRESS = // ...

_16

const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'

_16

_16

const newSafe = await Safe.init({

_16

provider: RPC_URL,

_16

signer: AGENT_PRIVATE_KEY,

_16

safeOptions: {

_16

owners: [AGENT_ADDRESS, HUMAN_SIGNER_1_ADDRESS, HUMAN_SIGNER_2_ADDRESS],

_16

threshold: 2

_16

}

_16

})`

Here, the AI agent creates the Safe Smart Account and adds two human signers for a 2-out-of-3 setup.
The Smart Account will be deployed when the first transaction is executed.

### Assemble and propose a transaction

The AI agent can now propose transactions.
We recommend sending the transactions to the [Safe Transaction Service](/core-api/transaction-service-overview).
By this, you make sure that the transactions show up in the Safe Wallet interface and can easily be checked, approved and executed by the human signers.

You can use the [API Kit](/sdk/api-kit) to propose transactions to the Safe Transaction Service.

A simple example transaction to the zero address can be proposed like this:

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

## Approve and execute the transactions

The transactions will now show up in the transaction interface of the [Safe Wallet (opens in a new tab)](https://app.safe.global).
The human signers now have to connect their Metamask, and approve and/or execute the transactions with a click.
They can also use the [Mobile App (opens in a new tab)](https://help.safe.global/en/articles/40844-sign-transactions) to sign the transactions.

In the Safe Wallet, the human signers will see the transaction in the queued transaction view:

![ai-agent-approve-transaction-1](/_next/static/media/ai-agent-approve-transaction-1.03634aa1.png)

And can either add a signature or execute the transaction when enough signatures were collected:

![ai-agent-approve-transaction-2](/_next/static/media/ai-agent-approve-transaction-2.561e3dad.png)

## Next steps

Now your AI agent is equipped with a Safe Smart Account and you are in full control of the transactions.
We are exited to see what you will build.

If you have a technical question, feel free to reach out on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the safe-core tag.

[Setup your Agent with a Safe account](/home/ai-agent-quickstarts/basic-agent-setup "Setup your Agent with a Safe account")[Multiple Agent setup](/home/ai-agent-quickstarts/multi-agent-setup "Multiple Agent setup")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Human approval for AI agent actions
  - Setup the Smart Account
    - Deploy Safe
    - Assemble and propose a transaction
  - Approve and execute the transactions
  - Next steps

---

## Related Links

### Internal Links

- [https://docs.safe.global/home/ai-agent-quickstarts/human-approval](https://docs.safe.global/home/ai-agent-quickstarts/human-approval)
- [https://docs.safe.global/home/ai-agent-quickstarts/human-approval](https://docs.safe.global/home/ai-agent-quickstarts/human-approval)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/home/ai-agent-quickstarts/human-approval](https://docs.safe.global/home/ai-agent-quickstarts/human-approval)
- [Safe Transaction Service](https://docs.safe.global/core-api/transaction-service-overview)
- [API Kit](https://docs.safe.global/sdk/api-kit)
- [https://docs.safe.global/home/ai-agent-quickstarts/human-approval](https://docs.safe.global/home/ai-agent-quickstarts/human-approval)
- [https://docs.safe.global/home/ai-agent-quickstarts/human-approval](https://docs.safe.global/home/ai-agent-quickstarts/human-approval)
- [Setup your Agent with a Safe account](https://docs.safe.global/home/ai-agent-quickstarts/basic-agent-setup)
- [Multiple Agent setup](https://docs.safe.global/home/ai-agent-quickstarts/multi-agent-setup)

### External Links

- [Safe Wallet(opens in a new tab)](https://app.safe.global)
- [Safe Wallet(opens in a new tab)](https://app.safe.global)
- [Mobile App(opens in a new tab)](https://help.safe.global/en/articles/40844-sign-transactions)
- [Stack Exchange(opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---
title: Integration with Gelato – Safe Docs
url: https://docs.safe.global/sdk/relay-kit/guides/gelato-relay
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Integration with Gelato – Safe Docs

SDK

[Relay Kit](/sdk/relay-kit)

Guides

Gelato Relay

# Integration with Gelato

The [Gelato relay (opens in a new tab)](https://docs.gelato.network/developer-services/relay) allows developers to execute gasless transactions.

## Prerequisites

1. [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm).
2. Have a Safe account configured with threshold equal to 1, where only one signature is needed to execute transactions.
3. To use Gelato 1Balance an [API key (opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/1balance) is required.

## Install dependencies

`_10

yarn add ethers @safe-global/relay-kit @safe-global/protocol-kit @safe-global/types-kit`

## Relay Kit options

Currently, the Relay Kit is only compatible with the [Gelato relay (opens in a new tab)](https://docs.gelato.network/developer-services/relay). The Gelato relay can be used in two ways:

1. [Gelato 1Balance (opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/1balance)
2. [Gelato SyncFee (opens in a new tab)](https://docs.gelato.network/developer-services/relay/quick-start/callwithsyncfee)

## Gelato 1Balance

[Gelato 1Balance (opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/1balance) allows you to execute transactions using a prepaid deposit. This can be used to sponsor transactions to other Safes or even to use a deposit on Polygon to pay the fees for a wallet on another chain.

For the 1Balance quickstart tutorial, you will use the Gelato relayer to pay for the gas fees on BNB Chain using the Polygon USDC you have deposited into your Gelato 1Balance account.

### Setup

1. Start with a [1/1 Safe on BNB Chain (opens in a new tab)](https://app.safe.global/transactions/history?safe=bnb:0x6651FD6Abe0843f7B6CB9047b89655cc7Aa78221).
2. [Deposit Polygon USDC into Gelato 1Balance (opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/.1balance#how-can-i-use-1balance) ([transaction 0xa5f38 (opens in a new tab)](https://polygonscan.com/tx/0xa5f388c2d6e0d1bb32e940fccddf8eab182ad191644936665a54bf4bb1bac555)).
3. The Safe owner [0x6Dbd26Bca846BDa60A90890cfeF8fB47E7d0f22c (opens in a new tab)](https://bscscan.com/address/0x6Dbd26Bca846BDa60A90890cfeF8fB47E7d0f22c) signs a transaction to send 0.0005 BNB and submits it to Gelato relay.
4. [Track the relay request (opens in a new tab)](https://docs.gelato.network/developer-services/relay/quick-start/tracking-your-relay-request) of [Gelato Task ID 0x1bf7 (opens in a new tab)](https://relay.gelato.digital/tasks/status/0x1bf7664a1e176472f604bb3840d3d2a5bf56f98b60307961c3f8cee099f1eeb8).
5. [Transaction 0x814d3 (opens in a new tab)](https://bscscan.com/tx/0x814d385c0ec036be65663b5fbfb0d8d4e0d35af395d4d96b13f2cafaf43138f9) is executed on the blockchain.

### Use a Safe as the Relay

While using Gelato, you can specify that you only want the relay to allow transactions from specific smart contracts. If one of those smart contracts is a Safe smart contract, you will need to either verify the contract on a block explorer or get the ABI of the contract implementation (not the ABI of the smart contract address). This is because the Safe smart contracts use the [Proxy Pattern (opens in a new tab)](https://medium.com/coinmonks/proxy-pattern-and-upgradeable-smart-contracts-45d68d6f15da), so the implementation logic for your smart contract exists on a different address.

### Imports

`_10

import { ethers } from 'ethers'

_10

import { GelatoRelayPack } from '@safe-global/relay-kit'

_10

import Safe from '@safe-global/protocol-kit'

_10

import {

_10

MetaTransactionData,

_10

MetaTransactionOptions

_10

} from '@safe-global/types-kit'`

### Initialize the transaction settings

Modify the variables to customize to match your desired transaction settings.

`_10

// https://chainlist.org

_10

const RPC_URL = 'https://endpoints.omniatech.io/v1/bsc/mainnet/public'

_10

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY

_10

const safeAddress = '0x...' // Safe from which the transaction will be sent

_10

_10

// Any address can be used for destination. In this example, we use vitalik.eth

_10

const destinationAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

_10

const withdrawAmount = ethers.parseUnits('0.005', 'ether').toString()`

### Create a transaction

`_10

// Create a transactions array with one transaction object

_10

const transactions: MetaTransactionData[] = [{

_10

to: destinationAddress,

_10

data: '0x',

_10

value: withdrawAmount

_10

}]

_10

_10

const options: MetaTransactionOptions = {

_10

isSponsored: true

_10

}`

### Instantiate the Protocol Kit and Relay Kit

`_10

const protocolKit = await Safe.init({

_10

provider: RPC_URL,

_10

signer: OWNER_PRIVATE_KEY,

_10

safeAddress

_10

})

_10

_10

const relayKit = new GelatoRelayPack({

_10

apiKey: process.env.GELATO_RELAY_API_KEY!,

_10

protocolKit

_10

})`

### Prepare the transaction

`_10

const safeTransaction = await relayKit.createTransaction({

_10

transactions,

_10

options

_10

})

_10

_10

const signedSafeTransaction = await protocolKit.signTransaction(safeTransaction)`

### Send the transaction to the relay

`` _10

const response = await relayKit.executeTransaction({

_10

executable: signedSafeTransaction,

_10

options

_10

})

_10

_10

console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`) ``

## Gelato SyncFee

[Gelato SyncFee (opens in a new tab)](https://docs.gelato.network/developer-services/relay/quick-start/callwithsyncfee) allows you to execute a transaction and pay the gas fees directly with funds in your Safe, even if you don't have ETH or the native blockchain token.

For the SyncFee quickstart tutorial, you will use the Gelato relayer to pay for the gas fees on the BNB Chain using the BNB you hold in your Safe. No need to have funds on your signer.

### Imports

`_10

import { ethers } from 'ethers'

_10

import { GelatoRelayPack } from '@safe-global/relay-kit'

_10

import Safe from '@safe-global/protocol-kit'

_10

import { MetaTransactionData } from '@safe-global/types-kit'`

### Initialize the transaction settings

Modify the variables to customize to match your desired transaction settings.

`_10

// https://chainlist.org

_10

const RPC_URL = 'https://endpoints.omniatech.io/v1/bsc/mainnet/public'

_10

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY

_10

const safeAddress = '0x...' // Safe from which the transaction will be sent

_10

_10

// Any address can be used for destination. In this example, we use vitalik.eth

_10

const destinationAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

_10

const withdrawAmount = ethers.parseUnits('0.005', 'ether').toString()`

### Create a transaction

`_10

// Create a transactions array with one transaction object

_10

const transactions: MetaTransactionData[] = [{

_10

to: destinationAddress,

_10

data: '0x',

_10

value: withdrawAmount

_10

}]`

### Instantiate the Protocol Kit and Relay Kit

`_10

const protocolKit = await Safe.init({

_10

provider: RPC_URL,

_10

signer: OWNER_PRIVATE_KEY,

_10

safeAddress

_10

})

_10

_10

const relayKit = new GelatoRelayPack({ protocolKit })`

### Prepare the transaction

`_10

const safeTransaction = await relayKit.createTransaction({ transactions })

_10

_10

const signedSafeTransaction = await protocolKit.signTransaction(safeTransaction)`

### Send the transaction to the relay

`` _10

const response = await relayKit.executeTransaction({

_10

executable: signedSafeTransaction

_10

})

_10

_10

console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`) ``

[ERC-4337 Safe SDK](/sdk/relay-kit/guides/4337-safe-sdk "ERC-4337 Safe SDK")[Migrate to v2](/sdk/relay-kit/guides/migrate-to-v2 "Migrate to v2")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Integration with Gelato
  - Prerequisites
  - Install dependencies
  - Relay Kit options
  - Gelato 1Balance
    - Setup
    - Use a Safe as the Relay
    - Imports
    - Initialize the transaction settings
    - Create a transaction
    - Instantiate the Protocol Kit and Relay Kit
    - Prepare the transaction
    - Send the transaction to the relay
  - Gelato SyncFee
    - Imports
    - Initialize the transaction settings
    - Create a transaction
    - Instantiate the Protocol Kit and Relay Kit
    - Prepare the transaction
    - Send the transaction to the relay

---

## Related Links

### Internal Links

- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)
- [https://docs.safe.global/sdk/relay-kit/guides/gelato-relay](https://docs.safe.global/sdk/relay-kit/guides/gelato-relay)

### External Links

- [Gelato relay(opens in a new tab)](https://docs.gelato.network/developer-services/relay)
- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [API key(opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/1balance)
- [Gelato relay(opens in a new tab)](https://docs.gelato.network/developer-services/relay)
- [Gelato 1Balance(opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/1balance)
- [Gelato SyncFee(opens in a new tab)](https://docs.gelato.network/developer-services/relay/quick-start/callwithsyncfee)
- [Gelato 1Balance(opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/1balance)
- [1/1 Safe on BNB Chain(opens in a new tab)](https://app.safe.global/transactions/history?safe=bnb:0x6651FD6Abe0843f7B6CB9047b89655cc7Aa78221)
- [Deposit Polygon USDC into Gelato 1Balance(opens in a new tab)](https://docs.gelato.network/developer-services/relay/payment-and-fees/.1balance)
- [transaction 0xa5f38(opens in a new tab)](https://polygonscan.com/tx/0xa5f388c2d6e0d1bb32e940fccddf8eab182ad191644936665a54bf4bb1bac555)

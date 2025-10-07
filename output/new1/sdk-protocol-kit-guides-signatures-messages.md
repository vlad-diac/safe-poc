---
title: Message signatures – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Message signatures – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

[Signatures](/sdk/protocol-kit/guides/signatures)

Messages

# Message signatures

Using the Protocol Kit, this guide explains how to generate and sign messages from a Safe account, including plain string messages and EIP-712 JSON messages.

ℹ️

Before starting, check this guide's [setup](/sdk/protocol-kit/guides/signatures).

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Steps

### Install dependencies

`_10

yarn install @safe-global/protocol-kit`

### Create a message

Messages can be plain strings or valid EIP-712 typed data structures.

`_10

// An example of a string message

_10

const STRING_MESSAGE = "I'm the owner of this Safe account"`

`_47

// An example of a typed data message

_47

const TYPED_MESSAGE = {

_47

types: {

_47

EIP712Domain: [

_47

{ name: 'name', type: 'string' },

_47

{ name: 'version', type: 'string' },

_47

{ name: 'chainId', type: 'uint256' },

_47

{ name: 'verifyingContract', type: 'address' }

_47

],

_47

Person: [

_47

{ name: 'name', type: 'string' },

_47

{ name: 'wallets', type: 'address[]' }

_47

],

_47

Mail: [

_47

{ name: 'from', type: 'Person' },

_47

{ name: 'to', type: 'Person[]' },

_47

{ name: 'contents', type: 'string' }

_47

]

_47

},

_47

domain: {

_47

name: 'Ether Mail',

_47

version: '1',

_47

chainId: Number(chainId),

_47

verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'

_47

},

_47

primaryType: 'Mail',

_47

message: {

_47

from: {

_47

name: 'Cow',

_47

wallets: [

_47

'0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',

_47

'0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'

_47

]

_47

},

_47

to: [

_47

{

_47

name: 'Bob',

_47

wallets: [

_47

'0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',

_47

'0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',

_47

'0xB0B0b0b0b0b0B000000000000000000000000000'

_47

]

_47

}

_47

],

_47

contents: 'Hello, Bob!'

_47

}

_47

}`

The `createMessage` method in the Protocol Kit allows for creating new messages and returns an instance of the `EthSafeMessage` class. Here, we are passing `TYPED_MESSAGE`, but `STRING_MESSAGE` could also be passed.

`_10

let safeMessage = protocolKit.createMessage(TYPED_MESSAGE)`

The returned `safeMessage` object contains the message data (`safeMessage.data`) and a map of owner-signature pairs (`safeMessage.signatures`). The structure is similar to the `EthSafeTransaction` class but applied for messages instead of transactions.

We use `let` to initialize the `safeMessage` variable because we will add the signatures later.

`_10

class EthSafeMessage implements SafeMessage {

_10

data: EIP712TypedData | string

_10

signatures: Map<string, SafeSignature> = new Map()

_10

...

_10

// Other props and methods

_10

}`

### Sign the message

Once the `safeMessage` object is created, we need to collect the signatures from the signers who will sign it.

Following our [setup](/sdk/protocol-kit/guides/signatures), we will sign a message with `SAFE_3_4_ADDRESS`, the main Safe account in this guide. To do that, we first need to sign the same message with its owners: `OWNER_1_ADDRESS`, `OWNER_2_ADDRESS`, `SAFE_1_1_ADDRESS`, and `SAFE_2_3_ADDRESS`.

#### ECDSA signatures

This applies to `OWNER_1_ADDRESS` and `OWNER_2_ADDRESS` accounts, as both are EOAs.

The `signMessage` method takes the `safeMessage` together with a `SigningMethod` and adds the new signature to the `signMessage.signatures` map. Depending on the type of message, the `SigningMethod` can take these values:

- `SigningMethod.ETH_SIGN`
- `SigningMethod.ETH_SIGN_TYPED_DATA_V4`

`_25

// Connect OWNER_1_ADDRESS

_25

protocolKit = await protocolKit.connect({

_25

provider: RPC_URL

_25

signer: OWNER_1_PRIVATE_KEY

_25

})

_25

_25

// Sign the safeMessage with OWNER_1_ADDRESS

_25

// After this, the safeMessage contains the signature from OWNER_1_ADDRESS

_25

safeMessage = await protocolKit.signMessage(

_25

safeMessage,

_25

SigningMethod.ETH_SIGN_TYPED_DATA_V4

_25

)

_25

_25

// Connect OWNER_2_ADDRESS

_25

protocolKit = await protocolKit.connect({

_25

provider: RPC_URL

_25

signer: OWNER_2_PRIVATE_KEY

_25

})

_25

_25

// Sign the safeMessage with OWNER_2_ADDRESS

_25

// After this, the safeMessage contains the signature from OWNER_1_ADDRESS and OWNER_2_ADDRESS

_25

safeMessage = await protocolKit.signMessage(

_25

safeMessage,

_25

SigningMethod.ETH_SIGN_TYPED_DATA_V4

_25

)`

#### Smart contract signatures

When signing with a Safe account, the `SigningMethod` will take the value `SigningMethod.SAFE_SIGNATURE`.

##### 1/1 Safe account

This applies to the `SAFE_1_1_ADDRESS` account, another owner of `SAFE_3_4_ADDRESS`.

We need to connect the Protocol Kit to `SAFE_1_1_ADDRESS` and the `OWNER_3_ADDRESS` account (the only owner of `SAFE_1_1_ADDRESS`) and sign the message.

`_27

// Create a new message object

_27

let messageSafe1_1 = await createMessage(TYPED_MESSAGE)

_27

_27

// Connect OWNER_3_ADDRESS and SAFE_1_1_ADDRESS

_27

protocolKit = await protocolKit.connect({

_27

provider: RPC_URL

_27

signer: OWNER_3_PRIVATE_KEY,

_27

safeAddress: SAFE_1_1_ADDRESS

_27

})

_27

_27

// Sign the messageSafe1_1 with OWNER_3_ADDRESS

_27

// After this, the messageSafe1_1 contains the signature from OWNER_3_ADDRESS

_27

messageSafe1_1 = await signMessage(

_27

messageSafe1_1,

_27

SigningMethod.SAFE_SIGNATURE,

_27

SAFE_3_4_ADDRESS // Parent Safe address

_27

)

_27

_27

// Build the contract signature of SAFE_1_1_ADDRESS

_27

const signatureSafe1_1 = await buildContractSignature(

_27

Array.from(messageSafe1_1.signatures.values()),

_27

SAFE_1_1_ADDRESS

_27

)

_27

_27

// Add the signatureSafe1_1 to safeMessage

_27

// After this, the safeMessage contains the signature from OWNER_1_ADDRESS, OWNER_2_ADDRESS and SAFE_1_1_ADDRESS

_27

safeMessage.addSignature(signatureSafe1_1)`

When signing with a child Safe account, we need to specify the parent Safe address to generate the signature based on the version of the contract.

##### 2/3 Safe account

This applies to the `SAFE_2_3_ADDRESS` account, another owner of `SAFE_3_4_ADDRESS`.

We need to connect the Protocol Kit to `SAFE_2_3_ADDRESS` and the `OWNER_4_ADDRESS` and `OWNER_5_ADDRESS` accounts (owners of `SAFE_2_3_ADDRESS`) and sign the message.

`_41

// Create a new message object

_41

let messageSafe2_3 = await createMessage(TYPED_MESSAGE)

_41

_41

// Connect OWNER_4_ADDRESS and SAFE_2_3_ADDRESS

_41

protocolKit = await protocolKit.connect({

_41

provider: RPC_URL,

_41

signer: OWNER_4_PRIVATE_KEY,

_41

safeAddress: SAFE_2_3_ADDRESS

_41

})

_41

_41

// Sign the messageSafe2_3 with OWNER_4_ADDRESS

_41

// After this, the messageSafe2_3 contains the signature from OWNER_4_ADDRESS

_41

messageSafe2_3 = await protocolKit.signMessage(

_41

messageSafe2_3,

_41

SigningMethod.SAFE_SIGNATURE,

_41

SAFE_3_4_ADDRESS // Parent Safe address

_41

)

_41

_41

// Connect OWNER_5_ADDRESS

_41

protocolKit = await protocolKit.connect({

_41

provider: RPC_URL,

_41

signer: OWNER_5_PRIVATE_KEY

_41

})

_41

_41

// Sign the messageSafe2_3 with OWNER_5_ADDRESS

_41

// After this, the messageSafe2_3 contains the signature from OWNER_5_ADDRESS

_41

messageSafe2_3 = await protocolKit.signMessage(

_41

messageSafe2_3,

_41

SigningMethod.SAFE_SIGNATURE,

_41

SAFE_3_4_ADDRESS // Parent Safe address

_41

)

_41

_41

// Build the contract signature of SAFE_2_3_ADDRESS

_41

const signatureSafe2_3 = await buildContractSignature(

_41

Array.from(messageSafe2_3.signatures.values()),

_41

SAFE_2_3_ADDRESS

_41

)

_41

_41

// Add the signatureSafe2_3 to safeMessage

_41

// After this, the safeMessage contains the signature from OWNER_1_ADDRESS, OWNER_2_ADDRESS, SAFE_1_1_ADDRESS and SAFE_2_3_ADDRESS

_41

safeMessage.addSignature(signatureSafe2_3)`

After following all the steps above, the `safeMessage` now contains all the signatures from the owners of the Safe.

### Publish the signed message

As messages aren't stored in the blockchain, we must make them public and available to others by storing them elsewhere.

Safe messages can be stored on-chain and off-chain:

- **Off-chain**: Messages are stored in the Safe Transaction Service. This is the default option and doesn't require any on-chain interaction.
- **On-chain**: Messages are [stored (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol#L68-L69) in the Safe contract.

Safe supports signing [EIP-191 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-191) messages and [EIP-712 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-712) typed data messages all together with off-chain [EIP-1271 (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271) validation for signatures.

#### Off-chain messages

To use off-chain messages, we need to use the functionality from this guide and call the Safe Transaction Service API to store the messages and signatures.

We mentioned the utility of storing messages in the contract. Off-chain messages have the same purpose, but they're stored in the Safe Transaction Service. It stores the messages and signatures in a database. It's a centralized service, but it's open-source and can be deployed by anyone.

The Safe Transaction Service is used by [Safe{Wallet}](https:/app.safe.global) to store messages and signatures by default.

##### Propose the message

To store a new message, we need to call the `addMessage` from the API Kit, passing the Safe address, an object with the message, and a signature from one owner.

`_16

// Get the signature from OWNER_1_ADDRESS

_16

const signatureOwner1 = safeMessage.getSignature(OWNER_1_PRIVATE_KEY) as EthSafeSignature

_16

_16

// Instantiate the API Kit

_16

// Use the chainId where you have the Safe account deployed

_16

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_16

const apiKit = new SafeApiKit({

_16

chainId,

_16

apiKey: 'YOUR_API_KEY'

_16

})

_16

_16

// Propose the message

_16

apiKit.addMessage(SAFE_3_4_ADDRESS, {

_16

message: TYPED_MESSAGE, // or STRING_MESSAGE

_16

signature: buildSignatureBytes([signatureOwner1])

_16

})`

The message is now publicly available in the Safe Transaction Service with the signature of the owner who submitted it.

##### Confirm the message

To add the signatures from the remaining owners, we need to call the `addMessageSignature`, passing the `safeMessageHash` and a signature from the owner.

`_25

// Get the safeMessageHash

_25

const safeMessageHash = await protocolKit.getSafeMessageHash(

_25

hashSafeMessage(TYPED_MESSAGE) // or STRING_MESSAGE

_25

)

_25

_25

// Get the signature from OWNER_2_ADDRESS

_25

const signatureOwner2 = safeMessage.getSignature(OWNER_2_ADDRESS) as EthSafeSignature

_25

_25

// Add signature from OWNER_2_ADDRESS

_25

await apiKit.addMessageSignature(

_25

safeMessageHash,

_25

buildSignatureBytes([signatureOwner2])

_25

)

_25

_25

// Add signature from the owner SAFE_1_1_ADDRESS

_25

await apiKit.addMessageSignature(

_25

safeMessageHash,

_25

buildSignatureBytes([signatureSafe1_1])

_25

)

_25

_25

// Add signature from the owner SAFE_2_3_ADDRESS

_25

await apiKit.addMessageSignature(

_25

safeMessageHash,

_25

buildSignatureBytes([signatureSafe2_3])

_25

)`

At this point, the message stored in the Safe Transaction Service contains all the required signatures from the owners of the Safe.

The `getMessage` method returns the status of a message.

`_10

const confirmedMessage = await apiKit.getMessage(safeMessageHash)`

[Safe{Wallet} (opens in a new tab)](https://app.safe.global) exposes to its users the list of off-chain messages signed by a Safe account.

`_10

https://app.safe.global/transactions/messages?safe=<NETWORK_PREFIX>:<SAFE_ADDRESS>`

#### On-chain messages

Storing messages on-chain is less efficient than doing it off-chain because it requires executing a transaction to store the message hash in the contract, resulting in additional gas costs. To do this on-chain, we use the `SignMessageLib` contract.

`_10

// Get the contract with the correct version

_10

const signMessageLibContract = await getSignMessageLibContract({

_10

safeVersion: '1.4.1'

_10

})`

We need to calculate the `messageHash`, encode the call to the `signMessage` function in the `SignMessageLib` contract and create the transaction that will store the message hash in that contract.

`_13

const messageHash = hashSafeMessage(MESSAGE)

_13

const txData = signMessageLibContract.encode('signMessage', [messageHash])

_13

_13

const safeTransactionData: SafeTransactionDataPartial = {

_13

to: signMessageLibContract.address,

_13

value: '0',

_13

data: txData,

_13

operation: OperationType.DelegateCall

_13

}

_13

_13

const signMessageTx = await protocolKit.createTransaction({

_13

transactions: [safeTransactionData]

_13

})`

Once the transaction object is instantiated, the owners must sign and execute it.

`_10

// Collect the signatures using the signTransaction method

_10

_10

// Execute the transaction to store the messageHash

_10

await protocolKit.executeTransaction(signMessageTx)`

Once the transaction is executed, the message hash will be stored in the contract.

### Validate the signature

#### On-chain

When a message is stored on-chain, the `isValidSignature` method in the Protocol Kit needs to be called with the parameters `messageHash` and `0x`. The method will check the stored hashes in the Safe contract to validate the signature.

`_10

import { hashSafeMessage } from '@safe-global/protocol-kit'

_10

_10

const messageHash = hashSafeMessage(MESSAGE)

_10

_10

const isValid = await protocolKit.isValidSignature(messageHash, '0x')`

#### Off-chain

When a message is stored off-chain, the `isValidSignature` method in the Protocol Kit must be called with the `messageHash` and the `encodedSignatures` parameters. The method will check the `isValidSignature` function defined in the `CompatibilityFallbackHandler` [contract (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/handler/CompatibilityFallbackHandler.sol#L51-L68) to validate the signature.

`_10

const encodedSignatures = safeMessage.encodedSignatures()

_10

_10

const isValid = await protocolKit.isValidSignature(

_10

messageHash,

_10

encodedSignatures

_10

)`

[Transactions](/sdk/protocol-kit/guides/signatures/transactions "Transactions")[Migrate to v1](/sdk/protocol-kit/guides/migrate-to-v1 "Migrate to v1")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Message signatures
  - Prerequisites
  - Steps
    - Install dependencies
    - Create a message
    - Sign the message
      - ECDSA signatures
      - Smart contract signatures
        - 1/1 Safe account
        - 2/3 Safe account
    - Publish the signed message
      - Off-chain messages
        - Propose the message
        - Confirm the message
      - On-chain messages
    - Validate the signature
      - On-chain
      - Off-chain

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [setup](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [setup](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [Safe{Wallet}](https://docs.safe.global/app.safe.global)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [stored(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol)
- [EIP-191(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-191)
- [EIP-712(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-712)
- [EIP-1271(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271)
- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [contract(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/handler/CompatibilityFallbackHandler.sol)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

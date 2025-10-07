---
title: Transaction signatures – Safe Docs
url: https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Transaction signatures – Safe Docs

SDK

[Protocol Kit](/sdk/protocol-kit)

Guides

[Signatures](/sdk/protocol-kit/guides/signatures)

Transactions

# Transaction signatures

This guide explains how transactions are signed by the Safe owners using the Protocol Kit.

ℹ️

Before starting, check this guide's [setup](/sdk/protocol-kit/guides/signatures).

## Prerequisites

- [Node.js and npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Steps

### Install dependencies

`_10

yarn install @safe-global/protocol-kit`

### Create a transaction

The `createTransaction` method in the Protocol Kit allows the creation of new Safe transactions and returns an instance of the `EthSafeTransaction` class.

`_10

// Create a transaction to send 0.01 ETH

_10

const safeTransactionData: SafeTransactionDataPartial = {

_10

to: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',

_10

value: '100000000000000000', // 0.01 ETH

_10

data: '0x'

_10

}

_10

_10

let safeTransaction = await protocolKit.createTransaction({

_10

transactions: [safeTransactionData]

_10

})`

The returned `safeTransaction` object contains the transaction data (`safeTransaction.data`) and a map of the owner-signature pairs (`safeTransaction.signatures`). The structure is similar to the `EthSafeMessage` class but applied for transactions instead of messages.

We use `let` to initialize the `safeTransaction` variable because we will add the signatures later.

`_10

class EthSafeTransaction implements SafeTransaction {

_10

data: SafeTransactionData

_10

signatures: Map<string, SafeSignature> = new Map()

_10

...

_10

// Other properties and methods

_10

}`

### Sign the transaction

Once the `safeTransaction` object is created, we need to collect the signatures from the signers who will sign it.

Following our [setup](/sdk/protocol-kit/guides/signatures), we will sign a Safe transaction from `SAFE_3_4_ADDRESS`, the main Safe account in this guide. To do that, we first need to sign the same transaction with its owners: `OWNER_1_ADDRESS`, `OWNER_2_ADDRESS`, `SAFE_1_1_ADDRESS`, and `SAFE_2_3_ADDRESS`.

#### ECDSA signature

This applies to `OWNER_1_ADDRESS` and `OWNER_2_ADDRESS` accounts, as both are EOAs.

The `signTransaction` method takes the `safeTransaction` together with a `SigningMethod` and adds the new signature to the `safeTransaction.signatures` map. Depending on the type of message, the `SigningMethod` can take these values:

- `SigningMethod.ETH_SIGN`
- `SigningMethod.ETH_SIGN_TYPED_DATA_V4`

`_25

// Connect OWNER_1_ADDRESS

_25

protocolKit = await protocolKit.connect({

_25

provider: RPC_URL,

_25

signer: OWNER_1_PRIVATE_KEY

_25

})

_25

_25

// Sign the safeTransaction with OWNER_1_ADDRESS

_25

// After this, the safeTransaction contains the signature from OWNER_1_ADDRESS

_25

safeTransaction = await protocolKit.signTransaction(

_25

safeTransaction,

_25

SigningMethod.ETH_SIGN

_25

)

_25

_25

// Connect OWNER_2_ADDRESS

_25

protocolKit = await protocolKit.connect({

_25

provider: RPC_URL,

_25

signer: OWNER_2_PRIVATE_KEY

_25

})

_25

_25

// Sign the safeTransaction with OWNER_2_ADDRESS

_25

// After this, the safeTransaction contains the signature from OWNER_1_ADDRESS and OWNER_2_ADDRESS

_25

safeTransaction = await protocolKit.signTransaction(

_25

safeTransaction,

_25

SigningMethod.ETH_SIGN_TYPED_DATA_V4

_25

)`

At this point, the `safeTransaction` object should look like this:

`_15

EthSafeTransaction {

_15

signatures: Map(2) {

_15

'0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1' => EthSafeSignature {

_15

signer: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',

_15

data: '0x969308e2abeda61a0c9c41b3c615012f50dd7456ca76ea39a18e3b975abeb67f275b07810dd59fc928f3f9103e52557c1578c7c5c171ffc983afa5306466b1261f',

_15

isContractSignature: false

_15

},

_15

'0xffcf8fdee72ac11b5c542428b35eef5769c409f0' => EthSafeSignature {

_15

signer: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',

_15

data: '0x4d63c79cf9d743782bc31ad58c1a316020b39839ab164caee7ecac9829f685cc44ec0d066a5dfe646b2ffeeb37575df131daf9c96ced41b8c7c4aea8dc5461801c',

_15

isContractSignature: false

_15

}

_15

},

_15

data: { ... }

_15

}`

The `signatures.data` represents a specific signature. The `isContractSignature` flag set to `false` indicates that the signature isn't a smart contract signature but an ECDSA signature instead.

An ECDSA signature comprises two 32-byte integers (`r`, `s`) and an extra byte for recovery (`v`), totaling 65 bytes. In hexadecimal string format, each byte is represented by two characters. Hence, a 65-byte Ethereum signature will be 130 characters long. Including the `0x` prefix commonly used with signatures, the total character count for such a signature would be 132.

Two more characters are required to represent a byte (8 bits) in hexadecimal. Each hexadecimal character represents four bits. Therefore, two hexadecimal characters (2 x 4 bits) can represent a byte (8 bits).

The final part of the signature, either `1f` or `1c`, indicates the signature type.

Safe supports the following `v` values:

- `0`: Contract signature.
- `1`: Approved hash.
- `{27, 28} + 4`: Ethereum adjusted ECDSA recovery byte for EIP-191 signed message.

> Regarding the EIP-191 signed message, the `v` value is adjusted to the ECDSA `v + 4`. If the generated value is `28` and adjusted to `0x1f`, the signature verification will fail as it should be `0x20` ('28 + 4 = 32`) instead. If` v > 30`, then the default` v `(`27`,` 28`) was adjusted because of the` eth\_sign` implementation. This calculation is automatically done by the Safe{Core} SDK.

- Other: Ethereum adjusted ECDSA recovery byte for raw signed hash.

The hexadecimal value `1f` equals the decimal number `31`. If the decimal value is greater than `30`, it [indicates (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol#L344-L347) that the signature is an `eth_sign` signature.

The hexadecimal value `1c` equals the decimal number `28`, indicating that the signature is a typed data signature.

The initial signature should look like this:

`0x969308e2abeda61a0c9c41b3c615012f50dd7456ca76ea39a18e3b975abeb67f275b07810dd59fc928f3f9103e52557c1578c7c5c171ffc983afa5306466b1261f`:

| Type | Description | Bytes | Value |
| --- | --- | --- | --- |
| Hex | Hex string characters | 1 | 0x |
| Signature | Signature bytes | 64 | 969308e2abeda61a0c9c41b3c615012f50dd7456ca76ea39a18e3b975abeb67f275b07810dd59fc928f3f9103e52557c1578c7c5c171ffc983afa5306466b126 |
| Signature Type | 1f hex is 31 in decimal | 1 | 1f |

#### Smart contract signatures

When signing with a Safe account, the `SigningMethod` will take the value `SigningMethod.SAFE_SIGNATURE`.

##### 1/1 Safe account

This applies to the `SAFE_1_1_ADDRESS` account, another owner of `SAFE_3_4_ADDRESS`.

We need to connect the Protocol Kit to `SAFE_1_1_ADDRESS` and the `OWNER_3_ADDRESS` account (the only owner of `SAFE_1_1_ADDRESS`) and sign the transaction.

`_19

// Create a new transaction object

_19

let transactionSafe1_1 = await protocolKit.createTransaction({

_19

transactions: [safeTransactionData]

_19

})

_19

_19

// Connect OWNER_3_ADDRESS and SAFE_1_1_ADDRESS

_19

protocolKit = await protocolKit.connect({

_19

provider: RPC_URL,

_19

signer: OWNER_3_PRIVATE_KEY,

_19

safeAddress: SAFE_1_1_ADDRESS

_19

})

_19

_19

// Sign the transactionSafe1_1 with OWNER_3_ADDRESS

_19

// After this, transactionSafe1_1 contains the signature from OWNER_3_ADDRESS

_19

transactionSafe1_1 = await protocolKit.signTransaction(

_19

transactionSafe1_1,

_19

SigningMethod.SAFE_SIGNATURE,

_19

SAFE_3_4_ADDRESS // Parent Safe address

_19

)`

When signing with a child Safe account, we need to specify the parent Safe address to generate the signature based on the version of the contract.

At this point, the `transactionSafe1_1` object should look like this:

`_10

EthSafeTransaction {

_10

signatures: Map(1) {

_10

'0x22d491bde2303f2f43325b2108d26f1eaba1e32b' => EthSafeSignature {

_10

signer: '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',

_10

data: '0x5edb6ffe67dd935d93d07c634970944ba0b096f767b92018ad635e8b28effeea5a1e512f1ad6f886690e0e30a3fae2c8c61d3f83d24d43276acdb3254b92ea5b1f',

_10

isContractSignature: false

_10

}

_10

},

_10

data: { ...}

_10

}`

The `signatures.data` represents a specific signature. The `isContractSignature` flag set to `false` indicates that the signature isn't a smart contract signature but an ECDSA signature instead.

To generate a Safe compatible signature, we use the `buildContractSignature` method, which takes an array of signatures and returns another signature that can be used with Safe accounts. After that, we add the signature from `SAFE_1_1_ADDRESS` to our initial transaction.

`_10

// Build the contract signature of SAFE_1_1_ADDRESS

_10

const signatureSafe1_1 = await buildContractSignature(

_10

Array.from(transactionSafe1_1.signatures.values()),

_10

SAFE_1_1_ADDRESS

_10

)

_10

_10

// Add the signatureSafe1_1 to safeTransaction

_10

// After this, the safeTransaction contains the signature from OWNER_1_ADDRESS, OWNER_2_ADDRESS and SAFE_1_1_ADDRESS

_10

safeTransaction.addSignature(signatureSafe1_1)`

The `signatureSafe1_1` object should look like this:

`_10

EthSafeSignature {

_10

signer: '0x215033cdE0619D60B7352348F4598316Cc39bC6E',

_10

data: '0x5edb6ffe67dd935d93d07c634970944ba0b096f767b92018ad635e8b28effeea5a1e512f1ad6f886690e0e30a3fae2c8c61d3f83d24d43276acdb3254b92ea5b1f',

_10

isContractSignature: true

_10

}`

The `isContractSignature` flag is now `true` because `signatureSafe1_1` is an EIP-1271 smart contract signature from the `SAFE_1_1_ADDRESS` account.

The `signatureSafe1_1.data` signature should look like this:

`_10

0x000000000000000000000000215033cdE0619D60B7352348F4598316Cc39bC6E00000000000000000000000000000000000000000000000000000000000000410000000000000000000000000000000000000000000000000000000000000000415edb6ffe67dd935d93d07c634970944ba0b096f767b92018ad635e8b28effeea5a1e512f1ad6f886690e0e30a3fae2c8c61d3f83d24d43276acdb3254b92ea5b1f`

| Type | Description | Bytes | Value |
| --- | --- | --- | --- |
| Hex | Hex string characters | 1 | 0x |
| Verifier | Padded address of the contract that implements the EIP-1271 interface to verify the signature. The Safe signer address | 32 | 000000000000000000000000215033cdE0619D60B7352348F4598316Cc39bC6E |
| Data position | Start position of the signature data (offset relative to the beginning of the signature data). 41 hex is 65 in decimal | 32 | 0000000000000000000000000000000000000000000000000000000000000041 |
| Signature Type | [00 for Safe accounts (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol#L322-L336) | 1 | 00 |
| Signature Length | The length of the signature. 41 hex is 65 in decimal | 32 | 0000000000000000000000000000000000000000000000000000000000000041 |
| Signature | Signature bytes that are verified by the signature verifier | 65 | 5edb6ffe67dd935d93d07c634970944ba0b096f767b92018ad635e8b28effeea5a1e512f1ad6f886690e0e30a3fae2c8c61d3f83d24d43276acdb3254b92ea5b1f |

##### 2/3 Safe account

This applies to the `SAFE_2_3_ADDRESS` account, another owner of `SAFE_3_4_ADDRESS`.

We need to connect the Protocol Kit to `SAFE_2_3_ADDRESS` and the `OWNER_4_ADDRESS` and `OWNER_5_ADDRESS` accounts (owners of `SAFE_2_3_ADDRESS`) and sign the transaction.

`_33

// Create a new transaction object

_33

let transactionSafe2_3 = await protocolKit.createTransaction({

_33

transactions: [safeTransactionData]

_33

})

_33

_33

// Connect OWNER_4_ADDRESS and the address of SAFE_2_3_ADDRESS

_33

protocolKit = await protocolKit.connect({

_33

provider: RPC_URL,

_33

signer: OWNER_4_ADDRESS,

_33

safeAddress: SAFE_2_3_ADDRESS

_33

})

_33

_33

// Sign the transactionSafe2_3 with OWNER_4_ADDRESS

_33

// After this, the transactionSafe2_3 contains the signature from OWNER_4_ADDRESS

_33

transactionSafe2_3 = await protocolKit.signTransaction(

_33

transactionSafe2_3,

_33

SigningMethod.SAFE_SIGNATURE,

_33

SAFE_3_4_ADDRESS // Parent Safe address

_33

)

_33

_33

// Connect OWNER_5_ADDRESS

_33

protocolKit = await protocolKit.connect({

_33

provider: RPC_URL,

_33

signer: OWNER_5_ADDRESS

_33

})

_33

_33

// Sign the transactionSafe2_3 with OWNER_5_ADDRESS

_33

// After this, the transactionSafe2_3 contains the signature from OWNER_5_ADDRESS

_33

transactionSafe2_3 = await protocolKit.signTransaction(

_33

transactionSafe2_3,

_33

SigningMethod.SAFE_SIGNATURE,

_33

SAFE_3_4_ADDRESS // Parent Safe address

_33

)`

At this point, the `transactionSafe2_3` object should look like this:

`_15

EthSafeTransaction {

_15

signatures: Map(2) {

_15

'0xe11ba2b4d45eaed5996cd0823791e0c93114882d' => EthSafeSignature {

_15

signer: '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d',

_15

data: '0xd3e6565e5590641db447277243cf24711dce533cfcaaf3a64415dcb9fa309fbf2de1ae4709c6450752acc0d45e01b67b55379bdf4e3dc32b2d89ad0a60c231d61f',

_15

isContractSignature: false

_15

},

_15

'0xd03ea8624c8c5987235048901fb614fdca89b117' => EthSafeSignature {

_15

signer: '0xd03ea8624C8C5987235048901fB614fDcA89b117',

_15

data: '0x023d1746ed548e90f387a6b8ddba26e6b80a78d5bfbc36e5bfcbfd63e136f8071db6e91c037fa36bde72159138bbb74fc359b35eb515e276a7c0547d5eaa042520',

_15

isContractSignature: false

_15

}

_15

},

_15

data: { ... }

_15

}`

We now have two signatures from the owners, `OWNER_4_ADDRESS` and `OWNER_5_ADDRESS`. Following the same process, we can create the contract signature and examine the result.

The `signatures.data` represents a specific signature. The `isContractSignature` flag set to `false` indicates that the signature isn't a smart contract signature but an ECDSA signature instead.

To generate a Safe compatible signature, we use the `buildContractSignature` method, which takes an array of signatures and returns another signature that can be used with Safe accounts. After that, we add the signature from `safe1_1` to our initial transaction.

`_10

// Build the contract signature of SAFE_2_3_ADDRESS

_10

const signatureSafe2_3 = await buildContractSignature(

_10

Array.from(transactionSafe2_3.signatures.values()),

_10

SAFE_2_3_ADDRESS

_10

)

_10

_10

// Add the signatureSafe2_3 to safeTransaction

_10

// After this, the safeTransaction contains the signature from OWNER_1_ADDRESS, OWNER_2_ADDRESS, SAFE_1_1_ADDRESS and SAFE_2_3_ADDRESS

_10

safeTransaction.addSignature(signatureSafe2_3)`

The `signatureSafe2_3` object should look like this:

`_10

0x000000000000000000000000f75D61D6C27a7CC5788E633c1FC130f0F4a62D330000000000000000000000000000000000000000000000000000000000000041000000000000000000000000000000000000000000000000000000000000000082023d1746ed548e90f387a6b8ddba26e6b80a78d5bfbc36e5bfcbfd63e136f8071db6e91c037fa36bde72159138bbb74fc359b35eb515e276a7c0547d5eaa042520d3e6565e5590641db447277243cf24711dce533cfcaaf3a64415dcb9fa309fbf2de1ae4709c6450752acc0d45e01b67b55379bdf4e3dc32b2d89ad0a60c231d61f`

| Type | Description | Bytes | Value |
| --- | --- | --- | --- |
| Hex | Hex string characters | 1 | 0x |
| Verifier | Padded address of the contract that implements the EIP-1271 interface to verify the signature. The Safe signer address | 32 | 000000000000000000000000f75D61D6C27a7CC5788E633c1FC130f0F4a62D33 |
| Data position | Start position of the signature data (offset relative to the beginning of the signature data). 41 hex is 65 in decimal | 32 | 0000000000000000000000000000000000000000000000000000000000000041 |
| Signature Type | [00 for Safe accounts (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol#L322-L336) | 1 | 00 |
| Signature Length | The length of the signature. 82 hex is 130 in decimal | 32 | 0000000000000000000000000000000000000000000000000000000000000082 |
| Signature | Signature bytes that are verified by the signature verifier (130 bytes are represented by 260 characters in an hex string) | 130 | 023d1746ed548e90f387a6b8ddba26e6b80a78d5bfbc36e5bfcbfd63e136f8071db6e91c037fa36bde72159138bbb74fc359b35eb515e276a7c0547d5eaa042520d3e6565e5590641db447277243cf24711dce533cfcaaf3a64415dcb9fa309fbf2de1ae4709c6450752acc0d45e01b67b55379bdf4e3dc32b2d89ad0a60c231d61f |

The table looks very similar to the previous one, but there are two main differences:

- The **Signature Length** value has doubled because `safe2_3` needs two signatures.
- The **Signature** value is a concatenation of the two regular signatures.

After following all the steps above, the `safeTransaction` now contains all the signatures from the owners of the Safe.

The `safeTransaction` object should look like this:

`_36

EthSafeTransaction {

_36

signatures: Map(4) {

_36

'0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1' => EthSafeSignature {

_36

signer: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',

_36

data: '0x969308e2abeda61a0c9c41b3c615012f50dd7456ca76ea39a18e3b975abeb67f275b07810dd59fc928f3f9103e52557c1578c7c5c171ffc983afa5306466b1261f',

_36

isContractSignature: false

_36

},

_36

'0xffcf8fdee72ac11b5c542428b35eef5769c409f0' => EthSafeSignature {

_36

signer: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',

_36

data: '0x4d63c79cf9d743782bc31ad58c1a316020b39839ab164caee7ecac9829f685cc44ec0d066a5dfe646b2ffeeb37575df131daf9c96ced41b8c7c4aea8dc5461801c',

_36

isContractSignature: false

_36

},

_36

'0x215033cde0619d60b7352348f4598316cc39bc6e' => EthSafeSignature {

_36

signer: '0x215033cdE0619D60B7352348F4598316Cc39bC6E',

_36

data: '0x5edb6ffe67dd935d93d07c634970944ba0b096f767b92018ad635e8b28effeea5a1e512f1ad6f886690e0e30a3fae2c8c61d3f83d24d43276acdb3254b92ea5b1f',

_36

isContractSignature: true

_36

},

_36

'0xf75d61d6c27a7cc5788e633c1fc130f0f4a62d33' => EthSafeSignature {

_36

signer: '0xf75D61D6C27a7CC5788E633c1FC130f0F4a62D33',

_36

data: '0x023d1746ed548e90f387a6b8ddba26e6b80a78d5bfbc36e5bfcbfd63e136f8071db6e91c037fa36bde72159138bbb74fc359b35eb515e276a7c0547d5eaa042520d3e6565e5590641db447277243cf24711dce533cfcaaf3a64415dcb9fa309fbf2de1ae4709c6450752acc0d45e01b67b55379bdf4e3dc32b2d89ad0a60c231d61f',

_36

isContractSignature: true

_36

}

_36

},

_36

data: {

_36

to: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',

_36

value: '100000000000000000',

_36

data: '0x',

_36

operation: 0,

_36

baseGas: '0',

_36

gasPrice: '0',

_36

gasToken: '0x0000000000000000000000000000000000000000',

_36

refundReceiver: '0x0000000000000000000000000000000000000000',

_36

nonce: 0,

_36

safeTxGas: '0'

_36

}

_36

}`

### Propose the transaction

To store the transactions and signatures off-chain, we need to call the Safe Transaction Service API - a centralized and open-source service that anyone can deploy and run.

The Safe Transaction Service is used by [Safe{Wallet} (opens in a new tab)](https://app.safe.global) to store transactions and signatures by default.

To store a new transaction, we need to call the `proposeTransaction` from the API Kit, passing the Safe address, an object with the transaction, and a signature from one owner.

`_22

// Get the signature from OWNER_1_ADDRESS

_22

const signatureOwner1 = safeTransaction.getSignature(OWNER_1_ADDRESS) as EthSafeSignature

_22

_22

// Get the transaction hash of the safeTransaction

_22

const safeTransactionHash = await protocolKit.getTransactionHash(safeTransaction)

_22

_22

// Instantiate the API Kit

_22

// Use the chainId where you have the Safe account deployed

_22

// How to get an Api key => http://docs.safe.global/core-api/how-to-use-api-keys

_22

const apiKit = new SafeApiKit({

_22

chainId,

_22

apiKey: 'YOUR_API_KEY'

_22

})

_22

_22

// Propose the transaction

_22

await apiKit.proposeTransaction({

_22

safeAddress: SAFE_3_4_ADDRESS,

_22

safeTransactionData: safeTransaction.data,

_22

safeTxHash: safeTransactionHash,

_22

senderAddress: signerAddress,

_22

senderSignature: buildSignatureBytes([signatureOwner1])

_22

})`

The transaction is now publicly available in the Safe Transaction Service with the signature of the owner who submitted it.

### Confirm the transaction

To add the signatures from the remaining owners, we need to call the `confirmTransaction`, passing the `safeMessageHash` and a signature from the owner.

Once a transaction is proposed, it becomes available on [Safe{Wallet} (opens in a new tab)](https://app.safe.global). However, to execute the transaction, all the confirmations from the owners are needed.

`_19

const signatureOwner2 = safeTransaction.getSignature(OWNER_2_ADDRESS) as EthSafeSignature

_19

_19

// Confirm the transaction from OWNER_2_ADDRESS

_19

await apiKit.confirmTransaction(

_19

safeTransactionHash,

_19

buildSignatureBytes([signatureOwner2])

_19

)

_19

_19

// Confirm the transaction with the owner SAFE_1_1_ADDRESS

_19

await apiKit.confirmTransaction(

_19

safeTransactionHash,

_19

buildSignatureBytes([signatureSafe1_1])

_19

)

_19

_19

// Add signature from the owner SAFE_2_3_ADDRESS

_19

await apiKit.confirmTransaction(

_19

safeTransactionHash,

_19

buildSignatureBytes([signerSafeSig2_3])

_19

)`

At this point, the transaction stored in the Safe Transaction Service contains all the required signatures from the owners of the Safe.

The `getTransaction` method returns the transaction with the `confirmations` property to check all the added signatures.

`_10

// Get the transactions

_10

const signedTransaction = await apiKit.getTransaction(safeTransactionHash)

_10

_10

// Get the confirmations

_10

const confirmations = signedTransaction.confirmations`

[Safe{Wallet} (opens in a new tab)](https://app.safe.global) exposes to its users the list of pending transactions.

`_10

https://app.safe.global/transactions/queue?safe=<NETWORK_PREFIX>:<SAFE_ADDRESS>`

### Execute the transaction

Connect the Safe and an a signer to the Protocol Kit. Ensure enough funds are available in the owner's account to execute the transaction and cover the gas costs. Once the Protocol Kit is initialized, the `executeTransaction` method receives and executes the transaction with the required signatures.

`_10

protocolKit = await protocolKit.connect({

_10

provider: RPC_URL,

_10

signer: OWNER_1_PRIVATE_KEY,

_10

safeAddress: SAFE_3_4_ADDRESS

_10

})

_10

_10

// Execute the Safe transaction

_10

const transactionResponse = await protocolKit.executeTransaction(safeTransaction)`

At this point, the Safe transaction should be executed on-chain and listed on [Safe{Wallet} (opens in a new tab)](https://app.safe.global).

`_10

https://app.safe.global/transactions/history?safe=<NETWORK_PREFIX>:<SAFE_ADDRESS>`

The `safeTransaction.encodedSignature` method returns the signatures concatenated and sorted by the address of the signers. It should look like this:

`_10

0x000000000000000000000000215033cdE0619D60B7352348F4598316Cc39bC6E000000000000000000000000000000000000000000000000000000000000010400969308e2abeda61a0c9c41b3c615012f50dd7456ca76ea39a18e3b975abeb67f275b07810dd59fc928f3f9103e52557c1578c7c5c171ffc983afa5306466b1261f000000000000000000000000f75D61D6C27a7CC5788E633c1FC130f0F4a62D330000000000000000000000000000000000000000000000000000000000000165004d63c79cf9d743782bc31ad58c1a316020b39839ab164caee7ecac9829f685cc44ec0d066a5dfe646b2ffeeb37575df131daf9c96ced41b8c7c4aea8dc5461801c00000000000000000000000000000000000000000000000000000000000000415edb6ffe67dd935d93d07c634970944ba0b096f767b92018ad635e8b28effeea5a1e512f1ad6f886690e0e30a3fae2c8c61d3f83d24d43276acdb3254b92ea5b1f0000000000000000000000000000000000000000000000000000000000000082023d1746ed548e90f387a6b8ddba26e6b80a78d5bfbc36e5bfcbfd63e136f8071db6e91c037fa36bde72159138bbb74fc359b35eb515e276a7c0547d5eaa042520d3e6565e5590641db447277243cf24711dce533cfcaaf3a64415dcb9fa309fbf2de1ae4709c6450752acc0d45e01b67b55379bdf4e3dc32b2d89ad0a60c231d61f`

| Type | Description | Bytes | Acc byte | Value |
| --- | --- | --- | --- | --- |
| Hex | Hex string characters | 1 | - | 0x |
| 1/1 Safe signer | Safe Address | 32 | 32 | 000000000000000000000000215033cdE0619D60B7352348F4598316Cc39bC6E |
| Data position for 1/1 Safe | 104 hex = Signature data for 1/1 Safe start at byte 260 | 32 | 64 | 0000000000000000000000000000000000000000000000000000000000000104 |
| Signature Type | Smart contract signature | 1 | 65 | 00 |
| Owner signature | `OWNER_1_ADDRESS` signature | 65 | 130 | 969308e2abeda61a0c9c41b3c615012f50dd7456ca76ea39a18e3b975abeb67f275b07810dd59fc928f3f9103e52557c1578c7c5c171ffc983afa5306466b1261f |
| 2/3 Safe signer | Safe Address | 32 | 162 | 000000000000000000000000f75D61D6C27a7CC5788E633c1FC130f0F4a62D33 |
| Data position for 2/3 Verifier | 165 hex = Signature data for 2/3 Safe start at byte 357 | 32 | 194 | 0000000000000000000000000000000000000000000000000000000000000165 |
| Signature | Type Smart contract signature | 1 | 195 | 00 |
| Owner signature | `OWNER_2_ADDRESS` signature | 65 | 260 | 4d63c79cf9d743782bc31ad58c1a316020b39839ab164caee7ecac9829f685cc44ec0d066a5dfe646b2ffeeb37575df131daf9c96ced41b8c7c4aea8dc5461801c |
| 1/1 Safe Signature Length | Start of the 1/1 Safe Signature. 41 hex = 65 bytes | 32 | 292 | 0000000000000000000000000000000000000000000000000000000000000041 |
| Signature | `OWNER_3_ADDRESS` signature | 65 | 357 | 5edb6ffe67dd935d93d07c634970944ba0b096f767b92018ad635e8b28effeea5a1e512f1ad6f886690e0e30a3fae2c8c61d3f83d24d43276acdb3254b92ea5b1f |
| 2/3 Safe Signature length | Start of the 2/3 Safe Signature. 82 hex = 130 bytes | 32 | 389 | 0000000000000000000000000000000000000000000000000000000000000082 |
| Signature | `OWNER_4_ADDRESS` and `OWNER_5_ADDRESS` concatenated signatures | 130 | 519 | 023d1746ed548e90f387a6b8ddba26e6b80a78d5bfbc36e5bfcbfd63e136f8071db6e91c037fa36bde72159138bbb74fc359b35eb515e276a7c0547d5eaa042520d3e6565e5590641db447277243cf24711dce533cfcaaf3a64415dcb9fa309fbf2de1ae4709c6450752acc0d45e01b67b55379bdf4e3dc32b2d89ad0a60c231d61f |

[Signatures](/sdk/protocol-kit/guides/signatures "Signatures")[Messages](/sdk/protocol-kit/guides/signatures/messages "Messages")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Transaction signatures
  - Prerequisites
  - Steps
    - Install dependencies
    - Create a transaction
    - Sign the transaction
      - ECDSA signature
      - Smart contract signatures
        - 1/1 Safe account
        - 2/3 Safe account
    - Propose the transaction
    - Confirm the transaction
    - Execute the transaction

---

## Related Links

### Internal Links

- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [Signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [setup](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [setup](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions](https://docs.safe.global/sdk/protocol-kit/guides/signatures/transactions)
- [Signatures](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [Messages](https://docs.safe.global/sdk/protocol-kit/guides/signatures/messages)

### External Links

- [Node.js and npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [indicates(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol)
- [00 for Safe accounts(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol)
- [00 for Safe accounts(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/f03dfae65fd1d085224b00a10755c509a4eaacfe/contracts/Safe.sol)
- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [Safe{Wallet}(opens in a new tab)](https://app.safe.global)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

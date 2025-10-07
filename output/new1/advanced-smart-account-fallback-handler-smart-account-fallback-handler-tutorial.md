---
title: Building a Fallback Handler for Safe Smart Account – Safe Docs
url: https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Building a Fallback Handler for Safe Smart Account – Safe Docs

Advanced

[Safe Fallback Handler](/advanced/smart-account-fallback-handler)

Smart Account Fallback Handler Tutorial

# Building a Fallback Handler for Safe Smart Account

This tutorial demonstrates how to build a custom Fallback Handler contract that adds a functions to a Safe Smart Account. You'll learn how to:

- Create a Fallback Handler
- Enable the Fallback Handler on a Safe Smart Account
- Write comprehensive tests for the Fallback Handler

You'll build a `ERC1271FallbackHandler` that adds a support for [ERC-1271 standard (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271) to Safe Smart Account. This is only an example and should not be used in production without proper security audits.

⚠️

Important Notice: The smart contract code provided in this tutorial is intended solely for educational purposes and serves only as an illustrative example. This example code has not undergone any security audits or formal verification processes. Safe does not guarantee the reliability, security, or correctness of this example code. Before deploying any smart contract code in a production environment, developers must conduct a thorough security audit and ensure rigorous testing procedures have been performed.

## Prerequisites

Before starting this tutorial, make sure you have:

- Experience with [Solidity (opens in a new tab)](https://docs.soliditylang.org/en/latest/) and [Hardhat (opens in a new tab)](https://hardhat.org)
- [Node.js (opens in a new tab)](https://nodejs.org/en/download/package-manager) and [npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed
- Basic understanding of Smart Account concepts

## Project Setup

### Initialize Project

Create a new project directory and initialize npm:

`_10

mkdir safe-fallback-handler-tutorial && cd safe-fallback-handler-tutorial

_10

npm init -y`

### Configure Dependencies

Add overrides in `package.json` so that there are no peer dependency related issues.

`_10

{

_10

// ... existing content ...

_10

"overrides": {

_10

"@safe-global/safe-contracts": {

_10

"ethers": "^6.13.5"

_10

}

_10

}

_10

}`

Install the required dependencies:

`_10

npm add -D hardhat @safe-global/safe-contracts hardhat-dependency-compiler`

### Initialize hardhat project

`_10

npx hardhat init`

Select `Create a TypeScript project` and leave the default values for the rest of the prompts.

Now, try compiling the contracts to ensure everything is set up correctly.

`_10

npx hardhat compile`

When compiling Safe contracts with solidity 0.8.x the bytecode size exceeds the limit of 24KB. To overcome this, set `allowUnlimitedContractSize` to `true` in the hardhat config.
In practise with production networks, use the officially deployed Safe contracts. Also, add `dependencyCompiler` to import `SafeProxyFactory` and `Safe` contracts.

Update your `hardhat.config.ts`:

`_20

import { HardhatUserConfig } from "hardhat/config";

_20

import "@nomicfoundation/hardhat-toolbox";

_20

import "hardhat-dependency-compiler";

_20

_20

const config: HardhatUserConfig = {

_20

solidity: "0.8.28",

_20

networks: {

_20

hardhat: {

_20

allowUnlimitedContractSize: true, // Required for Safe contracts

_20

},

_20

},

_20

dependencyCompiler: {

_20

paths: [

_20

"@safe-global/safe-contracts/contracts/proxies/SafeProxyFactory.sol",

_20

"@safe-global/safe-contracts/contracts/Safe.sol",

_20

],

_20

},

_20

};

_20

_20

export default config;`

## Create a new Solidity contract

Delete the default `contracts/Lock.sol` and test file `test/Lock.ts` and create a new Solidity contract `NoDelegatecallGuard.sol` in the `contracts` directory.

### Step 1. Create MyCustomFallbackHandler contract

`_10

// SPDX-License-Identifier: LGPL-3.0

_10

pragma solidity ^0.8.0;

_10

import {Safe} from "@safe-global/safe-contracts/contracts/Safe.sol";

_10

_10

contract ERC1271FallbackHandler {

_10

_10

}`

### Step 2: Define constants

`_10

// keccak256("SafeMessage(bytes message)");

_10

bytes32 private constant SAFE_MSG_TYPEHASH =

_10

0x60b3cbf8b4a223d68d641b3b6ddf9a298e7f33710cf3d3a9d1146b5a6150fbca;

_10

_10

// bytes4(keccak256("isValidSignature(bytes32,bytes)")

_10

bytes4 internal constant EIP1271_MAGIC_VALUE = 0x1626ba7e;`

### Step 3: Create a function to encode message data

`_21

/**

_21

* @dev Returns the pre-image of the message hash (see getMessageHashForSafe).

_21

* @param safe Safe to which the message is targeted.

_21

* @param message Message that should be encoded.

_21

* @return Encoded message.

_21

*/

_21

function encodeMessageDataForSafe(

_21

Safe safe,

_21

bytes memory message

_21

) public view returns (bytes memory) {

_21

bytes32 safeMessageHash = keccak256(

_21

abi.encode(SAFE_MSG_TYPEHASH, keccak256(message))

_21

);

_21

return

_21

abi.encodePacked(

_21

bytes1(0x19),

_21

bytes1(0x01),

_21

safe.domainSeparator(),

_21

safeMessageHash

_21

);

_21

}`

Explanation:

- This view function generates a encoded message that owners of the Safe can hash and sign.

### Step 4: Implement the `isValidSignature` function

`_24

/**

_24

* @notice Implementation of updated EIP-1271 signature validation method.

_24

* @param _dataHash Hash of the data signed on the behalf of address(msg.sender)

_24

* @param _signature Signature byte array associated with _dataHash

_24

* @return Updated EIP1271 magic value if signature is valid, otherwise 0x0

_24

*/

_24

function isValidSignature(

_24

bytes32 _dataHash,

_24

bytes calldata _signature

_24

) external view returns (bytes4) {

_24

// Caller should be a Safe

_24

Safe safe = Safe(payable(msg.sender));

_24

bytes memory messageData = encodeMessageDataForSafe(

_24

safe,

_24

abi.encode(_dataHash)

_24

);

_24

bytes32 messageHash = keccak256(messageData);

_24

if (_signature.length == 0) {

_24

require(safe.signedMessages(messageHash) != 0, "Hash not approved");

_24

} else {

_24

safe.checkSignatures(messageHash, messageData, _signature);

_24

}

_24

return EIP1271_MAGIC_VALUE;

_24

}`

- It computes a message hash from the provided data and checks for prior approval (if no signature is provided) or verifies the signature using the Safe's built-in `checkSignatures` method. Upon successful verification, it returns a specific value to confirm the signature's validity per EIP-1271.
- If the signature verification fails, the function reverts.

### Final contract code

`_59

// SPDX-License-Identifier: LGPL-3.0

_59

pragma solidity ^0.8.0;

_59

import {Safe} from "@safe-global/safe-contracts/contracts/Safe.sol";

_59

_59

contract ERC1271FallbackHandler {

_59

// keccak256("SafeMessage(bytes message)");

_59

bytes32 private constant SAFE_MSG_TYPEHASH =

_59

0x60b3cbf8b4a223d68d641b3b6ddf9a298e7f33710cf3d3a9d1146b5a6150fbca;

_59

_59

// bytes4(keccak256("isValidSignature(bytes32,bytes)")

_59

bytes4 internal constant EIP1271_MAGIC_VALUE = 0x1626ba7e;

_59

_59

/**

_59

* @dev Returns the pre-image of the message hash (see getMessageHashForSafe).

_59

* @param safe Safe to which the message is targeted.

_59

* @param message Message that should be encoded.

_59

* @return Encoded message.

_59

*/

_59

function encodeMessageDataForSafe(

_59

Safe safe,

_59

bytes memory message

_59

) public view returns (bytes memory) {

_59

bytes32 safeMessageHash = keccak256(

_59

abi.encode(SAFE_MSG_TYPEHASH, keccak256(message))

_59

);

_59

return

_59

abi.encodePacked(

_59

bytes1(0x19),

_59

bytes1(0x01),

_59

safe.domainSeparator(),

_59

safeMessageHash

_59

);

_59

}

_59

_59

/**

_59

* @notice Implementation of updated EIP-1271 signature validation method.

_59

* @param _dataHash Hash of the data signed on the behalf of address(msg.sender)

_59

* @param _signature Signature byte array associated with _dataHash

_59

* @return Updated EIP1271 magic value if signature is valid, otherwise 0x0

_59

*/

_59

function isValidSignature(

_59

bytes32 _dataHash,

_59

bytes calldata _signature

_59

) external view returns (bytes4) {

_59

// Caller should be a Safe

_59

Safe safe = Safe(payable(msg.sender));

_59

bytes memory messageData = encodeMessageDataForSafe(

_59

safe,

_59

abi.encode(_dataHash)

_59

);

_59

bytes32 messageHash = keccak256(messageData);

_59

if (_signature.length == 0) {

_59

require(safe.signedMessages(messageHash) != 0, "Hash not approved");

_59

} else {

_59

safe.checkSignatures(messageHash, messageData, _signature);

_59

}

_59

return EIP1271_MAGIC_VALUE;

_59

}

_59

}`

## Testing the contract

### Step 1: Create test/utils/utils.ts file

Create a new file named `utils.ts` in the `test/utils` directory and include the code below.

`_76

import { ethers } from "hardhat";

_76

import { Signer, AddressLike, BigNumberish, ZeroAddress } from "ethers";

_76

import { Safe } from "../../typechain-types";

_76

_76

/**

_76

* Executes a transaction on the Safe contract.

_76

* @param wallets - The signers of the transaction.

_76

* @param safe - The Safe contract instance.

_76

* @param to - The address to send the transaction to.

_76

* @param value - The value to send with the transaction.

_76

* @param data - The data to send with the transaction.

_76

* @param operation - The operation type (0 for call, 1 for delegate call).

_76

*/

_76

const execTransaction = async function (

_76

wallets: Signer[],

_76

safe: Safe,

_76

to: AddressLike,

_76

value: BigNumberish,

_76

data: string,

_76

operation: number,

_76

): Promise<void> {

_76

// Get the current nonce of the Safe contract

_76

const nonce = await safe.nonce();

_76

_76

// Get the transaction hash for the Safe transaction

_76

const transactionHash = await safe.getTransactionHash(

_76

to,

_76

value,

_76

data,

_76

operation,

_76

0,

_76

0,

_76

0,

_76

ZeroAddress,

_76

ZeroAddress,

_76

nonce

_76

);

_76

_76

let signatureBytes = "0x";

_76

const bytesDataHash = ethers.getBytes(transactionHash);

_76

_76

// Get the addresses of the signers

_76

const addresses = await Promise.all(wallets.map(wallet => wallet.getAddress()));

_76

// Sort the signers by their addresses

_76

const sorted = wallets.sort((a, b) => {

_76

const addressA = addresses[wallets.indexOf(a)];

_76

const addressB = addresses[wallets.indexOf(b)];

_76

return addressA.localeCompare(addressB, "en", { sensitivity: "base" });

_76

});

_76

_76

// Sign the transaction hash with each signer

_76

for (let i = 0; i < sorted.length; i++) {

_76

const flatSig = (await sorted[i].signMessage(bytesDataHash))

_76

.replace(/1b$/, "1f")

_76

.replace(/1c$/, "20");

_76

signatureBytes += flatSig.slice(2);

_76

}

_76

_76

// Execute the transaction on the Safe contract

_76

await safe.execTransaction(

_76

to,

_76

value,

_76

data,

_76

operation,

_76

0,

_76

0,

_76

0,

_76

ZeroAddress,

_76

ZeroAddress,

_76

signatureBytes

_76

);

_76

};

_76

_76

export {

_76

execTransaction,

_76

};`

- This file contains utility function to execute transaction through the Safe account.

### Step 2: Start with a boilerplate test file

Create a new file named `ERC1271FallbackHandler.test.ts` and include the following basic structure that will be filled in later steps (ignore the warnings about unused imports):

`_32

import { ethers } from "hardhat";

_32

import { expect } from "chai";

_32

import { Signer, ZeroAddress } from "ethers";

_32

import { Safe, Safe__factory, SafeProxyFactory } from "../typechain-types";

_32

import { ERC1271FallbackHandler } from "../typechain-types/contracts/ERC1271FallbackHandler";

_32

_32

describe("ERC1271FallbackHandler.test", async function () {

_32

let deployer: Signer;

_32

let alice: Signer;

_32

let masterCopy: Safe;

_32

let proxyFactory: SafeProxyFactory;

_32

let safeFactory: Safe__factory;

_32

let safe: Safe;

_32

let exampleFallbackHandler: ERC1271FallbackHandler;

_32

const threshold = 1;

_32

_32

const EIP712_SAFE_MESSAGE_TYPE = {

_32

// "SafeMessage(bytes message)"

_32

SafeMessage: [{ type: "bytes", name: "message" }],

_32

};

_32

_32

// Setup signers and deploy contracts before running tests

_32

beforeEach(async () => {});

_32

_32

it("should revert if called directly", async () => {});

_32

_32

it("should revert if message was not signed", async () => {});

_32

_32

it("should revert if signature is not valid", async () => {});

_32

_32

it("should return magic value if enough owners signed and allow a mix different signature types", async () => {});

_32

});`

### Step 3: Setup contracts and variables in before hook

`_50

// Setup signers and deploy contracts before running tests

_50

beforeEach(async () => {

_50

[deployer, alice] = await ethers.getSigners();

_50

_50

safeFactory = await ethers.getContractFactory("Safe", deployer);

_50

_50

// Deploy the ERC1271FallbackHandler contract

_50

exampleFallbackHandler = await (

_50

await ethers.getContractFactory("ERC1271FallbackHandler", deployer)

_50

).deploy();

_50

_50

masterCopy = await safeFactory.deploy();

_50

_50

proxyFactory = await (

_50

await ethers.getContractFactory("SafeProxyFactory", deployer)

_50

).deploy();

_50

_50

const ownerAddresses = [await alice.getAddress()];

_50

_50

const safeData = masterCopy.interface.encodeFunctionData("setup", [

_50

ownerAddresses,

_50

threshold,

_50

ZeroAddress,

_50

"0x",

_50

exampleFallbackHandler.target,

_50

ZeroAddress,

_50

0,

_50

ZeroAddress,

_50

]);

_50

_50

// Read the safe address by executing the static call to createProxyWithNonce function

_50

const safeAddress = await proxyFactory.createProxyWithNonce.staticCall(

_50

await masterCopy.getAddress(),

_50

safeData,

_50

0n

_50

);

_50

_50

// Create the proxy with nonce

_50

await proxyFactory.createProxyWithNonce(

_50

await masterCopy.getAddress(),

_50

safeData,

_50

0n

_50

);

_50

_50

if (safeAddress === ZeroAddress) {

_50

throw new Error("Safe address not found");

_50

}

_50

_50

safe = await ethers.getContractAt("Safe", safeAddress);

_50

});`

This step sets up the test environment by deploying and configuring the necessary contracts. Please note that:

- Alice is the only owner of the Safe and a threshold of 1 is set. Thus, only Alice's signature is required to execute transactions.
- The Fallback Handler here is set during the Safe setup process. It is also possible to set the Fallback Handler after the Safe is created using `setFallbackHandler` function.
- ⚠️ Security Note: Only trusted and audited code should be enabled as a Fallback Handler.

### Step 4: Add test cases

`_53

it("should revert if called directly", async () => {

_53

const dataHash = ethers.keccak256("0xbaddad");

_53

await expect(

_53

exampleFallbackHandler.isValidSignature.staticCall(dataHash, "0x")

_53

).to.be.reverted;

_53

});

_53

_53

it("should revert if message was not signed", async () => {

_53

const validator = await ethers.getContractAt(

_53

"ERC1271FallbackHandler",

_53

safe.target

_53

);

_53

const dataHash = ethers.keccak256("0xbaddad");

_53

await expect(

_53

validator.isValidSignature.staticCall(dataHash, "0x")

_53

).to.be.revertedWith("Hash not approved");

_53

});

_53

_53

it("should revert if signature is not valid", async () => {

_53

const validator = await ethers.getContractAt(

_53

"ERC1271FallbackHandler",

_53

safe.target

_53

);

_53

const dataHash = ethers.keccak256("0xbaddad");

_53

await expect(

_53

validator.isValidSignature.staticCall(dataHash, "0xdeaddeaddeaddead")

_53

).to.be.reverted;

_53

});

_53

_53

it("should return magic value if enough owners signed and allow a mix different signature types", async () => {

_53

const validator = await ethers.getContractAt(

_53

"ERC1271FallbackHandler",

_53

safe.target

_53

);

_53

_53

const validatorAddress = await validator.getAddress();

_53

const dataHash = ethers.keccak256("0xbaddad");

_53

const typedDataSig = {

_53

signer: await alice.getAddress(),

_53

data: await alice.signTypedData(

_53

{

_53

verifyingContract: validatorAddress,

_53

chainId: (await ethers.provider.getNetwork()).chainId,

_53

},

_53

EIP712_SAFE_MESSAGE_TYPE,

_53

{ message: dataHash }

_53

),

_53

};

_53

_53

expect(

_53

await validator.isValidSignature.staticCall(dataHash, typedDataSig.data)

_53

).to.be.eq("0x1626ba7e");

_53

});`

- The test cases above cover the following scenarios:
  - Reverting if the Fallback Handler is called directly.
  - Reverting if the message was not signed.
  - Reverting if the signature is not valid.
  - Returning the magic value if enough owners signed and allowing a mix of different signature types.
- This is a basic set of tests to ensure the Fallback Handler is working as expected. More tests can be added to cover additional scenarios with different signing methods.

### Final test code

`_126

import { ethers } from "hardhat";

_126

import { expect } from "chai";

_126

import { Signer, ZeroAddress } from "ethers";

_126

import { Safe, Safe__factory, SafeProxyFactory } from "../typechain-types";

_126

import { ERC1271FallbackHandler } from "../typechain-types/contracts/ERC1271FallbackHandler";

_126

_126

describe("ERC1271FallbackHandler.test", async function () {

_126

let deployer: Signer;

_126

let alice: Signer;

_126

let masterCopy: Safe;

_126

let proxyFactory: SafeProxyFactory;

_126

let safeFactory: Safe__factory;

_126

let safe: Safe;

_126

let exampleFallbackHandler: ERC1271FallbackHandler;

_126

const threshold = 1;

_126

_126

const EIP712_SAFE_MESSAGE_TYPE = {

_126

// "SafeMessage(bytes message)"

_126

SafeMessage: [{ type: "bytes", name: "message" }],

_126

};

_126

_126

// Setup signers and deploy contracts before running tests

_126

beforeEach(async () => {

_126

[deployer, alice] = await ethers.getSigners();

_126

_126

safeFactory = await ethers.getContractFactory("Safe", deployer);

_126

_126

// Deploy the ERC1271FallbackHandler contract

_126

exampleFallbackHandler = await (

_126

await ethers.getContractFactory("ERC1271FallbackHandler", deployer)

_126

).deploy();

_126

_126

masterCopy = await safeFactory.deploy();

_126

_126

proxyFactory = await (

_126

await ethers.getContractFactory("SafeProxyFactory", deployer)

_126

).deploy();

_126

_126

const ownerAddresses = [await alice.getAddress()];

_126

_126

const safeData = masterCopy.interface.encodeFunctionData("setup", [

_126

ownerAddresses,

_126

threshold,

_126

ZeroAddress,

_126

"0x",

_126

exampleFallbackHandler.target,

_126

ZeroAddress,

_126

0,

_126

ZeroAddress,

_126

]);

_126

_126

// Read the safe address by executing the static call to createProxyWithNonce function

_126

const safeAddress = await proxyFactory.createProxyWithNonce.staticCall(

_126

await masterCopy.getAddress(),

_126

safeData,

_126

0n

_126

);

_126

_126

// Create the proxy with nonce

_126

await proxyFactory.createProxyWithNonce(

_126

await masterCopy.getAddress(),

_126

safeData,

_126

0n

_126

);

_126

_126

if (safeAddress === ZeroAddress) {

_126

throw new Error("Safe address not found");

_126

}

_126

_126

safe = await ethers.getContractAt("Safe", safeAddress);

_126

});

_126

_126

it("should revert if called directly", async () => {

_126

const dataHash = ethers.keccak256("0xbaddad");

_126

await expect(

_126

exampleFallbackHandler.isValidSignature.staticCall(dataHash, "0x")

_126

).to.be.reverted;

_126

});

_126

_126

it("should revert if message was not signed", async () => {

_126

const validator = await ethers.getContractAt(

_126

"ERC1271FallbackHandler",

_126

safe.target

_126

);

_126

const dataHash = ethers.keccak256("0xbaddad");

_126

await expect(

_126

validator.isValidSignature.staticCall(dataHash, "0x")

_126

).to.be.revertedWith("Hash not approved");

_126

});

_126

_126

it("should revert if signature is not valid", async () => {

_126

const validator = await ethers.getContractAt(

_126

"ERC1271FallbackHandler",

_126

safe.target

_126

);

_126

const dataHash = ethers.keccak256("0xbaddad");

_126

await expect(

_126

validator.isValidSignature.staticCall(dataHash, "0xdeaddeaddeaddead")

_126

).to.be.reverted;

_126

});

_126

_126

it("should return magic value if enough owners signed and allow a mix different signature types", async () => {

_126

const validator = await ethers.getContractAt(

_126

"ERC1271FallbackHandler",

_126

safe.target

_126

);

_126

_126

const validatorAddress = await validator.getAddress();

_126

const dataHash = ethers.keccak256("0xbaddad");

_126

const typedDataSig = {

_126

signer: await alice.getAddress(),

_126

data: await alice.signTypedData(

_126

{

_126

verifyingContract: validatorAddress,

_126

chainId: (await ethers.provider.getNetwork()).chainId,

_126

},

_126

EIP712_SAFE_MESSAGE_TYPE,

_126

{ message: dataHash }

_126

),

_126

};

_126

_126

expect(

_126

await validator.isValidSignature.staticCall(dataHash, typedDataSig.data)

_126

).to.be.eq("0x1626ba7e");

_126

});

_126

});`

## Run the tests

`_10

npx hardhat test`

Congratulations! You have successfully created, enabled and tested a Fallback Handler for Safe Smart Account.

## Do more with Safe and Fallback Handlers

Did you encounter any difficulties? Let us know by opening [an issue (opens in a new tab)](https://github.com/5afe/safe-guard-tutorial/issues/new) or asking a question on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the `safe-core` tag.

[Safe Fallback Handler](/advanced/smart-account-fallback-handler "Safe Fallback Handler")[Migration](/advanced/smart-account-migration "Migration")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Building a Fallback Handler for Safe Smart Account
  - Prerequisites
  - Project Setup
    - Initialize Project
    - Configure Dependencies
    - Initialize hardhat project
  - Create a new Solidity contract
    - Step 1. Create MyCustomFallbackHandler contract
    - Step 2: Define constants
    - Step 3: Create a function to encode message data
    - Step 4: Implement theisValidSignaturefunction
    - Final contract code
  - Testing the contract
    - Step 1: Create test/utils/utils.ts file
    - Step 2: Start with a boilerplate test file
    - Step 3: Setup contracts and variables in before hook
    - Step 4: Add test cases
    - Final test code
  - Run the tests
  - Do more with Safe and Fallback Handlers

---

## Related Links

### Internal Links

- [Safe Fallback Handler](https://docs.safe.global/advanced/smart-account-fallback-handler)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)

### External Links

- [ERC-1271 standard(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-1271)
- [Solidity(opens in a new tab)](https://docs.soliditylang.org/en/latest)
- [Hardhat(opens in a new tab)](https://hardhat.org)
- [Node.js(opens in a new tab)](https://nodejs.org/en/download/package-manager)
- [npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [an issue(opens in a new tab)](https://github.com/5afe/safe-guard-tutorial/issues/new)
- [Stack Exchange(opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

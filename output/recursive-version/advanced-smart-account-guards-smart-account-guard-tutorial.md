---
title: Building a Guard for Safe Smart Account – Safe Docs
url: https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Building a Guard for Safe Smart Account – Safe Docs

Advanced

[Safe Guards](/advanced/smart-account-guards)

Smart Account Guard Tutorial

# Building a Guard for Safe Smart Account

This tutorial demonstrates how to build a custom Guard contract that adds security restrictions to a Safe Smart Account. You'll learn how to:

- Create a Safe Guard that prevents delegate calls
- Enable the Guard on a Safe Smart Account
- Write comprehensive tests for the Guard

You'll build a `NoDelegatecallGuard` that blocks `delegatecall` operations through the Safe account. While this is a simple example, the same principles can be used to build more complex Guards for your specific security needs.

A Safe account supports two types of transactions:

- **Safe Transaction**: Executed through the Safe owners with required signatures
- **Module Transaction**: Executed through an enabled Safe Module

This tutorial focuses on Safe Transactions, as Guards only apply to those.

## Understanding Safe Guards

Before we dive into the code, let's understand what Guards do:

- Guards are contracts that can inspect and validate transactions before and after they are executed by a Safe
- They implement a standard interface with two key functions:
  - `checkTransaction`: Called before execution to validate the transaction
  - `checkAfterExecution`: Called after execution for post-transaction checks
- Guards can block transactions by reverting if validation fails

⚠️

Important Notice: The smart contract code provided in this tutorial is intended solely for educational purposes and serves only as an illustrative example. This example code has not undergone any security audits or formal verification processes. Safe does not guarantee the reliability, security, or correctness of this example code. Before deploying any smart contract code in a production environment, developers must conduct a thorough security audit and ensure rigorous testing procedures have been performed.

⚠️

Only enable Guards from trusted and audited code. A malicious Guard could block all transactions and make your Safe unusable.

## Prerequisites

Before starting this tutorial, make sure you have:

- Experience with [Solidity (opens in a new tab)](https://docs.soliditylang.org/en/latest/) and [Hardhat (opens in a new tab)](https://hardhat.org)
- [Node.js (opens in a new tab)](https://nodejs.org/en/download/package-manager) and [npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed
- Basic understanding of Smart Account concepts

## Project Setup

### Initialize Project

Create a new project directory and initialize npm:

`_10

mkdir safe-guard-tutorial && cd safe-guard-tutorial

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

### Step 1. Create NoDelegatecallGuard contract

`_10

// SPDX-License-Identifier: LGPL-3.0

_10

pragma solidity ^0.8.0;

_10

import { BaseGuard } from "@safe-global/safe-contracts/contracts/base/GuardManager.sol";

_10

import { Enum } from "@safe-global/safe-contracts/contracts/common/Enum.sol";

_10

_10

contract NoDelegatecallGuard is BaseGuard {

_10

error DelegatecallNotAllowed();

_10

_10

// Functions will be added here

_10

}`

Explanation:

- **`BaseGuard.sol`**: BaseGuard is an abstract contract that implements ERC-165 and inherits the Guard interface with two functions:
  - `checkTransaction`: This function is called before Safe transaction is executed.
  - `checkAfterExecution`: This function is called after Safe transaction is executed.
- **`Enum.sol`**: Provides Enum `Operation` which can have values like `Call` or `DelegateCall`.
- `DelegatecallNotAllowed` is a custom error type that will be used to revert the transaction if `delegatecall` is detected.

### Step 2: Implement `checkTransaction` function

`_17

function checkTransaction(

_17

address /*to*/,

_17

uint256 /*value*/,

_17

bytes memory /*data*/,

_17

Enum.Operation operation,

_17

uint256 /*safeTxGas*/,

_17

uint256 /*baseGas*/,

_17

uint256 /*gasPrice*/,

_17

address /*gasToken*/,

_17

address payable /*refundReceiver*/,

_17

bytes memory /*signatures*/,

_17

address /*msgSender*/

_17

) external {

_17

if(operation == Enum.Operation.DelegateCall) {

_17

revert DelegatecallNotAllowed();

_17

}

_17

}`

Explanation:

- The `checkTransaction` function checks if the operation type is `DelegateCall`. If it is, the function reverts with a custom error `DelegatecallNotAllowed`.

### Step 3: Implement `checkAfterExecution` function

`_10

function checkAfterExecution(bytes32 txHash, bool success) external {

_10

}`

Explanation:

- The `checkAfterExecution` function is empty as we do not need to perform any action after the transaction is executed.

### Final contract code

`_32

// SPDX-License-Identifier: UNLICENSED

_32

pragma solidity ^0.8.28;

_32

_32

import { BaseGuard } from "@safe-global/safe-contracts/contracts/base/GuardManager.sol";

_32

import { Enum } from "@safe-global/safe-contracts/contracts/common/Enum.sol";

_32

_32

contract NoDelegatecallGuard is BaseGuard {

_32

_32

error DelegatecallNotAllowed();

_32

_32

function checkTransaction(

_32

address /*to*/,

_32

uint256 /*value*/,

_32

bytes memory /*data*/,

_32

Enum.Operation operation,

_32

uint256 /*safeTxGas*/,

_32

uint256 /*baseGas*/,

_32

uint256 /*gasPrice*/,

_32

address /*gasToken*/,

_32

address payable /*refundReceiver*/,

_32

bytes memory /*signatures*/,

_32

address /*msgSender*/

_32

) external {

_32

if(operation == Enum.Operation.DelegateCall) {

_32

revert DelegatecallNotAllowed();

_32

}

_32

}

_32

_32

function checkAfterExecution(bytes32 txHash, bool success) external {

_32

_32

}

_32

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

Explanation:

- This file contains utility function to execute transaction through the Safe account.

### Step 2: Start with a boilerplate test file

Create a new file named `NoDelegatecallGuard.test.ts` and include the following basic structure that will be filled in later steps (ignore the warnings about unused imports):

`_26

import { ethers } from "hardhat";

_26

import { expect } from "chai";

_26

import { Signer, ZeroAddress } from "ethers";

_26

import { Safe, Safe__factory, SafeProxyFactory } from "../typechain-types";

_26

import { execTransaction } from "./utils/utils";

_26

import { NoDelegatecallGuard } from "../typechain-types/contracts/NoDelegatecallGuard";

_26

_26

describe("NoDelegatecallGuard", async function () {

_26

let deployer: Signer;

_26

let alice: Signer;

_26

let masterCopy: Safe;

_26

let proxyFactory: SafeProxyFactory;

_26

let safeFactory: Safe__factory;

_26

let safe: Safe;

_26

let exampleGuard: NoDelegatecallGuard;

_26

const threshold = 1;

_26

_26

beforeEach(async () => {});

_26

_26

// Add your test cases here

_26

it("Should not allow delegatecall", async function () {});

_26

_26

it("Should allow call", async function () {});

_26

_26

it("Should allow to replace the guard", async function () {});

_26

});`

### Step 3: Setup contracts and variables in before hook

`_58

// Setup signers and deploy contracts before running tests

_58

beforeEach(async () => {

_58

[deployer, alice] = await ethers.getSigners();

_58

_58

safeFactory = await ethers.getContractFactory("Safe", deployer);

_58

masterCopy = await safeFactory.deploy();

_58

_58

proxyFactory = await (

_58

await ethers.getContractFactory("SafeProxyFactory", deployer)

_58

).deploy();

_58

_58

const ownerAddresses = [await alice.getAddress()];

_58

_58

const safeData = masterCopy.interface.encodeFunctionData("setup", [

_58

ownerAddresses,

_58

threshold,

_58

ZeroAddress,

_58

"0x",

_58

ZeroAddress,

_58

ZeroAddress,

_58

0,

_58

ZeroAddress,

_58

]);

_58

_58

// Read the safe address by executing the static call to createProxyWithNonce function

_58

const safeAddress = await proxyFactory.createProxyWithNonce.staticCall(

_58

await masterCopy.getAddress(),

_58

safeData,

_58

0n

_58

);

_58

_58

// Create the proxy with nonce

_58

await proxyFactory.createProxyWithNonce(

_58

await masterCopy.getAddress(),

_58

safeData,

_58

0n

_58

);

_58

_58

if (safeAddress === ZeroAddress) {

_58

throw new Error("Safe address not found");

_58

}

_58

_58

// Deploy the NoDelegatecallGuard contract

_58

exampleGuard = await (

_58

await ethers.getContractFactory("NoDelegatecallGuard", deployer)

_58

).deploy();

_58

_58

safe = await ethers.getContractAt("Safe", safeAddress);

_58

_58

// Set the guard in the safe

_58

const setGuardData = masterCopy.interface.encodeFunctionData(

_58

"setGuard",

_58

[exampleGuard.target]

_58

);

_58

_58

// Execute the transaction to set the Guard

_58

await execTransaction([alice], safe, safe.target, 0, setGuardData, 0);

_58

});`

This step sets up the test environment by deploying and configuring the necessary contracts. Please note that:

- Alice is the only owner of the Safe and a threshold of 1 is set. Thus, only Alice's signature is required to execute transactions.
- Alice as the owner of the Safe is required to set the guard.
- The guard is enabled by calling the `setGuard` function on the Safe contract.
- ⚠️ Security Note: Only trusted and audited code should be enabled as a guard, since guard can block transactions. A malicious guard make Safe unusable by blocking all transactions.

### Step 4: Add test cases

`_31

it("Should not allow delegatecall", async function () {

_31

const wallets = [alice];

_31

_31

await expect(

_31

execTransaction(wallets, safe, ZeroAddress, 0, "0x", 1)

_31

).to.be.revertedWithCustomError(exampleGuard, "DelegatecallNotAllowed");

_31

});

_31

_31

it("Should allow call", async function () {

_31

const wallets = [alice];

_31

_31

expect(await execTransaction(wallets, safe, ZeroAddress, 0, "0x", 0));

_31

});

_31

_31

it("Should allow to replace the guard", async function () {

_31

const wallets = [alice];

_31

_31

const setGuardData = masterCopy.interface.encodeFunctionData("setGuard", [

_31

ZeroAddress,

_31

]);

_31

expect(

_31

await execTransaction(

_31

wallets,

_31

safe,

_31

await safe.getAddress(),

_31

0,

_31

setGuardData,

_31

0

_31

)

_31

);

_31

});`

### Final test code

`_107

import { ethers } from "hardhat";

_107

import { expect } from "chai";

_107

import { Signer, ZeroAddress } from "ethers";

_107

import { Safe, Safe__factory, SafeProxyFactory } from "../typechain-types";

_107

import { execTransaction } from "./utils/utils";

_107

import { NoDelegatecallGuard } from "../typechain-types/contracts/NoDelegatecallGuard";

_107

_107

describe("NoDelegatecallGuard", async function () {

_107

let deployer: Signer;

_107

let alice: Signer;

_107

let masterCopy: Safe;

_107

let proxyFactory: SafeProxyFactory;

_107

let safeFactory: Safe__factory;

_107

let safe: Safe;

_107

let exampleGuard: NoDelegatecallGuard;

_107

const threshold = 1;

_107

_107

// Setup signers and deploy contracts before running tests

_107

beforeEach(async () => {

_107

[deployer, alice] = await ethers.getSigners();

_107

_107

safeFactory = await ethers.getContractFactory("Safe", deployer);

_107

masterCopy = await safeFactory.deploy();

_107

_107

proxyFactory = await (

_107

await ethers.getContractFactory("SafeProxyFactory", deployer)

_107

).deploy();

_107

_107

const ownerAddresses = [await alice.getAddress()];

_107

_107

const safeData = masterCopy.interface.encodeFunctionData("setup", [

_107

ownerAddresses,

_107

threshold,

_107

ZeroAddress,

_107

"0x",

_107

ZeroAddress,

_107

ZeroAddress,

_107

0,

_107

ZeroAddress,

_107

]);

_107

_107

// Read the safe address by executing the static call to createProxyWithNonce function

_107

const safeAddress = await proxyFactory.createProxyWithNonce.staticCall(

_107

await masterCopy.getAddress(),

_107

safeData,

_107

0n

_107

);

_107

_107

// Create the proxy with nonce

_107

await proxyFactory.createProxyWithNonce(

_107

await masterCopy.getAddress(),

_107

safeData,

_107

0n

_107

);

_107

_107

if (safeAddress === ZeroAddress) {

_107

throw new Error("Safe address not found");

_107

}

_107

_107

// Deploy the NoDelegatecallGuard contract

_107

exampleGuard = await (

_107

await ethers.getContractFactory("NoDelegatecallGuard", deployer)

_107

).deploy();

_107

_107

safe = await ethers.getContractAt("Safe", safeAddress);

_107

_107

// Set the guard in the safe

_107

const setGuardData = masterCopy.interface.encodeFunctionData("setGuard", [

_107

exampleGuard.target,

_107

]);

_107

_107

// Execute the transaction to set the Guard

_107

await execTransaction([alice], safe, safe.target, 0, setGuardData, 0);

_107

});

_107

_107

it("Should not allow delegatecall", async function () {

_107

const wallets = [alice];

_107

_107

await expect(

_107

execTransaction(wallets, safe, ZeroAddress, 0, "0x", 1)

_107

).to.be.revertedWithCustomError(exampleGuard, "DelegatecallNotAllowed");

_107

});

_107

_107

it("Should allow call", async function () {

_107

const wallets = [alice];

_107

_107

expect(await execTransaction(wallets, safe, ZeroAddress, 0, "0x", 0));

_107

});

_107

_107

it("Should allow to replace the guard", async function () {

_107

const wallets = [alice];

_107

_107

const setGuardData = masterCopy.interface.encodeFunctionData("setGuard", [

_107

ZeroAddress,

_107

]);

_107

expect(

_107

await execTransaction(

_107

wallets,

_107

safe,

_107

await safe.getAddress(),

_107

0,

_107

setGuardData,

_107

0

_107

)

_107

);

_107

});

_107

});`

## Run the tests

`_10

npx hardhat test`

Congratulations! You have successfully created, enabled and tested a Safe Guard.

## Do more with Safe and Guard

Did you encounter any difficulties? Let us know by opening [an issue (opens in a new tab)](https://github.com/5afe/safe-guard-tutorial/issues/new) or asking a question on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the `safe-core` tag.

[Safe Guards](/advanced/smart-account-guards "Safe Guards")[Safe Fallback Handler](/advanced/smart-account-fallback-handler "Safe Fallback Handler")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Building a Guard for Safe Smart Account
  - Understanding Safe Guards
  - Prerequisites
  - Project Setup
    - Initialize Project
    - Configure Dependencies
    - Initialize hardhat project
  - Create a new Solidity contract
    - Step 1. Create NoDelegatecallGuard contract
    - Step 2: ImplementcheckTransactionfunction
    - Step 3: ImplementcheckAfterExecutionfunction
    - Final contract code
  - Testing the contract
    - Step 1: Create test/utils/utils.ts file
    - Step 2: Start with a boilerplate test file
    - Step 3: Setup contracts and variables in before hook
    - Step 4: Add test cases
    - Final test code
  - Run the tests
  - Do more with Safe and Guard

---

## Related Links

### Internal Links

- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)
- [https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial](https://docs.safe.global/advanced/smart-account-guards/smart-account-guard-tutorial)

### External Links

- [Solidity(opens in a new tab)](https://docs.soliditylang.org/en/latest)
- [Hardhat(opens in a new tab)](https://hardhat.org)
- [Node.js(opens in a new tab)](https://nodejs.org/en/download/package-manager)
- [npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [an issue(opens in a new tab)](https://github.com/5afe/safe-guard-tutorial/issues/new)
- [Stack Exchange(opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

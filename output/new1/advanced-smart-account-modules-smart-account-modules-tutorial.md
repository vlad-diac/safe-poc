---
title: Building Applications with Safe Modules – Safe Docs
url: https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Building Applications with Safe Modules – Safe Docs

Advanced

[Safe Modules](/advanced/smart-account-modules)

Smart Account Modules Tutorial

# Building Applications with Safe Modules

This tutorial demonstrates how to:

- Create a Safe Module
- Enable a module on a Safe account
- Execute transactions through the module

You will build a `TokenWithdrawModule` that enables beneficiaries to withdraw ERC20 tokens from a Safe account using off-chain signatures from Safe owners.

## Prerequisites

- Experience with [Solidity (opens in a new tab)](https://docs.soliditylang.org/en/latest/) and [Hardhat (opens in a new tab)](https://hardhat.org)
- [Node.js (opens in a new tab)](https://nodejs.org/en/download/package-manager) and [npm (opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed

### Implementation Details

The module gives a third party an allowance via a signature for the token that can freely be used by that third party. In the module this third party is represented as the "beneficiary" in the EIP-712 struct (mentioned in the PERMIT\_TYPEHASH). To use this allowance the third party / "beneficiary" calls the `tokenTransfer` method and specifies which token to use and who should receive it.
The Safe owners grant the permission for token transfer to the third party by signing the EIP-712 struct without requiring Safe owners to execute any on-chain transaction.

### Limitations

- Each beneficiary has a sequential nonce, requiring withdrawals to be processed in order
- The module is bound to a specific token and Safe address at deployment

⚠️

Important Notice: The smart contract code provided in this tutorial is intended solely for educational purposes and serves only as an illustrative example. This example code has not undergone any security audits or formal verification processes. Safe does not guarantee the reliability, security, or correctness of this example code. Before deploying any smart contract code in a production environment, developers must conduct a thorough security audit and ensure rigorous testing procedures have been performed.

## Project Setup

Create a new project directory and initialize npm:

`_10

mkdir safe-module-tutorial && cd safe-module-tutorial

_10

npm init -y`

You can choose all default values.

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

npm add -D hardhat @safe-global/safe-contracts @openzeppelin/contracts hardhat-dependency-compiler`

### Initialize hardhat project

`_10

npx hardhat init`

Select `Create a TypeScript project` and leave the default values for the rest of the prompts.

Now, try compiling the contracts to ensure everything is set up correctly.

`_10

npx hardhat compile`

### Update hardhat.config.ts

When compiling Safe contracts with solidity 0.8.x the bytecode size exceeds the limit of 24KB. To overcome this, set `allowUnlimitedContractSize` to `true` in the hardhat config.
In practise with production networks, use the officially deployed Safe contracts.
Also, add `dependencyCompiler` to import `SafeProxyFactory` contract.

`_19

import { HardhatUserConfig } from "hardhat/config";

_19

import "@nomicfoundation/hardhat-toolbox";

_19

import "hardhat-dependency-compiler";

_19

_19

const config: HardhatUserConfig = {

_19

solidity: "0.8.28",

_19

networks: {

_19

hardhat: {

_19

allowUnlimitedContractSize: true, // Required for Safe contracts

_19

},

_19

},

_19

dependencyCompiler: {

_19

paths: [

_19

"@safe-global/safe-contracts/contracts/proxies/SafeProxyFactory.sol",

_19

],

_19

},

_19

};

_19

_19

export default config;`

## Create a new Solidity contract

Delete the default `contracts/Lock.sol` and test file `test/Lock.ts` and create a new Solidity contract `TokenWithdrawModule.sol` in the `contracts` directory.

### Step 1. Create empty contract

`_11

// SPDX-License-Identifier: LGPL-3.0

_11

pragma solidity ^0.8.0;

_11

// Imports will be added here

_11

_11

contract TokenWithdrawModule {

_11

// State variables will be added here

_11

_11

// Constructor will be added here

_11

_11

// Functions will be added here

_11

}`

Explanation:

- **SPDX License Identifier**: Specifies the license type.
- **`pragma solidity ^0.8.0`**: Defines the Solidity compiler version.
- **`contract TokenWithdrawModule`**: Declares the contract name.

### Step 2: Import required dependencies

`_10

import "@safe-global/safe-contracts/contracts/common/Enum.sol";

_10

import "@safe-global/safe-contracts/contracts/Safe.sol";`

Explanation:

- **`Enum.sol`**: Provides Enum `Operation` which can have values like `Call` or `DelegateCall`. This will be used further in the contract when a module calls a Safe account where the module specifies the operation type.
- **`Safe.sol`**: Includes the Safe contract interface to interact with Safe accounts.

### Step 3: Define state variables

Declare the necessary state variables for the contract.

`_10

bytes32 public immutable PERMIT_TYPEHASH =

_10

keccak256(

_10

"TokenWithdrawModule(uint256 amount,address beneficiary,uint256 nonce,uint256 deadline)"

_10

);

_10

address public immutable safeAddress;

_10

address public immutable tokenAddress;

_10

mapping(address => uint256) public nonces;`

Explanation:

- **`PERMIT_TYPEHASH`**: Used to construct the signature hash for the token transfer.
- **`safeAddress`**: Stores the Safe contract address.
- **`tokenAddress`**: Stores the ERC20 token contract address.
- **`nonces`**: Tracks unique nonce to prevent replay attacks.

### Step 4: Create the Constructor

Define a constructor to initialize the Safe and token contract addresses.

`_10

constructor(address _tokenAddress, address _safeAddress) {

_10

tokenAddress = _tokenAddress;

_10

safeAddress = _safeAddress;

_10

}`

- Initializes `tokenAddress` and `safeAddress` with provided values during deployment. Thus, in this module the token and Safe addresses are fixed.

### Step 5: Implement the `getDomainSeparator` function

Add a helper function to compute the EIP-712 domain separator.

`_13

function getDomainSeparator() private view returns (bytes32) {

_13

return keccak256(

_13

abi.encode(

_13

keccak256(

_13

"EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"

_13

),

_13

keccak256(bytes("TokenWithdrawModule")),

_13

keccak256(bytes("1")),

_13

block.chainid,

_13

address(this)

_13

)

_13

);

_13

}`

Explanation:

- Computes the `EIP712Domain` separator for the current chain and contract.
- Ensures compatibility with the EIP-712 standard for off-chain signing.
- Using a Domain separator ensures that the signature is valid for specific contracts in context and the chain. Thus, preventing replay attacks.

### Step 6: Implement the `tokenTransfer` function

Add a function to handle token transfers from the Safe.

`` _45

function tokenTransfer(

_45

uint amount,

_45

address receiver,

_45

uint256 deadline,

_45

bytes memory signatures

_45

) public {

_45

require(deadline >= block.timestamp, "expired deadline");

_45

_45

bytes32 signatureData = keccak256(

_45

abi.encode(

_45

PERMIT_TYPEHASH,

_45

amount,

_45

msg.sender,

_45

nonces[msg.sender]++,

_45

deadline

_45

)

_45

);

_45

_45

bytes32 hash = keccak256(

_45

abi.encodePacked("\x19\x01", getDomainSeparator(), signatureData)

_45

);

_45

_45

Safe(payable(safeAddress)).checkSignatures(

_45

hash,

_45

abi.encodePacked(signatureData),

_45

signatures

_45

);

_45

_45

bytes memory data = abi.encodeWithSignature(

_45

"transfer(address,uint256)",

_45

receiver,

_45

amount

_45

);

_45

_45

// Calling `execTransactionFromModule` with the transaction data to execute the token transfer through the Safe account.

_45

require(

_45

Safe(payable(safeAddress)).execTransactionFromModule(

_45

tokenAddress,

_45

0,

_45

data,

_45

Enum.Operation.Call

_45

),

_45

"Could not execute token transfer"

_45

);

_45

} ``

Explanation:

1. **Parameter Validation**:
   - Ensure the `deadline` is valid.
   - Construct `signatureData` with the provided details and `PERMIT_TYPEHASH`.
2. **Hash Calculation**:
   - Compute the hash using the `EIP712` format to ensure signature consistency.
3. **Signature Verification**:
   - Call `checkSignatures` on the Safe to verify the signatures provided match the owners of the Safe.
4. **Transaction Execution**:
   - A module can use `execTransactionFromModule` or `execTransactionFromModuleReturnData` function to execute transactions through a Safe account on which the module is enabled.
   - Encode the transfer call using `abi.encodeWithSignature`.
   - Use `execTransactionFromModule` to execute the token transfer via the Safe.
   - Ensure execution succeeds, otherwise revert.

### Final contract code

Here is the complete code for reference with comments:

`` _104

// SPDX-License-Identifier: LGPL-3.0

_104

pragma solidity ^0.8.0;

_104

import "@safe-global/safe-contracts/contracts/common/Enum.sol";

_104

import "@safe-global/safe-contracts/contracts/Safe.sol";

_104

_104

/**

_104

* @title TokenWithdrawModule

_104

* @dev This contract implements a Safe module that enables a user with a valid signature to

_104

* transfer ERC20 tokens from a Safe contract to a specified receiver.

_104

*/

_104

contract TokenWithdrawModule {

_104

bytes32 public immutable PERMIT_TYPEHASH =

_104

keccak256(

_104

"TokenWithdrawModule(uint256 amount,address beneficiary,uint256 nonce,uint256 deadline)"

_104

);

_104

address public immutable safeAddress;

_104

address public immutable tokenAddress;

_104

mapping(address => uint256) public nonces;

_104

_104

/**

_104

* @dev Constructor function for the contract

_104

* @param _tokenAddress address of the ERC20 token contract

_104

* @param _safeAddress address of the Safe contract

_104

*/

_104

constructor(address _tokenAddress, address _safeAddress) {

_104

tokenAddress = _tokenAddress;

_104

safeAddress = _safeAddress;

_104

}

_104

_104

/**

_104

* @dev Generates the EIP-712 domain separator for the contract.

_104

*

_104

* @return The EIP-712 domain separator.

_104

*/

_104

function getDomainSeparator() private view returns (bytes32) {

_104

return

_104

keccak256(

_104

abi.encode(

_104

keccak256(

_104

"EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"

_104

),

_104

keccak256(bytes("TokenWithdrawModule")),

_104

keccak256(bytes("1")),

_104

block.chainid,

_104

address(this)

_104

)

_104

);

_104

}

_104

_104

/**

_104

* @dev Transfers the specified amount of tokens to a receiver address. The msg.sender must hold a valid signature.

_104

* The msg.sender address must be used as the `beneficiary` parameter in the EIP-712 structured data for

_104

* signature generation. However, msg.sender can specify a different `receiver` address to receive the tokens

_104

* when withdrawing the tokens.

_104

* @param amount amount of tokens to be transferred

_104

* @param receiver address to which the tokens will be transferred

_104

* @param deadline deadline for the validity of the signature

_104

* @param signatures signatures of the Safe owner(s)

_104

*/

_104

function tokenTransfer(

_104

uint amount,

_104

address receiver,

_104

uint256 deadline,

_104

bytes memory signatures

_104

) public {

_104

require(deadline >= block.timestamp, "expired deadline");

_104

_104

bytes32 signatureData = keccak256(

_104

abi.encode(

_104

PERMIT_TYPEHASH,

_104

amount,

_104

msg.sender,

_104

nonces[msg.sender]++,

_104

deadline

_104

)

_104

);

_104

_104

bytes32 hash = keccak256(

_104

abi.encodePacked("\x19\x01", getDomainSeparator(), signatureData)

_104

);

_104

_104

Safe(payable(safeAddress)).checkSignatures(

_104

hash,

_104

abi.encodePacked(signatureData),

_104

signatures

_104

);

_104

_104

bytes memory data = abi.encodeWithSignature(

_104

"transfer(address,uint256)",

_104

receiver,

_104

amount

_104

);

_104

_104

require(

_104

Safe(payable(safeAddress)).execTransactionFromModule(

_104

tokenAddress,

_104

0,

_104

data,

_104

Enum.Operation.Call

_104

),

_104

"Could not execute token transfer"

_104

);

_104

}

_104

} ``

### Create TestToken.sol contract

Create a new file in the `contracts` directory named `TestToken.sol` and add the following code:

`_16

// SPDX-License-Identifier: LGPL-3.0

_16

pragma solidity ^0.8.0;

_16

_16

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

_16

import "@openzeppelin/contracts/access/Ownable.sol";

_16

_16

contract TestToken is ERC20, Ownable {

_16

constructor(

_16

string memory _name,

_16

string memory _symbol

_16

) ERC20(_name, _symbol) Ownable(msg.sender){}

_16

_16

function mint(address to, uint256 amount) public onlyOwner {

_16

_mint(to, amount);

_16

}

_16

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

Create a new file named `TokenWithdrawModule.test.ts` and include the following basic structure that will be filled in later steps (ignore the warnings about unused imports):

`_30

import { ethers } from "hardhat";

_30

import { expect } from "chai";

_30

import { Signer, TypedDataDomain, ZeroAddress } from "ethers";

_30

import { Safe, TestToken, TokenWithdrawModule } from "../typechain-types";

_30

import { execTransaction } from "./utils/utils";

_30

_30

describe("TokenWithdrawModule Tests", function () {

_30

// Define variables

_30

let deployer: Signer;

_30

let alice: Signer;

_30

let bob: Signer;

_30

let charlie: Signer;

_30

let masterCopy: any;

_30

let token: TestToken;

_30

let safe: Safe;

_30

let safeAddress: string;

_30

let chainId: bigint;

_30

_30

// Before hook to setup the contracts

_30

before(async () => {

_30

});

_30

_30

// Enable the module in the Safe

_30

const enableModule = async () => {

_30

}

_30

_30

// Add your test cases here

_30

it("Should successfully transfer tokens to bob", async function () {

_30

});

_30

});`

### Step 3: Setup contracts and variables in before hook

`_55

// Setup signers and deploy contracts before running tests

_55

before(async () => {

_55

[deployer, alice, bob, charlie] = await ethers.getSigners();

_55

_55

chainId = (await ethers.provider.getNetwork()).chainId;

_55

const safeFactory = await ethers.getContractFactory("Safe", deployer);

_55

masterCopy = await safeFactory.deploy();

_55

_55

// Deploy a new token contract

_55

token = await (

_55

await ethers.getContractFactory("TestToken", deployer)

_55

).deploy("test", "T");

_55

_55

// Deploy a new SafeProxyFactory contract

_55

const proxyFactory = await (

_55

await ethers.getContractFactory("SafeProxyFactory", deployer)

_55

).deploy();

_55

_55

// Setup the Safe, Step 1, generate transaction data

_55

const safeData = masterCopy.interface.encodeFunctionData("setup", [

_55

[await alice.getAddress()],

_55

1,

_55

ZeroAddress,

_55

"0x",

_55

ZeroAddress,

_55

ZeroAddress,

_55

0,

_55

ZeroAddress,

_55

]);

_55

_55

// Read the safe address by executing the static call to createProxyWithNonce function

_55

safeAddress = await proxyFactory.createProxyWithNonce.staticCall(

_55

await masterCopy.getAddress(),

_55

safeData,

_55

0n

_55

);

_55

_55

if (safeAddress === ZeroAddress) {

_55

throw new Error("Safe address not found");

_55

}

_55

_55

// Setup the Safe, Step 2, execute the transaction

_55

await proxyFactory.createProxyWithNonce(

_55

await masterCopy.getAddress(),

_55

safeData,

_55

0n

_55

);

_55

_55

safe = await ethers.getContractAt("Safe", safeAddress);

_55

_55

// Mint tokens to the safe address

_55

await token

_55

.connect(deployer)

_55

.mint(safeAddress, BigInt(10) ** BigInt(18) * BigInt(100000));

_55

});`

This step sets up the test environment by deploying and configuring the necessary contracts. Please note that:

- Alice is the only owner of the Safe and a threshold of 1 is set. Thus, only Alice's signature is required to execute transactions.
- We can receive the Safe address before deploying the Safe.

### Step 4: Deploy and enable module in `enableModule` function

`_25

// A Safe Module is a smart contract that is allowed to execute transactions on behalf of a Safe Smart Account.

_25

// This function deploys the TokenWithdrawModule contract and enables it in the Safe.

_25

const enableModule = async (): Promise<{

_25

tokenWithdrawModule: TokenWithdrawModule;

_25

}> => {

_25

// Deploy the TokenWithdrawModule contract and pass the token and safe address as arguments

_25

const tokenWithdrawModule = await (

_25

await ethers.getContractFactory("TokenWithdrawModule", deployer)

_25

).deploy(token.target, safeAddress);

_25

_25

// Enable the module in the safe, Step 1, generate transaction data

_25

const enableModuleData = masterCopy.interface.encodeFunctionData(

_25

"enableModule",

_25

[tokenWithdrawModule.target]

_25

);

_25

_25

// Enable the module in the safe, Step 2, execute the transaction

_25

await execTransaction([alice], safe, safe.target, 0, enableModuleData, 0);

_25

_25

// Verify that the module is enabled

_25

expect(await safe.isModuleEnabled.staticCall(tokenWithdrawModule.target)).to

_25

.be.true;

_25

_25

return { tokenWithdrawModule };

_25

};`

This step deploys the TokenWithdrawModule contract and enables it in the Safe.

Please note that:

- Alice as the owner of the Safe is required to enable the module.
- The module is enabled by calling the `enableModule` function on the Safe contract.
- The `enableModule` function is called with the address of the newly deployed module.
- ⚠️ Security Note: Only trusted and audited code should be enabled as a module, since modules have full access to the Safe's assets. A malicious module could drain all funds.

### Step 5: Add test case

`_71

_71

// Test case to verify token transfer to bob

_71

it("Should successfully transfer tokens to bob", async function () {

_71

// Enable the module in the Safe

_71

const { tokenWithdrawModule } = await enableModule();

_71

_71

const amount = 10000000000000000000n; // 10 * 10^18

_71

const deadline = 100000000000000n;

_71

const nonce = await tokenWithdrawModule.nonces(await bob.getAddress());

_71

_71

// Our module expects a EIP-712 typed signature, so we need to define the EIP-712 domain, ...

_71

const domain: TypedDataDomain = {

_71

name: "TokenWithdrawModule",

_71

version: "1",

_71

chainId: chainId,

_71

verifyingContract: await tokenWithdrawModule.getAddress(),

_71

};

_71

_71

// ... and EIP-712 types ...

_71

const types = {

_71

TokenWithdrawModule: [

_71

{ name: "amount", type: "uint256" },

_71

{ name: "beneficiary", type: "address" },

_71

{ name: "nonce", type: "uint256" },

_71

{ name: "deadline", type: "uint256" },

_71

],

_71

};

_71

_71

// ... and EIP-712 values ...

_71

const value = {

_71

amount: amount,

_71

beneficiary: await bob.getAddress(),

_71

nonce: nonce,

_71

deadline: deadline,

_71

};

_71

_71

// ... and finally hash the data using EIP-712

_71

const digest = ethers.TypedDataEncoder.hash(domain, types, value);

_71

const bytesDataHash = ethers.getBytes(digest);

_71

let signatureBytes = "0x";

_71

_71

// Alice signs the digest

_71

const flatSig = (await alice.signMessage(bytesDataHash))

_71

.replace(/1b$/, "1f")

_71

.replace(/1c$/, "20");

_71

signatureBytes += flatSig.slice(2);

_71

_71

// We want to make sure that an invalid signer cannot call the module even with a valid signature

_71

// We test this before the valid transaction, because it would fail because of an invalid nonce otherwise

_71

await expect(

_71

tokenWithdrawModule

_71

.connect(charlie)

_71

.tokenTransfer(

_71

amount,

_71

await charlie.getAddress(),

_71

deadline,

_71

signatureBytes

_71

)

_71

).to.be.revertedWith("GS026");

_71

_71

// Now we use the signature to transfer via our module

_71

await tokenWithdrawModule

_71

.connect(bob)

_71

.tokenTransfer(amount, await bob.getAddress(), deadline, signatureBytes);

_71

_71

// Verify the token balance of bob (should be 10000000000000000000)

_71

const balanceBob = await token.balanceOf.staticCall(await bob.getAddress());

_71

expect(balanceBob).to.be.equal(amount);

_71

_71

// All done.

_71

});`

This step tests the token transfer functionality of the module.

Note that:

- The module can execute transactions on behalf of the Safe by calling the `execTransactionFromModule` function.
- We added an security check to the module that checks if the signers of a Safe signed the typed EIP-712 data. A module without this check could be called by any address.

### Final test code

Here is the complete code for reference:

`_176

// Import necessary libraries and types

_176

import { ethers } from "hardhat";

_176

import { expect } from "chai";

_176

import { Signer, TypedDataDomain, ZeroAddress } from "ethers";

_176

import {

_176

Safe,

_176

TestToken,

_176

TokenWithdrawModule,

_176

} from "../typechain-types";

_176

import { execTransaction } from "./utils/utils";

_176

_176

describe("TokenWithdrawModule Tests", function () {

_176

// Define variables

_176

let deployer: Signer;

_176

let alice: Signer;

_176

let bob: Signer;

_176

let charlie: Signer;

_176

let masterCopy: any;

_176

let token: TestToken;

_176

let safe: Safe;

_176

let safeAddress: string;

_176

let chainId: bigint;

_176

_176

// Setup signers and deploy contracts before running tests

_176

before(async () => {

_176

[deployer, alice, bob, charlie] = await ethers.getSigners();

_176

_176

chainId = (await ethers.provider.getNetwork()).chainId;

_176

const safeFactory = await ethers.getContractFactory("Safe", deployer);

_176

masterCopy = await safeFactory.deploy();

_176

_176

// Deploy a new token contract

_176

token = await (

_176

await ethers.getContractFactory("TestToken", deployer)

_176

).deploy("test", "T");

_176

_176

// Deploy a new SafeProxyFactory contract

_176

const proxyFactory = await (

_176

await ethers.getContractFactory("SafeProxyFactory", deployer)

_176

).deploy();

_176

_176

// Setup the Safe, Step 1, generate transaction data

_176

const safeData = masterCopy.interface.encodeFunctionData("setup", [

_176

[await alice.getAddress()],

_176

1,

_176

ZeroAddress,

_176

"0x",

_176

ZeroAddress,

_176

ZeroAddress,

_176

0,

_176

ZeroAddress,

_176

]);

_176

_176

// Read the safe address by executing the static call to createProxyWithNonce function

_176

safeAddress = await proxyFactory.createProxyWithNonce.staticCall(

_176

await masterCopy.getAddress(),

_176

safeData,

_176

0n

_176

);

_176

_176

if (safeAddress === ZeroAddress) {

_176

throw new Error("Safe address not found");

_176

}

_176

_176

// Setup the Safe, Step 2, execute the transaction

_176

await proxyFactory.createProxyWithNonce(

_176

await masterCopy.getAddress(),

_176

safeData,

_176

0n

_176

);

_176

_176

safe = await ethers.getContractAt("Safe", safeAddress);

_176

_176

// Mint tokens to the safe address

_176

await token

_176

.connect(deployer)

_176

.mint(safeAddress, BigInt(10) ** BigInt(18) * BigInt(100000));

_176

});

_176

_176

// A Safe Module is a smart contract that is allowed to execute transactions on behalf of a Safe Smart Account.

_176

// This function deploys the TokenWithdrawModule contract and enables it in the Safe.

_176

const enableModule = async (): Promise<{

_176

tokenWithdrawModule: TokenWithdrawModule;

_176

}> => {

_176

// Deploy the TokenWithdrawModule contract and pass the token and safe address as arguments

_176

const tokenWithdrawModule = await (

_176

await ethers.getContractFactory("TokenWithdrawModule", deployer)

_176

).deploy(token.target, safeAddress);

_176

_176

// Enable the module in the safe, Step 1, generate transaction data

_176

const enableModuleData = masterCopy.interface.encodeFunctionData(

_176

"enableModule",

_176

[tokenWithdrawModule.target]

_176

);

_176

_176

// Enable the module in the safe, Step 2, execute the transaction

_176

await execTransaction([alice], safe, safe.target, 0, enableModuleData, 0);

_176

_176

// Verify that the module is enabled

_176

expect(await safe.isModuleEnabled.staticCall(tokenWithdrawModule.target)).to

_176

.be.true;

_176

_176

return { tokenWithdrawModule };

_176

};

_176

_176

// Test case to verify token transfer to bob

_176

it("Should successfully transfer tokens to bob", async function () {

_176

// Enable the module in the Safe

_176

const { tokenWithdrawModule } = await enableModule();

_176

_176

const amount = 10000000000000000000n; // 10 * 10^18

_176

const deadline = 100000000000000n;

_176

const nonce = await tokenWithdrawModule.nonces(await bob.getAddress());

_176

_176

// Our module expects a EIP-712 typed signature, so we need to define the EIP-712 domain, ...

_176

const domain: TypedDataDomain = {

_176

name: "TokenWithdrawModule",

_176

version: "1",

_176

chainId: chainId,

_176

verifyingContract: await tokenWithdrawModule.getAddress(),

_176

};

_176

_176

// ... and EIP-712 types ...

_176

const types = {

_176

TokenWithdrawModule: [

_176

{ name: "amount", type: "uint256" },

_176

{ name: "beneficiary", type: "address" },

_176

{ name: "nonce", type: "uint256" },

_176

{ name: "deadline", type: "uint256" },

_176

],

_176

};

_176

_176

// ... and EIP-712 values ...

_176

const value = {

_176

amount: amount,

_176

beneficiary: await bob.getAddress(),

_176

nonce: nonce,

_176

deadline: deadline,

_176

};

_176

_176

// ... and finally hash the data using EIP-712

_176

const digest = ethers.TypedDataEncoder.hash(domain, types, value);

_176

const bytesDataHash = ethers.getBytes(digest);

_176

let signatureBytes = "0x";

_176

_176

// Alice signs the digest

_176

const flatSig = (await alice.signMessage(bytesDataHash))

_176

.replace(/1b$/, "1f")

_176

.replace(/1c$/, "20");

_176

signatureBytes += flatSig.slice(2);

_176

_176

// We want to make sure that an invalid signer cannot call the module even with a valid signature

_176

// We test this before the valid transaction, because it would fail because of an invalid nonce otherwise

_176

await expect(

_176

tokenWithdrawModule

_176

.connect(charlie)

_176

.tokenTransfer(

_176

amount,

_176

await charlie.getAddress(),

_176

deadline,

_176

signatureBytes

_176

)

_176

).to.be.revertedWith("GS026");

_176

_176

// Now we use the signature to transfer via our module

_176

await tokenWithdrawModule

_176

.connect(bob)

_176

.tokenTransfer(amount, await bob.getAddress(), deadline, signatureBytes);

_176

_176

// Verify the token balance of bob (should be 10000000000000000000)

_176

const balanceBob = await token.balanceOf.staticCall(await bob.getAddress());

_176

expect(balanceBob).to.be.equal(amount);

_176

_176

// All done.

_176

});

_176

});`

## Run the tests

`_10

npx hardhat test`

Congratulations! You have successfully created, enabled and tested a Safe Module.

## Do more with Safe and Safe Modules

Did you encounter any difficulties? Let us know by opening [an issue (opens in a new tab)](https://github.com/5afe/safe-module-tutorial-contracts/issues/new) or asking a question on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the `safe-core` tag.

[Safe Modules](/advanced/smart-account-modules "Safe Modules")[Safe Guards](/advanced/smart-account-guards "Safe Guards")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Building Applications with Safe Modules
  - Prerequisites
    - Implementation Details
    - Limitations
  - Project Setup
    - Configure Dependencies
    - Initialize hardhat project
    - Update hardhat.config.ts
  - Create a new Solidity contract
    - Step 1. Create empty contract
    - Step 2: Import required dependencies
    - Step 3: Define state variables
    - Step 4: Create the Constructor
    - Step 5: Implement thegetDomainSeparatorfunction
    - Step 6: Implement thetokenTransferfunction
    - Final contract code
    - Create TestToken.sol contract
  - Testing the contract
    - Step 1: Create test/utils/utils.ts file
    - Step 2: Start with a boilerplate test file
    - Step 3: Setup contracts and variables in before hook
    - Step 4: Deploy and enable module inenableModulefunction
    - Step 5: Add test case
    - Final test code
  - Run the tests
  - Do more with Safe and Safe Modules

---

## Related Links

### Internal Links

- [Safe Modules](https://docs.safe.global/advanced/smart-account-modules)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)
- [https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial](https://docs.safe.global/advanced/smart-account-modules/smart-account-modules-tutorial)

### External Links

- [Solidity(opens in a new tab)](https://docs.soliditylang.org/en/latest)
- [Hardhat(opens in a new tab)](https://hardhat.org)
- [Node.js(opens in a new tab)](https://nodejs.org/en/download/package-manager)
- [npm(opens in a new tab)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [an issue(opens in a new tab)](https://github.com/5afe/safe-module-tutorial-contracts/issues/new)
- [Stack Exchange(opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

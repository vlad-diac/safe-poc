---
title: Safe Smart Account Migration – Safe Docs
url: https://docs.safe.global/advanced/smart-account-migration
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe Smart Account Migration – Safe Docs

Advanced

Migration

# Safe Smart Account Migration

As the Smart Account ecosystem and standards evolve, Safe Team releases new versions of the Singleton contract as and when required.
The **SafeProxy** contract (aka. Safe Smart Account) stores the address of the Singleton contract at storage `slot(0)`. The existing SafeProxy contracts can be migrated to the new Singleton contract, but the Safe Smart Account owners must take special steps.
The guide below provides a step-by-step process for migrating the SafeProxy contract to the new Singleton contract using `delegatecall`.

⚠️

Only migrate to the trusted and audited contracts. A malicious implementation contract can take over the SafeProxy contract, causing loss of access to the account and potentially losing all funds.
Also, verify the compatibility of the new Singleton contract with the existing SafeProxy contract.

## Migration Process

Finding the address of the new Singleton contract is the first step in the migration process. Safe maintains [SafeMigration (opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/SafeMigration.sol) contract to update the Singleton contract address in the `SafeProxy` contract.

The officially deployed `SafeMigration` contract addresses can be found in the [Safe Deployments repository (opens in a new tab)](https://github.com/safe-global/safe-deployments).

## SafeMigration contract methods

Currently available [SafeMigration (opens in a new tab)](https://github.com/safe-global/safe-deployments/blob/main/src/assets/v1.4.1/safe_migration.json) contract supports upgrading to the Safe Singleton contract version 1.4.1.

The contract provides the below functions to migrate the SafeProxy contract to the new Singleton contract.

### `migrateSingleton()`

This function updates the Safe's Singleton address to the new Singleton implementation.

### `migrateWithFallbackHandler()`

This function updates the Safe's Singleton address and the fallback handler to the new implementations.

### `migrateL2Singleton()`

This function updates the Safe's Singleton to the Singleton L2 address.

### `migrateL2WithFallbackHandler()`

This function updates the Safe's Singleton address (to Singleton L2) and the fallback handler to the new implementations.

The tutorial below provides a step-by-step guide for migrating an existing SafeProxy contract to the Singleton v1.4.1 using the Safe Protocol Kit.

## Requirements

- A deployed SafeProxy contract.
- The SafeProxy contract should be compatible with the Singleton contract v1.4.1.
- This example assumes that the threshold of the Safe Smart Account is one.

### Setup a new project

`_10

mkdir safe-migration-tutorial && cd safe-migration-tutorial

_10

npm init -y

_10

npm install @safe-global/protocol-kit @safe-global/types-kit viem`

Add typescript support to the project:

`_10

npm install --save-dev typescript ts-node

_10

npx tsc --init`

### Add script commands in package.json

The `SafeMigration` contract provides four methods for migration. Update the `package.json` to add the following script commands:
The migration script will read the argument and choose the appropriate method to execute.

`_10

...

_10

"scripts": {

_10

...

_10

"migrate:L1": "ts-node ./src/migrate.ts migrateSingleton",

_10

"migrate:L2": "ts-node ./src/migrate.ts migrateL2Singleton",

_10

"migrate:L1:withFH": "ts-node ./src/migrate.ts migrateWithFallbackHandler",

_10

"migrate:L2:withFH": "ts-node ./src/migrate.ts migrateL2WithFallbackHandler"

_10

},

_10

...`

### Create a migration script

Create a new file `src/migrate.ts` and add the following code:

`_10

mkdir src

_10

touch src/migrate.ts`

`_19

import Safe from "@safe-global/protocol-kit";

_19

import { MetaTransactionData, OperationType } from "@safe-global/types-kit";

_19

import { parseAbi, encodeFunctionData, http, createPublicClient } from "viem";

_19

_19

type MigrationMethod =

_19

| "migrateSingleton"

_19

| "migrateWithFallbackHandler"

_19

| "migrateL2Singleton"

_19

| "migrateL2WithFallbackHandler";

_19

_19

async function main(migrationMethod: MigrationMethod) {

_19

// Define constants

_19

// Build calldata for the migration

_19

// Initialize the Protocol Kit

_19

// Create and execute transaction

_19

}

_19

_19

const migrationMethod = process.argv.slice(2)[0] as MigrationMethod;

_19

main(migrationMethod).catch(console.error);`

### Define variables

Define the constants required for the migration script. Replace the placeholders with the actual values.

`_11

// Define constants

_11

const SAFE_ADDRESS = // ...

_11

const OWNER_PRIVATE_KEY = // ...

_11

const RPC_URL = // ...

_11

const SAFE_MIGRATION_CONTRACT_ADDRESS = // ...

_11

const ABI = parseAbi([

_11

"function migrateSingleton() public",

_11

"function migrateWithFallbackHandler() external",

_11

"function migrateL2Singleton() public",

_11

"function migrateL2WithFallbackHandler() external",

_11

]);`

### Build `calldata` for the migration

`_12

// Build calldata for the migration

_12

const calldata = encodeFunctionData({

_12

abi: ABI,

_12

functionName: migrationMethod,

_12

});

_12

_12

const safeTransactionData: MetaTransactionData = {

_12

to: SAFE_MIGRATION_CONTRACT_ADDRESS,

_12

value: "0",

_12

data: calldata,

_12

operation: OperationType.DelegateCall,

_12

};`

### Initialize the Protocol Kit

`_10

// Initialize the Protocol Kit

_10

const preExistingSafe = await Safe.init({

_10

provider: RPC_URL,

_10

signer: OWNER_PRIVATE_KEY,

_10

safeAddress: SAFE_ADDRESS,

_10

});`

### Create and execute transaction

`` _20

// Create and execute transaction

_20

const safeTransaction = await preExistingSafe.createTransaction({

_20

transactions: [safeTransactionData],

_20

});

_20

_20

console.log(

_20

`Executing migration method [${migrationMethod}] using Safe [${SAFE_ADDRESS}]`

_20

);

_20

_20

const result = await preExistingSafe.executeTransaction(safeTransaction);

_20

_20

const publicClient = createPublicClient({

_20

transport: http(RPC_URL),

_20

});

_20

_20

console.log(`Transaction hash [${result.hash}]`);

_20

_20

await publicClient.waitForTransactionReceipt({

_20

hash: result.hash as `0x${string}`,

_20

}); ``

### Final script

`` _62

import Safe from "@safe-global/protocol-kit";

_62

import { MetaTransactionData, OperationType } from "@safe-global/types-kit";

_62

import { parseAbi, encodeFunctionData, http, createPublicClient } from "viem";

_62

_62

type MigrationMethod =

_62

| "migrateSingleton"

_62

| "migrateWithFallbackHandler"

_62

| "migrateL2Singleton"

_62

| "migrateL2WithFallbackHandler";

_62

_62

async function main(migrationMethod: MigrationMethod) {

_62

const SAFE_ADDRESS = // ...

_62

const OWNER_PRIVATE_KEY = // ...

_62

const RPC_URL = // ...

_62

const SAFE_MIGRATION_CONTRACT_ADDRESS = // ...

_62

const ABI = parseAbi([

_62

"function migrateSingleton() public",

_62

"function migrateWithFallbackHandler() external",

_62

"function migrateL2Singleton() public",

_62

"function migrateL2WithFallbackHandler() external",

_62

]);

_62

_62

const calldata = encodeFunctionData({

_62

abi: ABI,

_62

functionName: migrationMethod,

_62

});

_62

_62

const safeTransactionData: MetaTransactionData = {

_62

to: SAFE_MIGRATION_CONTRACT_ADDRESS,

_62

value: "0",

_62

data: calldata,

_62

operation: OperationType.DelegateCall,

_62

};

_62

_62

const preExistingSafe = await Safe.init({

_62

provider: RPC_URL,

_62

signer: OWNER_PRIVATE_KEY,

_62

safeAddress: SAFE_ADDRESS,

_62

});

_62

_62

const safeTransaction = await preExistingSafe.createTransaction({

_62

transactions: [safeTransactionData],

_62

});

_62

_62

console.log(

_62

`Executing migration method [${migrationMethod}] using Safe [${SAFE_ADDRESS}]`

_62

);

_62

_62

const result = await preExistingSafe.executeTransaction(safeTransaction);

_62

_62

const publicClient = createPublicClient({

_62

transport: http(RPC_URL),

_62

});

_62

_62

console.log(`Transaction hash [${result.hash}]`);

_62

await publicClient.waitForTransactionReceipt({

_62

hash: result.hash as `0x${string}`,

_62

});

_62

}

_62

_62

const migrationMethod = process.argv.slice(2)[0] as MigrationMethod;

_62

main(migrationMethod).catch(console.error); ``

### Run the migration script

Run one of the below commands:

`_10

npm run migrate:L1`

`_10

npm run migrate:L2`

`_10

npm run migrate:L1:withFH`

`_10

npm run migrate:L2:withFH`

## Further actions

- The migration script can be extended to support Safe Account migration with a threshold of more than one. Users can use the [Safe API Kit (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/packages/api-kit) to propose the transactions, fetch transaction data, and sign them.
- The source code for this script is available in the [Safe Migration Script repository (opens in a new tab)](https://github.com/5afe/safe-migration-script).

[Smart Account Fallback Handler Tutorial](/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial "Smart Account Fallback Handler Tutorial")[Signatures](/advanced/smart-account-signatures "Signatures")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe Smart Account Migration
  - Migration Process
  - SafeMigration contract methods
    - migrateSingleton()
    - migrateWithFallbackHandler()
    - migrateL2Singleton()
    - migrateL2WithFallbackHandler()
  - Requirements
    - Setup a new project
    - Add script commands in package.json
    - Create a migration script
    - Define variables
    - Buildcalldatafor the migration
    - Initialize the Protocol Kit
    - Create and execute transaction
    - Final script
    - Run the migration script
  - Further actions

---

## Related Links

### Internal Links

- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [https://docs.safe.global/advanced/smart-account-migration](https://docs.safe.global/advanced/smart-account-migration)
- [Smart Account Fallback Handler Tutorial](https://docs.safe.global/advanced/smart-account-fallback-handler/smart-account-fallback-handler-tutorial)
- [Signatures](https://docs.safe.global/advanced/smart-account-signatures)

### External Links

- [SafeMigration(opens in a new tab)](https://github.com/safe-global/safe-smart-account/blob/main/contracts/libraries/SafeMigration.sol)
- [Safe Deployments repository(opens in a new tab)](https://github.com/safe-global/safe-deployments)
- [SafeMigration(opens in a new tab)](https://github.com/safe-global/safe-deployments/blob/main/src/assets/v1.4.1/safe_migration.json)
- [Safe API Kit(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/tree/main/packages/api-kit)
- [Safe Migration Script repository(opens in a new tab)](https://github.com/5afe/safe-migration-script)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

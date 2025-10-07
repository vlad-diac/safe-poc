---
title: How to build an app with Safe and ERC-7579 – Safe Docs
url: https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# How to build an app with Safe and ERC-7579 – Safe Docs

Advanced

ERC-7579

Tutorials

Build an app with Safe and ERC-7579

# How to build an app with Safe and ERC-7579

The smart account ecosystem needed to be more cohesive. Each provider built its modules, which were often incompatible with other smart account implementations. Developers had to build new modules compatible with their smart accounts or miss out on essential application features.

[ERC-7579 (opens in a new tab)](https://docs.safe.global/advanced/erc-7579/overview) aims to ensure interoperability across implementations. It defines the account interface so developers can implement modules for all smart accounts that follow this standard. The Safe7579 Adapter makes your Safe compatible with any ERC-7579 modules. As a developer building with Safe, you can access a rich ecosystem of modules to add features to your application.

In this tutorial, you will build an app that can:

- Enable a 7579 module on a newly deployed Safe (the [OwnableExecutor (opens in a new tab)](https://github.com/rhinestonewtf/core-modules/blob/main/src/OwnableExecutor/OwnableExecutor.sol) module by Rhinestone)
- Send a transaction via the 7579 module (Send a dummy transaction as the new owner via `executeOnOwnedAccount`)
- Interact with the 7579 directly to add a new owner to the module

The full code for this tutorial is in the [Safe7579 module tutorial repository (opens in a new tab)](https://github.com/5afe/safe-7579-tutorial).

## Prerequisites

**Prerequisite knowledge:** You will need some basic experience with [React (opens in a new tab)](https://react.dev/learn), [Next.js (opens in a new tab)](https://nextjs.org/docs), [ERC-4337 (opens in a new tab)](https://docs.safe.global/home/4337-overview) and [ERC-7579 (opens in a new tab)](https://docs.safe.global/advanced/erc-7579/overview).

Before progressing with the tutorial, please make sure you have the following:

- Downloaded and installed [Node.js (opens in a new tab)](https://nodejs.org/en/download/package-manager) and [pnpm (opens in a new tab)](https://pnpm.io/installation).
- Created an API key from [Pimlico (opens in a new tab)](https://www.pimlico.io/).
- Metamask installed in your browser and connected to the Sepolia network.
- Two test accounts in Metamask, the second with some Sepolia Eth for gas.

## 1. Setup a Next.js application

Initialize a new Next.js app using pnpm with the following command:

`_10

pnpm create next-app`

When prompted by the CLI:

- Select `yes` to TypeScript, ESLint, and App router.
- Select `no` to all other questions (Tailwind, `src` directory, and import aliases).

### Install dependencies

For this project, you will use Pimlico's [Permissionless.js (opens in a new tab)](https://docs.pimlico.io/permissionless) to set up a Safe and interact with it and [viem (opens in a new tab)](https://www.npmjs.com/package/viem) for some helper functions.

⚠️

Currently, `permissionless.js` can only be used to deploy single-signer Safe accounts. Multi-signature ERC-7579 Safes will be coming soon.

Run the following command to add all these dependencies to the project:

`_10

pnpm add permissionless@0.2.0 viem@2.21.7 truncate-eth-address@1.0.2`

## 2. Setup project

First, set up the project and add some UI and styles so you can focus on the 7579-related code for the rest of the tutorial.

### Add CSS

Replace the content of `app/globals.css` with the following:

`_106

:root {

_106

background-color: #121312;

_106

font-family: Citerne, 'DM Sans', sans-serif;

_106

font-size: 14px;

_106

line-height: 1.4;

_106

}

_106

_106

* {

_106

box-sizing: border-box;

_106

margin: 0;

_106

padding: 0;

_106

color: #fff;

_106

}

_106

_106

body {

_106

align-items: center;

_106

display: flex;

_106

flex-direction: column;

_106

justify-content: space-between;

_106

margin: 6rem auto;

_106

width: 500px;

_106

}

_106

_106

.card {

_106

background-color: #1c1c1c;

_106

border-radius: 6px;

_106

margin-bottom: 24px;

_106

padding: 24px;

_106

text-align: left;

_106

width: 100%;

_106

display: flex;

_106

flex-direction: column;

_106

box-shadow: 0 0 100px rgba(18, 255, 128, 0.2);

_106

}

_106

_106

.title {

_106

display: flex;

_106

align-items: center;

_106

gap: 10px;

_106

margin-bottom: 35px;

_106

font-size: large;

_106

}

_106

_106

.actions {

_106

display: flex;

_106

justify-content: flex-end;

_106

gap: 16px;

_106

margin-top: 50px;

_106

}

_106

_106

button {

_106

background-color: #12ff80;

_106

border: none;

_106

border-radius: 6px;

_106

color: rgba(0, 0, 0, 0.87);

_106

border: 1px solid #12ff80;

_106

cursor: pointer;

_106

font-weight: bold;

_106

padding: 8px 24px;

_106

position: relative;

_106

}

_106

button.skip {

_106

background-color: transparent;

_106

border: 1px solid #12ff80;

_106

color: #12ff80;

_106

}

_106

_106

.button--loading {

_106

color: transparent;

_106

background-color: transparent;

_106

}

_106

_106

.button--loading::after {

_106

content: "";

_106

position: absolute;

_106

width: 16px;

_106

height: 16px;

_106

top: 0;

_106

left: 0;

_106

right: 0;

_106

bottom: 0;

_106

margin: auto;

_106

border: 4px solid transparent;

_106

border-top-color: #12ff80;

_106

border-radius: 50%;

_106

animation: button-loading-spinner 1s ease infinite;

_106

}

_106

_106

@keyframes button-loading-spinner {

_106

from {

_106

transform: rotate(0turn);

_106

}

_106

_106

to {

_106

transform: rotate(1turn);

_106

}

_106

}

_106

_106

pre {

_106

border: 1px solid #303033;

_106

border-radius: 8px;

_106

color: #a1a3a7;

_106

margin: 24px 0;

_106

padding: 24px;

_106

text-align: center;

_106

}`

### Add a scaffold React component

Now, replace the content of `app/page.tsx` with the following code. It includes all necessary imports, the React component and the UI, and empty functions you will fill with code in the following steps. From now on, you will only work on this file.

`_265

'use client'

_265

_265

import { createSmartAccountClient } from 'permissionless'

_265

import { sepolia } from 'viem/chains'

_265

import {

_265

encodePacked,

_265

http,

_265

encodeFunctionData,

_265

parseAbi,

_265

createWalletClient,

_265

createPublicClient,

_265

custom,

_265

encodeAbiParameters,

_265

parseAbiParameters,

_265

HttpTransport,

_265

Client,

_265

parseEther

_265

} from 'viem'

_265

import { Erc7579Actions, erc7579Actions } from 'permissionless/actions/erc7579'

_265

import { createPimlicoClient } from 'permissionless/clients/pimlico'

_265

import {

_265

toSafeSmartAccount,

_265

ToSafeSmartAccountReturnType

_265

} from 'permissionless/accounts'

_265

import { useEffect, useState } from 'react'

_265

import truncateEthAddress from 'truncate-eth-address'

_265

import { SendUserOperationParameters } from 'viem/account-abstraction'

_265

_265

export default function Home () {

_265

const [safeAccount, setSafeAccount] =

_265

useState<ToSafeSmartAccountReturnType<'0.7'> | null>(null)

_265

const [smartAccountClient, setSmartAccountClient] = useState<

_265

| (Client<HttpTransport, typeof sepolia> &

_265

Erc7579Actions<ToSafeSmartAccountReturnType<'0.7'>> & {

_265

sendUserOperation: (

_265

params: SendUserOperationParameters

_265

) => Promise<string>

_265

})

_265

| null

_265

>(null)

_265

const [ownerAddress, setOwnerAddress] = useState<string | null>(null)

_265

const [executorAddress, setExecutorAddress] = useState<string | null>(null)

_265

const [safeAddress, setSafeAddress] = useState<string | null>(null)

_265

const [safeIsDeployed, setSafeIsDeployed] = useState(false)

_265

const [moduleIsInstalled, setModuleIsInstalled] = useState(false)

_265

const [executorTransactionIsSent, setExecutorTransactionIsSent] =

_265

useState(false)

_265

const [ownerIsAdded, setOwnerIsAdded] = useState(false)

_265

const [moduleIsUninstalled, setModuleIsUninstalled] = useState(false)

_265

const [loading, setLoading] = useState(false)

_265

const [walletClient, setWalletClient] = useState<ReturnType<

_265

typeof createWalletClient

_265

> | null>(null)

_265

_265

// The module we will use is deployed as a smart contract on Sepolia:

_265

const ownableExecutorModule = '0xc98B026383885F41d9a995f85FC480E9bb8bB891'

_265

_265

// TODO: Make sure to add your own API key to the Pimlico URL:

_265

const pimlicoUrl =

_265

'https://api.pimlico.io/v2/sepolia/rpc?add_balance_override&apikey=YOUR_PIMLICO_API_KEY'

_265

_265

// The Pimlico client is used as a paymaster:

_265

const pimlicoClient = createPimlicoClient({

_265

transport: http(pimlicoUrl),

_265

chain: sepolia

_265

})

_265

_265

useEffect(() => {

_265

// We create a wallet client to connect to MetaMask:

_265

const walletClient = createWalletClient({

_265

chain: sepolia,

_265

// @ts-expect-error MetaMask is a requirement for this tutorial

_265

transport: custom(typeof window !== 'undefined' ? window.ethereum! : null)

_265

})

_265

setWalletClient(walletClient)

_265

}, [])

_265

_265

// Check for connected accounts on page load:

_265

useEffect(() => {

_265

checkAddresses()

_265

// eslint-disable-next-line react-hooks/exhaustive-deps

_265

}, [walletClient])

_265

_265

// Check whether the user has connected two accounts, without MetaMask popping up:

_265

const checkAddresses = async () => {

_265

if (!walletClient) return

_265

const addresses = await walletClient!.getAddresses()

_265

setOwnerAddress(addresses[0])

_265

setExecutorAddress(addresses[1])

_265

if (addresses.length >= 2) {

_265

init()

_265

}

_265

}

_265

_265

const connectWallets = async () => {

_265

// Only at the request address call, MetaMask will pop up and ask the user to connect:

_265

await walletClient!.requestAddresses()

_265

checkAddresses()

_265

}

_265

_265

// The public client is required for the safe account creation:

_265

const publicClient = createPublicClient({

_265

transport: http('https://rpc.ankr.com/eth_sepolia'),

_265

chain: sepolia

_265

})

_265

_265

// The following functions will be filled with code in the following steps:

_265

_265

const init = async () => {}

_265

_265

const installModule = async () => {}

_265

_265

const executeOnOwnedAccount = async () => {}

_265

_265

const addOwner = async () => {}

_265

_265

const uninstallModule = async () => {}

_265

_265

// Depending on the state of the tutorial, different cards are displayed:

_265

// Step 1: Connect Wallets

_265

if (!ownerAddress || !executorAddress) {

_265

return (

_265

<div className='card'>

_265

<div className='title'>Connect two accounts</div>

_265

<div>

_265

Please ensure to connect with two accounts to this site. The second

_265

account needs to have some Sepolia Eth for gas.

_265

</div>

_265

<div className='actions'>

_265

<button onClick={connectWallets}>Connect Wallet</button>

_265

</div>

_265

</div>

_265

)

_265

}

_265

_265

// Step 2: Install Module

_265

if (!moduleIsInstalled) {

_265

return (

_265

<div className='card'>

_265

<div className='title'>Install Module</div>

_265

<div>

_265

Your Safe has the address{' '}

_265

{safeAddress && truncateEthAddress(safeAddress)} and is{' '}

_265

{safeIsDeployed ? 'deployed' : 'not yet deployed'}.

_265

{!safeIsDeployed &&

_265

'It will be deployed with your first transaction, when you install the module.'}

_265

</div>

_265

<div>

_265

You can now install the module. MetaMask will ask you to sign a

_265

message with the first account after clicking the button.

_265

</div>

_265

<div className='actions'>

_265

<button

_265

onClick={installModule}

_265

className={loading ? 'button--loading' : ''}

_265

>

_265

Install Module

_265

</button>

_265

</div>

_265

</div>

_265

)

_265

}

_265

_265

// Step 3: Execute on Owned Account

_265

if (!executorTransactionIsSent) {

_265

return (

_265

<div className='card'>

_265

<div className='title'>Execute on owned account</div>

_265

<div>

_265

You can now execute a transaction on the owned account as the

_265

executor. In this case, you will send a dummy transaction. But you

_265

could also claim ownership of the account.

_265

</div>

_265

<div>

_265

When you click the button, Metamask will request a transaction from

_265

the second account.

_265

</div>

_265

<div className='actions'>

_265

<button

_265

className='skip'

_265

onClick={() => {

_265

setExecutorTransactionIsSent(true)

_265

setLoading(false)

_265

}}

_265

>

_265

Skip

_265

</button>

_265

<button

_265

onClick={executeOnOwnedAccount}

_265

className={loading ? 'button--loading' : ''}

_265

>

_265

Execute on owned account

_265

</button>

_265

</div>

_265

</div>

_265

)

_265

}

_265

_265

// Step 4: Add Owner

_265

if (!ownerIsAdded) {

_265

return (

_265

<div className='card'>

_265

<div className='title'>Add Owner</div>

_265

<div>

_265

Now, you will interact with the 7579 module directly. You can add an

_265

owner to the Safe. The new owner will be able to execute transactions

_265

on the Safe. Metamask will request a signature from the first owner.

_265

</div>

_265

<div>

_265

<div className='actions'>

_265

<button

_265

className='skip'

_265

onClick={() => {

_265

setOwnerIsAdded(true)

_265

setLoading(false)

_265

}}

_265

>

_265

Skip

_265

</button>

_265

<button

_265

onClick={addOwner}

_265

className={loading ? 'button--loading' : ''}

_265

>

_265

Add Owner

_265

</button>

_265

</div>

_265

</div>

_265

</div>

_265

)

_265

}

_265

_265

// Step 5: Uninstall Module

_265

if (!moduleIsUninstalled) {

_265

return (

_265

<div className='card'>

_265

<div className='title'>Uninstall Module</div>

_265

<div>

_265

To finish the module&apos;s lifecycle, you can now uninstall the

_265

module. MetaMask will ask you to sign a message after clicking the

_265

button.

_265

</div>

_265

<div className='actions'>

_265

<button

_265

onClick={uninstallModule}

_265

className={loading ? 'button--loading' : ''}

_265

>

_265

Uninstall Module

_265

</button>

_265

</div>

_265

</div>

_265

)

_265

}

_265

_265

// Step 6: Finish

_265

return (

_265

<div className='card'>

_265

<div className='title'>Well done</div>

_265

<div>

_265

Congratulations! You&apos;ve successfully installed, executed,

_265

interacted with, and uninstalled the module. This tutorial is now

_265

complete. Great job! Keep exploring!

_265

</div>

_265

</div>

_265

)

_265

}`

Add your Pimlico API key to the `pimlicoUrl` variable. You can find your API key in the Pimlico dashboard.

You can now run the development server with `pnpm dev` and open the app in your browser at `http://localhost:3000`. You should see a card that asks you to connect two wallets. Connect two wallets to proceed with the tutorial.

## 3. Initialize the clients

In the first step, you create the clients that allow you to interact with the smart account. As permissionless.js is just a tiny wrapper around viem, you will use many of viem's functions in this tutorial.

To add this code, overwrite the `init` function with this one:

`_50

const init = async () => {

_50

// The safe account is created using the public client:

_50

const safeAccount = await toSafeSmartAccount<

_50

'0.7',

_50

'0xEBe001b3D534B9B6E2500FB78E67a1A137f561CE'

_50

>({

_50

client: publicClient,

_50

// @ts-expect-error The wallet client is set in the useEffect

_50

owners: [walletClient!],

_50

version: '1.4.1',

_50

// These modules are required for the 7579 functionality:

_50

safe4337ModuleAddress: '0x3Fdb5BC686e861480ef99A6E3FaAe03c0b9F32e2', // These are not meant to be used in production as of now.

_50

erc7579LaunchpadAddress: '0xEBe001b3D534B9B6E2500FB78E67a1A137f561CE' // These are not meant to be used in production as of now.

_50

})

_50

_50

const isSafeDeployed = await safeAccount.isDeployed()

_50

_50

setSafeAddress(safeAccount.address)

_50

setSafeIsDeployed(isSafeDeployed)

_50

_50

// Finally, we create the smart account client, which provides functionality to interact with the smart account:

_50

const smartAccountClient = createSmartAccountClient({

_50

account: safeAccount,

_50

chain: sepolia,

_50

bundlerTransport: http(pimlicoUrl),

_50

paymaster: pimlicoClient,

_50

userOperation: {

_50

estimateFeesPerGas: async () => {

_50

return (await pimlicoClient.getUserOperationGasPrice()).fast

_50

}

_50

}

_50

}).extend(erc7579Actions())

_50

_50

// Check whether the module has been installed already:

_50

const isModuleInstalled =

_50

isSafeDeployed &&

_50

(await smartAccountClient.isModuleInstalled({

_50

address: ownableExecutorModule,

_50

type: 'executor',

_50

context: '0x'

_50

}))

_50

_50

setModuleIsInstalled(isModuleInstalled)

_50

_50

// We store the clients in the state to use them in the following steps:

_50

setSafeAccount(safeAccount)

_50

setSmartAccountClient(smartAccountClient)

_50

_50

console.log('setup done')

_50

}`

You must refresh your page after adding this code, as the initial site load will trigger the `init` function and set up the Safe account and the Smart account client. You can check the console to see if the setup was successful.

## 4. Install the 7579 module

Now, add the function to install the `OwnableExecutor` module as an `executor` to your smart account.

Overwrite the `installModule` function with this one.

`` _27

const installModule = async () => {

_27

setLoading(true)

_27

console.log('Installing module...')

_27

_27

// The smart accounts client operates on 4337. It does not send transactions directly but instead creates user

_27

// operations. The Pimlico bundler takes those user operations and sends them to the blockchain as regular

_27

// transactions. We also use the Pimlico paymaster to sponsor the transaction. So, all interactions are free

_27

// on Sepolia.

_27

const userOpHash = await smartAccountClient?.installModule({

_27

type: 'executor',

_27

address: ownableExecutorModule,

_27

context: encodePacked(['address'], [executorAddress as `0x${string}`])

_27

})

_27

_27

console.log('User operation hash:', userOpHash, '\nwaiting for receipt...')

_27

_27

// After we sent the user operation, we wait for the transaction to be settled:

_27

const transactionReceipt = await pimlicoClient.waitForUserOperationReceipt({

_27

hash: userOpHash as `0x${string}`

_27

})

_27

_27

console.log('Module installed:', transactionReceipt)

_27

_27

setModuleIsInstalled(true)

_27

setSafeIsDeployed((await safeAccount?.isDeployed()) ?? false)

_27

setLoading(false)

_27

} ``

When you open the UI now and click the “Install Module” button, the console should log the module installation process. You can use [jiffyscan.xyz (opens in a new tab)](https://jiffyscan.xyz/) to inspect the user operation hash. From there, you can copy the transaction hash and inspect the transaction with [Etherscan (opens in a new tab)](https://sepolia.etherscan.io/), [Tenderly (opens in a new tab)](https://tenderly.co/), or other block explorers.

## 5. Send a transaction via the 7579 module

In the following function, you will use the `OwnableExecutor` module. The module allows owners to execute transactions from the smart account without collecting signatures. For this example, you will send a dummy transaction that sends zero eth to owner1.

In detail:

1. Owner2 calls module
2. The module calls `executeAsModule` on the smart account
3. The smart account executes the transaction (and sends zero eth to owner1)

Replace the `executeOnOwnedAccount` function with this code:

`` _32

const executeOnOwnedAccount = async () => {

_32

setLoading(true)

_32

console.log('Executing on owned account...')

_32

_32

// We encode the transaction we want the smart account to send. The fields are:

_32

// - to (address)

_32

// - value (uint256)

_32

// - data (bytes)

_32

// In this example case, it is a dummy transaction with zero data.

_32

const executeOnOwnedAccountData = encodePacked(

_32

['address', 'uint256', 'bytes'],

_32

['0xa6d3DEBAAB2B8093e69109f23A75501F864F74e2', parseEther('0'), '0x']

_32

)

_32

_32

// Now, we call the `executeOnOwnedAccount` function of the `ownableExecutorModule` with the address of the safe

_32

// account and the data we want to execute. This will make our smart account send the transaction that is encoded above.

_32

const hash = await walletClient!.writeContract({

_32

chain: sepolia,

_32

account: executorAddress as `0x${string}`,

_32

abi: parseAbi(['function executeOnOwnedAccount(address, bytes)']),

_32

functionName: 'executeOnOwnedAccount',

_32

args: [safeAddress as `0x${string}`, executeOnOwnedAccountData],

_32

address: ownableExecutorModule

_32

})

_32

_32

console.log('Executed on owned account, transaction hash:', hash)

_32

_32

await publicClient?.waitForTransactionReceipt({ hash })

_32

_32

setExecutorTransactionIsSent(true)

_32

setLoading(false)

_32

} ``

When you open the UI and click the “Execute on owned account” button, your console should log the transaction. You can inspect the transaction with Tenderly to follow the call stack from the module over the Safe 7579 adapter to your Safe and the transaction's final receiver.

You also learned the required data format to send a 7579 transaction from a module to a Safe. It is precisely the data you packed for the transaction in `executeOnOwnedAccountData`. Every other 7579 module uses the same data type to send transactions to a Safe. However, with most other modules, you don’t have to pack the data yourself; you call a function on the module, and the module sends the dedicated transaction to the smart account.

## 6. Interact with the 7579 module directly

Some modules can be configured directly. The `OwnableExecutor` module allows you to add additional owners and remove existing owners. This example outlines how you interact with the module directly to add a new owner.

The call flow is:

1. Sign a user operation with your smart account client and send it to the bundler.
2. The bundler bundles the user operation into a regular transaction and sends it to the meme pool.
3. The transaction executes a call from your smart account to the module with the defined data.
4. The module recognizes your smart account as an authorized sender. It stores the new owner of your smart account in its storage.

Replace `addOwner` with this function:

`` _34

const addOwner = async () => {

_34

setLoading(true)

_34

console.log('Adding owner...')

_34

_34

// The addOwner function is part of the OwnableExecutorModule. We encode the function data using the viem library:

_34

const addOwnerData = encodeFunctionData({

_34

abi: parseAbi(['function addOwner(address)']),

_34

functionName: 'addOwner',

_34

args: ['0x0000000000000000000000000000000000000002'] // We add 0x2 as the new owner just as an example.

_34

})

_34

_34

// We use the smart account client to send the user operation: In this call, our smart account calls the `addOwner`

_34

// function at the `ownableExecutorModule` with the new owner's address.

_34

const userOp = await smartAccountClient?.sendUserOperation({

_34

calls: [

_34

{

_34

to: ownableExecutorModule,

_34

value: parseEther('0'),

_34

data: addOwnerData

_34

}

_34

]

_34

})

_34

_34

console.log('User operation:', userOp, '\nwaiting for tx receipt...')

_34

_34

// Again, we wait for the transaction to be settled:

_34

const receipt = await pimlicoClient.waitForUserOperationReceipt({

_34

hash: userOp as `0x${string}`

_34

})

_34

_34

console.log('Owner added, tx receipt:', receipt)

_34

setOwnerIsAdded(true)

_34

setLoading(false)

_34

} ``

When you open the UI and click the “Add Owner” button, your console should log the user operation that adds a new owner. Make sure to inspect the final transaction (you can get the transaction hash from jiffyscan.xyz) to understand the call stack from the smart account to the module.

## 7. Uninstall the 7579 module

The last step is to uninstall the module. If the module is no longer needed, you can remove it from the smart account.

Replace the `uninstallModule` function with this code:

`` _30

const uninstallModule = async () => {

_30

setLoading(true)

_30

console.log('Uninstalling module...')

_30

_30

// To uninstall the module, use the `uninstallModule`.

_30

// You have to pack the abi parameter yourself:

_30

// - previousEntry (address): The address of the previous entry in the module sentinel list.

_30

// - deInitData (bytes): The data that is passed to the deInit function of the module.

_30

// As this is the only module, the previous entry is the sentinel address 0x1. The deInitData is empty for the

_30

// OwnableExecutor.

_30

const userOp = await smartAccountClient?.uninstallModule({

_30

type: 'executor',

_30

address: ownableExecutorModule,

_30

context: encodeAbiParameters(

_30

parseAbiParameters('address prevEntry, bytes memory deInitData'),

_30

['0x0000000000000000000000000000000000000001', '0x']

_30

)

_30

})

_30

_30

console.log('User operation:', userOp, '\nwaiting for tx receipt...')

_30

_30

// We wait for the transaction to be settled:

_30

const receipt = await pimlicoClient.waitForUserOperationReceipt({

_30

hash: userOp as `0x${string}`

_30

})

_30

_30

console.log('Module uninstalled, tx receipt:', receipt)

_30

setModuleIsUninstalled(true)

_30

setLoading(false)

_30

} ``

In the last step of the UI, you can now click the “Uninstall Module” button to remove the module from the smart account. Notice that depending on the type of the 7579 module, the method required different `deInitData`.

Also, you have to pass the correct previous entry address to the `uninstallModule` function. If you have only one module installed, the previous entry is the [sentinel address (opens in a new tab)](https://github.com/rhinestonewtf/sentinellist/blob/main/src/SentinelList.sol#L5) `0x1`.

That’s it! You have successfully built an app that can interact with a Safe Smart Account using the ERC-7579 standard. You can now deploy and test your app with your Safes and modules.

## Do more with Safe and ERC-7579

You learned how to deploy an ERC-7579-compatible Safe Smart Account and use an ERC-7579-compatible module, the OwnableExecutor from Rhinestone. We hope you enjoyed this tutorial and that the combination of Safe and 7579 will allow you to tap into new functionalities for your decentralized apps.

As a next step, you can add more functionalities to your app using other [ERC-7579-compatible modules (opens in a new tab)](https://docs.rhinestone.wtf/module-sdk/modules/ownable-validator).

You can also find more inspiration on this list of [ERC-7579 modules (opens in a new tab)](https://erc7579.com/modules). You can also read more about this ERC in our [overview (opens in a new tab)](https://docs.safe.global/advanced/erc-7579/overview) or the [official documentation (opens in a new tab)](https://erc7579.com/).

Did you encounter any difficulties? Let us know by opening [an issue (opens in a new tab)](https://github.com/5afe/safe-7579-tutorial/issues/new) or asking a question on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the `safe-core` tag.

[Developer Tooling](/advanced/erc-7579/developer-tooling "Developer Tooling")[Overview](/advanced/eip-7702/overview "Overview")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- How to build an app with Safe and ERC-7579
  - Prerequisites
  - 1. Setup a Next.js application
    - Install dependencies
  - 2. Setup project
    - Add CSS
    - Add a scaffold React component
  - 3. Initialize the clients
  - 4. Install the 7579 module
  - 5. Send a transaction via the 7579 module
  - 6. Interact with the 7579 module directly
  - 7. Uninstall the 7579 module
  - Do more with Safe and ERC-7579

---

## Related Links

### Internal Links

- [ERC-7579(opens in a new tab)](https://docs.safe.global/advanced/erc-7579/overview)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [ERC-4337(opens in a new tab)](https://docs.safe.global/home/4337-overview)
- [ERC-7579(opens in a new tab)](https://docs.safe.global/advanced/erc-7579/overview)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial](https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial)
- [overview(opens in a new tab)](https://docs.safe.global/advanced/erc-7579/overview)
- [Developer Tooling](https://docs.safe.global/advanced/erc-7579/developer-tooling)
- [Overview](https://docs.safe.global/advanced/eip-7702/overview)

### External Links

- [OwnableExecutor(opens in a new tab)](https://github.com/rhinestonewtf/core-modules/blob/main/src/OwnableExecutor/OwnableExecutor.sol)
- [Safe7579 module tutorial repository(opens in a new tab)](https://github.com/5afe/safe-7579-tutorial)
- [React(opens in a new tab)](https://react.dev/learn)
- [Next.js(opens in a new tab)](https://nextjs.org/docs)
- [Node.js(opens in a new tab)](https://nodejs.org/en/download/package-manager)
- [pnpm(opens in a new tab)](https://pnpm.io/installation)
- [Pimlico(opens in a new tab)](https://www.pimlico.io)
- [Permissionless.js(opens in a new tab)](https://docs.pimlico.io/permissionless)
- [viem(opens in a new tab)](https://www.npmjs.com/package/viem)
- [jiffyscan.xyz(opens in a new tab)](https://jiffyscan.xyz)

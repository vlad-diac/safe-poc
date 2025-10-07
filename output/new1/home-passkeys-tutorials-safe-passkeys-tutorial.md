---
title: How to build a React app with Safe and passkeys – Safe Docs
url: https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# How to build a React app with Safe and passkeys – Safe Docs

Advanced

Passkeys

Tutorials

Build a React app with Safe and passkeys

# How to build a React app with Safe and passkeys

⚠️

Because of known compatibility issues with Mozilla Firefox's implementation of passkeys, we recommend using Google Chrome or Chromium to follow this tutorial.

An increasing number of applications rely on passkeys to authenticate users securely and with little friction. Security and user-friendliness are crucial to making web3 a reality for the next billion users.
Being able to unlock a Safe Smart Account with your fingerprints or Face ID, sending transactions without worrying about third-party wallet interfaces, phishing attempts, or securing seed phrases will bring new forms of ownership to the connected world.
Today, we'll learn how to make this a reality using [Safe{Core} SDK](/sdk/overview), [Pimlico (opens in a new tab)](https://www.pimlico.io/), and [Next.js (opens in a new tab)](https://nextjs.org/docs).

This tutorial will demonstrate creating a web app for using [passkeys](/advanced/passkeys/overview) in your Safe. This app will allow you to:

- Create a new passkey secured by the user's device.
- Deploy a new Safe on Ethereum Sepolia for free.
- Sign a transaction to mint an NFT using the previously created passkey.

![safe-passkeys-app-1.png](/_next/static/media/safe-passkeys-app-1.1c1288ac.png)

## **What you'll need**

**Prerequisite knowledge:** You will need some basic experience with [React (opens in a new tab)](https://react.dev/learn), Next.js, and [ERC-4337](/advanced/erc-4337/overview).

Before progressing with the tutorial, please make sure you have:

- Downloaded and installed [Node.js (opens in a new tab)](https://nodejs.org/en/download/package-manager) and [pnpm (opens in a new tab)](https://pnpm.io/installation).
- Created an API key from [Pimlico (opens in a new tab)](https://www.pimlico.io/).

**Note:** If you wish to follow along using the completed project, you can [check out the GitHub repository (opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial) for this tutorial.

## 1. Setup a Next.js application

Initialize a new Next.js app using pnpm with the following command:

`_10

pnpm create next-app`

When prompted by the CLI:

- Select `yes` to TypeScript, ESLint, and App router.
- Select `no` to all other questions (Tailwind, `src` directory, and import aliases).

### Install dependencies

For this project, we'll use the [Relay Kit](/sdk/relay-kit) and [Protocol Kit](/sdk/protocol-kit) from the Safe{Core} SDK to set up a Safe, sponsor a transaction, and use [viem (opens in a new tab)](https://www.npmjs.com/package/viem) for a helper function to encode the dummy transaction. We will also use [`@mui/material` (opens in a new tab)](https://mui.com/material-ui/) for styling and [@svgr/webpack (opens in a new tab)](https://www.npmjs.com/package/@svgr/webpack) to load SVG files.

Run the following command to add all these dependencies to the project:

`_10

pnpm add @safe-global/protocol-kit@4.1.0 @safe-global/relay-kit@3.1.0 viem @emotion/react @emotion/styled @mui/material @mui/icons-material @svgr/webpack`

Now, create a file named `.env.local` at the root of your project, and add your Pimlico API key to it:

`_10

echo "NEXT_PUBLIC_PIMLICO_API_KEY='your_pimlico_api_key_goes_here'" > .env.local`

### Run the development server

Run the local development server with the following command:

`_10

pnpm dev`

Go to `http://localhost:3000` in your browser to see the default Next.js application.

![next.png](/_next/static/media/next.5c1c4043.png)

## 2. Add project constants and utilities

Create a `lib` folder at the project root and add a file `constants.ts` containing common constants used throughout the project:

`_10

mkdir lib

_10

cd lib

_10

touch constants.ts`

Add the following code to the `constants.ts` file:

`` _10

export const STORAGE_PASSKEY_LIST_KEY = 'safe_passkey_list'

_10

export const RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com'

_10

export const CHAIN_NAME = 'sepolia'

_10

export const PAYMASTER_ADDRESS = '0x0000000000325602a77416A16136FDafd04b299f' // SEPOLIA

_10

export const BUNDLER_URL = `https://api.pimlico.io/v1/${CHAIN_NAME}/rpc?add_balance_override&apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`

_10

export const PAYMASTER_URL = `https://api.pimlico.io/v2/${CHAIN_NAME}/rpc?add_balance_override&apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`

_10

export const NFT_ADDRESS = '0xBb9ebb7b8Ee75CDBf64e5cE124731A89c2BC4A07' ``

## 3. Add passkeys functionality

In the `lib` folder, create a file called `passkeys.ts`:

`_10

touch passkeys.ts`

This file will contain all the logic required to operate passkey:

- Create and recover them using the user's device.
- Store and retrieve them from/to the local storage.

**Note:** You can also store the passkeys on a remote database or the user's device.

`_80

import { PasskeyArgType, extractPasskeyData } from '@safe-global/protocol-kit'

_80

import { STORAGE_PASSKEY_LIST_KEY } from './constants'

_80

_80

/**

_80

* Create a passkey using WebAuthn API.

_80

* @returns {Promise<PasskeyArgType>} Passkey object with rawId and coordinates.

_80

* @throws {Error} If passkey creation fails.

_80

*/

_80

export async function createPasskey(): Promise<PasskeyArgType> {

_80

const displayName = 'Safe Owner' // This can be customized to match, for example, a user name.

_80

// Generate a passkey credential using WebAuthn API

_80

const passkeyCredential = await navigator.credentials.create({

_80

publicKey: {

_80

pubKeyCredParams: [

_80

{

_80

// ECDSA w/ SHA-256: https://datatracker.ietf.org/doc/html/rfc8152#section-8.1

_80

alg: -7,

_80

type: 'public-key'

_80

}

_80

],

_80

challenge: crypto.getRandomValues(new Uint8Array(32)),

_80

rp: {

_80

name: 'Safe SmartAccount'

_80

},

_80

user: {

_80

displayName,

_80

id: crypto.getRandomValues(new Uint8Array(32)),

_80

name: displayName

_80

},

_80

timeout: 60_000,

_80

attestation: 'none'

_80

}

_80

})

_80

_80

if (!passkeyCredential) {

_80

throw Error('Passkey creation failed: No credential was returned.')

_80

}

_80

_80

const passkey = await extractPasskeyData(passkeyCredential)

_80

console.log('Created Passkey:', passkey)

_80

_80

return passkey

_80

}

_80

_80

/**

_80

* Store passkey in local storage.

_80

* @param {PasskeyArgType} passkey - Passkey object with rawId and coordinates.

_80

*/

_80

export function storePasskeyInLocalStorage(passkey: PasskeyArgType) {

_80

const passkeys = loadPasskeysFromLocalStorage()

_80

_80

passkeys.push(passkey)

_80

_80

localStorage.setItem(STORAGE_PASSKEY_LIST_KEY, JSON.stringify(passkeys))

_80

}

_80

_80

/**

_80

* Load passkeys from local storage.

_80

* @returns {PasskeyArgType[]} List of passkeys.

_80

*/

_80

export function loadPasskeysFromLocalStorage(): PasskeyArgType[] {

_80

const passkeysStored = localStorage.getItem(STORAGE_PASSKEY_LIST_KEY)

_80

_80

const passkeyIds = passkeysStored ? JSON.parse(passkeysStored) : []

_80

_80

return passkeyIds

_80

}

_80

_80

/**

_80

* Get passkey object from local storage.

_80

* @param {string} passkeyRawId - Raw ID of the passkey.

_80

* @returns {PasskeyArgType} Passkey object.

_80

*/

_80

export function getPasskeyFromRawId(passkeyRawId: string): PasskeyArgType {

_80

const passkeys = loadPasskeysFromLocalStorage()

_80

_80

const passkey = passkeys.find((passkey) => passkey.rawId === passkeyRawId)!

_80

_80

return passkey

_80

}`

In this file, we have four functions:

- `createPasskey`, which helps create a new passkey.
- `storePasskeyInLocalStorage`, which helps store it in the browser's local storage.
- `loadPasskeysFromLocalStorage`, which helps load a passkey from local storage.
- `getPublicKeyFromLocalStorage`, which helps find a passkey in the local storage corresponding to a given `rawId` and returns this passkey's public key.
- `getPasskeyFromRawId`, which helps reconstruct a full passkey from a `rawId` and a public key stored in local storage.

## 4. Add mint NFT functionality

Create a `mintNFT.ts` file in the `lib` folder to add functions to prepare and send a transaction minting an NFT from our yet-to-come Safe.

`_10

touch mintNFT.ts`

Add the following code to the `mintNFT.ts` file:

`` _123

import { PasskeyArgType } from '@safe-global/protocol-kit'

_123

import { Safe4337Pack, SponsoredPaymasterOption } from '@safe-global/relay-kit'

_123

import { encodeFunctionData } from 'viem'

_123

import {

_123

BUNDLER_URL,

_123

NFT_ADDRESS,

_123

PAYMASTER_ADDRESS,

_123

PAYMASTER_URL,

_123

RPC_URL

_123

} from './constants'

_123

_123

const paymasterOptions = {

_123

isSponsored: true,

_123

paymasterAddress: PAYMASTER_ADDRESS,

_123

paymasterUrl: PAYMASTER_URL

_123

} as SponsoredPaymasterOption

_123

_123

/**

_123

* Mint an NFT.

_123

* @param {PasskeyArgType} signer - Signer object with rawId and coordinates.

_123

* @param {string} safeAddress - Safe address.

_123

* @returns {Promise<void>}

_123

* @throws {Error} If the operation fails.

_123

*/

_123

export const mintNFT = async (

_123

passkey: PasskeyArgType,

_123

safeAddress: string

_123

): Promise<string> => {

_123

// 1) Initialize Safe4337Pack

_123

const safe4337Pack = await Safe4337Pack.init({

_123

provider: RPC_URL,

_123

signer: passkey,

_123

bundlerUrl: BUNDLER_URL,

_123

paymasterOptions,

_123

options: {

_123

owners: [

_123

/* Other owners... */

_123

],

_123

threshold: 1

_123

}

_123

})

_123

_123

// 2) Create SafeOperation

_123

const mintNFTTransaction = {

_123

to: NFT_ADDRESS,

_123

data: encodeSafeMintData(safeAddress),

_123

value: '0'

_123

}

_123

_123

const safeOperation = await safe4337Pack.createTransaction({

_123

transactions: [mintNFTTransaction]

_123

})

_123

_123

// 3) Sign SafeOperation

_123

const signedSafeOperation =

_123

await safe4337Pack.signSafeOperation(safeOperation)

_123

_123

console.log('SafeOperation', signedSafeOperation)

_123

_123

// 4) Execute SafeOperation

_123

const userOperationHash = await safe4337Pack.executeTransaction({

_123

executable: signedSafeOperation

_123

})

_123

_123

return userOperationHash

_123

}

_123

_123

/**

_123

* Encodes the data for a safe mint operation.

_123

* @param to The address to mint the token to.

_123

* @param tokenId The ID of the token to mint.

_123

* @returns The encoded data for the safe mint operation.

_123

*/

_123

export function encodeSafeMintData(

_123

to: string,

_123

tokenId: bigint = getRandomUint256()

_123

): string {

_123

return encodeFunctionData({

_123

abi: [

_123

{

_123

constant: false,

_123

inputs: [

_123

{

_123

name: 'to',

_123

type: 'address'

_123

},

_123

{

_123

name: 'tokenId',

_123

type: 'uint256'

_123

}

_123

],

_123

name: 'safeMint',

_123

payable: false,

_123

stateMutability: 'nonpayable',

_123

type: 'function'

_123

}

_123

],

_123

functionName: 'safeMint',

_123

args: [to, tokenId]

_123

})

_123

}

_123

_123

/**

_123

* Generates a random 256-bit unsigned integer.

_123

*

_123

* @returns {bigint} A random 256-bit unsigned integer.

_123

*

_123

* This function uses the Web Crypto API's `crypto.getRandomValues()` method to generate

_123

* a uniformly distributed random value within the range of 256-bit unsigned integers

_123

* (from 0 to 2^256 - 1).

_123

*/

_123

function getRandomUint256(): bigint {

_123

const dest = new Uint8Array(32) // Create a typed array capable of storing 32 bytes or 256 bits

_123

_123

crypto.getRandomValues(dest) // Fill the typed array with cryptographically secure random values

_123

_123

let result = 0n

_123

for (let i = 0; i < dest.length; i++) {

_123

result |= BigInt(dest[i]) << BigInt(8 * i) // Combine individual bytes into one bigint

_123

}

_123

_123

return result

_123

} ``

With this configuration, a new Safe will be created (but not yet deployed) when a passkey is selected. This Safe will be deployed when its first transaction is executed.

**Note:** Minting an NFT was chosen here just as an example, and any other transaction would have the same effect.

## 5. Add UI components

Let's add a user interface to create and store a passkey on the user's device, deploy a safe, and sign the NFT transaction.

Create a `components` folder at the project root with a file named `LoginWithPasskey.tsx`:

`_10

cd ..

_10

mkdir components

_10

cd components

_10

touch LoginWithPasskey.tsx`

Add the following code to the `LoginWithPasskey.tsx` file:

`_72

import FingerprintIcon from '@mui/icons-material/Fingerprint'

_72

import { Button, Divider, Paper, Stack, Typography } from '@mui/material'

_72

import { PasskeyArgType } from '@safe-global/protocol-kit'

_72

import { loadPasskeysFromLocalStorage } from '../lib/passkeys'

_72

_72

type props = {

_72

handleCreatePasskey: () => {}

_72

handleSelectPasskey: (passkey: PasskeyArgType) => {}

_72

}

_72

_72

function LoginWithPasskey({ handleCreatePasskey, handleSelectPasskey }: props) {

_72

return (

_72

<Paper

_72

sx={{

_72

margin: '32px auto 0'

_72

}}

_72

>

_72

<Stack padding={4}>

_72

<Typography textAlign={'center'} variant="h1" color={'primary'}>

_72

Use Safe Account via Passkeys

_72

</Typography>

_72

_72

<Typography

_72

textAlign={'center'}

_72

marginBottom={8}

_72

marginTop={8}

_72

variant="h4"

_72

>

_72

Create a new Safe using passkeys

_72

</Typography>

_72

_72

<Button

_72

onClick={handleCreatePasskey}

_72

startIcon={<FingerprintIcon />}

_72

variant="outlined"

_72

sx={{ marginBottom: '24px' }}

_72

>

_72

Create a new passkey

_72

</Button>

_72

_72

<Divider sx={{ marginTop: '32px' }}>

_72

<Typography variant="caption" color="GrayText">

_72

OR

_72

</Typography>

_72

</Divider>

_72

_72

<Typography

_72

textAlign={'center'}

_72

marginBottom={8}

_72

marginTop={8}

_72

variant="h4"

_72

>

_72

Connect existing Safe using an existing passkey

_72

</Typography>

_72

_72

<Button

_72

startIcon={<FingerprintIcon />}

_72

variant="contained"

_72

onClick={async () => {

_72

const passkeys = loadPasskeysFromLocalStorage()

_72

_72

handleSelectPasskey(passkeys[0])

_72

}}

_72

>

_72

Use an existing passkey

_72

</Button>

_72

</Stack>

_72

</Paper>

_72

)

_72

}

_72

_72

export default LoginWithPasskey`

This component is an authentication modal allowing users to either signing in by creating a new passkey, or logging in with an existing one.

Next, create a `SafeAccountDetails.tsx` file in the same folder:

`_10

touch SafeAccountDetails.tsx`

Add the following code to the `SafeAccountDetails.tsx` file:

`` _177

import OpenInNewIcon from '@mui/icons-material/OpenInNew'

_177

import PhotoIcon from '@mui/icons-material/Photo'

_177

import {

_177

Button,

_177

CircularProgress,

_177

Link,

_177

Paper,

_177

Stack,

_177

Tooltip,

_177

Typography

_177

} from '@mui/material'

_177

import { PasskeyArgType } from '@safe-global/protocol-kit'

_177

import { Safe4337Pack } from '@safe-global/relay-kit'

_177

import Image from 'next/image'

_177

import { useCallback, useEffect, useState } from 'react'

_177

import { BUNDLER_URL, CHAIN_NAME, RPC_URL } from '../lib/constants'

_177

import { mintNFT } from '../lib/mintNFT'

_177

import SafeLogo from '../public/safeLogo.png'

_177

_177

type props = {

_177

passkey: PasskeyArgType

_177

}

_177

_177

function SafeAccountDetails({ passkey }: props) {

_177

const [isLoading, setIsLoading] = useState<boolean>(true)

_177

const [safeAddress, setSafeAddress] = useState<string>()

_177

const [isSafeDeployed, setIsSafeDeployed] = useState<boolean>()

_177

const [userOp, setUserOp] = useState<string>()

_177

_177

const showSafeInfo = useCallback(async () => {

_177

setIsLoading(true)

_177

_177

const safe4337Pack = await Safe4337Pack.init({

_177

provider: RPC_URL,

_177

signer: passkey,

_177

bundlerUrl: BUNDLER_URL,

_177

options: {

_177

owners: [],

_177

threshold: 1

_177

}

_177

})

_177

_177

const safeAddress = await safe4337Pack.protocolKit.getAddress()

_177

const isSafeDeployed = await safe4337Pack.protocolKit.isSafeDeployed()

_177

_177

setSafeAddress(safeAddress)

_177

setIsSafeDeployed(isSafeDeployed)

_177

setIsLoading(false)

_177

}, [passkey])

_177

_177

useEffect(() => {

_177

showSafeInfo()

_177

}, [showSafeInfo])

_177

_177

async function handleMintNFT() {

_177

setIsLoading(true)

_177

_177

const userOp = await mintNFT(passkey, safeAddress!)

_177

_177

setIsLoading(false)

_177

setIsSafeDeployed(true)

_177

setUserOp(userOp)

_177

}

_177

_177

const safeLink = `https://app.safe.global/home?safe=sep:${safeAddress}`

_177

const jiffscanLink = `https://jiffyscan.xyz/userOpHash/${userOp}?network=${CHAIN_NAME}`

_177

_177

return (

_177

<Paper sx={{ margin: '32px auto 0', minWidth: '320px' }}>

_177

<Stack padding={4} alignItems={'center'}>

_177

<Typography textAlign={'center'} variant="h1" color={'primary'}>

_177

Your Safe Account

_177

</Typography>

_177

_177

{isLoading || !safeAddress ? (

_177

<CircularProgress sx={{ margin: '24px 0' }} />

_177

) : (

_177

<>

_177

<Typography textAlign={'center'}>

_177

<Link

_177

href={safeLink}

_177

target="_blank"

_177

underline="hover"

_177

color="text"

_177

>

_177

<Tooltip title={safeAddress}>

_177

<Stack

_177

component={'span'}

_177

padding={4}

_177

direction={'row'}

_177

alignItems={'center'}

_177

>

_177

<Image

_177

width={32}

_177

src={SafeLogo}

_177

alt={'safe account logo'}

_177

/>

_177

<span style={{ margin: '0 8px' }}>

_177

{splitAddress(safeAddress)}

_177

</span>

_177

<OpenInNewIcon />

_177

</Stack>

_177

</Tooltip>

_177

</Link>

_177

</Typography>

_177

_177

{!isSafeDeployed && <PendingDeploymentLabel />}

_177

_177

<Button

_177

onClick={handleMintNFT}

_177

startIcon={<PhotoIcon />}

_177

variant="outlined"

_177

sx={{ margin: '24px' }}

_177

>

_177

Mint NFT

_177

</Button>

_177

_177

{userOp && (

_177

<Typography textAlign={'center'}>

_177

<Link

_177

href={jiffscanLink}

_177

target="_blank"

_177

underline="hover"

_177

color="text"

_177

>

_177

<Stack

_177

component={'span'}

_177

padding={4}

_177

direction={'row'}

_177

alignItems={'center'}

_177

>

_177

{userOp}

_177

<OpenInNewIcon />

_177

</Stack>

_177

</Link>

_177

</Typography>

_177

)}

_177

</>

_177

)}

_177

</Stack>

_177

</Paper>

_177

)

_177

}

_177

_177

export default SafeAccountDetails

_177

_177

const DEFAULT_CHAR_DISPLAYED = 6

_177

_177

function splitAddress(

_177

address: string,

_177

charDisplayed: number = DEFAULT_CHAR_DISPLAYED

_177

): string {

_177

const firstPart = address.slice(0, charDisplayed)

_177

const lastPart = address.slice(address.length - charDisplayed)

_177

_177

return `${firstPart}...${lastPart}`

_177

}

_177

_177

function PendingDeploymentLabel() {

_177

return (

_177

<div style={{ margin: '12px auto' }}>

_177

<span

_177

style={{

_177

marginRight: '8px',

_177

borderRadius: '4px',

_177

padding: '4px 12px',

_177

border: '1px solid rgb(255, 255, 255)',

_177

whiteSpace: 'nowrap',

_177

backgroundColor: 'rgb(240, 185, 11)',

_177

color: 'rgb(0, 20, 40)'

_177

}}

_177

>

_177

Deployment pending

_177

</span>

_177

</div>

_177

)

_177

} ``

This component displays the details of the Safe account, including the Safe address, whether it is deployed, and a button to mint the NFT.

Still in the `components` folder, create a file `SafeThemeProvider.tsx`. This file will provide the Safe theme to the app using Material UI:

`_10

touch SafeThemeProvider.tsx`

Add the following code to the `SafeThemeProvider.tsx` file:

`` _130

import { ThemeProvider, useMediaQuery, type Theme } from '@mui/material'

_130

import type { Shadows } from '@mui/material/styles'

_130

import { createTheme } from '@mui/material/styles'

_130

import type { TypographyOptions } from '@mui/material/styles/createTypography'

_130

import { type FC } from 'react'

_130

_130

// This component is necessary to make the theme available in the library components

_130

// Is not enough wrapping the client app with the regular ThemeProvider as the library components

_130

// are not aware of the theme context:

_130

// https://github.com/mui/material-ui/issues/32806

_130

// https://stackoverflow.com/questions/69072004/material-ui-theme-not-working-in-shared-component

_130

type SafeThemeProviderProps = {

_130

children: (safeTheme: Theme) => JSX.Element

_130

}

_130

_130

const SafeThemeProvider: FC<SafeThemeProviderProps> = ({ children }) => {

_130

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

_130

_130

const theme = createSafeTheme(prefersDarkMode)

_130

_130

return <ThemeProvider theme={theme}>{children(theme)}</ThemeProvider>

_130

}

_130

_130

export default SafeThemeProvider

_130

_130

const createSafeTheme = (prefersDarkMode: boolean): Theme => {

_130

const colors = prefersDarkMode ? darkPalette : lightPalette

_130

const shadowColor = colors.primary.light

_130

_130

return createTheme({

_130

palette: {

_130

mode: prefersDarkMode ? 'dark' : 'light',

_130

...colors

_130

},

_130

shape: {

_130

borderRadius: 6

_130

},

_130

shadows: [

_130

'none',

_130

prefersDarkMode

_130

? `0 0 2px ${shadowColor}`

_130

: `0 1px 4px ${shadowColor}0a, 0 4px 10px ${shadowColor}14`,

_130

prefersDarkMode

_130

? `0 0 2px ${shadowColor}`

_130

: `0 1px 4px ${shadowColor}0a, 0 4px 10px ${shadowColor}14`,

_130

prefersDarkMode

_130

? `0 0 2px ${shadowColor}`

_130

: `0 2px 20px ${shadowColor}0a, 0 8px 32px ${shadowColor}14`,

_130

prefersDarkMode

_130

? `0 0 2px ${shadowColor}`

_130

: `0 8px 32px ${shadowColor}0a, 0 24px 60px ${shadowColor}14`,

_130

...Array(20).fill('none')

_130

] as Shadows,

_130

typography,

_130

components: {

_130

MuiButton: {

_130

styleOverrides: {

_130

sizeMedium: {

_130

fontSize: '16px',

_130

padding: '12px 24px'

_130

},

_130

root: ({ theme }) => ({

_130

borderRadius: theme.shape.borderRadius,

_130

fontWeight: 'bold',

_130

lineHeight: 1.25,

_130

borderColor: theme.palette.primary.main,

_130

textTransform: 'none',

_130

'&:hover': {

_130

boxShadow: 'none'

_130

}

_130

}),

_130

outlined: {

_130

border: '2px solid',

_130

'&:hover': {

_130

border: '2px solid'

_130

}

_130

}

_130

}

_130

},

_130

MuiPaper: {

_130

styleOverrides: {

_130

root: {

_130

backgroundColor: prefersDarkMode ? 'background.default' : '#eeeeee'

_130

}

_130

}

_130

}

_130

}

_130

})

_130

}

_130

_130

const safeFontFamily = 'DM Sans, sans-serif'

_130

_130

const typography: TypographyOptions = {

_130

fontFamily: safeFontFamily,

_130

h1: {

_130

fontSize: '32px',

_130

lineHeight: '36px',

_130

fontWeight: 700

_130

},

_130

h4: {

_130

fontSize: '20px',

_130

lineHeight: '26px'

_130

}

_130

}

_130

_130

const darkPalette = {

_130

text: {

_130

primary: '#FFFFFF',

_130

secondary: '#636669',

_130

disabled: '#636669'

_130

},

_130

primary: {

_130

dark: '#0cb259',

_130

main: '#12FF80',

_130

light: '#A1A3A7'

_130

}

_130

}

_130

_130

const lightPalette = {

_130

text: {

_130

primary: '#000000',

_130

secondary: '#636669',

_130

disabled: '#636669'

_130

},

_130

primary: {

_130

dark: '#0cb259',

_130

main: '#12FF80',

_130

light: '#A1A3A7'

_130

}

_130

} ``

Lastly, replace the content of the `page.tsx` file, within the `app` folder, with this code:

`_45

'use client'

_45

_45

import type { Theme } from '@mui/material/styles'

_45

import { ThemeProvider } from '@mui/material/styles'

_45

import { PasskeyArgType } from '@safe-global/protocol-kit'

_45

import { useState } from 'react'

_45

_45

import LoginWithPasskey from '@/components/LoginWithPasskey'

_45

import SafeAccountDetails from '@/components/SafeAccountDetails'

_45

import SafeThemeProvider from '../components/SafeThemeProvider'

_45

import { createPasskey, storePasskeyInLocalStorage } from '../lib/passkeys'

_45

_45

function Create4337SafeAccount() {

_45

const [selectedPasskey, setSelectedPasskey] = useState<PasskeyArgType>()

_45

_45

async function handleCreatePasskey() {

_45

const passkey = await createPasskey()

_45

_45

storePasskeyInLocalStorage(passkey)

_45

setSelectedPasskey(passkey)

_45

}

_45

_45

async function handleSelectPasskey(passkey: PasskeyArgType) {

_45

setSelectedPasskey(passkey)

_45

}

_45

_45

return (

_45

<SafeThemeProvider>

_45

{(safeTheme: Theme) => (

_45

<ThemeProvider theme={safeTheme}>

_45

{selectedPasskey ? (

_45

<SafeAccountDetails passkey={selectedPasskey} />

_45

) : (

_45

<LoginWithPasskey

_45

handleCreatePasskey={handleCreatePasskey}

_45

handleSelectPasskey={handleSelectPasskey}

_45

/>

_45

)}

_45

</ThemeProvider>

_45

)}

_45

</SafeThemeProvider>

_45

)

_45

}

_45

_45

export default Create4337SafeAccount`

This UI will put everything we built in the previous steps into a coherent application with all the functionality required to let you create a passkey, select it, and use it to sign a transaction.

## 6. Add styling

Because a web app is nothing without good styling, let's add some Safe design to our project 💅.

Still within the `app` folder, replace the existing content of the file `layout.tsx` with this code:

`_73

import type { Metadata } from 'next'

_73

import { Inter } from 'next/font/google'

_73

_73

import ExternalLink from '../public/external-link.svg'

_73

import Github from '../public/github.svg'

_73

import Safe from '../public/safe.svg'

_73

import './globals.css'

_73

_73

const inter = Inter({ subsets: ['latin'] })

_73

_73

export const metadata: Metadata = {

_73

title: 'Safe Tutorial: Passkeys',

_73

description: 'Generated by create next app'

_73

}

_73

_73

export default function RootLayout({

_73

children

_73

}: Readonly<{

_73

children: React.ReactNode

_73

}>) {

_73

return (

_73

<html lang="en">

_73

<body className={inter.className}>

_73

<nav

_73

style={{

_73

display: 'flex',

_73

justifyContent: 'space-between',

_73

padding: '1rem'

_73

}}

_73

>

_73

<a href="https://safe.global">

_73

<Safe width={95} height={36} />

_73

</a>

_73

<div style={{ display: 'flex' }}>

_73

<a

_73

href="https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial"

_73

style={{

_73

display: 'flex',

_73

alignItems: 'center',

_73

marginRight: '1rem'

_73

}}

_73

target="_blank"

_73

rel="noopener noreferrer"

_73

>

_73

Read tutorial <ExternalLink style={{ marginLeft: '0.5rem' }} />

_73

</a>

_73

<a

_73

href="https://github.com/5afe/safe-passkeys-tutorial"

_73

style={{ display: 'flex', alignItems: 'center' }}

_73

target="_blank"

_73

rel="noopener noreferrer"

_73

>

_73

View on GitHub{' '}

_73

<Github width={24} height={24} style={{ marginLeft: '0.5rem' }} />

_73

</a>

_73

</div>

_73

</nav>

_73

<div

_73

style={{

_73

display: 'flex',

_73

alignItems: 'center',

_73

justifyContent: 'space-between',

_73

marginLeft: '40px',

_73

marginRight: '40px',

_73

flexDirection: 'column'

_73

}}

_73

>

_73

{children}

_73

</div>

_73

</body>

_73

</html>

_73

)

_73

}`

In the same folder, replace the `globals.css` file with this code:

`_58

html,

_58

body {

_58

max-width: 100vw;

_58

overflow-x: hidden;

_58

}

_58

_58

body {

_58

color: rgb(var(--foreground-rgb));

_58

background: linear-gradient(

_58

to bottom,

_58

transparent,

_58

rgb(var(--background-end-rgb))

_58

)

_58

rgb(var(--background-start-rgb));

_58

}

_58

_58

a {

_58

color: inherit;

_58

text-decoration: none;

_58

}

_58

_58

@media (prefers-color-scheme: dark) {

_58

html {

_58

color-scheme: dark;

_58

}

_58

svg {

_58

fill: white;

_58

}

_58

}

_58

_58

h1,

_58

h2,

_58

h3 {

_58

margin-top: 40px;

_58

margin-bottom: 10px;

_58

}

_58

_58

button {

_58

cursor: pointer;

_58

border: none;

_58

background: #00e673;

_58

color: black;

_58

padding: 10px 20px;

_58

border-radius: 5px;

_58

margin: 10px 0;

_58

}

_58

_58

input {

_58

padding: 10px;

_58

border-radius: 5px;

_58

border: 1px solid #ccc;

_58

margin: 10px 0;

_58

}

_58

_58

button:disabled {

_58

background: #ccc;

_58

color: #666;

_58

}`

To add some icons to the app, we will need to edit the `next.config.mjs` file at the root of the project to load SVG files:

`_36

/** @type {import('next').NextConfig} */

_36

const nextConfig = {

_36

webpack (config, { isServer }) {

_36

// Configures webpack to handle SVG files with SVGR. SVGR optimizes and transforms SVG files

_36

// into React components. See https://react-svgr.com/docs/next/

_36

_36

// Grab the existing rule that handles SVG imports

_36

// @ts-ignore - rules is a private property that is not typed

_36

const fileLoaderRule = config.module.rules.find(rule =>

_36

rule.test?.test?.('.svg')

_36

)

_36

_36

config.module.rules.push(

_36

// Reapply the existing rule, but only for svg imports ending in ?url

_36

{

_36

...fileLoaderRule,

_36

test: /\.svg$/i,

_36

resourceQuery: /url/ // *.svg?url

_36

},

_36

// Convert all other *.svg imports to React components

_36

{

_36

test: /\.svg$/i,

_36

issuer: fileLoaderRule.issuer,

_36

resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url

_36

use: ['@svgr/webpack']

_36

}

_36

)

_36

_36

// Modify the file loader rule to ignore *.svg, since we have it handled now.

_36

fileLoaderRule.exclude = /\.svg$/i

_36

_36

return config

_36

}

_36

}

_36

_36

export default nextConfig`

Finally, create a `public` folder, with four icons: [`safe.svg` (opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial/blob/main/public/safe.svg), [`github.svg` (opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial/blob/main/public/github.svg/), [`external-link.svg` (opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial/blob/main/public/external-link.svg), [`safeLogo.png` (opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial/blob/main/public/safeLogo.png)

## Testing your Safe passkeys app

That's it! You can find the source code for the example created in this tutorial [on GitHub (opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial). You can now return to your browser and see the app displayed 🎉.

![safe-passkeys-app-1.png](/_next/static/media/safe-passkeys-app-1.1c1288ac.png)

Click the **Create a new passkey** button to prompt a browser pop-up asking you to confirm the creation of a new passkey. This passkey will be stored in your browser's local storage and displayed in the list above the button.

This will create a new Safe object in the background, which will be deployed when you click the **Mint NFT** button. This will also mint an NFT using the passkey you created.

![safe-passkeys-app-3.png](/_next/static/media/safe-passkeys-app-3.9b314914.png)

Click the link to Jiffy Scan to see the UserOp that was sent and more complete information.

## Best practices

Please be mindful of certain security considerations when dealing with passkeys. For the tutorial's simplicity, we created a 1/1 Safe with a passkey as the sole signer. This is not recommended for production setups, as passkeys are tied to a domain name, and they can also be tied to hardware manufacturers. For that reason, they might become inaccessible if not configured or saved properly.

**Note:** Please always use a combination of passkeys and other authentication methods to ensure the security of your users' assets.

## Do more with Safe and passkeys

We learned how to use passkeys (create them, store them, and use them securely) and how they can interact with a Safe (deploy it and send transactions). We hope you enjoyed this tutorial and that the combination of passkeys and the ERC-4337 will unlock new forms of ownership for your project and users.

You can now integrate passkeys with more transactions and functionalities of the Safe ecosystem. You can read more about passkeys in our [overview](/advanced/passkeys/overview) or in the [WebAuthn API documentation (opens in a new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).

Did you encounter any difficulties? Let us know by opening [an issue (opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial/issues/new) or asking a question on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the `safe-core` tag.

Supported Networks[Build a Vue app with Safe and passkeys](/advanced/passkeys/tutorials/nuxt "Build a Vue app with Safe and passkeys")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- How to build a React app with Safe and passkeys
  - What you'll need
  - 1. Setup a Next.js application
    - Install dependencies
    - Run the development server
  - 2. Add project constants and utilities
  - 3. Add passkeys functionality
  - 4. Add mint NFT functionality
  - 5. Add UI components
  - 6. Add styling
  - Testing your Safe passkeys app
  - Best practices
  - Do more with Safe and passkeys

---

## Related Links

### Internal Links

- [Safe{Core} SDK](https://docs.safe.global/sdk/overview)
- [passkeys](https://docs.safe.global/advanced/passkeys/overview)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [ERC-4337](https://docs.safe.global/advanced/erc-4337/overview)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial](https://docs.safe.global/home/passkeys-tutorials/safe-passkeys-tutorial)
- [overview](https://docs.safe.global/advanced/passkeys/overview)
- [Build a Vue app with Safe and passkeys](https://docs.safe.global/advanced/passkeys/tutorials/nuxt)

### External Links

- [Pimlico(opens in a new tab)](https://www.pimlico.io)
- [Next.js(opens in a new tab)](https://nextjs.org/docs)
- [React(opens in a new tab)](https://react.dev/learn)
- [Node.js(opens in a new tab)](https://nodejs.org/en/download/package-manager)
- [pnpm(opens in a new tab)](https://pnpm.io/installation)
- [Pimlico(opens in a new tab)](https://www.pimlico.io)
- [check out the GitHub repository(opens in a new tab)](https://github.com/5afe/safe-passkeys-tutorial)
- [viem(opens in a new tab)](https://www.npmjs.com/package/viem)
- [@mui/material(opens in a new tab)](https://mui.com/material-ui)
- [@svgr/webpack(opens in a new tab)](https://www.npmjs.com/package/@svgr/webpack)

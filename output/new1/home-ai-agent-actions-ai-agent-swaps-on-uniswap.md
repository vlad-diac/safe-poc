---
title: AI agent swaps on Uniswap – Safe Docs
url: https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# AI agent swaps on Uniswap – Safe Docs

Home

Action Guides

AI agent swaps on Uniswap

# AI agent swaps on Uniswap

You can find a working code example to run locally in our [example repository (opens in a new tab)](https://github.com/5afe/safe-uniswap-example).

## Requirements

- A deployed Safe Smart Account
- The AI agent is a signer on the Safe
- This example assumes, that the threshold of the Safe Smart Account is one, so the AI agent can sign autonomously.
  If you require more signatures, you have to collect those signatures programmatically of with the [Safe Wallet (opens in a new tab)](https://app.safe.global/).
- This guide assumes the Safe owns WETH.
  The example repository shows how to swap ETH to WETH.

## Swap on Uniswap

Here is a quick guide to get you up and running:

### Setup the Safe Smart Account

Your Safe Smart Account should be deployed.
Now, initialize an instance with the Safe [Protocol Kit](/sdk/protocol-kit):

`_10

import Safe from "@safe-global/protocol-kit";

_10

_10

const preExistingSafe = await Safe.init({

_10

provider: RPC_URL,

_10

signer: AGENT_PRIVATE_KEY,

_10

safeAddress: SAFE_ADDRESS,

_10

});`

### Fetch Uniswap pool data

First, you have to fetch the pool data from Uniswap.
This data provides information about the liquidity at the current and at other prices.
Uniswap has a unique [Pricing Math (opens in a new tab)](https://docs.uniswap.org/contracts/v3/reference/core/libraries/SqrtPriceMath).

`_26

import {

_26

Address,

_26

createPublicClient,

_26

createWalletClient,

_26

defineChain,

_26

encodeFunctionData,

_26

http,

_26

PublicClient,

_26

} from "viem";

_26

_26

// Fetch slot0 data (current price, tick, etc.)

_26

const slot0 = (await publicClient.readContract({

_26

address: poolAddress,

_26

abi: POOL_ABI,

_26

functionName: "slot0",

_26

})) as any;

_26

_26

// Fetch liquidity

_26

const liquidity = (await publicClient.readContract({

_26

address: poolAddress,

_26

abi: POOL_ABI,

_26

functionName: "liquidity",

_26

})) as any;

_26

_26

const sqrtPriceX96 = BigInt(slot0[0]);

_26

const tick = slot0[1];`

### Execute Swap

Now, you can setup your Safe Smart Account and send a swap transaction to Uniswap:

`` _104

import {

_104

FeeAmount,

_104

Pool,

_104

Route,

_104

SwapRouter,

_104

CurrencyAmount,

_104

TradeType,

_104

Percent

_104

} from "@uniswap/v3-sdk";

_104

import { Token, SwapOptions } from "@uniswap/sdk-core";

_104

import JSBI from "jsbi";

_104

import { OperationType, MetaTransactionData } from "@safe-global/types-kit";

_104

_104

// Set up viem clients and accounts

_104

const account = privateKeyToAccount(AGENT_PRIVATE_KEY as `0x${string}`);

_104

_104

const publicClient = createPublicClient({

_104

transport: http(RPC_URL!)

_104

});

_104

const walletClient = createWalletClient({

_104

transport: http(RPC_URL!)

_104

});

_104

_104

const chainId = (await publicClient.getChainId());

_104

_104

// Example Values for WETH/USDC Uniswap Pool on Sepolia:

_104

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

_104

const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

_104

const USDC_ETH_POOL_ADDRESS = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";

_104

const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 Router

_104

const INPUT_AMOUNT = "100000000000"; // Amount of ETH to swap to USDC

_104

const OUTOUT_AMOUNT = "0"; // 0 USDC

_104

_104

// Define token details

_104

const USDC = new Token(chainId, USDC_ADDRESS, 6, "USDC", "USD Coin");

_104

const WETH = new Token(chainId, WETH_ADDRESS, 18, "WETH", "Wrapped Ether");

_104

_104

const callDataApprove = encodeFunctionData({

_104

abi: WETH_ABI,

_104

functionName: "approve",

_104

args: [SWAP_ROUTER_ADDRESS, INPUT_AMOUNT],

_104

});

_104

_104

const safeApproveTx: MetaTransactionData = {

_104

to: WETH_ADDRESS,

_104

value: "0",

_104

data: callDataApprove,

_104

operation: OperationType.Call,

_104

};

_104

_104

const options: SwapOptions = {

_104

slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%

_104

deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time

_104

recipient: SAFE_ADDRESS,

_104

};

_104

_104

const poolInfo = await fetchPoolData(publicClient, USDC_ETH_POOL_ADDRESS);

_104

_104

// Create the pool object

_104

const pool = new Pool(

_104

WETH,

_104

USDC,

_104

FeeAmount.MEDIUM,

_104

JSBI.BigInt(poolInfo.sqrtPriceX96.toString()),

_104

JSBI.BigInt(poolInfo.liquidity.toString()),

_104

poolInfo.tick

_104

);

_104

_104

const swapRoute = new Route([pool], WETH, USDC);

_104

_104

const uncheckedTrade = Trade.createUncheckedTrade({

_104

tradeType: TradeType.EXACT_INPUT,

_104

route: swapRoute,

_104

inputAmount: CurrencyAmount.fromRawAmount(WETH,

_104

INPUT_AMOUNT

_104

),

_104

outputAmount: CurrencyAmount.fromRawAmount(USDC, OUTOUT_AMOUNT),

_104

});

_104

_104

const methodParameters = SwapRouter.swapCallParameters(

_104

[uncheckedTrade],

_104

options

_104

);

_104

_104

const safeSwapTx: MetaTransactionData = {

_104

to: SWAP_ROUTER_ADDRESS,

_104

value: methodParameters.value,

_104

data: methodParameters.calldata,

_104

operation: OperationType.Call,

_104

};

_104

_104

const safeTx = await preExistingSafe.createTransaction({

_104

transactions: [safeApproveTx, safeSwapTx],

_104

onlyCalls: true,

_104

});

_104

_104

// You might need to collect more signatures here, depending on the threshold

_104

_104

const txResponse = await preExistingSafe.executeTransaction(safeTx);

_104

await publicClient.waitForTransactionReceipt({

_104

hash: txResponse.hash as `0x${string}`,

_104

});

_104

_104

console.log(`Deposit and approve transaction: [${txResponse.hash}]`); ``

Now your AI agent executed a swap on Uniswap.

## Next steps

You can find more information about Swaps on Uniswap in their [docs about swaps (opens in a new tab)](https://docs.uniswap.org/contracts/v4/quickstart/swap).

If you have a technical question about Safe Smart Accounts, feel free to reach out on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the safe-core tag.

[AI agent swaps on CoW Swap](/home/ai-agent-actions/ai-agent-swaps-with-cow-swap "AI agent swaps on CoW Swap")[Glossary](/home/glossary "Glossary")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- AI agent swaps on Uniswap
  - Requirements
  - Swap on Uniswap
    - Setup the Safe Smart Account
    - Fetch Uniswap pool data
    - Execute Swap
  - Next steps

---

## Related Links

### Internal Links

- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap)
- [AI agent swaps on CoW Swap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap)
- [Glossary](https://docs.safe.global/home/glossary)

### External Links

- [example repository(opens in a new tab)](https://github.com/5afe/safe-uniswap-example)
- [Safe Wallet(opens in a new tab)](https://app.safe.global)
- [Pricing Math(opens in a new tab)](https://docs.uniswap.org/contracts/v3/reference/core/libraries/SqrtPriceMath)
- [docs about swaps(opens in a new tab)](https://docs.uniswap.org/contracts/v4/quickstart/swap)
- [Stack Exchange(opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

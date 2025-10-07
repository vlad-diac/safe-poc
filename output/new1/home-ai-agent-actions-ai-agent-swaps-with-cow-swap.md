---
title: AI agent swaps on CoW Swap – Safe Docs
url: https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# AI agent swaps on CoW Swap – Safe Docs

Home

Action Guides

AI agent swaps on CoW Swap

# AI agent swaps on CoW Swap

CoW swap ensures best prices and fastest execution and minimizes MEV.

You can find a working code example to run locally in our [AI agent with Safe Smart Account CoW Swap example repository (opens in a new tab)](https://github.com/5afe/safe-cowswap).

Here is a quick guide to get you up and running:

## Requirements

- A deployed Safe Smart Account
- The AI agent is a signer on the Safe
- This example assumes, that the threshold of the Safe Smart Account is one, so the AI agent can sign autonomously.
  If you require more signatures, you have to collect those signatures programmatically of with the [Safe Wallet (opens in a new tab)](https://app.safe.global/).

## Let your AI agent send an intent

### Setup the Safe Smart Account

Your Safe Smart Account should be deployed.
Now, initialize an instance with the [Protocol Kit](/sdk/protocol-kit):

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

### Send swap intent

Now, you can use the CoW Swap SDK to assemble a transaction that you can sign and execute with your Safe Smart Account.
The swap will then be executed.

Please be aware that the CoW Swap's SDK uses Ethers, while Safe's SDK use viem.
You will see some warnings in the logs, but the code works nonetheless.

In this example, we buy COW and pay with WETH.

`` _78

import {

_78

SwapAdvancedSettings,

_78

TradeParameters,

_78

TradingSdk,

_78

SupportedChainId,

_78

OrderKind,

_78

SigningScheme,

_78

} from "@cowprotocol/cow-sdk";

_78

import { VoidSigner } from "@ethersproject/abstract-signer";

_78

import { JsonRpcProvider } from "@ethersproject/providers";

_78

_78

const traderParams = {

_78

chainId: SupportedChainId.SEPOLIA,

_78

signer: new VoidSigner(

_78

smartContractWalletAddress: SAFE_ADDRESS,

_78

new JsonRpcProvider("https://sepolia.gateway.tenderly.co")

_78

),

_78

appCode: "awesome-app",

_78

};

_78

_78

const cowSdk = new TradingSdk(traderParams, { logs: false });

_78

_78

const parameters: TradeParameters = {

_78

kind: OrderKind.SELL,

_78

sellToken: WETH_ADDRESS,

_78

sellTokenDecimals: 18,

_78

buyToken: COW_ADDRESS,

_78

buyTokenDecimals: 18,

_78

amount: INPUT_AMOUNT,

_78

};

_78

_78

const advancedParameters: SwapAdvancedSettings = {

_78

quoteRequest: {

_78

// Specify the signing scheme

_78

signingScheme: SigningScheme.PRESIGN,

_78

},

_78

};

_78

_78

const orderId = await cowSdk.postSwapOrder(parameters, advancedParameters);

_78

_78

console.log(`Order ID: [${orderId}]`);

_78

_78

const preSignTransaction = await cowSdk.getPreSignTransaction({

_78

orderId,

_78

account: smartContractWalletAddress,

_78

});

_78

_78

const customChain = defineChain({

_78

...sepolia,

_78

name: "custom chain",

_78

transport: http(RPC_URL),

_78

});

_78

_78

const publicClient = createPublicClient({

_78

chain: customChain,

_78

transport: http(RPC_URL),

_78

});

_78

_78

const safePreSignTx: MetaTransactionData = {

_78

to: preSignTransaction.to,

_78

value: preSignTransaction.value,

_78

data: preSignTransaction.data,

_78

operation: OperationType.Call,

_78

};

_78

_78

const safeTx = await preExistingSafe.createTransaction({

_78

transactions: [safePreSignTx],

_78

onlyCalls: true,

_78

});

_78

_78

// You might need to collect more signatures here

_78

_78

const txResponse = await preExistingSafe.executeTransaction(safeTx);

_78

console.log(`Sent tx hash: [${txResponse.hash}]`);

_78

console.log("Waiting for the tx to be mined");

_78

await publicClient.waitForTransactionReceipt({

_78

hash: txResponse.hash as `0x${string}`,

_78

}); ``

## Next steps

Now, where your AI agent can execute trades autonomously, you are free to use this power as you like.
You can find more specific information in the [CoW Swap Trading SDK docs (opens in a new tab)](https://github.com/cowprotocol/cow-sdk/tree/main/src/trading#readme).

If you have a technical question about Safe Smart Accounts, feel free to reach out on [Stack Exchange (opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core) with the safe-core tag.

[Introduction](/home/ai-agent-actions/introduction "Introduction")[AI agent swaps on Uniswap](/home/ai-agent-actions/ai-agent-swaps-on-uniswap "AI agent swaps on Uniswap")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- AI agent swaps on CoW Swap
  - Requirements
  - Let your AI agent send an intent
    - Setup the Safe Smart Account
    - Send swap intent
  - Next steps

---

## Related Links

### Internal Links

- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap)
- [https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-with-cow-swap)
- [Introduction](https://docs.safe.global/home/ai-agent-actions/introduction)
- [AI agent swaps on Uniswap](https://docs.safe.global/home/ai-agent-actions/ai-agent-swaps-on-uniswap)

### External Links

- [AI agent with Safe Smart Account CoW Swap example repository(opens in a new tab)](https://github.com/5afe/safe-cowswap)
- [Safe Wallet(opens in a new tab)](https://app.safe.global)
- [CoW Swap Trading SDK docs(opens in a new tab)](https://github.com/cowprotocol/cow-sdk/tree/main/src/trading)
- [Stack Exchange(opens in a new tab)](https://ethereum.stackexchange.com/questions/tagged/safe-core)
- [Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

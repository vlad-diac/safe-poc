---
title: Safe4337Pack – Safe Docs
url: https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack
description: Safe{Core} is an open-source and modular account abstraction stack. Learn about its features and how to use it.
---

# Safe4337Pack – Safe Docs

SDK

[Relay Kit](/sdk/relay-kit)

Reference

Safe4337Pack

# Safe4337Pack

The `Safe4337Pack` enables Safe accounts to interact with user operations through the implementation of the `RelayKitBasePack`. You can find more about ERC-4337 at [this link (opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337).

## Install dependencies

To use `Safe4337Pack` in your project, start by installing the `relay-kit` package with this command:

`_10

yarn add @safe-global/relay-kit`

## Reference

The `Safe4337Pack` class make easy to use the [Safe 4337 Module (opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/4337/contracts/Safe4337Module.sol) with your Safe. It enables creating, signing, and executing transactions grouped in user operations using a selected provider. You can select your preferred [bundler (opens in a new tab)](https://www.erc4337.io/docs/bundlers/introduction) and [paymaster (opens in a new tab)](https://www.erc4337.io/docs/paymasters/introduction).

`_10

const safe4337Pack = await Safe4337Pack.init({

_10

provider,

_10

signer,

_10

bundlerUrl,

_10

safeModulesVersion,

_10

customContracts,

_10

options,

_10

paymasterOptions

_10

})`

### `init(safe4337InitOptions)`

The static method `init()` generates an instance of `Safe4337Pack`. Use this method to create the initial instance instead of the regular constructor.

ℹ️

We have added support for then Entrypoint v0.7 contract but we are not making it the default yet.
If you are using Entrypoint v0.7, you need to set the `safeModuleVersion` to `0.3.0` when calling the `Safe4337Pack.init` method. This version of the Safe 4337 Module is the one compatible with the Entrypoint v0.7.

**Parameters**

The `Safe4337InitOptions` used in the `init()` method are:

`_47

Safe4337InitOptions = {

_47

provider: Eip1193Provider | HttpTransport | SocketTransport

_47

signer?: HexAddress | PrivateKey | PasskeyArgType

_47

bundlerUrl: string

_47

safeModulesVersion?: string

_47

customContracts?: {

_47

entryPointAddress?: string

_47

safe4337ModuleAddress?: string

_47

addModulesLibAddress?: string

_47

}

_47

options: ExistingSafeOptions | PredictedSafeOptions

_47

paymasterOptions?: PaymasterOptions

_47

}

_47

_47

HexAddress = string

_47

PrivateKey = string

_47

HttpTransport = string

_47

SocketTransport = string

_47

_47

Eip1193Provider = {

_47

request: (args: RequestArguments) => Promise<unknown>

_47

}

_47

_47

RequestArguments = {

_47

method: string

_47

params?: readonly unknown[] | object

_47

}

_47

_47

ExistingSafeOptions = {

_47

safeAddress: string

_47

}

_47

_47

PredictedSafeOptions = {

_47

owners: string[]

_47

threshold: number

_47

safeVersion?: SafeVersion

_47

saltNonce?: string

_47

}

_47

_47

PaymasterOptions = {

_47

paymasterUrl?: string

_47

isSponsored?: boolean

_47

sponsorshipPolicyId?: string

_47

paymasterAddress: string

_47

paymasterTokenAddress?: string

_47

amountToApprove?: bigint

_47

}`

- **`provider`** : The EIP-1193 compatible provider or RPC URL of the selected chain.
- **`signer`** : A passkey or the signer private key if the `provider` doesn't resolve to a signer account. If the `provider` resolves to multiple signer addresses, the `signer` property can be used to specify which account to connect, otherwise the first address returned will be used.
- **`rpcUrl`** : The RPC URL of the selected chain.
- **`bundlerUrl`** : The bundler's URL.
- **`safeModulesVersion`** : The version of the [Safe Modules contract (opens in a new tab)](https://github.com/safe-global/safe-modules-deployments/tree/main/src/assets/safe-4337-module).
- **`customContracts`** : An object with custom contract addresses. This is optional, if no custom contracts are provided, default ones will be used.
  - **`entryPointAddress`** : The address of the entry point. Defaults to the address returned by the `eth_supportedEntryPoints` method from the provider API.
  - **`safe4337ModuleAddress`** : The address of the `Safe4337Module`. Defaults to `safe-modules-deployments` using the current version.
  - **`addModulesLibAddress`** : The address of the `AddModulesLib` library. Defaults to `safe-modules-deployments` using the current version.
- **`options`** : The Safe account options.
  - **`safeAddress`** : The Safe address. You can only use this prop to specify an existing Safe account.
  - **`owners`** : The array with Safe owners.
  - **`threshold`** : The Safe threshold. This is the number of owners required to sign and execute a transaction.
  - **`safeVersion`** : The version of the [Safe contract (opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets). Defaults to the current version.
  - **`saltNonce`** : The Safe salt nonce. Changing this value enables the creation of different safe (predicted) addresses using the same configuration (`owners`, `threshold`, and `safeVersion`).
- **`paymasterOptions`** : The paymaster options.
  - **`paymasterUrl`** : The paymaster URL. You can obtain the URL from the management dashboard of the selected services provider. This URL will be used for gas estimations.
  - **`isSponsored`** : A boolean flag to indicate if we want to use a paymaster to sponsor transactions.
  - **`sponsorshipPolicyId`** : The sponsorship policy ID can be obtained from the management dashboard of the selected payment services provider.
  - **`paymasterAddress`** : The address of the paymaster contract to use.
  - **`paymasterTokenAddress`** : The paymaster token address for transaction fee payments.
  - **`amountToApprove`** : The `paymasterTokenAddress` amount to approve.

**Returns**
A promise that resolves to an instance of the `Safe4337Pack`.

**Caveats**

- Use this method to create the initial instance instead of the standard constructor.
- You should search for some API services URLs and contract addresses in the management dashboards of your selected provider. These include `bundlerUrl`, `paymasterUrl`, `paymasterAddress`, `paymasterTokenAddress`, `sponsorshipPolicyId`, and `rpcUrl` (In this case any valid RPC should be fine).
- The SDK uses default versions when `safeModulesVersion` or `safeVersion` are not specified. You can find more details about the current versions [here (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/924ae56ff707509e561c99296fb5e1fbc2050d28/packages/relay-kit/src/packs/safe-4337/Safe4337Pack.ts#L34-L35).
- The `saltNonce` derives different Safe addresses by using the `protocol-kit` method `predictSafeAddress`. You can find more details about this process [here (opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/924ae56ff707509e561c99296fb5e1fbc2050d28/packages/protocol-kit/src/contracts/utils.ts#L245-L315).
- We typically initialize the pack in two ways. One way is by using an existing account with the `safeAddress` prop. The other way is by using the `owners`, `threshold`, `saltNonce`, and `safeVersion` props to create a new Safe account. You can also apply the second method to existing addresses, as the output address will be the same if the inputs are identical.
- The SDK queries `eth_supportedEntryPoints` for a default `entryPointAddress` if not given. It fetches `safe4337ModuleAddress` and `addModulesLibAddress` from the `safe-modules-deployments` repository if not provided. You can find them at: [safe-modules-deployments (opens in a new tab)](https://github.com/safe-global/safe-modules-deployments/tree/main/src/assets/safe-4337-module).
- To use a paymaster without sponsorship, you need to hold a certain amount of `paymasterTokenAddress` in the Safe account for fees. Make sure to provide the `paymasterAddress` as well.
- You can choose to use a paymaster to sponsor transactions by setting the `isSponsored` prop. When sponsoring transactions, you need to provide the `paymasterUrl`, `paymasterAddress`, and optionally the `sponsorshipPolicyId`.
- An approval for the concrete ERC-20 token is required to use the paymaster so remember to add the `paymasterTokenAddress` of the ERC-20 token that will pay the fees. The SDK will encode this approval internally and send it to the bundler with the rest of the user operation.
- Specify the amount to approve for the `paymasterTokenAddress` using the `amountToApprove` prop. This is necessary when the Safe account is not deployed, and you need to approve the paymaster token for fee payments and Safe account setup.

### `new Safe4337Pack({protocolKit, bundlerClient, publicClient, bundlerUrl, paymasterOptions, entryPointAddress, safe4337ModuleAddress})`

The `Safe4337Pack` constructor method is used within the `init()` method and should not be directly accessed. The parameters are calculated or provided by the `init()` method.

### `createTransaction(safe4337CreateTransactionProps)`

Create a `SafeOperation` from a transaction batch. You can send multiple transactions to this method. The SDK internally bundles these transactions into a batch sent to the bundler as a `UserOperation`. If the transaction is only one then no batch is created a it's not necessary.

**Parameters**

The `Safe4337CreateTransactionProps`

`_10

Safe4337CreateTransactionProps = {

_10

transactions: MetaTransactionData[]

_10

options?: {

_10

amountToApprove?: bigint

_10

validUntil?: number

_10

validAfter?: number

_10

feeEstimator?: IFeeEstimator

_10

customNonce?: bigint

_10

}

_10

}`

- **`transactions`** : Array of `MetaTransactionData` to batch in a `SafeOperation` (using the MultiSend contract if more than one transaction is included).
- **`options`** : Optional parameters.
  - **`amountToApprove`** : The amount to approve to the `paymasterTokenAddress`.
  - **`validUntil`** : The UserOperation will remain valid until this block's timestamp.
  - **`validAfter`** : The UserOperation will be valid after this block's timestamp.
  - **`feeEstimator`** : The fee estimator calculates gas requirements by implementing the `IFeeEstimator` interface.
  - **`customNonce`** : The custom nonce for the SafeOperation. If not provided, the nonce will be calculated internally using the `getNonce` method from the Entrypoint contract.

**Returns**
A promise that resolves to the `SafeOperation`.

**Caveats**

- The `SafeOperation` is similar to the standard user operation but includes Safe-specific fields. Before sending it to the bundler, we convert the `SafeOperation` to a regular user operation. We need to sign the operation for the bundler to execute it using the `Safe4337Module`.
- You can set the `amountToApprove` in this method to approve the `paymasterTokenAddress` for transaction payments, similar to how `amountToApprove` works in the `init()` method.
- We use a similar API to `protocol-kit` for developers transitioning to `Safe4337Pack`. This API helps with creating and executing transactions, bundling user operations and sending them to the bundler.
- Use `validUntil` and `validAfter` to set the block timestamp range for the user operation's validity. The operation will be rejected if the block timestamp falls outside this range.
- The `feeEstimator` calculates gas needs for the UserOperation. We default to `PimlicoFeeEstimator`, but the `relay-kit` package also offers an alternative, `GenericFeeEstimator`, which does not depend on any specific bundler. You can also provide your own estimator. The IFeeEstimator interface requires an object with specific methods.
- User operations support the usage of [custom nonce (opens in a new tab)](https://docs.stackup.sh/docs/useroperation-nonce). You can use a custom nonce by leveraging the `createTransaction` method and passing the `customNonce` property as part of the `options` parameter. We exported an utility method `encodeNonce` in the `relay-kit` to make it easier to compose the nonce.

`_17

IFeeEstimator {

_17

preEstimateUserOperationGas?: EstimateFeeFunction

_17

postEstimateUserOperationGas?: EstimateFeeFunction

_17

}

_17

_17

EstimateFeeFunctionProps = {

_17

userOperation: UserOperation

_17

bundlerUrl: string

_17

entryPoint: string

_17

}

_17

_17

EstimateSponsoredFeeFunctionProps = {

_17

userOperation: UserOperation

_17

paymasterUrl: string

_17

entryPoint: string

_17

sponsorshipPolicyId?: string

_17

}`

All methods are optional and will be called in the specified order if you provide any of them:

1. `preEstimateUserOperationGas` : This method is used before calling the standard RPC `eth_estimateUserOperationGas` method, allowing you to setup the User operation before the bundler gas estimation.
2. `postEstimateUserOperationGas` : This method is used after calling `eth_estimateUserOperationGas` method to adjust the bundler estimation.

### `signSafeOperation(safeOperation, signingMethod)`

Signs a `SafeOperation`.

**Parameters**

- **`safeOperation`** : The `EthSafeOperation | SafeOperationResponse` to sign. Can either be created by the `Safe4337Pack` or fetched via `api-kit`.
- **`signingMethod`** : The method to use for signing the transaction. The default is `SigningMethod.ETH_SIGN_TYPED_DATA_V4`.

**Returns**
A promise that resolves to the signed `SafeOperation`.

**Caveats**

- Use this method after the `SafeOperation` is generated with the `createTransaction` method.
- This method adds the signer's signature to the signatures map of the `SafeOperation` object. Additional signatures can be included from multiple owners.
- It works similar to `signTransaction` and `signMessage` methods in the `protocol-kit` but using `SafeOperation` instead of `SafeTransaction` or `SafeMessage`. For more information, refer to the Safe [docs (opens in a new tab)](https://docs.safe.global/sdk/protocol-kit/guides/signatures).

### `executeTransaction(safe4337ExecutableProps)`

This method sends the user operation to the bundler.

ℹ️

If you are not using a paymaster and need to deploy a new Safe (counterfactual
deployment), you must hold in the predicted Safe address the amount of native
token required to cover the fees.

**Parameters**

The `Safe4337ExecutableProps`

`_10

Safe4337ExecutableProps = {

_10

executable: EthSafeOperation | SafeOperationResponse

_10

}`

- **`executable`** : The `SafeOperation` to execute. Can either be created by the `Safe4337Pack` or fetched via `api-kit`.

**Returns**
A promise, resolves to the user operation hash.

**Caveats**

- The process converts the `SafeOperation` to a standard user operation, then forwards it to the bundler. The `SafeOperation` must be created and signed by the Safe owner.
- You can use the user operation hash to browse the status (e.g `https://jiffyscan.xyz/userOpHash/{userOpHash}`)

### `getUserOperationByHash(userOpHash)`

Retrieve the user operation using its hash.

**Parameters**

- **`userOpHash`** : The user operation hash is returned by the `executeTransaction` method. The user operation can be executed or pending, and the method will return the payload data for the user operation.

**Returns**
A Promise that resolves to `UserOperationWithPayload`.

`_10

UserOperationWithPayload = {

_10

userOperation: UserOperation

_10

entryPoint: string

_10

transactionHash: string

_10

blockHash: string

_10

blockNumber: string

_10

}`

**Caveats**

- Use this method to request information about the user operation sent to the bundler, but do not use it for the execution status.

### `getUserOperationReceipt(userOpHash)`

Get `UserOperation` receipt by a hash.

**Parameters**

- **`userOpHash`** : Unique identifier for the `UserOperation`

**Returns**
A Promise that resolves to `UserOperationReceipt` after the user operation is executed.

`_10

UserOperationReceipt = {

_10

userOpHash: string

_10

sender: string

_10

nonce: string

_10

actualGasUsed: string

_10

actualGasCost: string

_10

success: boolean

_10

logs: Log[]

_10

receipt: Receipt

_10

}`

**Caveats**

- Use this method to obtain the full execution trace and status.
- You can use this method to check if the `UserOperation` was successful by calling it repeatedly until the receipt is available.

### `getSupportedEntryPoints()`

Retrieve all supported entry points.

**Returns**
A promise that resolves to an array of entry point addresses (strings) supported by the bundler.

**Caveats**
We use this method to obtain the default entry point if not provided in the `init()` method.

### `getChainId()`

Retrieve the EIP-155 Chain ID.

**Returns**
A promise that resolves to the EIP-155 Chain ID string.

[Migrate to V4](/sdk/relay-kit/guides/migrate-to-v4 "Migrate to V4")[Safe React Hooks](/sdk/react-hooks "Safe React Hooks")

Was this page helpful?

[Report issue](https://github.com/safe-global/safe-docs/issues/new?assignees=&labels=nextra-feedback&projects=&template=nextra-feedback.yml&title=%5BFeedback%5D+)

---

## Document Sections

- Safe4337Pack
  - Install dependencies
  - Reference
    - init(safe4337InitOptions)
    - new Safe4337Pack({protocolKit, bundlerClient, publicClient, bundlerUrl, paymasterOptions, entryPointAddress, safe4337ModuleAddress})
    - createTransaction(safe4337CreateTransactionProps)
    - signSafeOperation(safeOperation, signingMethod)
    - executeTransaction(safe4337ExecutableProps)
    - getUserOperationByHash(userOpHash)
    - getUserOperationReceipt(userOpHash)
    - getSupportedEntryPoints()
    - getChainId()

---

## Related Links

### Internal Links

- [Relay Kit](https://docs.safe.global/sdk/relay-kit)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [docs(opens in a new tab)](https://docs.safe.global/sdk/protocol-kit/guides/signatures)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack](https://docs.safe.global/sdk/relay-kit/reference/safe-4337-pack)
- [Migrate to V4](https://docs.safe.global/sdk/relay-kit/guides/migrate-to-v4)
- [Safe React Hooks](https://docs.safe.global/sdk/react-hooks)

### External Links

- [this link(opens in a new tab)](https://eips.ethereum.org/EIPS/eip-4337)
- [Safe 4337 Module(opens in a new tab)](https://github.com/safe-global/safe-modules/tree/main/modules/4337/contracts/Safe4337Module.sol)
- [bundler(opens in a new tab)](https://www.erc4337.io/docs/bundlers/introduction)
- [paymaster(opens in a new tab)](https://www.erc4337.io/docs/paymasters/introduction)
- [Safe Modules contract(opens in a new tab)](https://github.com/safe-global/safe-modules-deployments/tree/main/src/assets/safe-4337-module)
- [Safe contract(opens in a new tab)](https://github.com/safe-global/safe-deployments/tree/main/src/assets)
- [here(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/924ae56ff707509e561c99296fb5e1fbc2050d28/packages/relay-kit/src/packs/safe-4337/Safe4337Pack.ts)
- [here(opens in a new tab)](https://github.com/safe-global/safe-core-sdk/blob/924ae56ff707509e561c99296fb5e1fbc2050d28/packages/protocol-kit/src/contracts/utils.ts)
- [safe-modules-deployments(opens in a new tab)](https://github.com/safe-global/safe-modules-deployments/tree/main/src/assets/safe-4337-module)
- [custom nonce(opens in a new tab)](https://docs.stackup.sh/docs/useroperation-nonce)

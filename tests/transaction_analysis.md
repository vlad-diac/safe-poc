# Analysis of Pending Transactions for Safe 0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A

## Safe Overview
- **Address**: `0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A`
- **Chain**: Ethereum Mainnet
- **Owners**: 5 addresses
- **Threshold**: 3 signatures required to execute
- **Current Nonce**: 100
- **Version**: 1.4.1

## Summary
**Total Pending Transactions**: 12

**Status Overview**:
- 3 transactions have 2/3 signatures (need 1 more)
- 3 transactions have 1/3 signatures (need 2 more)
- 6 transactions have 0 or 1 signature (need 2-3 more)

---

## Detailed Transaction Analysis

### 🔴 Transaction #1 - Token Transfer (Nonce 102)
**Status**: ⏳ 2/3 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0x2636a7dee546e8b261ce938fb333ac094a00abafb139dfdac9053f9ae443f142`
- **Type**: ERC-20 Token Transfer
- **Token Contract**: `0xdC035D45d973E3EC169d2276DDab16f1e407384F`
- **Method**: `transfer()`
- **To**: `0x419e379f2C059C9cc1ca936f5016930188Ee8AC9`
- **Amount**: **92,589.12** tokens (92589120000000000000000 wei)
- **Submitted**: October 6, 2025
- **Modified**: October 7, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Oct 6, 22:40 UTC)
2. ✅ `0xc581A54f3Ed1BaF27Ba86904E6649Ff41Ee8C163` (Oct 7, 08:18 UTC)

**Note**: This transaction is **next in line** (nonce 102 is after current nonce 100). However, transactions with nonce 100 and 101 must be executed first.

---

### 🔴 Transaction #2 - Token Transfer (Nonce 101)
**Status**: ⏳ 2/3 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0xf90b464bed1b13023c4bbc1ffb33526a59ad56fa4356e8bdb6e23353defa78f4`
- **Type**: ERC-20 Token Transfer
- **Token Contract**: `0xdC035D45d973E3EC169d2276DDab16f1e407384F`
- **Method**: `transfer()`
- **To**: `0x0b12402B51150A9256cB7e0dB2549416E0EF8521`
- **Amount**: **212,965** tokens (212965000000000000000000 wei)
- **Submitted**: October 6, 2025
- **Modified**: October 7, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Oct 6, 22:39 UTC)
2. ✅ `0xc581A54f3Ed1BaF27Ba86904E6649Ff41Ee8C163` (Oct 7, 08:18 UTC)

**Note**: This transaction must be executed before nonce 102 can be executed.

---

### 🟡 Transaction #3 - Token Transfer (Nonce 100) ⚠️ BLOCKS ALL OTHERS
**Status**: ⏳ 2/3 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0xcfe5cb6468bba1685c598d4a371bbbcf15dcac2739ce1e07b23a9211e80e62b9`
- **Type**: ERC-20 Token Transfer
- **Token Contract**: `0xdC035D45d973E3EC169d2276DDab16f1e407384F`
- **Method**: `transfer()`
- **To**: `0x7e09E1C3459b2Ade356B250055C99E9E17a4278F`
- **Amount**: **1,000,000** tokens (1000000000000000000000000 wei)
- **Submitted**: October 6, 2025
- **Modified**: October 7, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Oct 6, 22:38 UTC)
2. ✅ `0xc581A54f3Ed1BaF27Ba86904E6649Ff41Ee8C163` (Oct 7, 08:17 UTC)

**⚠️ CRITICAL**: This transaction has nonce 100, which matches the Safe's current nonce. This must be executed (or rejected) before ANY other transaction can be executed. All other transactions are **blocked** until this one is resolved.

---

### 🔵 Transaction #4 - Token Transfer (Nonce 91)
**Status**: ⏳ 1/3 signatures | Missing: 2 signatures

- **Safe Tx Hash**: `0xd3bcaeb5b67004e3e941c25ba312d75ce671f6121163c062b682b5886715e799`
- **Type**: ERC-20 Token Transfer
- **Token Contract**: `0xdC035D45d973E3EC169d2276DDab16f1e407384F`
- **Method**: `transfer()`
- **To**: `0xa30cD8e719712E6AB4be869374DdB8c7A43Aa296`
- **Amount**: **48,860** tokens (48860000000000000000000 wei)
- **Submitted**: October 2, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Oct 2, 21:28 UTC)

**Note**: This has an old nonce (91) which has already passed. This transaction is **stale** and likely won't be executed.

---

### 🔵 Transaction #5 - Token Transfer (Nonce 69) - STALE
**Status**: ⏳ 0/3 signatures | Missing: 3 signatures

- **Safe Tx Hash**: `0xabf0fafee6e1f238bccd863f6c9cef00fdf7d182a61d9b7ae6fd4574f0ff0dd5`
- **Type**: ERC-20 Token Transfer
- **Token Contract**: `0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD`
- **Method**: `transfer()`
- **To**: `0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A` (back to the Safe itself)
- **Amount**: **1,000,000** tokens
- **Submitted**: September 18, 2025

**Signatures**: None

**Note**: Very old nonce (69). This transaction is **stale** and should probably be deleted.

---

### 🔵 Transaction #6 - CoW Protocol Order Signature (Nonce 47) - STALE
**Status**: ⏳ 2/3 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0x36115e1db8d6b60728f10513bc16300b7bd912f9e88c83c57d091883fd807870`
- **Type**: CoW Swap Pre-Signature
- **Contract**: `0x9008D19f58AAbD9eD0D60971565AA8510560ab41` (CoW Protocol)
- **Method**: `setPreSignature()`
- **Origin**: Safe Swap (https://app.safe.global)
- **Submitted**: September 2, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Sep 2, 16:55 UTC)
2. ✅ `0x0A297cCe576B3D602ef69b57e98041964172386A` (Sep 2, 20:48 UTC)

**Note**: This is for a **CoW Protocol swap order**. The transaction authorizes a pre-signature for a specific order. Very old nonce (47) - this order has likely expired.

---

### 🔵 Transaction #7 - Token Approval (Nonce 30) - STALE
**Status**: ⏳ 1/2 signatures | Missing: 1 signature (threshold was 2 at that time)

- **Safe Tx Hash**: `0x7f558466250f7064087f892ee8852d3f4aba0297312d8d22a61c786b71736b9c`
- **Type**: ERC-20 Token Approval
- **Token Contract**: `0x2621CC0B3F3c079c1Db0E80794AA24976F0b9e3c`
- **Method**: `approve()`
- **Spender**: `0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D` (Uniswap V2 Router)
- **Amount**: **Unlimited** (max uint256)
- **Origin**: Uniswap (via WalletConnect)
- **Submitted**: August 25, 2025

**Signatures**:
1. ✅ `0x0A297cCe576B3D602ef69b57e98041964172386A` (Aug 25, 13:18 UTC)

**Note**: This grants **unlimited approval** to Uniswap Router to spend tokens. Old nonce (30).

---

### 🔵 Transaction #8 - Multi-Send (Nonce 23) - STALE
**Status**: ⏳ 1/2 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0xb4257ca0a372534e43bfc46e5428cfe3bdce4114dfa2a6db7114ccb11e1e7769`
- **Type**: Batch Transaction (MultiSend)
- **Method**: `multiSend()`
- **Operation**: DelegateCall
- **Submitted**: August 18, 2025

**Batch Contents**: Sends 0.1 ETH to each of 4 addresses:
1. `0x3F5a1C502ac5f316d67e97ae8Af418E00298239d` → 0.1 ETH
2. `0x4334E7C385fC36BF8E8fAE93ADae235Bf2c0f02a` → 0.1 ETH
3. `0xA2a5E7e4217693e5F578e3ef24d3953cc306A856` → 0.1 ETH
4. `0x6D6092DF8F8D88073f9f42828eED701BD8DfFD4A` → 0.1 ETH

**Total**: 0.4 ETH distributed

**Signatures**:
1. ✅ `0x0A297cCe576B3D602ef69b57e98041964172386A` (Aug 18, 03:38 UTC)

---

### 🔵 Transaction #9 - Token Transfer (Nonce 17) - STALE
**Status**: ⏳ 1/2 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0x0cb305a53ca13d86e5c2d7e722d8a494721174d3fa53b29a3eb70f562cbe04c1`
- **Type**: ERC-20 Token Transfer
- **Token Contract**: `0xdC035D45d973E3EC169d2276DDab16f1e407384F`
- **Method**: `transfer()`
- **To**: `0x205e18Fc1ff184807835381a67850201Cb9e0832`
- **Amount**: **9,500** tokens
- **Submitted**: July 29, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Jul 29, 18:59 UTC)

---

### 🔵 Transaction #10 - Token Transfer (Nonce 13) - STALE
**Status**: ⏳ 1/2 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0xdba33ed37c9124c2f68c3dfb664ab189f25d9166eb40e6427ffe48c006e9b49d`
- **Type**: ERC-20 Token Transfer
- **Token Contract**: `0xdC035D45d973E3EC169d2276DDab16f1e407384F`
- **Method**: `transfer()`
- **To**: `0xb0d7B025beE8206D2b367cE11549b24313162D28`
- **Amount**: **9,933.86** tokens
- **Submitted**: July 24, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Jul 24, 16:16 UTC)

---

### 🔵 Transaction #11 - USDC Transfer (Nonce 10) - STALE
**Status**: ⏳ 1/2 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0xb766c2b19376e2a4bc9842c73feba11c1756a5f8f007ada7dc39ea7cb3149a9d`
- **Type**: USDC Token Transfer
- **Token Contract**: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` (USDC on Ethereum)
- **Method**: `transfer()`
- **To**: `0x3540D4f8b2E6c45B0DaD6BE1fd0ebbeB0f1da205`
- **Amount**: **10,000 USDC** (10000000000 in USDC's 6 decimals)
- **Submitted**: June 30, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Jun 30, 01:15 UTC)

---

### 🔵 Transaction #12 - ETH Transfer (Nonce 9) - STALE
**Status**: ⏳ 1/2 signatures | Missing: 1 signature

- **Safe Tx Hash**: `0x6358315ccd0564dc69bda0840e0bab9b790a3cf33d83e0713f3290f9773d05cc`
- **Type**: Native ETH Transfer
- **To**: `0x3540D4f8b2E6c45B0DaD6BE1fd0ebbeB0f1da205`
- **Amount**: **0.1 ETH** (100000000000000000 wei)
- **Data**: None (simple ETH transfer)
- **Submitted**: June 30, 2025

**Signatures**:
1. ✅ `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` (Jun 30, 01:14 UTC)

---

## Key Insights

### 🚨 Critical Blocker
**Transaction #3 (Nonce 100)** is blocking ALL other transactions. It needs just **1 more signature** to execute:
- Already signed by: `0xe7c5...776e` and `0xc581...8C163`
- Needs signature from one of: `0xf654...DA5d`, `0xdD54...7bA3`, or `0x0A29...386A`

### 📊 Transaction Queue Order
Due to Safe's sequential nonce system:
1. **First**: Nonce 100 (1M tokens) - needs 1 more signature
2. **Second**: Nonce 101 (212,965 tokens) - needs 1 more signature  
3. **Third**: Nonce 102 (92,589.12 tokens) - needs 1 more signature

### 🧹 Recommended Actions
1. **Execute or reject nonce 100** to unblock the queue
2. **Delete stale transactions** with old nonces (9-91) - they're cluttering the queue
3. **Review active transactions** (100-102) to ensure they're still valid

### 💡 Token Being Transferred
The token contract `0xdC035D45d973E3EC169d2276DDab16f1e407384F` appears in multiple transactions. You should verify what token this is (check on Etherscan).

### 👥 Most Active Signers
- `0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e` - signed 9 transactions
- `0xc581A54f3Ed1BaF27Ba86904E6649Ff41Ee8C163` - signed 3 recent transactions
- `0x0A297cCe576B3D602ef69b57e98041964172386A` - signed 3 transactions

# Safe Transaction Lifecycle - Understanding Transaction Hashes

## Why is `transactionHash` null?

Your transactions have `transactionHash: null` because they are **pending transactions that haven't been executed on-chain yet**.

## Two Types of Transaction Hashes

### 1. **Safe Transaction Hash** (`safeTxHash`)
- ✅ **Generated immediately** when transaction is proposed
- 📝 **Always present** for all Safe transactions
- 🔑 **Unique identifier** for the Safe transaction proposal
- 📍 **Example from your data**:
  ```json
  "safeTxHash": "0xcfe5cb6468bba1685c598d4a371bbbcf15dcac2739ce1e07b23a9211e80e62b9"
  ```
- **Purpose**: Identifies the transaction within the Safe system before execution

### 2. **Blockchain Transaction Hash** (`transactionHash`)
- ⏳ **Generated only after execution** on the blockchain
- ❌ **Null for pending transactions**
- 🌐 **Blockchain-level identifier** (like any Ethereum transaction)
- 📍 **Example after execution**:
  ```json
  "transactionHash": "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890"
  ```
- **Purpose**: Identifies the actual on-chain transaction after execution

---

## Transaction Lifecycle Stages

### Stage 1: Proposal ✍️
**When it happens**: When a Safe owner creates a new transaction

**Data generated**:
```json
{
  "safeTxHash": "0xabc...",           // ✅ GENERATED
  "transactionHash": null,             // ❌ Not yet
  "executionDate": null,               // ❌ Not yet
  "isExecuted": false,                 // ❌ Not executed
  "submissionDate": "2025-10-06T14:27:01.110938Z", // ✅ Set
  "confirmations": [],                 // Empty initially
  "nonce": 102,                        // ✅ Assigned
  "proposer": "0x0A29...",            // ✅ Who proposed it
}
```

**What you can do**: Share the transaction for others to sign

---

### Stage 2: Signing/Confirmation ✅
**When it happens**: When Safe owners sign the transaction

**Data generated**:
```json
{
  "safeTxHash": "0xabc...",           // ✅ Same as before
  "transactionHash": null,             // ❌ Still null
  "executionDate": null,               // ❌ Still null
  "isExecuted": false,                 // ❌ Still not executed
  "confirmations": [                   // ✅ SIGNATURES ADDED
    {
      "owner": "0xe7c5...",
      "submissionDate": "2025-10-06T22:38:24.417579Z",
      "signature": "0x7e26dd4edc63bf9431c29b88fd631afe6a4257c848fef741...",
      "signatureType": "EOA"
    },
    {
      "owner": "0xc581...",
      "submissionDate": "2025-10-07T08:17:47.231160Z",
      "signature": "0xb7b780e5d8c8464e3efdb572e265cd13d23a6c40b85478ff...",
      "signatureType": "EOA"
    }
  ],
  "confirmationsRequired": 3,          // Need 3 total
  "modified": "2025-10-07T08:17:47.231160Z" // ✅ Updated
}
```

**What you can do**: Once threshold is met (3/3 signatures), execute the transaction

---

### Stage 3: Execution 🚀
**When it happens**: When someone submits the transaction to the blockchain with enough signatures

**Data generated**:
```json
{
  "safeTxHash": "0xabc...",                    // ✅ Same as before
  "transactionHash": "0x1a2b3c...",            // ✅✅ NOW GENERATED!
  "executionDate": "2025-10-07T15:30:45Z",    // ✅✅ NOW SET!
  "isExecuted": true,                          // ✅✅ NOW TRUE!
  "isSuccessful": true,                        // ✅ Transaction succeeded
  "blockNumber": 20912345,                     // ✅ Block included in
  "executor": "0xe7c5...",                     // ✅ Who executed it
  "ethGasPrice": "25000000000",               // ✅ Gas price used
  "gasUsed": 125000,                          // ✅ Gas consumed
  "fee": "3125000000000000",                  // ✅ Total fee paid
  "confirmations": [...],                      // All signatures
}
```

**What happened**: 
1. Someone clicked "Execute" in the Safe UI (or called the blockchain directly)
2. An on-chain transaction was submitted to Ethereum
3. That transaction was mined in a block
4. The blockchain transaction got its own hash (`transactionHash`)

---

## Detailed Timeline: Your Transaction Example

Looking at your transaction with nonce 100:

```json
{
  "nonce": 100,
  "safeTxHash": "0xcfe5cb6468bba1685c598d4a371bbbcf15dcac2739ce1e07b23a9211e80e62b9",
  "submissionDate": "2025-10-06T13:59:40.861449Z",
  "modified": "2025-10-07T08:17:47.231160Z",
  "transactionHash": null,
  "executionDate": null,
  "isExecuted": false,
  "confirmations": [
    {
      "owner": "0xe7c5D3b0417d0208C16bD172EF2f5d2aD59c776e",
      "submissionDate": "2025-10-06T22:38:24.417579Z"
    },
    {
      "owner": "0xc581A54f3Ed1BaF27Ba86904E6649Ff41Ee8C163",
      "submissionDate": "2025-10-07T08:17:47.231160Z"
    }
  ],
  "confirmationsRequired": 3
}
```

**Timeline**:
- **Oct 6, 13:59 UTC** - Transaction proposed, `safeTxHash` generated
- **Oct 6, 22:38 UTC** - First owner signs (1/3)
- **Oct 7, 08:17 UTC** - Second owner signs (2/3)
- **Current status** - Waiting for 3rd signature (still pending)
- **When 3rd signature arrives** - Transaction becomes executable
- **When executed** - `transactionHash` will be generated

---

## When Does Each Field Get Populated?

| Field | Stage 1: Proposal | Stage 2: Signing | Stage 3: Execution |
|-------|------------------|------------------|-------------------|
| `safeTxHash` | ✅ Generated | ✅ Same | ✅ Same |
| `nonce` | ✅ Assigned | ✅ Same | ✅ Same |
| `submissionDate` | ✅ Set | ✅ Same | ✅ Same |
| `proposer` | ✅ Set | ✅ Same | ✅ Same |
| `confirmations` | `[]` Empty | ✅ Added as signed | ✅ Final list |
| `modified` | ✅ Set | ✅ Updated | ✅ Updated |
| `transactionHash` | ❌ `null` | ❌ `null` | ✅ **Generated** |
| `executionDate` | ❌ `null` | ❌ `null` | ✅ **Set** |
| `isExecuted` | ❌ `false` | ❌ `false` | ✅ **true** |
| `isSuccessful` | ❌ `null` | ❌ `null` | ✅ **true/false** |
| `blockNumber` | ❌ `null` | ❌ `null` | ✅ **Set** |
| `executor` | ❌ `null` | ❌ `null` | ✅ **Set** |
| `gasUsed` | ❌ `null` | ❌ `null` | ✅ **Set** |
| `fee` | ❌ `null` | ❌ `null` | ✅ **Set** |

---

## How to Check Transaction Status

### Using Safe Transaction Service API

```python
import requests

def check_transaction_status(chain, safe_tx_hash):
    url = f"https://api.safe.global/tx-service/{chain}/api/v1/multisig-transactions/{safe_tx_hash}/"
    response = requests.get(url)
    tx = response.json()
    
    print(f"Safe Tx Hash: {tx['safeTxHash']}")
    print(f"Status: {'Executed' if tx['isExecuted'] else 'Pending'}")
    
    if tx['isExecuted']:
        print(f"✅ Blockchain Tx Hash: {tx['transactionHash']}")
        print(f"✅ Execution Date: {tx['executionDate']}")
        print(f"✅ Block: {tx['blockNumber']}")
        print(f"✅ Success: {tx['isSuccessful']}")
        print(f"✅ Gas Used: {tx['gasUsed']}")
    else:
        confirmations = len(tx['confirmations'])
        required = tx['confirmationsRequired']
        print(f"⏳ Signatures: {confirmations}/{required}")
        print(f"⏳ Missing: {required - confirmations}")

# Example
check_transaction_status("eth", "0xcfe5cb6468bba1685c598d4a371bbbcf15dcac2739ce1e07b23a9211e80e62b9")
```

---

## Why Two Different Hashes?

### Safe Transaction Hash (`safeTxHash`)
- **Computed from**: Transaction parameters (to, value, data, nonce, gas params, etc.)
- **Formula**: `keccak256(encodeData(to, value, data, operation, safeTxGas, ...))`
- **Deterministic**: Same transaction parameters = same hash
- **Off-chain**: Generated before any blockchain interaction
- **Use case**: Tracking transaction through proposal → signing → execution

### Blockchain Transaction Hash (`transactionHash`)
- **Computed from**: The actual Ethereum transaction that executes the Safe transaction
- **Formula**: `keccak256(rlp([nonce, gasPrice, gasLimit, to, value, data, v, r, s]))`
- **On-chain**: Only exists after blockchain execution
- **Use case**: Checking transaction on Etherscan, viewing in block explorers

---

## Common Patterns

### Pattern 1: Transaction Just Proposed
```json
{
  "safeTxHash": "0xabc...",
  "transactionHash": null,      // ← Normal! Not executed yet
  "isExecuted": false,
  "confirmations": []
}
```
**Action**: Share with owners to collect signatures

---

### Pattern 2: Transaction Being Signed
```json
{
  "safeTxHash": "0xabc...",
  "transactionHash": null,      // ← Still normal! Not executed yet
  "isExecuted": false,
  "confirmations": [{"owner": "0x..."}, {"owner": "0x..."}]
}
```
**Action**: Wait for remaining signatures or execute if threshold met

---

### Pattern 3: Transaction Executed
```json
{
  "safeTxHash": "0xabc...",
  "transactionHash": "0x123...",  // ← Now populated!
  "isExecuted": true,
  "executionDate": "2025-10-07T15:30:45Z"
}
```
**Action**: View on Etherscan using the `transactionHash`

---

## How to Track a Transaction

### Method 1: By Safe Transaction Hash (Before Execution)
```bash
# Safe Transaction Service
https://api.safe.global/tx-service/eth/api/v1/multisig-transactions/0xcfe5cb...

# Safe UI
https://app.safe.global/transactions/tx?safe=eth:0xF0E22B...&id=multisig_0xF0E22B..._0xcfe5cb...
```

### Method 2: By Blockchain Transaction Hash (After Execution)
```bash
# Etherscan
https://etherscan.io/tx/0x123abc...

# Safe API (works for both)
https://api.safe.global/tx-service/eth/api/v1/multisig-transactions/0xcfe5cb...
```

---

## FAQ

### Q: My transaction has been signed by everyone, why is transactionHash still null?
**A**: Having enough signatures doesn't automatically execute the transaction. Someone must click "Execute" in the Safe UI or call the blockchain directly to execute it.

### Q: Can I get the transactionHash before execution?
**A**: No, the `transactionHash` only exists after the transaction is submitted to and mined on the blockchain.

### Q: How do I execute a transaction once it has enough signatures?
**A**: 
1. Open the transaction in Safe UI
2. Click "Execute" button
3. Sign the blockchain transaction with your wallet
4. Wait for it to be mined
5. The `transactionHash` will be populated

### Q: Why do I need the safeTxHash if I have the transactionHash?
**A**: The `safeTxHash` is useful for:
- Tracking transactions before execution
- Referencing transactions in the Safe system
- Avoiding confusion if the same transaction is executed multiple times

### Q: Can the same safeTxHash have multiple transactionHashes?
**A**: No, once a Safe transaction is executed successfully, it can't be executed again. However, if execution fails, you might retry and get a different `transactionHash`.

---

## Summary

**Your transactions have `transactionHash: null` because:**
1. ✅ They are **pending** (not executed yet)
2. ✅ They need **more signatures** (2/3 currently, need 3/3)
3. ✅ They haven't been **submitted to the blockchain** yet

**When `transactionHash` gets generated:**
1. ⏳ Get the 3rd signature on nonce 100
2. ⏳ Click "Execute" in the Safe UI
3. ⏳ Submit the blockchain transaction
4. ⏳ Wait for mining
5. ✅ **`transactionHash` appears!**

**What you should do now:**
1. Get the 3rd signature for nonce 100 (it's blocking everything)
2. Execute it once you have 3/3 signatures
3. Then the blockchain transaction hash will be generated
4. You'll be able to view it on Etherscan

---

## Visual Diagram

```
Proposal Stage               Signing Stage              Execution Stage
─────────────────           ─────────────────          ─────────────────
                                                        
 Owner proposes     →       Owners sign        →       Someone executes
 transaction                transaction                on blockchain
                                                        
 ✅ safeTxHash              ✅ safeTxHash              ✅ safeTxHash
 ❌ transactionHash         ❌ transactionHash         ✅ transactionHash ← GENERATED!
 ❌ executionDate           ❌ executionDate           ✅ executionDate
 ❌ isExecuted              ❌ isExecuted              ✅ isExecuted
    (false)                    (false)                    (true)
 ✅ nonce                   ✅ nonce                   ✅ nonce
 [] confirmations           [✅✅] confirmations       [✅✅✅] confirmations
                                                        ✅ blockNumber
                                                        ✅ gasUsed
                                                        ✅ fee

     YOUR                       YOUR                   AFTER YOU
   TRANSACTIONS                TRANSACTIONS            EXECUTE
   ARE HERE                    ARE HERE
```

---

**Bottom Line**: `transactionHash` is null because your transactions are **pending**. Once they're executed on the blockchain, this field will be populated with the actual Ethereum transaction hash! 🚀

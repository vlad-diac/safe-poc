# Multi-Sig Transaction Signing Issues - Troubleshooting Guide

## 🔴 Problem: Infinite Loading When Signing

When the second signer tries to sign a transaction (either in your app or on app.safe.global), the signing process hangs indefinitely.

---

## 🎯 Root Causes

### 1. **Incomplete or Invalid RPC URL**
**Symptoms:**
- Signing hangs forever
- No error message
- Works for first signer but not subsequent signers

**Why it happens:**
- Transaction execution requires gas estimation
- Gas estimation needs a valid RPC endpoint
- Second signature triggers execution simulation
- Invalid RPC = simulation fails = infinite loading

### 2. **Mainnet vs Testnet Mismatch**
**Symptoms:**
- Transaction appears in one interface but not another
- Signing fails without clear error

**Why it happens:**
- Your Safe might be on Sepolia testnet
- But your .env is configured for Mainnet
- Transaction Service URLs are different per network

### 3. **Insufficient Funds for Gas**
**Symptoms:**
- Signing completes but transaction never executes
- "Insufficient funds" error (sometimes hidden)

**Why it happens:**
- Executing a multi-sig transaction requires gas
- Second signature triggers execution
- If Safe has no ETH for gas, execution fails

---

## ✅ Solution Steps

### Step 1: Fix Your RPC URL

Your current `.env` has an incomplete Alchemy key:
```bash
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/sc8JlRttSGdpxuDn9fCRN
```

**Option A: Get Free Alchemy API Key**

1. Go to https://www.alchemy.com/
2. Sign up for free account
3. Create a new app for **Sepolia** testnet
4. Copy the full API key (should be longer)
5. Update `.env`:

```bash
# Sepolia Testnet (Recommended for testing)
CHAIN_ID=11155111
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_FULL_KEY_HERE
TRANSACTION_SERVICE_URL=https://safe-transaction-sepolia.safe.global
```

**Option B: Use Public RPC (Free, but rate limited)**

```bash
# Sepolia Testnet with Public RPC
CHAIN_ID=11155111
RPC_URL=https://rpc.sepolia.org
TRANSACTION_SERVICE_URL=https://safe-transaction-sepolia.safe.global
```

**Option C: Mainnet with Valid Key**

```bash
# Mainnet (requires real ETH for gas)
CHAIN_ID=1
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_COMPLETE_KEY
TRANSACTION_SERVICE_URL=https://safe-transaction-mainnet.safe.global
```

### Step 2: Verify Your Safe Address Network

Check which network your Safe is actually on:

1. Go to https://app.safe.global
2. Connect your wallet
3. Find your Safe
4. Check the network indicator (Mainnet/Sepolia/etc)

**If on Sepolia:**
- Update `DEFAULT_SAFE_ADDRESS` in `.env`
- Use Sepolia RPC URL
- Use Sepolia Transaction Service

**If on Mainnet:**
- Ensure Safe has ETH for gas fees
- Use Mainnet RPC URL (with valid key)
- Use Mainnet Transaction Service

### Step 3: Restart Backend

After updating `.env`:

```bash
cd safe-management-app/backend
# Kill existing process
# Then restart:
npm run dev
```

### Step 4: Clear Frontend Cache

```bash
# In browser:
1. Hard refresh (Ctrl + Shift + R)
2. Or clear localStorage:
   - Open DevTools (F12)
   - Console tab
   - Run: localStorage.clear()
   - Refresh page
```

---

## 🧪 Testing Multi-Sig Properly

### Step-by-Step Test

1. **Setup: 2-of-2 Multi-Sig**
   ```
   Owners: 2 addresses (Wallet A, Wallet B)
   Threshold: 2
   Network: Sepolia
   Safe Balance: 0.01 ETH (for gas)
   ```

2. **Create Transaction (Wallet A)**
   ```bash
   - Connect Wallet A
   - Create transaction (e.g., send 0.001 ETH)
   - Transaction goes to "Pending"
   - Status: 1/2 signatures
   ```

3. **Sign with Second Owner (Wallet B)**
   
   **Option A: Via Your App**
   ```bash
   - Disconnect Wallet A
   - Connect Wallet B (must be owner #2)
   - Go to Transactions page
   - Click "Sign Transaction"
   - Should execute immediately when threshold reached
   ```

   **Option B: Via app.safe.global**
   ```bash
   - Go to https://app.safe.global
   - Connect Wallet B
   - Navigate to your Safe
   - Find pending transaction in "Queue"
   - Click "Confirm"
   - Sign with wallet
   - Should execute automatically
   ```

---

## 🔍 Debugging Checklist

### If Signing Still Hangs

**Check Browser Console (F12):**
```javascript
// Look for errors like:
- "RPC call failed"
- "Invalid API key"
- "Network mismatch"
- "Insufficient funds"
```

**Check Network in MetaMask:**
- Ensure MetaMask is on the same network as your Safe
- Sepolia Safe = MetaMask on Sepolia
- Mainnet Safe = MetaMask on Mainnet

**Verify Safe Transaction Service:**
```bash
# Test if service is reachable
curl https://safe-transaction-sepolia.safe.global/api/v1/about/

# Should return JSON with version info
```

**Check Safe Balance:**
```bash
# Your Safe needs ETH for gas fees
# Minimum: ~0.01 ETH on mainnet, ~0.001 ETH on Sepolia
```

**Test RPC Endpoint:**
```bash
curl -X POST $RPC_URL \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# Should return current block number
```

---

## 🎬 What Actually Happens During Multi-Sig

### First Signature (Wallet A)
```
1. Create transaction ✅
2. Calculate safe transaction hash ✅
3. Sign hash with Wallet A ✅
4. Send signature to Transaction Service ✅
5. Transaction Status: Pending (1/2) ✅
```

### Second Signature (Wallet B)
```
1. Fetch transaction from Transaction Service ✅
2. Verify transaction details ✅
3. Sign hash with Wallet B ✅
4. Send signature to Transaction Service ✅
5. Check: Signatures (2) >= Threshold (2) ✅
6. → EXECUTE TRANSACTION ON-CHAIN ← [THIS IS WHERE IT HANGS]
7. Estimate gas needed 🔴 [REQUIRES VALID RPC]
8. Simulate execution 🔴 [REQUIRES VALID RPC]
9. Build Ethereum transaction 🔴 [REQUIRES VALID RPC]
10. Send to blockchain ✅
```

**The hang happens at step 7-9** when RPC is invalid or network mismatch occurs.

---

## 🚀 Recommended Setup for Testing

### Create a Fresh Test Environment

1. **Get Sepolia ETH (Free)**
   ```
   - https://sepoliafaucet.com/
   - Get 0.5 ETH for testing
   ```

2. **Create Sepolia Safe**
   ```
   - Go to app.safe.global
   - Switch to Sepolia network
   - Create new Safe with 2 owners
   - Set threshold to 2
   ```

3. **Fund the Safe**
   ```
   - Send 0.1 ETH to Safe address
   - Needed for gas fees
   ```

4. **Configure Your App**
   ```bash
   # backend/.env
   DEFAULT_SAFE_ADDRESS=0xYourSepoliaSafe
   CHAIN_ID=11155111
   RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   TRANSACTION_SERVICE_URL=https://safe-transaction-sepolia.safe.global
   ```

5. **Test Multi-Sig Flow**
   ```
   ✅ Create transaction with Owner 1
   ✅ Wait 10 seconds (auto-refresh in your app)
   ✅ Sign with Owner 2
   ✅ Transaction executes immediately
   ✅ Status changes to "Executed"
   ```

---

## 📊 Network Configuration Reference

### Sepolia Testnet
```bash
CHAIN_ID=11155111
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
# Or public: https://rpc.sepolia.org
TRANSACTION_SERVICE_URL=https://safe-transaction-sepolia.safe.global
Faucet: https://sepoliafaucet.com/
```

### Mainnet
```bash
CHAIN_ID=1
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
TRANSACTION_SERVICE_URL=https://safe-transaction-mainnet.safe.global
Cost: Real ETH for gas (~$5-20 per transaction)
```

### Polygon
```bash
CHAIN_ID=137
RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
TRANSACTION_SERVICE_URL=https://safe-transaction-polygon.safe.global
Cost: Very low (~$0.01 per transaction)
```

---

## 🎯 Quick Fix Summary

**The 5-Minute Fix:**

1. Get Alchemy API key: https://www.alchemy.com/ (free)
2. Update `backend/.env`:
   ```bash
   CHAIN_ID=11155111
   RPC_URL=https://eth-sepolia.g.alchemy.com/v2/FULL_KEY_HERE
   TRANSACTION_SERVICE_URL=https://safe-transaction-sepolia.safe.global
   DEFAULT_SAFE_ADDRESS=YOUR_SEPOLIA_SAFE_ADDRESS
   ```
3. Restart backend: `npm run dev`
4. Clear browser cache: `localStorage.clear()` in console
5. Refresh app and try signing again

---

## 🆘 Still Having Issues?

### Check These Common Mistakes

❌ **Wrong Network**
- Safe on Sepolia, but app configured for Mainnet
- Solution: Match `CHAIN_ID` to your Safe's network

❌ **Incomplete API Key**
- Your Alchemy key is only 20 characters
- Should be 32+ characters
- Solution: Copy the FULL key from Alchemy dashboard

❌ **Not Enough Gas**
- Safe has 0 ETH
- Can't execute transactions
- Solution: Send ETH to Safe address

❌ **Wrong Transaction Service URL**
- Using mainnet URL for Sepolia Safe
- Solution: Match Transaction Service to `CHAIN_ID`

❌ **Firewall/Network Issues**
- Can't reach Transaction Service
- Solution: Test with `curl` command above

---

## 📚 Additional Resources

- **Safe Docs**: https://docs.safe.global
- **Alchemy Dashboard**: https://dashboard.alchemy.com
- **Sepolia Faucet**: https://sepoliafaucet.com
- **Safe Transaction Service**: https://github.com/safe-global/safe-transaction-service

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ No infinite loading
- ✅ Clear error messages (if any)
- ✅ Transaction executes immediately at threshold
- ✅ Status updates to "Executed"
- ✅ Both signers can see the same transaction
- ✅ Auto-refresh detects new signatures

Happy multi-sig! 🔐


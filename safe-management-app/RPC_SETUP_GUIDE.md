# RPC URL Setup Guide

## Issue
You're seeing this error:
```
POST https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY 401 (Unauthorized)
```

This means the RPC URL in your backend `.env` file contains a placeholder instead of a real API key.

---

## Solution: Get a Free Alchemy API Key

### Step 1: Sign Up for Alchemy (Free)
1. Go to [https://www.alchemy.com/](https://www.alchemy.com/)
2. Click **"Sign Up Free"** or **"Get Started"**
3. Create an account (free tier is sufficient)

### Step 2: Create an App
1. Once logged in, click **"+ Create New App"**
2. Fill in the details:
   - **Name**: `Safe Management POC` (or any name)
   - **Chain**: Select **"Ethereum"**
   - **Network**: Select **"Mainnet"** or **"Sepolia"** (testnet recommended for POC)
3. Click **"Create App"**

### Step 3: Get Your API Key
1. Click on your newly created app
2. Click **"API Key"** button in the top right
3. Copy the **HTTPS URL** (it should look like):
   ```
   https://eth-mainnet.g.alchemy.com/v2/YOUR_ACTUAL_KEY_HERE
   ```

### Step 4: Update Backend .env File
1. Open `safe-management-app/backend/.env`
2. Find this line:
   ```env
   RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
   ```
3. Replace it with your actual Alchemy URL:
   ```env
   RPC_URL=https://eth-mainnet.g.alchemy.com/v2/abc123def456...
   ```

### Step 5: Restart Your Backend
```powershell
cd safe-management-app/backend
npm run dev
```

---

## Alternative RPC Providers

If you prefer not to use Alchemy, here are free alternatives:

### Infura
- URL: [https://infura.io/](https://infura.io/)
- Free tier available
- Format: `https://mainnet.infura.io/v3/YOUR_PROJECT_ID`

### QuickNode
- URL: [https://www.quicknode.com/](https://www.quicknode.com/)
- Free tier available
- Provides endpoint URL after signup

### Public RPC (Not recommended for production)
For testing only, you can use public RPCs:
```env
RPC_URL=https://ethereum.publicnode.com
```
⚠️ **Warning**: Public RPCs are rate-limited and unreliable. Only use for quick testing.

---

## Updating Session RPC URL via UI

Once you have a valid RPC URL, you can also update it through the Settings modal:

1. Click **Settings** in the sidebar (bottom left)
2. Select your session from the dropdown
3. Update the **RPC URL** field
4. Click **Save Session**

---

## Network-Specific RPC URLs

### Ethereum Mainnet
```env
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### Sepolia Testnet (Recommended for testing)
```env
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
CHAIN_ID=11155111
TRANSACTION_SERVICE_URL=https://safe-transaction-sepolia.safe.global
```

### Polygon
```env
RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
CHAIN_ID=137
TRANSACTION_SERVICE_URL=https://safe-transaction-polygon.safe.global
```

---

## Verification

After updating your RPC URL, you should:

1. ✅ No more 401 Unauthorized errors
2. ✅ Safe info loads correctly
3. ✅ Transactions list appears
4. ✅ Balance displays

If you still see errors, verify:
- The API key is correctly copied (no extra spaces)
- The backend has been restarted
- The network (chainId) matches your RPC URL

---

## Need Help?

If you're still experiencing issues:
1. Check the browser console for specific error messages
2. Verify your Alchemy app is active (check dashboard)
3. Ensure you're using the correct network (Mainnet vs Testnet)
4. Try creating a new Alchemy app and using that API key


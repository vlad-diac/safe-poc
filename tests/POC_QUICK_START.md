# Safe Management POC - Quick Start Guide

## 🚀 Get Started in 30 Minutes

This guide will help you set up a working POC quickly using what you already have.

---

## Step 1: Verify Prerequisites (5 minutes)

### What You Have:
- ✅ Safe API Key
- ✅ Safe Wallet Address (`0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F`)
- ✅ Python environment with working scripts

### What You Need:
1. **Node.js** (v18+) - For React frontend
2. **Python** (3.8+) - For FastAPI backend
3. **MetaMask** or compatible wallet
4. **Your wallet must be an owner** of the Safe account

### Check Your Wallet:
```bash
# Run this to see Safe owners
python get_pending_transactions.py
# Look for "Owners" section - your wallet address should be there
```

---

## Step 2: Backend Setup (10 minutes)

### A. Create Backend Structure

```bash
# Create directory
mkdir safe-management-backend
cd safe-management-backend

# Copy your .env file
cp ../.env .

# Add these to .env:
echo "RPC_URL=https://eth.llamarpc.com" >> .env
echo "CHAIN_ID=eth" >> .env
```

### B. Install Dependencies

```bash
# Use your existing venv or create new one
python -m venv venv

# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate

# Install packages
pip install fastapi uvicorn[standard] python-dotenv requests pydantic
```

### C. Create Minimal Backend

**Create `main.py`:**

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = FastAPI(title="Safe Management API")

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Config
SAFE_API_KEY = os.getenv('SAFE_API_KEY')
SAFE_ADDRESS = os.getenv('AMATSU_SAFE_WALLET_ADDRESS')
BASE_URL = "https://api.safe.global/tx-service"
CHAIN = "eth"
HEADERS = {
    "Authorization": f"Bearer {SAFE_API_KEY}",
    "Content-Type": "application/json"
}

@app.get("/")
async def root():
    return {"message": "Safe Management API", "safe": SAFE_ADDRESS}

@app.get("/api/safe")
async def get_safe_info():
    """Get Safe configuration"""
    try:
        url = f"{BASE_URL}/{CHAIN}/api/v1/safes/{SAFE_ADDRESS}/"
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/transactions")
async def get_transactions(pending_only: bool = False):
    """Get transactions"""
    try:
        url = f"{BASE_URL}/{CHAIN}/api/v1/safes/{SAFE_ADDRESS}/multisig-transactions/"
        params = {"ordering": "-nonce"}
        if pending_only:
            params["executed"] = "false"
        
        response = requests.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        return response.json().get('results', [])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/transaction/{safe_tx_hash}")
async def get_transaction(safe_tx_hash: str):
    """Get specific transaction"""
    try:
        url = f"{BASE_URL}/{CHAIN}/api/v1/multisig-transactions/{safe_tx_hash}/"
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### D. Test Backend

```bash
# Start server
python main.py

# In another terminal, test:
curl http://localhost:8000/api/safe
curl http://localhost:8000/api/transactions?pending_only=true
```

---

## Step 3: Frontend Setup (10 minutes)

### A. Create React App

```bash
# Go back to main directory
cd ..

# Create React app
npx create-react-app safe-management-frontend --template typescript
cd safe-management-frontend
```

### B. Install Dependencies

```bash
npm install @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit ethers@^6
```

### C. Create `.env.local`

```bash
echo "REACT_APP_API_URL=http://localhost:8000" > .env.local
echo "REACT_APP_SAFE_ADDRESS=0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F" >> .env.local
echo "REACT_APP_SAFE_API_KEY=your_safe_api_key" >> .env.local
```

### D. Create Minimal App

**Replace `src/App.tsx`:**

```typescript
import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const SAFE_ADDRESS = process.env.REACT_APP_SAFE_ADDRESS;

interface SafeInfo {
  address: string;
  owners: string[];
  threshold: number;
  nonce: number;
}

interface Transaction {
  safeTxHash: string;
  nonce: number;
  to: string;
  value: string;
  isExecuted: boolean;
  confirmations: any[];
  confirmationsRequired: number;
}

function App() {
  const [safeInfo, setSafeInfo] = useState<SafeInfo | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    fetchData();
  }, [showPending]);

  const fetchData = async () => {
    try {
      // Fetch Safe info
      const infoRes = await fetch(`${API_URL}/api/safe`);
      const info = await infoRes.json();
      setSafeInfo(info);

      // Fetch transactions
      const txRes = await fetch(`${API_URL}/api/transactions?pending_only=${showPending}`);
      const txs = await txRes.json();
      setTransactions(txs);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="App"><h1>Loading...</h1></div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔐 Safe Management Dashboard</h1>
      </header>

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Safe Info */}
        {safeInfo && (
          <div style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '20px' 
          }}>
            <h2>Safe Account</h2>
            <p><strong>Address:</strong> {safeInfo.address}</p>
            <p><strong>Owners:</strong> {safeInfo.owners.length}</p>
            <p><strong>Threshold:</strong> {safeInfo.threshold}/{safeInfo.owners.length}</p>
            <p><strong>Nonce:</strong> {safeInfo.nonce}</p>
            
            <details>
              <summary style={{ cursor: 'pointer', marginTop: '10px' }}>
                View Owners
              </summary>
              <ul style={{ textAlign: 'left', fontSize: '14px' }}>
                {safeInfo.owners.map((owner, i) => (
                  <li key={i}>{owner}</li>
                ))}
              </ul>
            </details>
          </div>
        )}

        {/* Transactions */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2>Transactions</h2>
            <button 
              onClick={() => setShowPending(!showPending)}
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                background: showPending ? '#4CAF50' : 'white',
                color: showPending ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              {showPending ? 'Show All' : 'Show Pending Only'}
            </button>
          </div>

          {transactions.length === 0 ? (
            <p>No transactions found</p>
          ) : (
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              textAlign: 'left'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '10px' }}>Nonce</th>
                  <th style={{ padding: '10px' }}>To</th>
                  <th style={{ padding: '10px' }}>Value (ETH)</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Signatures</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.safeTxHash} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>{tx.nonce}</td>
                    <td style={{ padding: '10px', fontSize: '12px' }}>
                      {tx.to.substring(0, 10)}...
                    </td>
                    <td style={{ padding: '10px' }}>
                      {(parseInt(tx.value) / 1e18).toFixed(4)}
                    </td>
                    <td style={{ padding: '10px' }}>
                      {tx.isExecuted ? '✅ Executed' : '⏳ Pending'}
                    </td>
                    <td style={{ padding: '10px' }}>
                      {tx.confirmations.length}/{tx.confirmationsRequired}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
```

### E. Test Frontend

```bash
npm start
# Opens http://localhost:3000
```

---

## Step 4: Verify Everything Works (5 minutes)

### Checklist:
- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] You see your Safe address and owners
- [ ] Transaction list shows up
- [ ] "Show Pending Only" filter works

---

## 🎉 Success!

You now have a working POC! You can:
- ✅ View Safe info
- ✅ See all transactions
- ✅ Filter pending transactions

---

## Next Steps

### Phase 2: Add Transaction Creation

1. **Add wallet connection** (MetaMask)
2. **Create transaction form**
3. **Use Safe SDK to sign & propose**

See `POC_IMPLEMENTATION_PLAN.md` for detailed code examples.

### Quick Enhancements:
- Add styling (CSS/Tailwind)
- Add transaction details page
- Add refresh button
- Add error handling
- Add loading states

---

## Troubleshooting

### Backend Issues:

**"Module not found"**
```bash
pip install fastapi uvicorn requests python-dotenv pydantic
```

**"CORS error"**
- Make sure backend is running on port 8000
- Check CORS middleware is enabled

### Frontend Issues:

**"API connection failed"**
- Verify backend is running
- Check `.env.local` has correct API_URL

**"Cannot find module"**
```bash
npm install @safe-global/api-kit @safe-global/protocol-kit ethers@^6
```

### Data Issues:

**"Safe not found"**
- Check your Safe address in `.env`
- Verify it's on the correct network (mainnet/testnet)

**"No transactions"**
- Your Safe might be new with no transactions
- Try with a different Safe address for testing

---

## Useful Commands

```bash
# Backend
cd safe-management-backend
python main.py

# Frontend
cd safe-management-frontend
npm start

# Test API
curl http://localhost:8000/api/safe
curl http://localhost:8000/api/transactions

# Check logs
# Backend logs appear in terminal
# Frontend logs in browser console (F12)
```

---

## Resources

- **Your existing scripts**: Use the code you've already tested
- **Safe Docs**: https://docs.safe.global
- **API Reference**: https://docs.safe.global/core-api
- **Implementation Plan**: See `POC_IMPLEMENTATION_PLAN.md`

---

**Ready for more?** Check `POC_IMPLEMENTATION_PLAN.md` for:
- Wallet connection
- Transaction creation
- Signing functionality
- Full feature set

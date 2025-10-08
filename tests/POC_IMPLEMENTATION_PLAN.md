# Safe Management POC - Implementation Plan

## 🎯 Project Overview

**Goal**: Build a web app to manage a Safe account with capabilities to:
- View Safe info (owners, threshold, balance)
- List all transactions (pending & executed)
- View transaction details
- Create and propose new transactions
- Sign pending transactions

**Tech Stack**:
- **Frontend**: React + TypeScript + Safe SDK
- **Backend**: FastAPI (Python)
- **Blockchain**: Ethereum (via Safe Transaction Service API)

---

## 📋 What You Already Have

✅ Safe API Key (`SAFE_API_KEY`)  
✅ Safe Wallet Address (`AMATSU_SAFE_WALLET_ADDRESS`)  
✅ Working Python scripts for:
  - Getting pending transactions
  - Checking transaction status
  - Generating transaction links
✅ Safe Transaction Service API access  
✅ Documentation and examples

---

## 🔧 Prerequisites & Setup

### Phase 0: Environment Setup (Day 1)

#### A. Install Dependencies

**Backend (Python/FastAPI)**:
```bash
# Create backend directory
mkdir safe-management-backend
cd safe-management-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\Activate.ps1 on Windows

# Install dependencies
pip install fastapi uvicorn[standard] python-dotenv requests web3 eth-account pydantic python-multipart cors
```

**Frontend (React)**:
```bash
# Create React app with TypeScript
npx create-react-app safe-management-frontend --template typescript
cd safe-management-frontend

# Install Safe SDK and dependencies
npm install @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit ethers@^6 wagmi viem @tanstack/react-query
```

#### B. Required Accounts & Keys

**What you need**:
1. ✅ Safe API Key (you have this)
2. ✅ Safe Wallet Address (you have this)
3. ⚠️ **Wallet Private Key** or **Browser Wallet** (MetaMask/WalletConnect)
   - For signing transactions
   - Must be one of the Safe owners
4. ✅ RPC URL (you can use public RPCs or Infura/Alchemy)

**Security Note**: 
- For POC, you can use a test account with small funds
- NEVER commit private keys to git
- Use environment variables

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   React Frontend                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  - Connect Wallet (MetaMask)                     │  │
│  │  - View Safe Info & Balances                     │  │
│  │  - List Transactions (Pending/Executed)          │  │
│  │  - Transaction Details                           │  │
│  │  - Create Transaction Form                       │  │
│  │  - Sign Transaction Button                       │  │
│  └──────────────────────────────────────────────────┘  │
│             │ HTTP/REST                    │ Web3       │
└─────────────┼─────────────────────────────┼────────────┘
              │                             │
              ↓                             ↓
┌─────────────────────────┐   ┌───────────────────────┐
│   FastAPI Backend       │   │  Safe SDK (Frontend)  │
│  ┌──────────────────┐  │   │  ┌────────────────┐  │
│  │ Safe API Proxy   │  │   │  │ Protocol Kit   │  │
│  │ Transaction Data │  │   │  │ Sign Txs       │  │
│  │ Cache Layer      │  │   │  │ Web3 Provider  │  │
│  └──────────────────┘  │   │  └────────────────┘  │
└──────────┬──────────────┘   └────────────┬──────────┘
           │                               │
           ↓                               ↓
┌──────────────────────────────────────────────────────┐
│         Safe Transaction Service API                  │
│  https://api.safe.global/tx-service                  │
└──────────────────────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────────────┐
│              Ethereum Blockchain                      │
│  (Read: Safe contract, Balances, etc.)              │
└──────────────────────────────────────────────────────┘
```

---

## 📝 Implementation Phases

### Phase 1: Backend API (Day 1-2)

Build FastAPI backend to wrap Safe Transaction Service API.

#### File Structure:
```
safe-management-backend/
├── main.py                  # FastAPI app entry point
├── .env                     # Environment variables
├── config.py                # Configuration
├── models/
│   ├── __init__.py
│   ├── transaction.py       # Transaction models
│   └── safe.py             # Safe models
├── services/
│   ├── __init__.py
│   ├── safe_service.py     # Safe API client
│   └── blockchain.py       # Web3 interactions
└── routes/
    ├── __init__.py
    ├── safe.py             # Safe info endpoints
    └── transactions.py     # Transaction endpoints
```

#### API Endpoints to Build:

**1. Safe Info**:
```python
GET  /api/safe/{address}
     # Returns: owners, threshold, nonce, version, balance

GET  /api/safe/{address}/owners
     # Returns: list of owner addresses

GET  /api/safe/{address}/balances
     # Returns: ETH and token balances
```

**2. Transactions**:
```python
GET  /api/safe/{address}/transactions
     # Query params: executed=true/false, limit, offset
     # Returns: paginated transaction list

GET  /api/safe/{address}/transactions/pending
     # Returns: only pending transactions

GET  /api/transaction/{safe_tx_hash}
     # Returns: detailed transaction info

POST /api/transaction/propose
     # Body: transaction data + signature
     # Returns: safe tx hash

POST /api/transaction/{safe_tx_hash}/confirm
     # Body: signature
     # Returns: confirmation status
```

**3. Utilities**:
```python
GET  /api/chains
     # Returns: supported chains

GET  /api/safe/{address}/link/{safe_tx_hash}
     # Returns: Safe UI link for signing
```

#### Implementation Code Snippets:

**1. `config.py`**:
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SAFE_API_KEY: str
    AMATSU_SAFE_WALLET_ADDRESS: str
    SAFE_TX_SERVICE_URL: str = "https://api.safe.global/tx-service"
    RPC_URL: str = "https://eth.llamarpc.com"
    CHAIN_ID: str = "eth"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

**2. `services/safe_service.py`**:
```python
import requests
from typing import Dict, List, Optional

class SafeService:
    def __init__(self, api_key: str, chain: str = "eth"):
        self.base_url = "https://api.safe.global/tx-service"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        self.chain = chain
    
    def get_safe_info(self, address: str) -> Dict:
        """Get Safe configuration"""
        url = f"{self.base_url}/{self.chain}/api/v1/safes/{address}/"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def get_pending_transactions(self, address: str) -> List[Dict]:
        """Get pending transactions"""
        url = f"{self.base_url}/{self.chain}/api/v1/safes/{address}/multisig-transactions/"
        params = {"executed": "false", "ordering": "-nonce"}
        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()
        return response.json().get('results', [])
    
    def get_all_transactions(self, address: str, limit: int = 20) -> List[Dict]:
        """Get all transactions"""
        url = f"{self.base_url}/{self.chain}/api/v1/safes/{address}/multisig-transactions/"
        params = {"limit": limit, "ordering": "-nonce"}
        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()
        return response.json().get('results', [])
    
    def get_transaction(self, safe_tx_hash: str) -> Dict:
        """Get specific transaction"""
        url = f"{self.base_url}/{self.chain}/api/v1/multisig-transactions/{safe_tx_hash}/"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def propose_transaction(self, data: Dict) -> Dict:
        """Propose a new transaction"""
        safe_address = data['safeAddress']
        url = f"{self.base_url}/{self.chain}/api/v1/safes/{safe_address}/multisig-transactions/"
        response = requests.post(url, headers=self.headers, json=data)
        response.raise_for_status()
        return response.json()
```

**3. `routes/safe.py`**:
```python
from fastapi import APIRouter, HTTPException
from services.safe_service import SafeService
from config import settings

router = APIRouter(prefix="/api/safe", tags=["safe"])
safe_service = SafeService(settings.SAFE_API_KEY, settings.CHAIN_ID)

@router.get("/{address}")
async def get_safe_info(address: str):
    """Get Safe configuration"""
    try:
        return safe_service.get_safe_info(address)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{address}/owners")
async def get_owners(address: str):
    """Get Safe owners"""
    try:
        info = safe_service.get_safe_info(address)
        return {
            "owners": info['owners'],
            "threshold": info['threshold']
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
```

**4. `main.py`**:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import safe, transactions

app = FastAPI(title="Safe Management API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(safe.router)
app.include_router(transactions.router)

@app.get("/")
async def root():
    return {"message": "Safe Management API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

### Phase 2: Frontend React App (Day 2-3)

#### File Structure:
```
safe-management-frontend/
├── src/
│   ├── components/
│   │   ├── SafeInfo.tsx          # Display Safe details
│   │   ├── TransactionList.tsx   # List transactions
│   │   ├── TransactionDetail.tsx # Transaction details
│   │   ├── CreateTransaction.tsx # Create new tx form
│   │   └── WalletConnect.tsx     # Connect wallet button
│   ├── services/
│   │   ├── api.ts                # Backend API client
│   │   └── safeService.ts        # Safe SDK integration
│   ├── hooks/
│   │   ├── useSafe.ts            # Safe data hooks
│   │   └── useWallet.ts          # Wallet connection
│   ├── types/
│   │   └── safe.ts               # TypeScript types
│   └── App.tsx
```

#### Key Components:

**1. Wallet Connection (`WalletConnect.tsx`)**:
```typescript
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const WalletConnect = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(provider);
        setAccount(address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      {account ? (
        <div>Connected: {account.substring(0, 6)}...{account.substring(38)}</div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};
```

**2. Safe Info Display (`SafeInfo.tsx`)**:
```typescript
import { useEffect, useState } from 'react';
import { getSafeInfo } from '../services/api';

interface SafeInfoData {
  address: string;
  owners: string[];
  threshold: number;
  nonce: number;
}

export const SafeInfo = ({ safeAddress }: { safeAddress: string }) => {
  const [info, setInfo] = useState<SafeInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getSafeInfo(safeAddress);
        setInfo(data);
      } catch (error) {
        console.error('Failed to fetch Safe info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [safeAddress]);

  if (loading) return <div>Loading...</div>;
  if (!info) return <div>Failed to load Safe info</div>;

  return (
    <div className="safe-info">
      <h2>Safe Account</h2>
      <p><strong>Address:</strong> {info.address}</p>
      <p><strong>Threshold:</strong> {info.threshold}/{info.owners.length}</p>
      <p><strong>Nonce:</strong> {info.nonce}</p>
      
      <h3>Owners</h3>
      <ul>
        {info.owners.map((owner, index) => (
          <li key={index}>{owner}</li>
        ))}
      </ul>
    </div>
  );
};
```

**3. Transaction List (`TransactionList.tsx`)**:
```typescript
import { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';

interface Transaction {
  safeTxHash: string;
  nonce: number;
  to: string;
  value: string;
  isExecuted: boolean;
  confirmations: any[];
  confirmationsRequired: number;
}

export const TransactionList = ({ safeAddress }: { safeAddress: string }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'executed'>('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions(safeAddress, filter);
      setTransactions(data);
    };

    fetchTransactions();
  }, [safeAddress, filter]);

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('executed')}>Executed</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nonce</th>
            <th>To</th>
            <th>Status</th>
            <th>Signatures</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.safeTxHash}>
              <td>{tx.nonce}</td>
              <td>{tx.to.substring(0, 10)}...</td>
              <td>{tx.isExecuted ? '✅ Executed' : '⏳ Pending'}</td>
              <td>{tx.confirmations.length}/{tx.confirmationsRequired}</td>
              <td>
                <button onClick={() => window.open(`/transaction/${tx.safeTxHash}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

**4. Create Transaction Form (`CreateTransaction.tsx`)**:
```typescript
import { useState } from 'react';
import { ethers } from 'ethers';
import Safe from '@safe-global/protocol-kit';
import SafeApiKit from '@safe-global/api-kit';

export const CreateTransaction = ({ 
  safeAddress, 
  provider,
  onSuccess 
}: { 
  safeAddress: string; 
  provider: ethers.BrowserProvider;
  onSuccess: () => void;
}) => {
  const [to, setTo] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Initialize Protocol Kit
      const signer = await provider.getSigner();
      const protocolKit = await Safe.init({
        provider,
        signer: await signer.getAddress(),
        safeAddress
      });

      // Create transaction
      const safeTransaction = await protocolKit.createTransaction({
        transactions: [{
          to,
          value: ethers.parseEther(value).toString(),
          data: '0x'
        }]
      });

      // Sign transaction
      const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);
      const signature = await protocolKit.signHash(safeTxHash);

      // Propose to Safe Transaction Service
      const apiKit = new SafeApiKit({
        chainId: 1n,
        apiKey: process.env.REACT_APP_SAFE_API_KEY!
      });

      await apiKit.proposeTransaction({
        safeAddress,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: await signer.getAddress(),
        senderSignature: signature.data
      });

      alert('Transaction proposed successfully!');
      onSuccess();
      
      // Reset form
      setTo('');
      setValue('');
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-transaction">
      <h2>Create New Transaction</h2>
      
      <div>
        <label>To Address:</label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x..."
          required
        />
      </div>

      <div>
        <label>Value (ETH):</label>
        <input
          type="number"
          step="0.001"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0.1"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Transaction'}
      </button>
    </form>
  );
};
```

---

### Phase 3: Integration & Testing (Day 3-4)

#### A. Environment Configuration

**Backend `.env`**:
```env
SAFE_API_KEY=your_api_key_here
AMATSU_SAFE_WALLET_ADDRESS=0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F
RPC_URL=https://eth.llamarpc.com
CHAIN_ID=eth
```

**Frontend `.env`**:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_SAFE_API_KEY=your_api_key_here
REACT_APP_SAFE_ADDRESS=0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F
REACT_APP_CHAIN_ID=1
```

#### B. Testing Checklist

- [ ] Connect wallet (MetaMask)
- [ ] View Safe info (owners, threshold)
- [ ] List all transactions
- [ ] Filter pending transactions
- [ ] View transaction details
- [ ] Create new transaction
- [ ] Sign pending transaction
- [ ] Execute transaction (with enough signatures)
- [ ] View transaction on Etherscan

---

## 🎨 UI/UX Features (Optional Enhancements)

### Basic Features (Phase 4 - Day 4-5):
- Transaction status badges (pending/executed/failed)
- Owner avatars (Blockies/Jazzicon)
- Copy address buttons
- Transaction links to Etherscan
- Loading states
- Error handling

### Advanced Features (Future):
- Token transfers (ERC-20)
- Batch transactions
- Address book
- Transaction history graph
- Gas estimation
- ENS name resolution
- QR code for Safe address
- Export transaction data

---

## 📚 Code References from Safe Docs

### 1. Get Safe Info (API):
```
GET https://api.safe.global/tx-service/eth/api/v1/safes/{address}/
```

### 2. Get Pending Transactions:
```
GET https://api.safe.global/tx-service/eth/api/v1/safes/{address}/multisig-transactions/?executed=false
```

### 3. Propose Transaction (Safe SDK):
```typescript
const apiKit = new SafeApiKit({ chainId, apiKey });
await apiKit.proposeTransaction({
  safeAddress,
  safeTransactionData: tx.data,
  safeTxHash,
  senderAddress,
  senderSignature
});
```

### 4. Sign Transaction:
```typescript
const protocolKit = await Safe.init({ provider, signer, safeAddress });
const signature = await protocolKit.signHash(safeTxHash);
```

---

## 🚀 Quick Start Commands

### Backend:
```bash
cd safe-management-backend
source venv/bin/activate
uvicorn main:app --reload
# API available at http://localhost:8000
```

### Frontend:
```bash
cd safe-management-frontend
npm start
# App available at http://localhost:3000
```

---

## 🔐 Security Considerations

1. **Never commit private keys** - Use `.gitignore`
2. **API Key security** - Store in environment variables
3. **Validate addresses** - Check checksums
4. **Transaction preview** - Always show what will be executed
5. **Signature verification** - Verify before submitting
6. **Rate limiting** - Implement on backend
7. **Input validation** - Sanitize all user inputs

---

## 📖 Documentation & Resources

- **Safe Docs**: https://docs.safe.global
- **Safe SDK GitHub**: https://github.com/safe-global/safe-core-sdk
- **Transaction Service API**: https://docs.safe.global/core-api
- **Your Existing Scripts**: 
  - `get_pending_transactions.py`
  - `generate_safe_transaction_link.py`
  - `test_safe_api.py`

---

## ✅ Success Criteria

Your POC is complete when you can:
1. ✅ View your Safe account information
2. ✅ See list of owners and threshold
3. ✅ View all transactions (pending + executed)
4. ✅ Create a new transaction (ETH transfer)
5. ✅ Sign a pending transaction
6. ✅ See the transaction on Safe UI
7. ✅ Execute a transaction (when threshold is met)

---

## 🎯 Next Steps After POC

1. Add token transfers (ERC-20)
2. Add contract interactions
3. Implement batch transactions
4. Add transaction scheduling
5. Deploy to production
6. Add authentication/authorization
7. Implement caching layer
8. Add analytics and monitoring

---

## 💡 Pro Tips

1. **Start with reading** - Build view-only features first
2. **Test on testnet** - Use Sepolia before mainnet
3. **Use Safe UI** - Verify your transactions there
4. **Small transactions** - Test with small amounts first
5. **Check nonces** - Transactions must be executed in order
6. **Handle errors** - Network issues are common
7. **Add logging** - Debug with good logs

---

Ready to start? Let's begin with Phase 1: Backend API! 🚀

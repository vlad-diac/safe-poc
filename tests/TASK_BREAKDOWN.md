# Safe Management POC - Task Breakdown

## 🎯 Project Goal
Build a web dashboard to manage Safe accounts: view info, list transactions, create/sign transactions.

## 🎨 UI Design
- **Layout**: Sidebar (left) + Header (top) + Main content (center)
- **Sidebar**: Navigation menu + Settings cog (bottom)
- **Styling**: Tailwind CSS + Lucide icons
- **Settings**: Modal for API key, Safe address, RPC URL configuration

---

## Phase 0: Environment Setup

### Backend Setup
- [ ] **0.1** Create `safe-management-backend/` directory
- [ ] **0.2** Create Python virtual environment
- [ ] **0.3** Install: `fastapi uvicorn[standard] requests pydantic python-dotenv`
- [ ] **0.4** Create `.env` with: `SAFE_API_KEY`, `AMATSU_SAFE_WALLET_ADDRESS`, `RPC_URL`, `CHAIN_ID`

### Frontend Setup
- [ ] **0.5** Create React + TypeScript app: `npx create-react-app safe-management-frontend --template typescript`
- [ ] **0.6** Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
- [ ] **0.7** Install UI dependencies: `npm install lucide-react`
- [ ] **0.8** Install Safe SDK: `npm install @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit ethers@^6`
- [ ] **0.9** Create `.env.local` with: `REACT_APP_API_URL`, `REACT_APP_SAFE_API_KEY`, `REACT_APP_SAFE_ADDRESS`

---

## Phase 1: Backend API (FastAPI)

**Goal**: Build REST API to interact with Safe Transaction Service.

### Core Files
- [ ] **1.1** `config.py` - Settings class with environment variables
- [ ] **1.2** `services/safe_service.py` - SafeService class for API calls:
  - `get_safe_info(address)` - Returns owners, threshold, nonce, balance
  - `get_all_transactions(address)` - Returns all transactions
  - `get_pending_transactions(address)` - Returns pending only
  - `get_transaction(safe_tx_hash)` - Returns specific transaction details
  - `propose_transaction(data)` - Submits new transaction

- [ ] **1.3** `routes/safe.py` - Endpoints:
  - `GET /api/safe` - Safe configuration
  - `GET /api/safe/owners` - Owner list
  - `GET /api/safe/balances` - ETH + token balances

- [ ] **1.4** `routes/transactions.py` - Endpoints:
  - `GET /api/transactions` - All transactions (query: `?pending_only=true`)
  - `GET /api/transaction/{hash}` - Transaction details
  - `POST /api/transaction/propose` - Propose new transaction

- [ ] **1.5** `main.py` - FastAPI app with CORS middleware (allow `localhost:3000`)

### Testing
- [ ] **1.6** Start server: `python main.py`
- [ ] **1.7** Test with curl:
  - `curl http://localhost:8000/api/safe`
  - `curl http://localhost:8000/api/transactions`

---

## Phase 2: Frontend UI (React + Tailwind)

**Goal**: Build dashboard with sidebar navigation and main views.

### Layout Components
- [ ] **2.1** `components/Layout.tsx` - Main layout wrapper (Sidebar + Header + Main)
- [ ] **2.2** `components/Sidebar.tsx` - Navigation menu:
  - Links: Dashboard, Transactions, Create Transaction
  - Icons: Home, List, Plus (lucide-react)
  - Settings cog at bottom (Settings icon)

- [ ] **2.3** `components/Header.tsx` - Top bar:
  - Safe address display
  - Wallet connection status
  - Connect Wallet button

- [ ] **2.4** `components/SettingsModal.tsx` - Settings panel:
  - Input: Safe API Key
  - Input: Safe Address
  - Input: RPC URL
  - Save to localStorage

### Feature Components
- [ ] **2.5** `components/WalletConnect.tsx` - MetaMask connection:
  - Detect MetaMask (`window.ethereum`)
  - Connect wallet button
  - Display connected address

- [ ] **2.6** `pages/Dashboard.tsx` - Safe overview:
  - Safe address, owners count, threshold
  - Balance (ETH)
  - Owner list (expandable)

- [ ] **2.7** `pages/Transactions.tsx` - Transaction list:
  - Table: Nonce, To, Value, Status, Signatures
  - Filter buttons: All / Pending / Executed
  - Click row → Transaction detail view

- [ ] **2.8** `pages/TransactionDetail.tsx` - Full transaction info:
  - All transaction data
  - Confirmations list with signatures
  - Sign button (if pending + user is owner)
  - Etherscan link

- [ ] **2.9** `pages/CreateTransaction.tsx` - New transaction form:
  - Input: To address
  - Input: Value (ETH)
  - Input: Data (optional, hex)
  - Submit → Create with Safe SDK → Propose to API

### Services
- [ ] **2.10** `services/api.ts` - Backend API client:
  - `fetchSafeInfo()`
  - `fetchTransactions(pendingOnly?)`
  - `fetchTransactionDetail(hash)`

- [ ] **2.11** `services/safeService.ts` - Safe SDK integration:
  - Initialize Protocol Kit
  - Create transaction
  - Sign transaction
  - Propose to Safe Transaction Service

### Routing
- [ ] **2.12** Setup React Router:
  - `/` - Dashboard
  - `/transactions` - Transaction list
  - `/transactions/:hash` - Transaction detail
  - `/create` - Create transaction form

---

## Phase 3: Integration & Testing

**Goal**: End-to-end testing of all features.

### Read Operations
- [ ] **3.1** View Safe info (address, owners, threshold, nonce)
- [ ] **3.2** List all transactions with correct data
- [ ] **3.3** Filter pending transactions
- [ ] **3.4** View transaction details
- [ ] **3.5** Click Etherscan link → Opens correct transaction

### Write Operations
- [ ] **3.6** Connect MetaMask wallet
- [ ] **3.7** Create new transaction (fill form)
- [ ] **3.8** Sign transaction with Protocol Kit
- [ ] **3.9** Propose transaction to Safe API
- [ ] **3.10** Sign pending transaction
- [ ] **3.11** Execute transaction (when threshold met)

### Settings
- [ ] **3.12** Open settings modal
- [ ] **3.13** Update API key → Saved to localStorage
- [ ] **3.14** Update Safe address → App refreshes data

---

## Phase 4: Polish & UX Enhancements

**Goal**: Improve user experience with better feedback and visuals.

### UI Improvements
- [ ] **4.1** Loading states (spinners on data fetch)
- [ ] **4.2** Error messages (toast notifications)
- [ ] **4.3** Success messages (transaction created/signed)
- [ ] **4.4** Empty states (no transactions message)

### Visual Features
- [ ] **4.5** Status badges (Pending/Executed/Failed with colors)
- [ ] **4.6** Copy address buttons (with click feedback)
- [ ] **4.7** Owner avatars (Blockies or Jazzicon)
- [ ] **4.8** Transaction value formatting (ETH with decimals)
- [ ] **4.9** Timestamp display (relative time: "2 hours ago")
- [ ] **4.10** Hover states and transitions (smooth interactions)

### Links & Navigation
- [ ] **4.11** Etherscan links (addresses + transactions)
- [ ] **4.12** Safe UI links (sign transaction externally)
- [ ] **4.13** Breadcrumb navigation
- [ ] **4.14** Active menu item highlighting

---

## 📦 Deliverables

### Backend (`safe-management-backend/`)
```
├── main.py                 # FastAPI entry point
├── config.py               # Environment configuration
├── services/
│   └── safe_service.py    # Safe Transaction Service client
└── routes/
    ├── safe.py            # Safe info endpoints
    └── transactions.py    # Transaction endpoints
```

### Frontend (`safe-management-frontend/`)
```
├── src/
│   ├── components/
│   │   ├── Layout.tsx         # Main layout
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── Header.tsx         # Top header
│   │   ├── SettingsModal.tsx  # Settings panel
│   │   └── WalletConnect.tsx  # MetaMask button
│   ├── pages/
│   │   ├── Dashboard.tsx      # Safe overview
│   │   ├── Transactions.tsx   # Transaction list
│   │   ├── TransactionDetail.tsx
│   │   └── CreateTransaction.tsx
│   ├── services/
│   │   ├── api.ts            # Backend API client
│   │   └── safeService.ts    # Safe SDK wrapper
│   └── App.tsx               # Router + Layout
```

---

## 🚀 Running the POC

**Backend:**
```bash
cd safe-management-backend
source venv/bin/activate  # or .\venv\Scripts\Activate.ps1
python main.py
# Running on http://localhost:8000
```

**Frontend:**
```bash
cd safe-management-frontend
npm start
# Running on http://localhost:3000
```

---

## ✅ Success Criteria

POC is complete when you can:
1. View Safe account info (owners, threshold, balance)
2. List all transactions with filters (all/pending/executed)
3. View detailed transaction information
4. Create new transaction via form
5. Sign pending transaction with MetaMask
6. See transaction on Safe UI and Etherscan
7. Configure settings (API key, Safe address)

---

## 🔑 Key Technologies

- **Backend**: FastAPI, Safe Transaction Service API
- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Web3**: Safe SDK (Protocol Kit, API Kit), Ethers.js v6
- **Wallet**: MetaMask (browser extension)

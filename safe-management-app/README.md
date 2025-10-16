# Safe Management App

A production-ready Safe wallet management application with a **backend-heavy architecture** that simplifies Safe SDK usage and eliminates common frontend configuration headaches.

## 🎯 Architecture Overview

### The Problem We Solved

Traditional Safe SDK implementations require users to:
- ❌ Configure RPC URLs for each chain
- ❌ Manage API keys manually
- ❌ Handle complex Protocol Kit and API Kit initialization on frontend
- ❌ Deal with hydration errors and client-side only code

### Our Solution: Backend-Heavy Architecture

We've refactored the Safe SDK usage to follow a **backend-heavy pattern**:

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - Wallet Connection (MetaMask/WalletConnect)        │   │
│  │  - Transaction Signing ONLY                          │   │
│  │  - UI/UX                                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↕️
                      (Sign Hash Only)
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - Protocol Kit (Transaction Creation)               │   │
│  │  - API Kit (Transaction Service Communication)       │   │
│  │  - RPC Provider Management                           │   │
│  │  - API Key Management (with fallback)                │   │
│  │  - Transaction Validation                            │   │
│  │  - Business Logic                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Key Features

### ✅ Automatic RPC Management
- Backend automatically provides RPC URLs based on chain ID
- No user configuration required
- Fallback to public RPCs when custom RPC not available

### ✅ Optional API Keys
- Company-wide API key configured once in backend
- Users can optionally provide their own API key for rate limit control

### ✅ Backend-Heavy Transaction Flow
All Safe SDK operations happen on the backend:
1. **Transaction Creation** → Backend (Protocol Kit)
2. **Transaction Validation** → Backend (Protocol Kit)
3. **Transaction Hash Generation** → Backend (Protocol Kit)
4. **User Signing** → Frontend (Wallet only)
5. **Transaction Proposal** → Backend (API Kit)

### ✅ Simplified Frontend
- No Protocol Kit or API Kit on frontend
- Only SDK Starter Kit for signing

---

## 📦 Transaction Flow

### Old Way (Frontend-Heavy) ❌

```typescript
// Frontend does EVERYTHING
const protocolKit = await Safe.init({ ... })  // Complex setup
const apiKit = new SafeApiKit({ ... })        // API key needed
const tx = await protocolKit.createTransaction({ ... })
const hash = await protocolKit.getTransactionHash(tx)
const signature = await signer.signHash(hash)
await apiKit.proposeTransaction({ ... })      // Proposal
```

**Problems:**
- RPC URL required from user
- API key required from user  
- Complex initialization
- Hydration errors (client-only code)
- Business logic exposed on frontend

### New Way (Backend-Heavy) ✅

```typescript
// 1. Frontend: Create transaction (backend does the work)
const { safeTxHash, draftId } = await fetch('/api/batch-transactions/create', {
  method: 'POST',
  body: JSON.stringify({ sessionId, recipients })
})

// 2. Frontend: Sign hash (ONLY thing user does)
const signature = await safeClient.signHash(safeTxHash)

// 3. Frontend: Send signature to backend
const result = await fetch('/api/batch-transactions/propose', {
  method: 'POST',
  body: JSON.stringify({ draftId, senderAddress, signature })
})
```

**Benefits:**
- ✅ User only signs - nothing else
- ✅ Backend handles all SDK complexity
- ✅ No RPC or API key needed from user
- ✅ Business logic on backend

---

## 🔧 Critical Implementation Details

During implementation, we encountered and solved **8 critical issues** that are **essential** for successfully using the Safe SDK. These solutions are baked into our architecture.


### 1. 🔑 SafeClient Requires txServiceUrl

**Problem:** `createSafeClient()` requires **either** `apiKey` OR `txServiceUrl` parameter. Missing both causes initialization failure.

**Solution:** Always pass `txServiceUrl` when creating SafeClient on frontend:

```typescript
// ✅ CORRECT - Frontend SafeProvider
const client = await createSafeClient({
  provider: window.ethereum,
  signer: address,
  safeAddress: session.safeAddress,
  txServiceUrl: session.transactionServiceUrl  // ✅ Required!
})
```

**Database Schema Update:**
```prisma
model SafeSession {
  // ...
  transactionServiceUrl String  // Must be stored and passed to frontend
  apiKey                String?  // Optional on frontend
}
```

### 2. ✍️ MetaMask Signing: Use `personal_sign`

**Problem:** MetaMask **disabled `eth_sign`** by default for security reasons. Using `eth_sign` fails unless users manually enable it in advanced settings.

**Solution:** Use `personal_sign` (enabled by default) and adjust signature format:

```typescript
// Frontend signing with personal_sign
const result = await safeClient.signHash(safeTxHash)
let signature = result.data

// CRITICAL: Adjust v value for personal_sign format
// Safe Transaction Service expects eth_signed_message format
let v = parseInt(signature.slice(-2), 16)
v += 4  // Adjust for eth_signed_message
signature = signature.slice(0, -2) + v.toString(16).padStart(2, '0')
```

**Why this works:**
- `personal_sign` adds `\x19Ethereum Signed Message:\n32` prefix
- Adding 4 to `v` tells Safe Transaction Service it's a personal message
- **Works with default MetaMask settings** - no user configuration needed

### 3. 🏷️ Address Checksumming Required

**Problem:** Safe Transaction Service **requires** checksummed addresses (mixed case like `0xAbC123...`). Lowercase addresses cause validation errors.

**Solution:** Always checksum addresses before sending to Safe API:

```javascript
// Backend - before proposing transaction
const { ethers } = require('ethers')
const checksummedSender = ethers.getAddress(senderAddress)
```

### 4. 🚨 API Kit Hides Real Errors

**Problem:** API Kit library completely hides actual validation errors from Safe Transaction Service, only showing generic "Unprocessable Content".

**Solution:** Use **direct REST API calls** instead of API Kit for better error visibility:

```javascript
// ❌ BAD - Hides errors
await apiKit.proposeTransaction({ ... })

// ✅ GOOD - Shows real validation errors
const response = await fetch(`${txServiceUrl}/api/v1/safes/${safeAddress}/multisig-transactions/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(payload)
})

if (!response.ok) {
  const errorText = await response.text()
  console.error('Safe API Error:', errorText)  // ✅ Real error message
  throw new Error(`Safe API Error: ${errorText}`)
}
```

### 5. 📋 Correct API Payload Structure

**Problem:** Safe Transaction Service expects **flattened** transaction fields, not nested `safeTransactionData` object.

**❌ WRONG Payload:**
```javascript
{
  safeTransactionData: {
    to: '0x...',
    value: '0',
    data: '0x...',
    // ... other fields
  },
  safeTxHash: '0x...',
  senderSignature: '0x...'
}
```

**✅ CORRECT Payload:**
```javascript
{
  // Transaction fields at ROOT level
  to: '0x...',
  value: '0',
  data: '0x...',
  operation: 0,
  safeTxGas: '0',
  baseGas: '0',
  gasPrice: '0',
  gasToken: '0x0000000000000000000000000000000000000000',
  refundReceiver: '0x0000000000000000000000000000000000000000',
  nonce: 5,
  
  // Use contractTransactionHash (not safeTxHash)
  contractTransactionHash: '0x...',
  sender: '0x...',  // Checksummed!
  signature: '0x...',
  origin: 'Safe Management App'
}
```

### 6. 🎯 Complete Working Flow

Here's the **exact flow** that works with default MetaMask settings:

```javascript
// STEP 1: Backend creates transaction (Protocol Kit - read-only)
const protocolKit = await Safe.init({
  provider: rpcUrl,
  signer: undefined,  // No signer = read-only
  safeAddress: session.safeAddress
})

const safeTransaction = await protocolKit.createTransaction({
  transactions: recipients.map(r => ({
    to: r.address,
    value: r.amount,
    data: '0x'
  }))
})

const safeTxHash = await protocolKit.getTransactionHash(safeTransaction)

// STEP 2: Frontend signs hash (personal_sign)
const result = await safeClient.signHash(safeTxHash)
let signature = result.data

// Adjust v value for personal_sign format
let v = parseInt(signature.slice(-2), 16)
v += 4
signature = signature.slice(0, -2) + v.toString(16).padStart(2, '0')

// STEP 3: Backend checksums address
const checksummedSender = ethers.getAddress(senderAddress)

// STEP 4: Backend proposes via direct REST API
const payload = {
  ...safeTransaction.data,  // Flattened fields
  contractTransactionHash: safeTxHash,
  sender: checksummedSender,
  signature: signature,
  origin: 'Safe Management App'
}

const response = await fetch(
  `${txServiceUrl}/api/v1/safes/${safeAddress}/multisig-transactions/`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  }
)

// ✅ Success - Works with default MetaMask!
```

### 7. 📦 Key Takeaways

| Issue | Solution | Impact |
|-------|----------|---------|
| SafeClient init fails | Pass `txServiceUrl` | Frontend works |
| MetaMask eth_sign disabled | Use `personal_sign` + v adjustment | No user config needed |
| Lowercase addresses rejected | Use `ethers.getAddress()` | Validation passes |
| Hidden API errors | Direct REST API calls | Better debugging |
| Wrong payload format | Flatten transaction fields | API accepts request |

**Result:** ✅ Works with **default MetaMask settings** - zero user configuration required!

---

## 🛠️ Technical Implementation

### Backend Services

#### 1. **RPC Provider Service** (`rpcProviderService.js`)
```javascript
// Automatically provides RPC URLs by chain ID
const rpcUrl = getRpcUrl(chainId)
// Supports: Ethereum, Sepolia, Polygon, Arbitrum, Optimism, Base, Gnosis
```

**Features:**
- Primary RPC URLs (configurable via env)
- Fallback to public RPCs
- Chain information lookup
- Supported chains validation

#### 2. **Protocol Kit Service** (`protocolKitService.js`)
```javascript
// Create read-only Protocol Kit instance
const protocolKit = await protocolKitService.createReadOnlyClient(session)

// Create batch transaction
const { safeTransaction, safeTxHash } = 
  await protocolKitService.createBatchTransaction(session, recipients)

// Validate transaction
const isValid = await protocolKitService.validateTransaction(session, tx)

// Get Safe info
const { owners, threshold, nonce, balance } = 
  await protocolKitService.getSafeInfo(session)
```

**Features:**
- Read-only client (no signer needed on backend)
- Batch transaction support
- Transaction validation
- Safe info retrieval

#### 3. **API Kit Service** (`apiKitService.js`)
```javascript
// Propose transaction
await apiKitService.proposeTransaction(session, {
  safeTxHash,
  safeTransactionData,
  senderAddress,
  senderSignature
})

// Get pending transactions
const pending = await apiKitService.getPendingTransactions(session)

// Confirm transaction (add signature)
await apiKitService.confirmTransaction(session, safeTxHash, signature)
```

**Features:**
- Transaction proposal
- Transaction confirmation
- Pending transactions retrieval
- Token list management

#### 4. **API Key Helper** (`apiKeyHelper.js`)
```javascript
// Automatic fallback logic
const apiKey = getApiKey(session.apiKey)
// Uses session key if provided, otherwise company key
```

---

## 📡 API Endpoints

### Batch Transactions

#### `POST /api/batch-transactions/create`
Create a batch transaction on the backend.

**Request:**
```json
{
  "sessionId": "uuid",
  "recipients": [
    { "address": "0x...", "amount": "1000000000000000000" },
    { "address": "0x...", "amount": "2000000000000000000" }
  ],
  "description": "Monthly payroll"
}
```

**Response:**
```json
{
  "success": true,
  "safeTxHash": "0x...",
  "draftId": "uuid",
  "message": "Transaction created. Please sign on frontend."
}
```

#### `POST /api/batch-transactions/propose`
Propose a signed transaction to Safe Transaction Service.

**Request:**
```json
{
  "draftId": "uuid",
  "senderAddress": "0x...",
  "senderSignature": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "safeTxHash": "0x...",
  "paymentLink": "http://localhost:3000/safe/pay/uuid",
  "paymentLinkId": "uuid"
}
```

#### `GET /api/batch-transactions/:safeTxHash?sessionId=uuid`
Get transaction details.

**Response:**
```json
{
  "transaction": { /* Safe Transaction Service data */ },
  "dbTransaction": { /* Database record */ },
  "draftTransaction": { /* Draft record */ },
  "confirmations": 1,
  "confirmationsRequired": 2,
  "isExecuted": false
}
```

#### `POST /api/batch-transactions/validate`
Validate transaction before creating.

**Request:**
```json
{
  "sessionId": "uuid",
  "recipients": [/* ... */]
}
```

**Response:**
```json
{
  "isValid": true,
  "balance": "10000000000000000000",
  "totalAmount": "3000000000000000000",
  "hasSufficientBalance": true,
  "invalidAddresses": [],
  "owners": ["0x...", "0x..."],
  "threshold": 2,
  "nonce": 5
}
```

### Safe Information

#### `GET /api/safe/:address/info?sessionId=uuid`
Get Safe information (owners, threshold, nonce, balance).

### Tokens

#### `GET /api/tokens?sessionId=uuid`
Get token list for the session's chain.

#### `GET /api/tokens/:address?sessionId=uuid`
Get specific token information.

---

## 🗄️ Database Schema

### SafeSession Model
```prisma
model SafeSession {
  id                    String   @id @default(uuid())
  name                  String
  safeAddress           String
  chainId               Int      // RPC determined by backend
  
  // SDK Configuration
  apiKey                String?  // Optional - falls back to company key
  transactionServiceUrl String
  
  // Status
  isActive              Boolean  @default(true)
  autoReconnect         Boolean  @default(false)
  
  // Timestamps
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```

**Key Changes:**
- ❌ Removed `rpcUrl` field (backend provides automatically)
- ✅ Made `apiKey` optional (company key fallback)

### DraftTransaction Model
```prisma
model DraftTransaction {
  id              String   @id @default(uuid())
  sessionId       String
  safeAddress     String
  
  // Transaction Data
  safeTxHash      String   @unique
  transactionData String   @db.Text  // JSON
  recipients      String   @db.Text  // JSON
  
  // Metadata
  description     String?
  category        String?
  
  // Status Flow: draft → proposed → executed
  status          String   @default("draft")
  
  // Signature
  senderAddress   String?
  senderSignature String?  @db.Text
  signedAt        DateTime?
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  session         SafeSession @relation(fields: [sessionId], references: [id])
}
```

---

## 🎨 Frontend Services

### SafeProvider (Simplified)
```typescript
'use client'

import { createSafeClient } from '@safe-global/sdk-starter-kit'

// ONLY for signing - no Protocol Kit or API Kit
const client = await createSafeClient({
  provider: window.ethereum,
  signer: address,
  safeAddress: session.safeAddress,
  txServiceUrl: session.transactionServiceUrl  // ✅ Required (see Critical Implementation Details)
})
```

**Important Notes:**
- ✅ Must include `txServiceUrl` OR `apiKey` (we use `txServiceUrl`)
- ✅ Frontend ONLY uses this for signing - all other operations on backend
- ✅ No Protocol Kit or API Kit needed on frontend

### Transaction Service
```typescript
// Sign hash (ONLY frontend operation using personal_sign)
const result = await safeClient.signHash(safeTxHash)
let signature = result.data

// CRITICAL: Adjust v value for personal_sign (see Critical Implementation Details)
let v = parseInt(signature.slice(-2), 16)
v += 4  // Adjust for eth_signed_message format
signature = signature.slice(0, -2) + v.toString(16).padStart(2, '0')

// Everything else is backend API calls
await fetch('/api/batch-transactions/create', { ... })
await fetch('/api/batch-transactions/propose', { body: JSON.stringify({ signature, ... }) })
```

### Batch Transaction Service
```typescript
// Complete flow
const result = await createAndProposeBatchTransaction(
  safeClient,      // For signing only
  sessionId,
  senderAddress,
  recipients,
  description
)
```

---

## ⚙️ Environment Variables

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/safe_management

# Safe SDK
COMPANY_SAFE_API_KEY=your_company_safe_api_key  # Required

# RPC URLs (Optional - will use public RPCs as fallback)
ETH_MAINNET_RPC=https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY
SEPOLIA_RPC=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY
POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
ARBITRUM_RPC=https://arb1.arbitrum.io/rpc
OPTIMISM_RPC=https://mainnet.optimism.io
BASE_RPC=https://mainnet.base.org
GNOSIS_RPC=https://rpc.gnosischain.com

# Application
NODE_ENV=development
PORT=5000
APP_URL=http://localhost:3000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- MetaMask or WalletConnect

### Setup

1. **Clone and Install**
```bash
git clone <repository>
cd safe-management-app

# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration

# Frontend
cd ../frontend
npm install
cp .env.example .env.local
```

2. **Database Setup**
```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

3. **Run Application**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000


## 📚 Benefits Summary

### For Users
- ✅ **No Configuration Needed** - Just connect wallet and sign
- ✅ **Faster Setup** - No RPC URLs or API keys to configure
- ✅ **Better UX** - Simplified flows
- ✅ **More Reliable** - Backend handles complexity



## 🐛 Troubleshooting

### Common Setup Issues

#### "No API key available"
**Solution:** Set `COMPANY_SAFE_API_KEY` in backend `.env`

#### "No RPC URL configured for chain ID: X"
**Solution:** Add RPC URL for that chain in `rpcProviderService.js`

#### React Hydration Warning
**Problem:** Console shows hydration mismatch warnings.
**Solution:** Add `suppressHydrationWarning` to `<html>` element in `layout.tsx`

#### "SafeClient initialization failed" or "Missing apiKey or txServiceUrl"
**Problem:** Frontend SafeClient requires either `apiKey` OR `txServiceUrl`.
**Solution:** 
1. Ensure `transactionServiceUrl` is stored in `SafeSession` model
2. Pass `txServiceUrl: session.transactionServiceUrl` when creating SafeClient
3. See "Critical Implementation Details" section above

### Transaction Issues

#### "Failed to create transaction"
**Solutions:**
- Check Safe has sufficient balance
- Verify Safe address is correct
- Check chain ID matches Safe's deployment chain
- Review backend logs for details

#### "Transaction validation failed"
**Solutions:**
- Verify recipient addresses are valid (use `ethers.getAddress()` for checksumming)
- Check total amount doesn't exceed balance
- Ensure Safe exists on specified chain

#### "Invalid signature" or "Signature verification failed"
**Problem:** Signature format not recognized by Safe Transaction Service.
**Solutions:**
1. Ensure you're using `personal_sign` (not `eth_sign`)
2. Adjust signature `v` value by adding 4 (see Critical Implementation Details #3)
3. Checksum sender address with `ethers.getAddress()` (see #4)

#### "Unprocessable Content" with No Details
**Problem:** API Kit hides real error messages.
**Solution:** Use direct REST API calls instead of API Kit (see Critical Implementation Details #5)

#### MetaMask Shows "This signature request could be dangerous"
**Problem:** Using `eth_sign` which is disabled by default.
**Solution:** Switch to `personal_sign` with v value adjustment (see #3)

### API Payload Issues

#### "Invalid payload structure" or Missing Required Fields
**Problem:** Sending nested `safeTransactionData` instead of flattened fields.
**Solution:** 
- Flatten transaction fields at root level
- Use `contractTransactionHash` instead of `safeTxHash`
- See Critical Implementation Details #6 for correct payload structure

#### "Invalid address format"
**Problem:** Safe Transaction Service requires checksummed addresses.
**Solution:** Use `ethers.getAddress(address)` to convert to checksum format before sending

---

## 📖 Additional Documentation

- [Refactoring Plan](./REFACTORING_PLAN.md) - Detailed refactoring steps and implementation plan
- [Transaction Debugging Summary](./CREATE_TRANSACTION_DEBUGGING_SUMMARY.md) - All issues encountered and solutions
- [Adding Signers Guide](./ADDING_SIGNERS_GUIDE.md) - Guide for managing Safe signers
- [Safe SDK Documentation](https://docs.safe.global/sdk) - Official Safe docs

---

## 🤝 Contributing

1. Follow the backend-heavy architecture pattern
2. Keep frontend simple (signing only)
3. Add tests for new features
4. Update documentation

---

## 📄 License

MIT

---

## 🔗 Resources

- [Safe Global Docs](https://docs.safe.global/)
- [Protocol Kit](https://docs.safe.global/sdk/protocol-kit)
- [API Kit](https://docs.safe.global/sdk/api-kit)
- [Safe Transaction Service](https://docs.safe.global/core-api)

---

## ⚡ Quick Reference: Working Implementation

Our implementation solves **9 critical issues** discovered during development:

1. ✅ **Hydration warnings** → `suppressHydrationWarning` on HTML
2. ✅ **SafeClient initialization** → Always pass `txServiceUrl`
3. ✅ **MetaMask eth_sign disabled** → Use `personal_sign` + v adjustment (+4)
4. ✅ **Address validation** → Checksum with `ethers.getAddress()`
5. ✅ **Hidden API errors** → Direct REST API calls instead of API Kit
6. ✅ **Wrong payload format** → Flatten transaction fields at root level
7. ✅ **Frontend-heavy architecture** → Backend creates, frontend only signs
8. ✅ **Single recipient UI** → Dynamic recipient list for batch payments
9. ✅ **Hook mismatch** → Custom `useSafe` from SafeProvider

**Key Achievement:** Works with **default MetaMask settings** - zero user configuration required! 🎉

See the **"Critical Implementation Details"** section above for complete code examples.

---

**Last Updated:** October 16, 2025

**Architecture Version:** 2.0 (Backend-Heavy)

**Implementation Status:** ✅ Production-Ready with Proven Solutions


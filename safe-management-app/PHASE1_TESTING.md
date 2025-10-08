# Phase 1 Testing Guide - Backend API

## Prerequisites

1. **PostgreSQL Running**: The backend uses PostgreSQL. Make sure it's running.
2. **Database Setup**: Run migrations to create the database tables.
3. **Environment Variables**: Configured in `backend/.env`

## Setup Database

```powershell
cd safe-management-app/backend
npx prisma migrate dev --name init
```

## Start Backend Server

```powershell
cd safe-management-app/backend
npm run dev
```

Server should start on: http://localhost:5000

---

## API Endpoints to Test

### 1. Health Check ✅

```powershell
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Safe Management API"
}
```

---

### 2. Sessions API

#### Get Default Session (auto-creates from .env if none exists)

```powershell
curl http://localhost:5000/api/sessions/default
```

**Expected:** Returns the default session or creates one from environment variables.

#### Get All Sessions

```powershell
curl http://localhost:5000/api/sessions
```

**Expected:** Array of sessions (empty if none created yet).

#### Create New Session

```powershell
curl -X POST http://localhost:5000/api/sessions `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Test Safe",
    "safeAddress": "0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F",
    "apiKey": "test_api_key",
    "chainId": 1,
    "rpcUrl": "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY",
    "transactionServiceUrl": "https://safe-transaction-mainnet.safe.global",
    "isDefault": true
  }'
```

**Expected:** Returns created session with generated ID.

#### Get Session by ID

```powershell
# Replace {session-id} with actual ID from previous call
curl http://localhost:5000/api/sessions/{session-id}
```

#### Update Session

```powershell
curl -X PUT http://localhost:5000/api/sessions/{session-id} `
  -H "Content-Type: application/json" `
  -d '{"name": "Updated Safe Name"}'
```

#### Set as Default

```powershell
curl -X PATCH http://localhost:5000/api/sessions/{session-id}/set-default
```

#### Delete Session

```powershell
curl -X DELETE http://localhost:5000/api/sessions/{session-id}
```

---

### 3. Safe API

**Note:** These require a valid Safe address and connection to Safe Transaction Service.

#### Get Safe Info

```powershell
curl http://localhost:5000/api/safe/{session-id}/info
```

**Expected:** Safe owners, threshold, nonce, version, etc.

#### Get Safe Balances

```powershell
curl http://localhost:5000/api/safe/{session-id}/balances
```

**Expected:** Array of token balances (ETH and ERC20).

#### Get Safe Owners

```powershell
curl http://localhost:5000/api/safe/{session-id}/owners
```

**Expected:** Array of owner addresses.

#### Get All Transactions

```powershell
curl "http://localhost:5000/api/safe/{session-id}/transactions?limit=10&offset=0"
```

**Expected:** Array of transactions with pagination.

#### Get Pending Transactions

```powershell
curl "http://localhost:5000/api/safe/{session-id}/transactions?pending=true"
```

**Expected:** Array of transactions awaiting confirmations.

#### Get Single Transaction

```powershell
curl http://localhost:5000/api/safe/{session-id}/transaction/{safe-tx-hash}
```

**Expected:** Full transaction details.

---

### 4. Payment Links API

#### Create Payment Link

```powershell
curl -X POST http://localhost:5000/api/payment-links/create `
  -H "Content-Type: application/json" `
  -d '{
    "sessionId": "{session-id}",
    "to": "0x1234567890123456789012345678901234567890",
    "value": "1000000000000000000",
    "description": "Test payment",
    "expiresIn": 86400000
  }'
```

**Expected:** Returns payment link with ID and shareable URL.

#### Get Payment Link by ID

```powershell
curl http://localhost:5000/api/payment-links/{link-id}
```

**Expected:** Payment link details with session info (API key removed).

#### Get All Links for Session

```powershell
curl http://localhost:5000/api/payment-links/session/{session-id}
```

**Expected:** Array of payment links for that session.

#### Update Link Status

```powershell
curl -X PATCH http://localhost:5000/api/payment-links/{link-id}/status `
  -H "Content-Type: application/json" `
  -d '{"status": "completed"}'
```

**Expected:** Updated payment link.

#### Delete Payment Link

```powershell
curl -X DELETE http://localhost:5000/api/payment-links/{link-id}
```

---

## Testing Workflow

### Step 1: Basic Setup
1. Start backend server
2. Test health endpoint
3. Create a session (or let default auto-create)

### Step 2: Session Management
1. Get default session
2. Create additional sessions
3. List all sessions
4. Update a session
5. Set one as default
6. Delete a session

### Step 3: Safe Integration (Requires Valid Safe)
1. Get Safe info
2. Get Safe balances
3. Get Safe owners
4. Get transactions

### Step 4: Payment Links
1. Create a payment link
2. Get link details
3. List all links for session
4. Update link status

---

## Environment Setup

Make sure your `backend/.env` has valid values:

```env
# Server
PORT=5000
NODE_ENV=development

# Safe Configuration (for default session)
SAFE_API_KEY=your_actual_api_key
DEFAULT_SAFE_ADDRESS=0xYourActualSafeAddress
CHAIN_ID=1
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
TRANSACTION_SERVICE_URL=https://safe-transaction-mainnet.safe.global

# Database (make sure PostgreSQL is running)
DATABASE_URL=postgresql://user:password@localhost:5432/safe_management

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
**Solution:** Make sure PostgreSQL is running and DATABASE_URL is correct.

### Prisma Client Error
```
Error: PrismaClient is unable to run in this browser environment
```
**Solution:** Run `npx prisma generate` in backend folder.

### Safe API Errors
```
Failed to get Safe info
```
**Solution:** 
- Check that SAFE_ADDRESS is valid
- Check that RPC_URL is accessible
- Verify TRANSACTION_SERVICE_URL is correct for your chain
- Ensure the Safe exists on that chain

---

## Success Criteria

Phase 1 is complete when:

✅ Backend server starts without errors
✅ Health endpoint returns 200
✅ Can create and manage sessions
✅ Can fetch Safe info for a valid Safe address
✅ Can create and manage payment links
✅ All CRUD operations work for sessions and payment links

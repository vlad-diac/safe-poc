# Safe Management POC - Express + Next.js Integration Plan

## 🎯 Project Goal
Integrate Safe management into existing Express + Next.js app with session-based configuration, wallet viewing, transaction management, and payment links.

## 🏗️ Architecture
- **Backend**: Express routes for session management, payment links, Safe API proxy
- **Frontend**: Next.js with Safe React Hooks, Tailwind CSS, shadcn/ui, lucide-react
- **Database**: Session persistence (Safe configurations), payment link storage
- **Hybrid**: Frontend SDK for wallet interactions, backend for persistence & business logic

## 🎨 UI Stack
- **Framework**: Next.js + TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Dialog, Table, Card, Button, Input, Select, Badge)
- **Icons**: lucide-react
- **State**: @tanstack/react-query (built into Safe hooks)

---

## Initial Setup: In Existing Repository

**Current State**:
- ✅ Git repository: `https://github.com/vlad-diac/safe-poc.git`
- ✅ Branch: `main`
- ✅ Location: `f:\Work\Thinslices\tests\safe-wallet-docs`
- ✅ Shell: PowerShell

**Goal**: Create Safe management app structure within existing repository.

### Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed
- [ ] PostgreSQL or MongoDB installed (for database)
- [ ] Code editor (VS Code recommended)

### Step 1: Create Project Structure in Current Directory
```powershell
# We're already in: f:\Work\Thinslices\tests\safe-wallet-docs
# Create safe-management-app subfolder
New-Item -Path "safe-management-app" -ItemType Directory
Set-Location safe-management-app

# Update .gitignore (add to existing one)
@"
# Safe Management App
safe-management-app/node_modules/
safe-management-app/backend/.env
safe-management-app/frontend/.env.local
safe-management-app/backend/dist/
safe-management-app/frontend/.next/
"@ | Add-Content -Path ..\.gitignore
```

### Step 2: Backend Setup (Express)
- [ ] **S2.1** Create backend folder and initialize:
  ```powershell
  New-Item -Path "backend" -ItemType Directory
  Set-Location backend
  npm init -y
  ```

- [ ] **S2.2** Install Express and core dependencies:
  ```powershell
  npm install express cors dotenv axios
  npm install --save-dev nodemon typescript @types/node @types/express @types/cors
  ```

- [ ] **S2.3** Install database dependencies:
  ```powershell
  # For PostgreSQL + Prisma
  npm install @prisma/client
  npm install --save-dev prisma
  
  # OR for MongoDB + Mongoose
  npm install mongoose
  ```

- [ ] **S2.4** Create backend folder structure:
  ```powershell
  New-Item -Path "src" -ItemType Directory
  New-Item -Path "src\routes" -ItemType Directory
  New-Item -Path "src\services" -ItemType Directory
  New-Item -Path "src\models" -ItemType Directory
  New-Item -Path "src\middleware" -ItemType Directory
  New-Item -Path "src\config" -ItemType Directory
  ```

- [ ] **S2.5** Create `backend/.env`:
  ```env
  # Server Configuration
  PORT=5000
  NODE_ENV=development
  
  # Safe Configuration (Default Session)
  SAFE_API_KEY=your_safe_api_key_here
  DEFAULT_SAFE_ADDRESS=0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F
  CHAIN_ID=1
  RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
  TRANSACTION_SERVICE_URL=https://safe-transaction-mainnet.safe.global
  
  # Database
  DATABASE_URL=postgresql://user:password@localhost:5432/safe_management
  # OR for MongoDB: mongodb://localhost:27017/safe_management
  
  # Frontend URL (for CORS)
  FRONTEND_URL=http://localhost:3000
  ```

- [ ] **S2.6** Create `backend/package.json` scripts:
  ```json
  {
    "scripts": {
      "dev": "nodemon src/server.js",
      "start": "node src/server.js",
      "prisma:init": "prisma init",
      "prisma:migrate": "prisma migrate dev",
      "prisma:generate": "prisma generate"
    }
  }
  ```

- [ ] **S2.7** Create basic `backend/src/server.js`:
  ```javascript
  const express = require('express');
  const cors = require('cors');
  require('dotenv').config();
  
  const app = express();
  const PORT = process.env.PORT || 5000;
  
  // Middleware
  app.use(cors({ origin: process.env.FRONTEND_URL }));
  app.use(express.json());
  
  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Safe Management API' });
  });
  
  // Routes will be added here
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
  
  module.exports = app;
  ```

- [ ] **S2.8** Test backend:
  ```powershell
  npm run dev
  # Should see: 🚀 Backend running on http://localhost:5000
  # Visit: http://localhost:5000/health
  ```

### Step 3: Database Setup
- [ ] **S3.1** For PostgreSQL + Prisma:
  ```powershell
  # Should already be in backend folder
  npx prisma init
  ```

- [ ] **S3.2** Create `backend/prisma/schema.prisma`:
  ```prisma
  generator client {
    provider = "prisma-client-js"
  }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  
  model SafeSession {
    id                    String   @id @default(uuid())
    name                  String
    safeAddress           String
    apiKey                String
    chainId               Int
    rpcUrl                String
    transactionServiceUrl String
    isDefault             Boolean  @default(false)
    userId                String?
    createdAt             DateTime @default(now())
    updatedAt             DateTime @updatedAt
    
    paymentLinks PaymentLink[]
  }
  
  model PaymentLink {
    id          String       @id @default(uuid())
    sessionId   String
    safeAddress String
    safeTxHash  String?
    toAddress   String
    value       String
    description String?
    status      String       @default("pending")
    createdAt   DateTime     @default(now())
    expiresAt   DateTime?
    
    session SafeSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  }
  ```

- [ ] **S3.3** Run migrations:
  ```powershell
  npx prisma migrate dev --name init
  npx prisma generate
  ```

### Step 4: Frontend Setup (Next.js)
- [ ] **S4.1** Create Next.js app (from project root):
  ```powershell
  Set-Location ..  # Back to safe-management-app/
  npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir
  Set-Location frontend
  ```

- [ ] **S4.2** Install Safe SDK:
  ```powershell
  npm install @safe-global/safe-react-hooks @safe-global/sdk-starter-kit ethers@^6
  ```

- [ ] **S4.3** Install UI dependencies:
  ```powershell
  npm install @tanstack/react-query lucide-react class-variance-authority clsx tailwind-merge
  npm install react-hook-form zod @hookform/resolvers date-fns
  ```

- [ ] **S4.4** Initialize shadcn/ui:
  ```powershell
  npx shadcn-ui@latest init
  ```
  - Choose: Default style, Zinc as base color, CSS variables: Yes

- [ ] **S4.5** Add shadcn/ui components:
  ```powershell
  npx shadcn-ui@latest add dialog table card button input select badge dropdown-menu tabs toast alert skeleton avatar
  ```

- [ ] **S4.6** Create `frontend/.env.local`:
  ```env
  # Backend API
  NEXT_PUBLIC_API_URL=http://localhost:5000
  
  # Safe Configuration (Optional - can be managed via UI)
  NEXT_PUBLIC_SAFE_API_KEY=your_safe_api_key_here
  ```

- [ ] **S4.7** Create frontend folder structure:
  ```powershell
  Set-Location app
  New-Item -Path "safe" -ItemType Directory
  New-Item -Path "safe\components" -ItemType Directory
  New-Item -Path "safe\payment-links" -ItemType Directory
  New-Item -Path "safe\transactions" -ItemType Directory
  New-Item -Path "safe\create" -ItemType Directory
  New-Item -Path "safe\pay" -ItemType Directory
  New-Item -Path "providers" -ItemType Directory
  Set-Location ..
  ```

- [ ] **S4.8** Update `frontend/package.json` scripts:
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    }
  }
  ```

- [ ] **S4.9** Test frontend:
  ```powershell
  npm run dev
  # Should see: - Local: http://localhost:3000
  ```

### Step 5: Verify Setup
- [ ] **S5.1** Backend health check:
  ```powershell
  # Open browser: http://localhost:5000/health
  # Should see: {"status":"ok","message":"Safe Management API"}
  ```

- [ ] **S5.2** Frontend running:
  ```powershell
  # Open browser: http://localhost:3000
  # Should see default Next.js page
  ```

- [ ] **S5.3** Database connection:
  ```powershell
  Set-Location ..\backend
  npx prisma studio
  # Should open Prisma Studio at http://localhost:5555
  ```

### Step 6: Project Structure Check
Your repository should look like this:
```
f:\Work\Thinslices\tests\safe-wallet-docs\  (existing git repo)
├── output/                   # Existing docs
├── tests/                    # Existing tests
├── .gitignore                # ✅ Updated
├── INTEGRATION_PLAN.md       # ✅ This file
│
└── safe-management-app/      # ✅ NEW - Your Safe management app
    ├── backend/
    │   ├── src/
    │   │   ├── routes/       # Will be created in Phase 1
    │   │   ├── services/     # Will be created in Phase 1
    │   │   ├── models/       # Will be created in Phase 1
    │   │   ├── middleware/   # Will be created in Phase 1
    │   │   ├── config/       # Will be created in Phase 1
    │   │   └── server.js     # ✅ Created in S2.7
    │   ├── prisma/
    │   │   └── schema.prisma # ✅ Created in S3.2
    │   ├── .env              # ✅ Created in S2.5
    │   ├── package.json      # ✅ Created in S2.1
    │   └── node_modules/     # ✅ Installed in S2.2
    │
    └── frontend/
        ├── app/
        │   ├── safe/         # ✅ Created in S4.7
        │   ├── providers/    # ✅ Created in S4.7
        │   ├── layout.tsx    # ✅ Created by Next.js
        │   └── page.tsx      # ✅ Created by Next.js
        ├── components/
        │   └── ui/           # ✅ Created by shadcn/ui
        ├── lib/
        │   └── utils.ts      # ✅ Created by shadcn/ui
        ├── .env.local        # ✅ Created in S4.6
        ├── tailwind.config.ts# ✅ Created by Next.js
        ├── package.json      # ✅ Created by Next.js
        └── node_modules/     # ✅ Installed in S4.2
```

### Step 7: Commit Initial Setup (Optional)
```powershell
# Add all new files
git add .
git status
# Review changes, then commit
git commit -m "feat: initial setup for Safe management app"
# Push to remote (optional)
# git push origin main
```

---

## Phase 0: Environment Setup

### Backend (Express)
- [ ] **0.1** Add database models for sessions and payment links
  - `SafeSession` model: id, name, safeAddress, apiKey, chainId, rpcUrl, txServiceUrl, isDefault, userId (optional), createdAt
  - `PaymentLink` model: id, sessionId, safeAddress, txHash, description, status, createdAt, expiresAt
- [ ] **0.2** Create `server/services/safeService.js` - Safe API client
  - 📖 [constructor.md](output/new1/reference-sdk-starter-kit-safe-client-constructor.md)
- [ ] **0.3** Create `server/services/sessionService.js` - Session CRUD operations
- [ ] **0.4** Setup environment variables from `.env`:
  ```env
  # Default Safe Configuration (creates initial session)
  SAFE_API_KEY=eyJhbGci...
  DEFAULT_SAFE_ADDRESS=0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F
  CHAIN_ID=1
  RPC_URL=https://eth-mainnet.g.alchemy.com/v2/...
  TRANSACTION_SERVICE_URL=https://safe-transaction-mainnet.safe.global
  
  # Database
  DATABASE_URL=postgresql://...
  ```
- [ ] **0.5** Install dependencies: `npm install axios` (if not present)

### Frontend (Next.js)
- [ ] **0.6** Install Safe SDK: `npm install @safe-global/safe-react-hooks @safe-global/sdk-starter-kit ethers@^6`
  - 📖 [sdk-starter-kit.md](output/new1/sdk-starter-kit.md)
- [ ] **0.7** Install UI dependencies: 
  ```bash
  npm install @tanstack/react-query lucide-react
  npx shadcn-ui@latest init
  npx shadcn-ui@latest add dialog table card button input select badge dropdown-menu tabs toast
  ```
- [ ] **0.8** Create `app/providers/SafeProvider.tsx` - Safe SDK provider with dynamic session config
  - 📖 [safeprovider.md](output/new1/reference-sdk-react-hooks-safeprovider.md)
  - 📖 [createconfig.md](output/new1/reference-sdk-react-hooks-createconfig.md)
- [ ] **0.9** Add Safe SDK to root layout provider tree

### Database Migration
- [ ] **0.10** Create migration: `safe_sessions` table
  ```sql
  CREATE TABLE safe_sessions (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    safe_address VARCHAR(42) NOT NULL,
    api_key TEXT NOT NULL,
    chain_id INTEGER NOT NULL,
    rpc_url TEXT NOT NULL,
    transaction_service_url TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    user_id UUID, -- Optional for multi-user support
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [ ] **0.11** Create migration: `payment_links` table
  ```sql
  CREATE TABLE payment_links (
    id UUID PRIMARY KEY,
    session_id UUID REFERENCES safe_sessions(id) ON DELETE CASCADE,
    safe_address VARCHAR(42) NOT NULL,
    safe_tx_hash VARCHAR(66),
    to_address VARCHAR(42) NOT NULL,
    value VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, expired
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
  );
  ```
- [ ] **0.12** Seed default session from `.env` on first launch:
  ```javascript
  // Auto-run migration that creates default session if none exists
  // Name format: "{Network}-{ShortAddress}" e.g., "Ethereum-0x7B38...Be04F"
  ```

---

## Phase 1: Express Backend - Session & Safe API

**Goal**: Build session management API and Safe Transaction Service proxy.

### Session Management
- [ ] **1.1** `server/routes/sessions.routes.js`:
  - `GET /api/sessions` - List all sessions for current user
  - `GET /api/sessions/:id` - Get specific session
  - `GET /api/sessions/default` - Get default session
  - `POST /api/sessions` - Create new session
    - Body: `{ name?, safeAddress, apiKey, chainId, rpcUrl, txServiceUrl }`
    - Name generation: If `name` is empty → auto-generate: `{ChainName}-{Address.slice(0,6)}...{Address.slice(-4)}`
    - Example: "Ethereum-0x7B38...Be04F"
  - `PUT /api/sessions/:id` - Update session
  - `PATCH /api/sessions/:id/set-default` - Set as default session
  - `DELETE /api/sessions/:id` - Delete session

### Safe API Service
- [ ] **1.2** `server/services/safeService.js`:
  - Initialize with session config
  - `getSafeInfo(address)` - Returns owners, threshold, nonce, version
    - 📖 [getaddress.md](output/new1/reference-sdk-starter-kit-safe-client-getaddress.md)
    - 📖 [getowners.md](output/new1/reference-sdk-starter-kit-safe-client-getowners.md)
    - 📖 [getthreshold.md](output/new1/reference-sdk-starter-kit-safe-client-getthreshold.md)
    - 📖 [getnonce.md](output/new1/reference-sdk-starter-kit-safe-client-getnonce.md)
  - `getSafeBalances(address)` - Returns ETH + token balances
    - 📖 [gettokenlist.md](output/new1/reference-sdk-api-kit-gettokenlist.md)
  - `getAllTransactions(address, limit, offset)` - Returns transaction history
  - `getPendingTransactions(address)` - Returns pending transactions
    - 📖 [getpendingtransactions.md](output/new1/reference-sdk-starter-kit-safe-client-getpendingtransactions.md)
  - `getTransaction(safeTxHash)` - Returns specific transaction details
  - `proposeTransaction(safeAddress, txData)` - Creates transaction proposal
    - 📖 [send.md](output/new1/reference-sdk-starter-kit-safe-client-send.md)

### Safe API Routes
- [ ] **1.3** `server/routes/safe.routes.js`:
  - `GET /api/safe/:sessionId/info` - Safe configuration and info
  - `GET /api/safe/:sessionId/balances` - ETH + token balances
  - `GET /api/safe/:sessionId/owners` - List of owners
  - `GET /api/safe/:sessionId/transactions` - All transactions (query: `?limit=50&offset=0&pending=true`)
  - `GET /api/safe/:sessionId/transaction/:hash` - Single transaction details
  - `POST /api/safe/:sessionId/transaction/propose` - Server-side transaction proposal

### Payment Link Feature
- [ ] **1.4** `server/routes/payment-links.routes.js`:
  - `POST /api/payment-links/create` - Generate payment link
    - Body: `{ sessionId, to, value, description?, expiresIn? }`
    - Proposes tx to Safe Transaction Service
    - Stores in DB with unique ID
    - Returns: `{ id, url: "{APP_URL}/safe/pay/{id}", safeTxHash }`
  - `GET /api/payment-links/:id` - Get payment link details (public)
  - `GET /api/payment-links/session/:sessionId` - List all links for session
  - `PATCH /api/payment-links/:id/status` - Update link status

### Testing
- [ ] **1.5** Test endpoints with Postman/curl:
  - Create session from settings
  - List sessions
  - Fetch Safe info using session
  - Create payment link

---

## Phase 2: Next.js Frontend - Safe Dashboard UI

**Goal**: Build session-aware Safe management UI with shadcn/ui components.

### Setup & Layout
- [ ] **2.1** Create `app/safe/layout.tsx` - Main layout with dynamic SafeProvider
  - Fetch active session from API on load
  - Pass session config to SafeProvider
  - 📖 [safeprovider.md](output/new1/reference-sdk-react-hooks-safeprovider.md)
  - 📖 [createconfig.md](output/new1/reference-sdk-react-hooks-createconfig.md)

- [ ] **2.2** Create `app/safe/components/Sidebar.tsx`:
  - Component: `Sheet` from shadcn/ui (mobile) + fixed sidebar (desktop)
  - Navigation links (using `Link` from next/link):
    - 🏠 Home (`Home` from lucide-react)
    - 📋 Transactions (`List` from lucide-react)
    - ➕ Create Transaction (`Plus` from lucide-react)
    - 🔗 Payment Links (`Link2` from lucide-react)
  - Bottom section:
    - ⚙️ Settings button (`Settings` from lucide-react)
  - Styling: Tailwind with `bg-background`, `border-r`, `h-screen`, `w-64`

- [ ] **2.3** Create `app/safe/components/Header.tsx`:
  - Safe address display with `Badge` component
  - Copy button (`Copy` icon from lucide-react)
  - Wallet connection status
  - Connect/Disconnect wallet button with `Button` component
  - 📖 [connect.md](output/new1/reference-sdk-react-hooks-usesafe-connect.md)
  - 📖 [disconnect.md](output/new1/reference-sdk-react-hooks-usesafe-disconnect.md)

- [ ] **2.4** Create `app/safe/components/SessionSettingsModal.tsx`:
  - Component: `Dialog` from shadcn/ui
  - Trigger: Settings cog button in Sidebar
  - Content:
    - **Session Selector** (top):
      - `Select` component with session list
      - Options: All saved sessions + "Create New Session"
      - On change: Reload SafeProvider with new session config
    - **Session Form** (when session selected):
      - `Input`: Session Name (optional, placeholder: "Auto: {Network}-{Address}")
      - `Input`: Safe Address (required)
      - `Select`: Network (Mainnet, Sepolia, etc.)
      - `Input`: RPC URL
      - `Input`: Safe API Key (`type="password"`)
      - `Input`: Transaction Service URL
      - `Checkbox`: "Set as default session"
    - **Actions**:
      - `Button` (variant="destructive"): Delete Session
      - `Button` (variant="outline"): Cancel
      - `Button` (variant="default"): Save Session
  - Logic:
    - If name is empty → auto-generate on save
    - POST to `/api/sessions` → Returns new session
    - Switch to new session automatically

### Home Page (Dashboard)
- [ ] **2.5** Create `app/safe/page.tsx` (Home route):
  - Components: `Card` from shadcn/ui for each section
  - **Safe Info Card**:
    - Safe address with copy button (`Copy` icon)
    - Network badge (`Badge` component with chain name)
    - Deployment status badge (`CheckCircle2` or `Clock` icon)
  - **Account Details Card**:
    - Threshold display: "2 of 3 signatures required"
    - ETH balance (formatted, e.g., "1.5 ETH")
    - Nonce counter
  - **Owners Card**:
    - `Table` component listing owners
    - Columns: Avatar (blockie), Address, Actions (Copy, Etherscan link)
    - Use `ExternalLink` icon from lucide-react
  - **Pending Transactions Badge**:
    - Count badge with `AlertCircle` icon
    - Click → Navigate to Transactions page with pending filter
  - 📖 [getsafeinfo.md](output/new1/reference-sdk-react-hooks-usesafe-getsafeinfo.md)
  - 📖 [getbalance.md](output/new1/reference-sdk-react-hooks-usesafe-getbalance.md)
  - 📖 [isdeployed.md](output/new1/reference-sdk-starter-kit-safe-client-isdeployed.md)

### Transactions Page
- [ ] **2.6** Create `app/safe/transactions/page.tsx`:
  - Component: `Table` from shadcn/ui with expandable rows
  - **Table Columns**:
    - Expand icon (`ChevronRight` / `ChevronDown` from lucide-react)
    - Nonce
    - To Address (truncated with tooltip)
    - Value (ETH formatted)
    - Status (Badge: `pending` yellow, `executed` green, `failed` red)
    - Confirmations (e.g., "1/2" with progress)
    - Actions (Sign button if pending + user is owner)
  - **Expandable Row Content** (Collapsible component):
    - Full transaction details
    - Data field (hex, expandable)
    - Signing progress bar
    - Owner signatures list with checkmarks
    - Links: Safe App, Etherscan (`ExternalLink` icon)
  - **Filters** (Tabs component):
    - All / Pending / Executed / Failed
  - **Pagination**:
    - shadcn/ui Pagination component
    - Options: 10, 25, 50, 100 per page
  - **Sorting**:
    - Click column headers to sort (`ArrowUpDown` icon)
  - **Search**:
    - `Input` component with `Search` icon
    - Filter by address or tx hash
  - 📖 [gettransactions.md](output/new1/reference-sdk-react-hooks-usesafe-gettransactions.md)
  - 📖 [getpendingtransactions.md](output/new1/reference-sdk-react-hooks-usesafe-getpendingtransactions.md)

- [ ] **2.7** Create transaction detail expandable row:
  - Show inside expanded table row or navigate to detail page
  - Full transaction data display
  - Confirmations list with owner addresses
  - Sign button (`PenLine` icon) if:
    - Transaction is pending
    - Connected wallet is an owner
    - Owner hasn't signed yet
  - Execute button (`PlayCircle` icon) if threshold met
  - Etherscan link (`ExternalLink` icon)
  - 📖 [gettransaction.md](output/new1/reference-sdk-react-hooks-usesafe-gettransaction.md)
  - 📖 [useconfirmtransaction.md](output/new1/reference-sdk-react-hooks-useconfirmtransaction.md)

### Create Transaction Page
- [ ] **2.8** Create `app/safe/create/page.tsx`:
  - Component: `Card` with form
  - **Form Fields** (react-hook-form + zod validation):
    - `Input`: To address (with address validation)
    - `Input`: Value in ETH (with number validation)
    - `Textarea`: Data (hex, optional)
    - `Select`: Operation type (Call / DelegateCall)
  - **Actions**:
    - `Button` (variant="default"): Create Transaction (`Send` icon)
    - Loading state with `Loader2` icon
  - **Success State**:
    - Toast notification (shadcn/ui Toast)
    - Show Safe Transaction Hash with copy button
    - Link to transaction detail
  - Use `useSendTransaction()` hook
  - 📖 [usesendtransaction.md](output/new1/reference-sdk-react-hooks-usesendtransaction.md)

### Payment Links Page
- [ ] **2.9** Create `app/safe/payment-links/page.tsx`:
  - Component: `Table` from shadcn/ui
  - **Columns**:
    - Description
    - To Address (truncated)
    - Amount (ETH)
    - Status (`Badge` component)
    - Created (relative time)
    - Actions (Copy link, View, Delete)
  - **Header**:
    - `Button`: Generate New Link (`Plus` icon)
  - **Empty State**:
    - No links message with `Link2` icon
    - CTA button to create first link

- [ ] **2.10** Create `app/safe/payment-links/create/page.tsx`:
  - Component: `Card` with form
  - **Form Fields**:
    - `Input`: To address
    - `Input`: Value (ETH)
    - `Textarea`: Description (optional)
    - `Input`: Expiration (date picker, optional)
  - **Actions**:
    - `Button`: Generate Link (`Link2` icon)
  - **Success State**:
    - Display shareable URL in `Input` (read-only)
    - Copy button (`Copy` icon)
    - QR code (optional, use qrcode.react)
    - Share buttons (optional)
  - POST to `/api/payment-links/create`
  - 📖 [send.md](output/new1/reference-sdk-starter-kit-safe-client-send.md)

- [ ] **2.11** Create `app/safe/pay/[id]/page.tsx`:
  - **Public payment page** (no auth required)
  - Component: `Card` centered on page
  - **Display**:
    - Payment details (amount, recipient, description)
    - Safe address
    - Network badge
    - Status badge (Pending / Completed / Expired)
  - **Actions**:
    - `Button`: Connect Wallet to Pay (if not connected)
    - `Button`: Execute Payment (if connected)
    - Use `useSendTransaction()` to execute
  - **States**:
    - Loading: `Loader2` icon
    - Success: Checkmark with tx hash
    - Error: Error message with retry button
  - 📖 [usesendtransaction.md](output/new1/reference-sdk-react-hooks-usesendtransaction.md)

### Wallet Integration
- [ ] **2.12** Create `app/safe/components/WalletConnect.tsx`:
  - Component: `Button` from shadcn/ui
  - Detect MetaMask (`window.ethereum`)
  - **States**:
    - Not connected: "Connect Wallet" button (`Wallet` icon)
    - Connected: Show address with avatar + Disconnect option
  - Use `DropdownMenu` component for connected state:
    - Connected address (truncated)
    - Copy address option
    - Disconnect option
  - Connect: `useSafe().connect()`
  - Disconnect: `useSafe().disconnect()`
  - Show network mismatch warning if chain doesn't match
  - 📖 [connect.md](output/new1/reference-sdk-react-hooks-usesafe-connect.md)
  - 📖 [disconnect.md](output/new1/reference-sdk-react-hooks-usesafe-disconnect.md)
  - 📖 [getsigneraddress.md](output/new1/reference-sdk-react-hooks-usesafe-getsigneraddress.md)

---

## Phase 3: Safe SDK Integration

**Goal**: Wire up Safe React Hooks with session-based configuration.

### Provider Setup
- [ ] **3.1** Configure `SafeProvider` in `app/safe/layout.tsx`:
  - Fetch active session from `/api/sessions/default` or selected session
  - Create Safe config dynamically from session:
    ```typescript
    const config = createConfig({
      chain: getChainById(session.chainId), // viem chain
      provider: session.rpcUrl,
      signer: connectedWalletAddress,
      safeAddress: session.safeAddress
    })
    ```
  - Re-initialize provider when session changes
  - Handle network switching
  - 📖 [safeprovider.md](output/new1/reference-sdk-react-hooks-safeprovider.md)
  - 📖 [createconfig.md](output/new1/reference-sdk-react-hooks-createconfig.md)

### Read Operations
- [ ] **3.2** Implement `useSafe()` hook calls:
  - `getSafeInfo()` - Dashboard data (owners, threshold, nonce)
  - `getBalance()` - ETH balance display
  - `getChain()` - Network info for badges
  - `getTransactions()` - Transaction list with pagination
  - `getPendingTransactions()` - Pending list with filters
  - `getTransaction(hash)` - Transaction detail view
  - 📖 [usesafe.md](output/new1/reference-sdk-react-hooks-usesafe.md)
  - 📖 [getsafeinfo.md](output/new1/reference-sdk-react-hooks-usesafe-getsafeinfo.md)
  - 📖 [getbalance.md](output/new1/reference-sdk-react-hooks-usesafe-getbalance.md)
  - 📖 [getchain.md](output/new1/reference-sdk-react-hooks-usesafe-getchain.md)
  - 📖 [gettransactions.md](output/new1/reference-sdk-react-hooks-usesafe-gettransactions.md)
  - 📖 [getpendingtransactions.md](output/new1/reference-sdk-react-hooks-usesafe-getpendingtransactions.md)
  - 📖 [gettransaction.md](output/new1/reference-sdk-react-hooks-usesafe-gettransaction.md)

### Write Operations
- [ ] **3.3** Implement transaction creation:
  - Use `useSendTransaction()` in create form
  - Handle transaction proposal (threshold > 1) → Goes to pending
  - Handle direct execution (threshold = 1) → Executed immediately
  - Show success toast with transaction hash
  - Navigate to transaction detail after creation
  - 📖 [usesendtransaction.md](output/new1/reference-sdk-react-hooks-usesendtransaction.md)

- [ ] **3.4** Implement transaction signing:
  - Use `useConfirmTransaction()` hook
  - "Sign" button appears in table row if:
    - Transaction is pending
    - Connected wallet is an owner
    - Owner hasn't signed yet
  - After signing: Update UI, show toast, refresh transaction list
  - 📖 [useconfirmtransaction.md](output/new1/reference-sdk-react-hooks-useconfirmtransaction.md)
  - 📖 [confirm.md](output/new1/reference-sdk-starter-kit-safe-client-confirm.md)

### Connection Management
- [ ] **3.5** Implement wallet connection flow:
  - `connect()` - Trigger MetaMask connection
  - `isOwnerConnected()` - Check if connected wallet is Safe owner
  - `isSignerConnected()` - Check if wallet is connected
  - `getSignerAddress()` - Display connected wallet address
  - Handle network mismatch: Show warning if wallet chain ≠ session chain
  - 📖 [connect.md](output/new1/reference-sdk-react-hooks-usesafe-connect.md)
  - 📖 [disconnect.md](output/new1/reference-sdk-react-hooks-usesafe-disconnect.md)
  - 📖 [isownerconnected.md](output/new1/reference-sdk-react-hooks-usesafe-isownerconnected.md)
  - 📖 [issignerconnected.md](output/new1/reference-sdk-react-hooks-usesafe-issignerconnected.md)
  - 📖 [getsigneraddress.md](output/new1/reference-sdk-react-hooks-usesafe-getsigneraddress.md)

---

## Phase 4: Integration & Testing

**Goal**: End-to-end testing of all features.

### Session Management Testing
- [ ] **4.1** Test default session creation from `.env` on first launch
- [ ] **4.2** Test creating new session via Settings modal
- [ ] **4.3** Test auto-generated session names (empty name input)
- [ ] **4.4** Test custom session names (user provides name)
- [ ] **4.5** Test switching between sessions (SafeProvider reloads)
- [ ] **4.6** Test setting default session
- [ ] **4.7** Test deleting session (confirmation modal)
- [ ] **4.8** Test updating session configuration

### Backend Testing
- [ ] **4.9** Test Safe info retrieval via API with session
- [ ] **4.10** Test transaction list with pagination, filters, sorting
- [ ] **4.11** Test payment link creation and storage
- [ ] **4.12** Test transaction proposal from backend

### Frontend Testing
- [ ] **4.13** Connect wallet with MetaMask
- [ ] **4.14** View Home page (Safe info, owners, balance)
- [ ] **4.15** List all transactions with filters (All/Pending/Executed)
- [ ] **4.16** Expand transaction row to see details
- [ ] **4.17** View transaction confirmations and signers
- [ ] **4.18** Create new transaction via form
- [ ] **4.19** Sign pending transaction (if owner)
- [ ] **4.20** Execute transaction when threshold met

### Payment Link Testing
- [ ] **4.21** Generate payment link from dashboard
- [ ] **4.22** Copy payment link URL
- [ ] **4.23** Share link and open in new browser (incognito)
- [ ] **4.24** Connect wallet on payment page
- [ ] **4.25** Execute payment transaction
- [ ] **4.26** Verify link status updates in database
- [ ] **4.27** Test expired payment links

### Error Handling
- [ ] **4.28** Test with wrong network (wallet on Goerli, session on Mainnet)
- [ ] **4.29** Test with non-owner wallet (sign button should be hidden)
- [ ] **4.30** Test with insufficient balance for gas
- [ ] **4.31** Test API errors (invalid Safe address, network issues)
- [ ] **4.32** Test session not found error
- [ ] **4.33** Test invalid payment link ID

---

## Phase 5: UI Polish & Features

**Goal**: Enhance UX with shadcn/ui components and better feedback.

### Loading & Error States
- [ ] **5.1** Add loading spinners using `Loader2` icon from lucide-react
  - Show during API calls (React Query loading states)
  - Skeleton loaders for tables (shadcn/ui Skeleton)
- [ ] **5.2** Add error messages with `Alert` component from shadcn/ui
  - Display error details
  - Retry button for failed requests
- [ ] **5.3** Add success toasts using shadcn/ui `Toast`:
  - Transaction created
  - Transaction signed
  - Transaction executed
  - Session saved
  - Payment link generated
- [ ] **5.4** Add empty states with lucide-react icons:
  - No transactions: `Inbox` icon + "No transactions yet"
  - No payment links: `Link2` icon + "Create your first payment link"
  - No sessions: "Create a session to get started"

### Visual Enhancements
- [ ] **5.5** Status badges using shadcn/ui `Badge`:
  - Pending: `badge-warning` (yellow) with `Clock` icon
  - Executed: `badge-success` (green) with `CheckCircle2` icon
  - Failed: `badge-destructive` (red) with `XCircle` icon
  - Awaiting confirmations: `badge-info` (blue) with count

- [ ] **5.6** Copy buttons using `Button` with `Copy` icon:
  - Safe address, transaction hash, owner addresses
  - Payment link URL
  - Click feedback: Toast "Copied to clipboard!" or icon changes to `Check`

- [ ] **5.7** External links using `ExternalLink` icon:
  - Etherscan links for addresses and transactions
  - Safe UI links to sign transactions externally
  - Open in new tab

- [ ] **5.8** Owner avatars:
  - Use @dicebear/core or ethereum-blockies-base64
  - Show in owner list and transaction confirmations
  - Circular avatars with `Avatar` component from shadcn/ui

- [ ] **5.9** Value formatting:
  - Format ETH with decimals: `formatEther()` from ethers
  - Show as "0.001 ETH" not "1000000000000000 wei"
  - Format large numbers with commas
  - Optional: USD equivalent using price API

- [ ] **5.10** Timestamp display:
  - Relative time: "2 hours ago" using date-fns or dayjs
  - `Tooltip` component on hover to show exact date/time
  - Use `Calendar` icon from lucide-react

### Advanced Features (Optional)
- [ ] **5.11** Transaction simulation preview:
  - Show expected outcome before signing
  - Use Tenderly simulation API (optional)
  
- [ ] **5.12** Batch transactions:
  - Create multiple transactions in one proposal
  - Array input in create form
  
- [ ] **5.13** Address book:
  - Save frequently used addresses
  - Store in session or separate table
  - Autocomplete in transaction forms
  
- [ ] **5.14** Transaction history export:
  - Export to CSV button
  - Filter by date range
  
- [ ] **5.15** Dark mode toggle:
  - shadcn/ui supports dark mode out of the box
  - Add toggle in Settings modal or Header
  - Use `Moon` / `Sun` icons from lucide-react

---

## 📦 Deliverables

### Backend (Express)
```
server/
├── routes/
│   ├── sessions.routes.js       # Session CRUD
│   ├── safe.routes.js           # Safe info, transactions
│   └── payment-links.routes.js  # Payment link generation
├── services/
│   ├── sessionService.js        # Session management logic
│   └── safeService.js           # Safe Transaction Service client
├── models/
│   ├── SafeSession.js           # Session schema
│   └── PaymentLink.js           # Payment link schema
└── middleware/
    └── validateSession.js       # Validate session exists & belongs to user
```

### Frontend (Next.js)
```
app/
├── safe/
│   ├── layout.tsx                    # Safe section layout + SafeProvider
│   ├── page.tsx                      # Home (Dashboard)
│   ├── transactions/
│   │   └── page.tsx                  # Transaction list (table with expandable rows)
│   ├── create/
│   │   └── page.tsx                  # Create transaction form
│   ├── payment-links/
│   │   ├── page.tsx                  # Payment links list
│   │   └── create/page.tsx           # Generate link
│   ├── pay/
│   │   └── [id]/page.tsx             # Public payment page
│   └── components/
│       ├── Sidebar.tsx               # Navigation sidebar (lucide icons)
│       ├── Header.tsx                # Top header with wallet connect
│       ├── SessionSettingsModal.tsx  # Session management dialog
│       ├── WalletConnect.tsx         # Wallet connection (dropdown)
│       ├── SafeInfo.tsx              # Safe info card
│       ├── TransactionTable.tsx      # Transaction table with expand
│       ├── TransactionRow.tsx        # Expandable transaction row
│       └── PaymentLinkCard.tsx       # Payment link display
└── providers/
    └── SafeProvider.tsx              # Safe SDK provider wrapper
```

---

## 🔧 Key Dependencies

### Frontend
```json
{
  "@safe-global/safe-react-hooks": "^1.x",
  "@safe-global/sdk-starter-kit": "^1.x",
  "@tanstack/react-query": "^5.x",
  "ethers": "^6.x",
  "lucide-react": "^0.x",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "date-fns": "^3.0.0",
  "react-hook-form": "^7.x",
  "zod": "^3.x"
}
```

### Backend
```json
{
  "axios": "^1.x",
  "express": "^4.x",
  "pg": "^8.x", // or mongoose for MongoDB
  "uuid": "^9.x"
}
```

### Dev Dependencies
```json
{
  "tailwindcss": "^3.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x",
  "@types/node": "^20.x",
  "@types/react": "^18.x",
  "typescript": "^5.x"
}
```

---

## 🚀 Running the Integration

**Backend:**
```bash
# In your existing Express app
npm run dev
# Backend running on http://localhost:5000 (or your port)
```

**Frontend:**
```bash
# In your existing Next.js app
npm run dev
# Frontend running on http://localhost:3000
```

**Access Safe Dashboard:**
```
http://localhost:3000/safe
```

**First Launch:**
- App checks for existing sessions in DB
- If none exist: Creates default session from `.env`
- Loads default session into SafeProvider
- User can create more sessions via Settings modal

---

## ✅ Success Criteria

POC is complete when you can:

1. **Session Management**
   - Create default session from `.env` on first launch
   - Create new sessions via Settings modal
   - Auto-generate or manually name sessions
   - Switch between sessions seamlessly
   - Set default session
   - Delete sessions

2. **View Safe Account (Home Page)**
   - Display Safe address, network, deployment status
   - Show owners list with avatars
   - Display threshold and balance
   - Show pending transaction count

3. **Manage Transactions**
   - List all transactions in table with pagination
   - Filter by status (All/Pending/Executed/Failed)
   - Sort by nonce, date, value
   - Search by address or hash
   - Expand row to see full transaction details
   - View confirmations and signatures
   - Sign button for pending transactions (if owner)

4. **Create & Sign Transactions**
   - Connect MetaMask wallet
   - Create new transaction via form
   - Sign pending transaction (if owner)
   - Execute transaction when threshold met
   - See real-time updates

5. **Payment Links**
   - Generate shareable payment link with description
   - Store link in database with expiration
   - Copy link URL to clipboard
   - Open payment page (public, no auth)
   - Execute payment from link
   - Track link status (pending/completed/expired)

6. **UX Polish**
   - Smooth loading states with skeletons
   - Error handling with retry buttons
   - Success toasts for actions
   - Copy buttons with feedback
   - External links (Etherscan, Safe UI)
   - Responsive design (mobile-friendly)
   - Dark mode support (optional)

---

## 🔐 Security Considerations

- [ ] **API Key Storage**: Store Safe API keys encrypted in database
- [ ] **Session Isolation**: Validate session belongs to authenticated user (if multi-user)
- [ ] **Wallet Connection**: Never store private keys, use MetaMask signing
- [ ] **Transaction Validation**: Verify transaction data before proposing
- [ ] **Payment Link Security**: Add expiration dates, one-time use option
- [ ] **Rate Limiting**: Add rate limits to session creation and payment links
- [ ] **Owner Verification**: Check if connected wallet is Safe owner before showing sign buttons
- [ ] **CORS**: Restrict backend API to frontend origin only
- [ ] **Input Validation**: Validate all inputs (addresses, amounts) on both frontend and backend

---

## 📚 Reference Documentation

### Official Safe Docs
- [Safe React Hooks SDK](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [Safe Starter Kit SDK](https://docs.safe.global/sdk/starter-kit)
- [Safe Transaction Service API](https://docs.safe.global/core-api/transaction-service-overview)
- [Safe Smart Account Docs](https://docs.safe.global/home/what-is-safe)

### UI Documentation
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)

### Local Documentation (output/new1/)

**Setup & Configuration:**
- [sdk-starter-kit.md](output/new1/sdk-starter-kit.md) - SDK overview
- [reference-sdk-react-hooks-safeprovider.md](output/new1/reference-sdk-react-hooks-safeprovider.md) - Provider setup
- [reference-sdk-react-hooks-createconfig.md](output/new1/reference-sdk-react-hooks-createconfig.md) - Configuration
- [reference-sdk-starter-kit-safe-client-constructor.md](output/new1/reference-sdk-starter-kit-safe-client-constructor.md) - SafeClient initialization

**Read Operations:**
- [reference-sdk-react-hooks-usesafe.md](output/new1/reference-sdk-react-hooks-usesafe.md) - Main hook
- [reference-sdk-react-hooks-usesafe-getsafeinfo.md](output/new1/reference-sdk-react-hooks-usesafe-getsafeinfo.md) - Get Safe info
- [reference-sdk-react-hooks-usesafe-getbalance.md](output/new1/reference-sdk-react-hooks-usesafe-getbalance.md) - Get balance
- [reference-sdk-react-hooks-usesafe-getchain.md](output/new1/reference-sdk-react-hooks-usesafe-getchain.md) - Get chain info
- [reference-sdk-react-hooks-usesafe-gettransactions.md](output/new1/reference-sdk-react-hooks-usesafe-gettransactions.md) - List transactions
- [reference-sdk-react-hooks-usesafe-getpendingtransactions.md](output/new1/reference-sdk-react-hooks-usesafe-getpendingtransactions.md) - Pending transactions
- [reference-sdk-react-hooks-usesafe-gettransaction.md](output/new1/reference-sdk-react-hooks-usesafe-gettransaction.md) - Single transaction

**Write Operations:**
- [reference-sdk-react-hooks-usesendtransaction.md](output/new1/reference-sdk-react-hooks-usesendtransaction.md) - Create transaction
- [reference-sdk-react-hooks-useconfirmtransaction.md](output/new1/reference-sdk-react-hooks-useconfirmtransaction.md) - Sign transaction
- [reference-sdk-starter-kit-safe-client-send.md](output/new1/reference-sdk-starter-kit-safe-client-send.md) - Send transaction
- [reference-sdk-starter-kit-safe-client-confirm.md](output/new1/reference-sdk-starter-kit-safe-client-confirm.md) - Confirm transaction

**Wallet Connection:**
- [reference-sdk-react-hooks-usesafe-connect.md](output/new1/reference-sdk-react-hooks-usesafe-connect.md) - Connect wallet
- [reference-sdk-react-hooks-usesafe-disconnect.md](output/new1/reference-sdk-react-hooks-usesafe-disconnect.md) - Disconnect wallet
- [reference-sdk-react-hooks-usesafe-isownerconnected.md](output/new1/reference-sdk-react-hooks-usesafe-isownerconnected.md) - Check owner status
- [reference-sdk-react-hooks-usesafe-issignerconnected.md](output/new1/reference-sdk-react-hooks-usesafe-issignerconnected.md) - Check signer status
- [reference-sdk-react-hooks-usesafe-getsigneraddress.md](output/new1/reference-sdk-react-hooks-usesafe-getsigneraddress.md) - Get signer address

**Safe Info Methods:**
- [reference-sdk-starter-kit-safe-client-getaddress.md](output/new1/reference-sdk-starter-kit-safe-client-getaddress.md) - Get Safe address
- [reference-sdk-starter-kit-safe-client-getowners.md](output/new1/reference-sdk-starter-kit-safe-client-getowners.md) - Get owners
- [reference-sdk-starter-kit-safe-client-getthreshold.md](output/new1/reference-sdk-starter-kit-safe-client-getthreshold.md) - Get threshold
- [reference-sdk-starter-kit-safe-client-getnonce.md](output/new1/reference-sdk-starter-kit-safe-client-getnonce.md) - Get nonce
- [reference-sdk-starter-kit-safe-client-isdeployed.md](output/new1/reference-sdk-starter-kit-safe-client-isdeployed.md) - Check deployment status

---

## 🎯 Next Steps After POC

Once the POC is validated, consider:

1. **Multi-User Support**: Add authentication and user-based session isolation
2. **Webhooks**: Listen to Safe Transaction Service webhooks for real-time updates
3. **Notifications**: Email/SMS when signature needed
4. **Multi-Safe Management**: Manage multiple Safes within one session
5. **Analytics Dashboard**: Track transaction volume, payment link usage
6. **Advanced Features**: Batch transactions, transaction simulation
7. **Mobile Support**: PWA with mobile wallet connect (WalletConnect)
8. **Role-Based Access**: Different permissions for different session users
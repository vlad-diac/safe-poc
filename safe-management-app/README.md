# Safe Management App

A full-stack application for managing Safe (Gnosis Safe) multisig wallets with session-based configuration, transaction management, and payment link generation.

## 🏗️ Architecture

### Tech Stack

**Backend (Express.js + Node.js)**
- Express.js for REST API
- Prisma ORM with PostgreSQL
- Safe Transaction Service integration
- Session-based Safe configuration management

**Frontend (Next.js + React)**
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui components
- Safe React Hooks SDK
- ethers.js for wallet connectivity

## 🔑 Why We Use Both Ethers.js AND Safe SDK

You might wonder: "Why do we need ethers.js if we're using the Safe SDK?"

### The Answer: They Serve Different Purposes

The Safe SDK is **provider-agnostic** by design. It handles Safe-specific operations (multisig logic, transaction proposals, signatures) but **does not handle wallet connection**.

#### The Standard Pattern (from Safe's Official Docs):

```typescript
// 1. Connect wallet using your preferred library (ethers, wagmi, web3modal, etc.)
const provider = new BrowserProvider(window.ethereum);
const accounts = await provider.send('eth_requestAccounts', []);

// 2. Pass the signer address to Safe SDK
const { connect } = useSafe();
connect(accounts[0]); // ← Safe SDK requires the address as parameter
```

This is the **same pattern** used in Safe's official examples with:
- Privy
- Dynamic
- Magic Link
- WalletConnect
- Any other wallet provider

### Division of Responsibilities:

| Library | Responsibility |
|---------|---------------|
| **ethers.js** | Connect to MetaMask, get wallet address, trigger wallet popups |
| **Safe SDK** | Multisig operations, transaction proposals, Safe-specific logic |

The Safe SDK focuses on Safe account abstraction while letting you choose your preferred wallet connection library.

## 🎯 Features

### Session Management
- Create and manage multiple Safe configurations
- Auto-generate session names (e.g., "Ethereum-0x7B38...Be04F")
- Set default session
- Switch between sessions seamlessly
- Network-specific configuration (Mainnet, Sepolia, Polygon, etc.)

### Safe Dashboard
- View Safe balance, owners, and threshold
- Display deployment status and nonce
- Show pending transaction count
- Real-time Safe information updates

### Transaction Management
- List all transactions with filtering (All/Pending/Executed)
- Expandable transaction details with full data
- Search by address or transaction hash
- Sign pending transactions (if wallet is owner)
- Track confirmation progress
- View transaction history with signatures

### Payment Links
- Generate shareable payment links
- Set custom descriptions and expiration times
- Public payment pages (no authentication required)
- Track payment link status (Pending/Completed/Expired)
- Copy link to clipboard
- Execute payments from link

### Wallet Integration
- Connect/disconnect MetaMask
- Check if connected wallet is Safe owner
- Display wallet address with avatar
- Network mismatch warnings

## 📁 Project Structure

```
safe-management-app/
├── backend/                      # Express.js API server
│   ├── src/
│   │   ├── routes/              # API endpoints
│   │   │   ├── sessions.routes.js       # Session CRUD
│   │   │   ├── safe.routes.js           # Safe info & transactions
│   │   │   └── payment-links.routes.js  # Payment link management
│   │   ├── services/            # Business logic
│   │   │   ├── sessionService.js        # Session operations
│   │   │   ├── safeService.js           # Safe API client
│   │   │   └── paymentLinkService.js    # Payment link logic
│   │   ├── middleware/          # Express middleware
│   │   │   └── validateSession.js       # Session validation
│   │   └── server.js            # Express app entry point
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── .env                     # Environment variables
│   └── package.json
│
└── frontend/                    # Next.js application
    ├── app/
    │   ├── providers/
    │   │   └── SafeProvider.tsx         # Safe SDK provider wrapper
    │   ├── safe/                # Safe management routes
    │   │   ├── layout.tsx              # Main layout with sidebar
    │   │   ├── page.tsx                # Dashboard
    │   │   ├── components/             # Shared components
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── Header.tsx
    │   │   │   ├── WalletConnect.tsx
    │   │   │   └── SessionSettingsModal.tsx
    │   │   ├── transactions/
    │   │   │   └── page.tsx            # Transaction list
    │   │   ├── create/
    │   │   │   └── page.tsx            # Create transaction
    │   │   ├── payment-links/
    │   │   │   ├── page.tsx            # Payment links list
    │   │   │   └── create/page.tsx     # Generate link
    │   │   └── pay/
    │   │       └── [id]/page.tsx       # Public payment page
    │   ├── layout.tsx           # Root layout
    │   ├── page.tsx             # Home (redirects to /safe)
    │   └── globals.css
    ├── components/
    │   └── ui/                  # shadcn/ui components
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- **PostgreSQL running** (see [Docker Setup](#-docker-setup-recommended) below) or SQLite for development
- MetaMask browser extension
- Safe wallet address (create one at [app.safe.global](https://app.safe.global))
- **RPC Provider Account** (Alchemy, Infura, or similar) - See explanation below ⬇️

---

## 🐳 Docker Setup (Recommended)

The easiest way to get PostgreSQL running is using Docker. We provide a ready-to-use Docker Compose setup.

### Prerequisites for Docker

- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed (usually comes with Docker Desktop)

### Quick Start with Docker

**1. Start PostgreSQL Container:**

```bash
# On Windows:
cd docker
start.bat

# On Linux/Mac:
cd docker
chmod +x start.sh
./start.sh

# Or use Docker Compose directly:
cd docker
docker-compose up -d
```

**2. Verify PostgreSQL is Running:**

```bash
cd docker
docker-compose ps
```

You should see `safe-management-postgres` with status "Up" and "healthy".

**3. Configure Backend:**

The Docker setup creates a PostgreSQL database with these credentials:
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `safe_management`
- **User**: `safeadmin`
- **Password**: `safepassword`

Your backend `.env` should already have the correct `DATABASE_URL`:
```env
DATABASE_URL="postgresql://safeadmin:safepassword@localhost:5432/safe_management"
```

**4. Continue with Backend Setup:**

Now follow the [Backend Setup](#2-backend-setup) instructions below.

### Docker Management Commands

#### View PostgreSQL Logs
```bash
cd docker
docker-compose logs -f postgres
```

#### Stop PostgreSQL
```bash
# On Windows:
cd docker
stop.bat

# On Linux/Mac:
cd docker
./stop.sh

# Or:
cd docker
docker-compose down
```

#### Stop and Delete All Data
```bash
cd docker
docker-compose down -v  # ⚠️ This deletes all database data!
```

#### Access PostgreSQL CLI
```bash
docker exec -it safe-management-postgres psql -U safeadmin -d safe_management
```

#### Backup Database
```bash
docker exec safe-management-postgres pg_dump -U safeadmin safe_management > backup.sql
```

#### Restore Database
```bash
docker exec -i safe-management-postgres psql -U safeadmin -d safe_management < backup.sql
```

### Docker Troubleshooting

#### "Port 5432 already in use"
Change the port in `docker/.env`:
```env
POSTGRES_PORT=5433
```

Then update your backend `DATABASE_URL` in `safe-management-app/backend/.env`:
```env
DATABASE_URL="postgresql://safeadmin:safepassword@localhost:5433/safe_management"
```

Restart Docker:
```bash
cd docker
docker-compose down
docker-compose up -d
```

#### "Connection refused"
1. Check if container is running: `docker-compose ps`
2. Wait 10-20 seconds for PostgreSQL to initialize
3. Check logs: `docker-compose logs postgres`
4. Verify the container is "healthy" (not just "running")

#### "Database does not exist"
The database is automatically created by Docker. If you're having issues:
```bash
cd docker
docker-compose down -v
docker-compose up -d
# Wait for container to be healthy
cd ../safe-management-app/backend
npx prisma migrate deploy
```

### Docker Configuration

You can customize the Docker setup by creating a `docker/.env` file:

```env
# PostgreSQL Configuration
POSTGRES_USER=safeadmin
POSTGRES_PASSWORD=safepassword
POSTGRES_DB=safe_management
POSTGRES_PORT=5432
```

> 💡 **Tip**: If you modify `docker/.env`, remember to update the `DATABASE_URL` in your backend `.env` file to match!

### 📚 Detailed Docker Documentation

For more information about the Docker setup, see:
- [`docker/README.md`](../docker/README.md) - Detailed Docker documentation
- [`docker/QUICK_START.md`](../docker/QUICK_START.md) - Quick start guide

---

## 🔌 Understanding RPC & Why You Need It

### What is RPC?

**RPC (Remote Procedure Call)** is how this application communicates with the Ethereum blockchain. Think of it as the "phone line" that connects your app to Ethereum.

### What RPC is Used For in This App:

#### 1. **Reading Blockchain Data** 📖
- Fetching your Safe's configuration (owners, threshold, nonce)
- Getting account balances (ETH and tokens)
- Loading transaction history
- Checking transaction status (pending/executed)

#### 2. **Broadcasting Transactions** 📡
- Submitting new Safe transaction proposals
- Executing transactions when threshold is met
- Signing transactions with your wallet

#### 3. **Smart Contract Interactions** 🔗
- Calling Safe smart contract methods
- Querying Safe Transaction Service
- Verifying transaction signatures

### Why Can't You Connect Directly to Ethereum?

You **cannot connect directly** from your browser/app because:
- Running a full Ethereum node requires significant resources (100s of GB storage, constant syncing)
- Browsers don't have native blockchain support
- Direct peer-to-peer connections are not practical for web apps

### What is Alchemy (or RPC Provider)?

**RPC Providers** are infrastructure services that run Ethereum nodes for you and provide:
- ✅ Simple HTTPS endpoints for easy integration
- ✅ High reliability and uptime
- ✅ Fast response times
- ✅ Free tier for development and small projects
- ✅ No need to run your own node

### Popular RPC Providers:

| Provider | Free Tier | Best For | Sign Up Link |
|----------|-----------|----------|--------------|
| **Alchemy** | ✅ Yes | Most features, best docs | [alchemy.com](https://www.alchemy.com/) |
| **Infura** | ✅ Yes | Simple, reliable | [infura.io](https://infura.io/) |
| **QuickNode** | ✅ Yes | High performance | [quicknode.com](https://www.quicknode.com/) |
| **Public RPC** | ✅ Free | Quick testing only ⚠️ | No signup needed |

### Getting Your RPC URL (Alchemy Example):

1. **Sign up** at [alchemy.com](https://www.alchemy.com/) (free)
2. **Create a new app**:
   - Name: "Safe Management POC"
   - Chain: Ethereum
   - Network: Mainnet (or Sepolia for testing)
3. **Copy the HTTPS URL** from your app dashboard:
   ```
   https://eth-mainnet.g.alchemy.com/v2/abc123def456...
   ```
4. **Paste it in your backend `.env`**:
   ```env
   RPC_URL=https://eth-mainnet.g.alchemy.com/v2/abc123def456...
   ```

> 💡 **Tip**: For testing, use **Sepolia testnet** instead of Mainnet. You can get free test ETH from faucets!

### Alternative: Public RPC (Testing Only)

For quick testing, you can use a public RPC:
```env
RPC_URL=https://ethereum.publicnode.com
```

⚠️ **Warning**: Public RPCs are:
- Rate-limited (may fail under load)
- Unreliable (can go down without notice)
- Not recommended for production or even serious development

### Do I Need Multiple RPC URLs?

No! You only need **one RPC URL per network**:
- One URL for Ethereum Mainnet
- One URL for Sepolia testnet (if testing)
- One URL for Polygon (if using Polygon)

The app will use the RPC URL you configure in your session settings.

---

### Quick Installation Summary

Here's the complete setup flow using Docker (recommended):

1. **Start PostgreSQL**: `cd docker && docker-compose up -d`
2. **Setup Backend**: `cd backend && npm install && npx prisma migrate deploy && npx prisma generate`
3. **Configure Backend**: Edit `backend/.env` with your RPC URL and Safe address
4. **Start Backend**: `npm run dev` (in backend folder)
5. **Setup Frontend**: `cd frontend && npm install`
6. **Configure Frontend**: Copy `frontend/.env.local.example` to `.env.local`
7. **Start Frontend**: `npm run dev` (in frontend folder)
8. **Access App**: Open `http://localhost:3000`

> 💡 **First time?** Follow the detailed steps below for complete instructions.

---

### 1. Clone & Setup

```bash
cd safe-management-app
```

### 2. Start PostgreSQL with Docker (Recommended)

Before setting up the backend, start PostgreSQL using Docker:

```bash
# From the project root
cd docker
docker-compose up -d

# Verify it's running
docker-compose ps
```

✅ PostgreSQL should show as "Up" and "healthy".

> 📖 See the [Docker Setup](#-docker-setup-recommended) section above for detailed instructions and troubleshooting.

**Alternative:** If you prefer to install PostgreSQL manually, see the [Database Setup](#️-database-setup) section below.

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration (see below)

# Setup database (migrations are included in the repository)
npx prisma migrate deploy    # Apply existing migrations
npx prisma generate           # Generate Prisma Client

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

> **Note**: The initial database migration is included in the repository. If you need to modify the schema later, use `npx prisma migrate dev --name your_change_description` to create a new migration.

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local (see below)

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 5. Access the App

Open `http://localhost:3000` in your browser. You'll be redirected to `/safe` where you can:
1. Connect your MetaMask wallet
2. View or create a Safe session
3. Manage your Safe wallet

## ⚙️ Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Safe Configuration (Default Session)
DEFAULT_SAFE_ADDRESS=0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F
CHAIN_ID=1

# ⚠️ IMPORTANT: Get your RPC URL from Alchemy/Infura (see "Understanding RPC" section above)
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

TRANSACTION_SERVICE_URL=https://safe-transaction-mainnet.safe.global
SAFE_API_KEY=optional_api_key_here

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/safe_management

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

#### 🔑 Key Configuration Notes:

- **`RPC_URL`** ⚠️ **REQUIRED**: Your Ethereum node provider URL
  - Get it from [Alchemy](https://alchemy.com), [Infura](https://infura.io), or [QuickNode](https://quicknode.com)
  - See the ["Understanding RPC"](#-understanding-rpc--why-you-need-it) section above for detailed setup
  - Without this, the app **cannot connect to the blockchain**
  
- **`DEFAULT_SAFE_ADDRESS`**: The Safe address to load by default
  - You can create a Safe at [app.safe.global](https://app.safe.global)
  - Can be changed later via the Settings modal
  
- **`CHAIN_ID`**: Network identifier
  - `1` = Ethereum Mainnet
  - `11155111` = Sepolia Testnet (recommended for testing)
  - `137` = Polygon
  - `10` = Optimism
  - `42161` = Arbitrum
  
- **`TRANSACTION_SERVICE_URL`**: Safe's transaction indexing service
  - Mainnet: `https://safe-transaction-mainnet.safe.global`
  - Sepolia: `https://safe-transaction-sepolia.safe.global`
  - Auto-updates when you change networks in the UI
  
- **`SAFE_API_KEY`**: Optional API key for Safe services
  - Only needed if you hit rate limits
  - Get it from [Safe Developer Portal](https://docs.safe.global)

### Frontend (.env.local)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🗄️ Database Setup

### Option 1: PostgreSQL (Recommended for Production)

1. Install PostgreSQL
2. Create database:
   ```sql
   CREATE DATABASE safe_management;
   ```
3. Update `DATABASE_URL` in backend `.env`
4. Apply migrations:
   ```bash
   cd backend
   npx prisma migrate deploy  # Applies existing migrations from repo
   npx prisma generate         # Generates Prisma Client
   ```

### Option 2: SQLite (Quick Development)

1. Update `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```
2. Apply migrations:
   ```bash
   cd backend
   npx prisma migrate deploy  # Applies existing migrations
   npx prisma generate         # Generates Prisma Client
   ```
   
> **Note**: If switching from PostgreSQL to SQLite (or vice versa), you may need to recreate migrations due to database-specific syntax differences.

---

## 🔄 Database Management & Refresh Commands

Need to refresh your database? Here are your options:

### Quick Reference

| Command | When to Use | Keeps Data? |
|---------|-------------|-------------|
| `npx prisma migrate reset` | Start completely fresh | ❌ No (deletes all) |
| `npx prisma migrate dev` | Apply schema changes | ✅ Yes (when possible) |
| `npx prisma db push` | Quick dev sync | ✅ Yes |
| `npx prisma generate` | Update TypeScript types | N/A (doesn't touch DB) |
| `npx prisma studio` | View/edit data in UI | Manual control |

---

### Option 1: Reset Database (Complete Fresh Start) ⚠️

**Use when:** You want to start completely fresh with empty tables

```powershell
cd safe-management-app/backend
npx prisma migrate reset
```

**What it does:**
- ❌ Drops all tables (deletes ALL data)
- ✅ Recreates tables from schema
- ✅ Runs all migrations
- ✅ Regenerates Prisma Client
- ✅ Auto-creates default session from `.env`

**⚠️ Warning:** This permanently deletes all your data (sessions, payment links, etc.)!

---

### Option 2: Apply New Migrations (Keep Data)

**Use when:** You've modified `schema.prisma` and want to update the database

```powershell
cd safe-management-app/backend
npx prisma migrate dev --name description_of_changes
```

**Example:**
```powershell
npx prisma migrate dev --name add_user_table
```

**What it does:**
- ✅ Creates new migration file
- ✅ Applies changes to database
- ✅ Keeps existing data (when possible)
- ✅ Updates Prisma Client

---

### Option 3: Push Schema (Quick Dev Sync)

**Use when:** Prototyping or quick development (not for production)

```powershell
cd safe-management-app/backend
npx prisma db push
```

**What it does:**
- ✅ Syncs schema directly to database
- ✅ No migration files created
- ✅ Fast and simple
- ⚠️ Doesn't track migration history

---

### Option 4: Regenerate Prisma Client

**Use when:** Schema changed but database is already updated

```powershell
cd safe-management-app/backend
npx prisma generate
```

**What it does:**
- ✅ Updates TypeScript types
- ✅ Rebuilds Prisma Client
- ✅ No database changes

---

### Option 5: View/Edit Database (Prisma Studio)

**Use when:** You want to inspect or manually edit data

```powershell
cd safe-management-app/backend
npx prisma studio
```

Opens at `http://localhost:5555`

**Features:**
- 👀 View all tables and data
- ✏️ Edit records through UI
- ➕ Add new records manually
- 🗑️ Delete records
- 🔍 Filter and search data

---

### Common Scenarios

#### "I changed schema.prisma, now what?"

```powershell
# Option A: Create migration (recommended)
npx prisma migrate dev --name your_change

# Option B: Quick sync (dev only)
npx prisma db push
```

#### "I want to start fresh"

```powershell
# Deletes everything and recreates
npx prisma migrate reset
```

#### "Database is out of sync"

```powershell
# Check status
npx prisma migrate status

# Force reset (deletes data)
npx prisma migrate reset
```

#### "I need to see my data"

```powershell
# Open visual database browser
npx prisma studio
```

---

### Database Backup (PostgreSQL)

```powershell
# Backup
pg_dump -U postgres safe_management > backup.sql

# Restore
psql -U postgres safe_management < backup.sql
```

---

## 🧪 Testing the Application

### 1. Test Backend Health

```bash
curl http://localhost:5000/health
# Expected: {"status":"ok","message":"Safe Management API"}
```

### 2. Test Session Creation

The backend automatically creates a default session from `.env` on first launch.

### 3. Test Frontend

1. Navigate to `http://localhost:3000`
2. Connect MetaMask wallet
3. View Safe dashboard (balance, owners, threshold)
4. Create a test transaction
5. View pending transactions
6. Generate a payment link

## 📚 API Endpoints

### Sessions

- `GET /api/sessions` - List all sessions
- `GET /api/sessions/default` - Get default session
- `GET /api/sessions/:id` - Get specific session
- `POST /api/sessions` - Create new session
- `PUT /api/sessions/:id` - Update session
- `PATCH /api/sessions/:id/set-default` - Set as default
- `DELETE /api/sessions/:id` - Delete session

### Safe Operations

- `GET /api/safe/:sessionId/info` - Get Safe info (owners, threshold, nonce)
- `GET /api/safe/:sessionId/balances` - Get ETH and token balances
- `GET /api/safe/:sessionId/owners` - List Safe owners
- `GET /api/safe/:sessionId/transactions` - List transactions
- `GET /api/safe/:sessionId/transaction/:hash` - Get transaction details
- `POST /api/safe/:sessionId/transaction/propose` - Propose new transaction

### Payment Links

- `POST /api/payment-links/create` - Generate payment link
- `GET /api/payment-links/:id` - Get payment link details (public)
- `GET /api/payment-links/session/:sessionId` - List session's links
- `PATCH /api/payment-links/:id/status` - Update link status

## 🎨 UI Components

Built with **shadcn/ui** and **Tailwind CSS**:

- Card, Button, Input, Select
- Table with expandable rows
- Dialog modals
- Dropdown menus
- Tabs, Badges, Avatars
- Toast notifications
- Loading skeletons

Icons from **lucide-react**

## 🔐 Security Considerations

- ✅ API keys stored encrypted in database
- ✅ Session validation middleware
- ✅ CORS restricted to frontend origin
- ✅ Never stores private keys (uses MetaMask)
- ✅ Owner verification before showing sign buttons
- ✅ Input validation on all forms
- ✅ Transaction data verification
- ⚠️ Consider adding rate limiting for production
- ⚠️ Add user authentication for multi-user scenarios

## 🚧 Development Status

### ✅ Completed (Phase 1 & 2)

- [x] Backend API with session management
- [x] Safe Transaction Service integration
- [x] Frontend with all main pages
- [x] Wallet connection
- [x] Transaction management UI
- [x] Payment link generation
- [x] Session settings modal
- [x] Responsive design

### 🔄 Next Steps (Phase 3 & 4)

- [ ] End-to-end testing
- [ ] Error boundary components
- [ ] Transaction simulation preview
- [ ] Batch transaction support
- [ ] Address book feature
- [ ] Dark mode toggle
- [ ] Export transaction history
- [ ] Mobile wallet integration (WalletConnect)
- [ ] User authentication system
- [ ] Multi-Safe management per session

## 📖 Documentation References

### Safe SDK
- [Safe React Hooks](https://docs.safe.global/reference-sdk-react-hooks/usesafe)
- [Safe Starter Kit SDK](https://docs.safe.global/sdk/starter-kit)
- [Safe Transaction Service API](https://docs.safe.global/core-api/transaction-service-overview)

### UI Libraries
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
- [ethers.js](https://docs.ethers.org/)

### Project Documentation
- `INTEGRATION_PLAN.md` - Detailed implementation plan
- `PHASE1_STATUS.md` - Backend implementation status
- `PHASE2_STATUS.md` - Frontend implementation status

## 🤝 Contributing

1. Check implementation status in `INTEGRATION_PLAN.md`
2. Follow existing code structure and patterns
3. Test with local Safe wallet
4. Update documentation for new features

## 📝 License

This project is a POC for Safe wallet management integration.

## 🆘 Troubleshooting

### ❌ RPC Error: "401 Unauthorized" or "Must be authenticated"

**Error message:**
```
POST https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY 401 (Unauthorized)
```

**Cause:** Your `RPC_URL` in `backend/.env` contains a placeholder instead of a real API key.

**Solution:**
1. Sign up for a free account at [Alchemy](https://alchemy.com), [Infura](https://infura.io), or [QuickNode](https://quicknode.com)
2. Create a new app/project
3. Copy your HTTPS RPC URL
4. Update `backend/.env`:
   ```env
   RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ACTUAL_KEY_HERE
   ```
5. Restart your backend server

📖 **See the ["Understanding RPC"](#-understanding-rpc--why-you-need-it) section above for detailed setup instructions.**

---

### ❌ App loads but says "Failed to initialize clients"

**Cause:** Same as above - invalid RPC URL or network connectivity issues.

**Solution:**
1. Verify your RPC URL is correct in `backend/.env`
2. Check your internet connection
3. Try using a different RPC provider
4. For testing, use Sepolia testnet instead of Mainnet

---

### Backend won't start
- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Run `npx prisma generate`
- Check if port 5000 is already in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend
- Look for errors in backend console

### Settings modal doesn't open
- The Settings button is at the bottom of the sidebar (left side)
- Check browser console for JavaScript errors
- Try refreshing the page
- Ensure backend is running and reachable

### MetaMask not connecting
- Ensure MetaMask extension is installed
- Check browser console for errors
- Try refreshing the page
- Verify you're on the correct network
- Check if MetaMask is locked

### Network mismatch warning
- Your MetaMask is on a different network than your Safe
- Click the "Switch to [Network]" button in the wallet dropdown
- Or manually switch networks in MetaMask
- Ensure your RPC URL matches the CHAIN_ID in your config

### Transaction signing fails
- Verify connected wallet is a Safe owner (check the badge in header)
- Check network matches Safe network
- Ensure Safe has sufficient balance for gas
- Make sure you're not trying to sign an already-signed transaction

### Can't see transactions or balance
- Verify your RPC URL is working (check browser console)
- Check that your Safe address is correct
- Ensure you're on the correct network
- Try refreshing the page

### Database errors
- Run `npx prisma migrate reset` (⚠️ deletes data)
- Check database connection string
- Verify database exists
- Ensure PostgreSQL is running

## 📞 Support

For issues related to:
- **Safe SDK**: Check [Safe documentation](https://docs.safe.global/)
- **This project**: Review status files and integration plan
- **MetaMask**: Check [MetaMask docs](https://docs.metamask.io/)

---

Built with ❤️ using Safe Protocol, Next.js, and Express

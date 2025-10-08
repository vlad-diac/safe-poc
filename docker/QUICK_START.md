# Quick Start Guide - PostgreSQL with Docker

## 🚀 Getting Started in 3 Steps

### Step 1: Start PostgreSQL

**On Windows:**
```bash
cd docker
start.bat
```

**On Linux/Mac:**
```bash
cd docker
chmod +x start.sh
./start.sh
```

**Or using Docker Compose directly:**
```bash
cd docker
docker-compose up -d
```

### Step 2: Configure Backend

1. Copy the example environment file:
   ```bash
   cd safe-management-app/backend
   cp .env.example .env
   ```

2. The `.env` file should contain:
   ```env
   DATABASE_URL="postgresql://safeadmin:safepassword@localhost:5432/safe_management"
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

### Step 3: Initialize Database

```bash
cd safe-management-app/backend
npm run prisma:generate
npm run prisma:migrate
```

### Step 4: Start Backend

```bash
npm run dev
```

## ✅ Verification

Your backend should now be running on `http://localhost:5000` with PostgreSQL connected!

Test with:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Safe Management API"
}
```

## 🛑 Stopping Services

**On Windows:**
```bash
cd docker
stop.bat
```

**On Linux/Mac:**
```bash
cd docker
./stop.sh
```

**Or using Docker Compose:**
```bash
cd docker
docker-compose down
```

## 🔧 Common Commands

### View PostgreSQL Logs
```bash
cd docker
docker-compose logs -f postgres
```

### Access PostgreSQL CLI
```bash
docker exec -it safe-management-postgres psql -U safeadmin -d safe_management
```

### Reset Database (Delete All Data)
```bash
cd docker
docker-compose down -v
docker-compose up -d
cd ../safe-management-app/backend
npm run prisma:migrate
```

### Check Container Status
```bash
cd docker
docker-compose ps
```

## 🐛 Troubleshooting

### "Port 5432 already in use"
Change the port in `docker/.env`:
```env
POSTGRES_PORT=5433
```

Then update your backend `DATABASE_URL`:
```env
DATABASE_URL="postgresql://safeadmin:safepassword@localhost:5433/safe_management"
```

### "Connection refused"
1. Check if PostgreSQL is running: `docker-compose ps`
2. Wait for the container to be healthy (may take 10-20 seconds)
3. Check logs: `docker-compose logs postgres`

### "Prisma migrate fails"
1. Ensure PostgreSQL is running and healthy
2. Verify DATABASE_URL in backend/.env is correct
3. Try regenerating Prisma client: `npm run prisma:generate`

## 📚 More Info

See [README.md](./README.md) for detailed documentation.

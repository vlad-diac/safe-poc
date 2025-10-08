# Docker Setup for Safe Management App

This folder contains Docker configuration for running PostgreSQL for the Safe Management App backend.

## Prerequisites

- Docker installed
- Docker Compose installed

## Quick Start

1. **Start PostgreSQL**:
   ```bash
   cd docker
   docker-compose up -d
   ```

2. **Check if PostgreSQL is running**:
   ```bash
   docker-compose ps
   ```

3. **View logs**:
   ```bash
   docker-compose logs -f postgres
   ```

4. **Stop PostgreSQL**:
   ```bash
   docker-compose down
   ```

5. **Stop and remove all data**:
   ```bash
   docker-compose down -v
   ```

## Configuration

The PostgreSQL service is configured with the following defaults:

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `safe_management`
- **User**: `safeadmin`
- **Password**: `safepassword`

You can modify these values in the `.env` file.

## Backend Configuration

After starting PostgreSQL, configure your backend to connect to the database:

1. **Update backend `.env` file** (`safe-management-app/backend/.env`):
   ```env
   DATABASE_URL="postgresql://safeadmin:safepassword@localhost:5432/safe_management"
   ```

2. **Run Prisma migrations**:
   ```bash
   cd safe-management-app/backend
   npm run prisma:migrate
   ```

3. **Generate Prisma client**:
   ```bash
   npm run prisma:generate
   ```

4. **Start the backend**:
   ```bash
   npm run dev
   ```

## Database Management

### Access PostgreSQL CLI

```bash
docker exec -it safe-management-postgres psql -U safeadmin -d safe_management
```

### Backup Database

```bash
docker exec safe-management-postgres pg_dump -U safeadmin safe_management > backup.sql
```

### Restore Database

```bash
docker exec -i safe-management-postgres psql -U safeadmin -d safe_management < backup.sql
```

## Troubleshooting

### Port Already in Use

If port 5432 is already in use, you can change it in the `.env` file:
```env
POSTGRES_PORT=5433
```

Then update your `DATABASE_URL` accordingly:
```env
DATABASE_URL="postgresql://safeadmin:safepassword@localhost:5433/safe_management"
```

### Connection Refused

Make sure PostgreSQL is healthy:
```bash
docker-compose ps
```

The postgres service should show "healthy" status.

### Reset Database

To completely reset the database:
```bash
docker-compose down -v
docker-compose up -d
cd ../safe-management-app/backend
npm run prisma:migrate
```

@echo off
REM Start PostgreSQL with Docker Compose

echo 🐳 Starting PostgreSQL container...
docker-compose up -d

echo.
echo ⏳ Waiting for PostgreSQL to be ready...
timeout /t 5 /nobreak > nul

echo.
echo ✅ PostgreSQL container started!
echo.
echo 📊 Database Connection Info:
echo    Host: localhost
echo    Port: 5432
echo    Database: safe_management
echo    User: safeadmin
echo.
echo 🔗 Connection String:
echo    DATABASE_URL="postgresql://safeadmin:safepassword@localhost:5432/safe_management"
echo.
echo 📝 Next Steps:
echo    1. Update your backend/.env file with the DATABASE_URL
echo    2. Run: cd ../safe-management-app/backend ^&^& npm run prisma:migrate
echo    3. Run: npm run prisma:generate
echo    4. Start backend: npm run dev
echo.

pause

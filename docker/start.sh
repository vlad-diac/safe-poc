#!/bin/bash
# Start PostgreSQL with Docker Compose

echo "🐳 Starting PostgreSQL container..."
docker-compose up -d

echo ""
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if container is healthy
if docker-compose ps | grep -q "healthy"; then
    echo "✅ PostgreSQL is running and healthy!"
    echo ""
    echo "📊 Database Connection Info:"
    echo "   Host: localhost"
    echo "   Port: 5432"
    echo "   Database: safe_management"
    echo "   User: safeadmin"
    echo ""
    echo "🔗 Connection String:"
    echo "   DATABASE_URL=\"postgresql://safeadmin:safepassword@localhost:5432/safe_management\""
    echo ""
    echo "📝 Next Steps:"
    echo "   1. Update your backend/.env file with the DATABASE_URL"
    echo "   2. Run: cd ../safe-management-app/backend && npm run prisma:migrate"
    echo "   3. Run: npm run prisma:generate"
    echo "   4. Start backend: npm run dev"
else
    echo "⚠️  PostgreSQL container started but may not be healthy yet"
    echo "   Check status with: docker-compose ps"
    echo "   Check logs with: docker-compose logs postgres"
fi

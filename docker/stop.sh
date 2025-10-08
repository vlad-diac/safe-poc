#!/bin/bash
# Stop PostgreSQL container

echo "🛑 Stopping PostgreSQL container..."
docker-compose down

echo "✅ PostgreSQL container stopped!"
echo ""
echo "💡 To remove all data as well, run: docker-compose down -v"

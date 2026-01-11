#!/bin/bash

set -e

# Detect Docker Compose version
if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif docker-compose version >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  echo "Error: Docker Compose is not installed"
  exit 1
fi

SERVICE=$1

echo
echo "🔄 Reloading environment variables..."

if [ -z "$SERVICE" ]; then
  echo
  echo "🛑 Stopping services..."
  $COMPOSE down
  echo
  echo "🚀 Starting with new environment variables..."
  $COMPOSE up -d
  echo
  echo "✅ All services restarted with new environment!"
  echo "📊 View logs: ./scripts/logs.sh"
elif [ "$SERVICE" = "backend" ] || [ "$SERVICE" = "frontend" ]; then
  echo
  echo "🛑 Stopping $SERVICE..."
  $COMPOSE stop $SERVICE
  $COMPOSE rm -f $SERVICE
  echo
  echo "🚀 Starting $SERVICE with new environment..."
  $COMPOSE up -d $SERVICE
  echo
  echo "✅ $SERVICE restarted with new environment!"
  echo "📊 View logs: ./scripts/logs.sh $SERVICE"
else
  echo "❌ Error: Invalid service '$SERVICE'"
  echo "Usage: ./scripts/reload-env.sh [backend|frontend]"
  echo ""
  echo "This script restarts services to pick up environment variable changes"
  echo "without rebuilding. Use this after updating .env files."
  exit 1
fi

echo
echo "💡 Note: If you changed dependencies or code, use ./scripts/rebuild.sh instead"

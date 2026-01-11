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
echo "🛑 Stopping and removing containers..."
$COMPOSE down -v

if [ -z "$SERVICE" ]; then
  echo
  echo "🔨 Rebuilding all services..."
  $COMPOSE build --no-cache
  echo
  echo "🚀 Starting services..."
  $COMPOSE up -d
  echo
  echo "✅ All services rebuilt and started!"
  echo "📊 View logs: ./scripts/logs.sh"
elif [ "$SERVICE" = "backend" ] || [ "$SERVICE" = "frontend" ]; then
  echo
  echo "🔨 Rebuilding $SERVICE..."
  $COMPOSE build --no-cache $SERVICE
  echo
  echo "🚀 Starting $SERVICE..."
  $COMPOSE up -d $SERVICE
  echo
  echo "✅ $SERVICE rebuilt and started!"
  echo "📊 View logs: ./scripts/logs.sh $SERVICE"
else
  echo "❌ Error: Invalid service '$SERVICE'"
  echo "Usage: ./scripts/rebuild.sh [backend|frontend]"
  exit 1
fi

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
echo "Stopping containers..."
$COMPOSE down

if [ -z "$SERVICE" ]; then
  echo
  echo "Rebuilding all services..."
  $COMPOSE build --no-cache
elif [ "$SERVICE" = "backend" ] || [ "$SERVICE" = "frontend" ]; then
  echo
  echo "Rebuilding $SERVICE..."
  $COMPOSE build --no-cache $SERVICE
else
  echo "Error: Invalid service '$SERVICE'"
  echo "Usage: ./scripts/rebuild.sh [backend|frontend]"
  exit 1
fi

echo
echo "Rebuild complete. Start services with: ./scripts/start.sh"

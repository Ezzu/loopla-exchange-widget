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

if [ -z "$SERVICE" ]; then
  echo
  echo "Viewing all logs (Press Ctrl+C to exit)..."
  $COMPOSE logs -f
elif [ "$SERVICE" = "backend" ] || [ "$SERVICE" = "frontend" ]; then
  echo
  echo "Viewing $SERVICE logs (Press Ctrl+C to exit)..."
  $COMPOSE logs -f $SERVICE
else
  echo "Error: Invalid service '$SERVICE'"
  echo "Usage: ./scripts/logs.sh [backend|frontend]"
  exit 1
fi

#!/bin/bash

set -e

echo "######################################"
echo "Loopla Exchange Widget Docker Setup"
echo "######################################"

# Detect Docker Compose version
if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif docker-compose version >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  echo "Error: Docker Compose is not installed"
  exit 1
fi

echo
echo "Copying environment files..."
cp -n .env.example .env 2>/dev/null || echo ".env already exists"

echo
echo "Installing git hooks..."
if [ -d ".git" ] && [ -f "./scripts/install-hooks.sh" ]; then
  bash ./scripts/install-hooks.sh
fi

echo
echo "Building Docker images..."
$COMPOSE build --no-cache

echo
echo "Starting Docker services..."
$COMPOSE up

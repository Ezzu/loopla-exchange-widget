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

echo
echo "Stopping and removing Docker containers and volumes..."
$COMPOSE down -v

echo
echo "Docker cleanup complete."

#!/bin/bash

set -e

mkdir -p .git/hooks

echo "Installing pre-commit hook..."
cp lib/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "Installing post-merge hook..."
git config core.hooksPath .git/hooks

echo "Hook installation complete."

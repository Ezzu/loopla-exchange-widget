# Multi-stage build for backend

# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (skip postinstall scripts for git hooks)
RUN npm ci --ignore-scripts

# Copy source code (will be overridden by volume in dev)
COPY src ./src
COPY shared ./shared

# Expose port
EXPOSE 4000

# Start development server with hot reload
CMD ["npm", "run", "dev"]

# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (skip postinstall scripts)
RUN npm ci --ignore-scripts

# Copy source code
COPY src ./src
COPY shared ./shared

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies (skip postinstall scripts)
RUN npm ci --only=production --ignore-scripts

# Copy built files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/shared ./shared

# Expose port
EXPOSE 4000

# Run the app
CMD ["node", "dist/src/server.js"]

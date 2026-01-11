# Multi-stage build for frontend

# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files from client directory
COPY client/package*.json ./
COPY client/tsconfig*.json ./
COPY client/vite.config.ts ./
COPY client/index.html ./

# Install dependencies (skip any postinstall scripts)
RUN npm ci --ignore-scripts

# Copy source code (will be overridden by volume in dev)
COPY client/src ./src
COPY client/public ./public
COPY shared ./shared

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files from client directory
COPY client/package*.json ./
COPY client/tsconfig*.json ./
COPY client/vite.config.ts ./
COPY client/index.html ./

# Install dependencies (skip any postinstall scripts)
RUN npm ci --ignore-scripts

# Copy source code
COPY client/src ./src
COPY client/public ./public
COPY shared ./shared

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build for production
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

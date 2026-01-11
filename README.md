# Loopla Exchange Widget

A modern, real-time currency exchange rate widget built with React and Express, featuring a clean UI and live exchange rate updates.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-green)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed)](https://www.docker.com/)

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Key Features](#-key-features)
- [Previews](#-previews)
- [Dependencies & Versions](#-dependencies--versions)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Architecture & Design Decisions](#-architecture--design-decisions)
- [API Documentation](#-api-documentation)
- [Known Limitations](#-known-limitations)
- [Future Enhancements](#-future-enhancements)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Introduction

Loopla Exchange Widget is a full-stack application that provides real-time currency exchange rates with a beautiful, responsive interface. The application fetches live data from Exchange Rates API and displays it in an intuitive, user-friendly format.

### Key Features

- ✨ **Real-time Exchange Rates** - Live currency conversion rates
- 🔄 **Auto-refresh** - Automatic updates every 5 minutes
- 🎨 **Modern UI** - Clean, responsive design with Emotion CSS-in-JS
- 📱 **Mobile-friendly** - Fully responsive across all devices
- ⚡ **Fast Performance** - Built with Vite for optimal load times
- 🐳 **Docker Support** - Easy deployment with Docker & Docker Compose
- 📊 **Caching** - In-memory caching for improved performance
- 🔒 **Type-safe** - Full TypeScript support
- 📚 **API Documentation** - Interactive Swagger/OpenAPI docs
- 🧪 **Well-tested** - Comprehensive test coverage
- 🗣️ **Language** - Multi-linguistic support

---

## 📸 Previews

### Web & Mobile Views

|                                                        Desktop View                                                         |                                                        Mobile View                                                         |
| :-------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=1hAL7uzHswUEZC6Qt8MJUwms3HIhEbzad" alt="Desktop Preview" width="400"/> | <img src="https://drive.google.com/uc?export=view&id=18b9LOCEAjyNjJqTphNKvaUhbNM8Y5fEy" alt="Mobile Preview" width="200"/> |
|                                                  Full layout with sidebar                                                   |                                                  Optimized single column                                                   |

### Demo Video

https://drive.google.com/file/d/10o9Nl0nJvohNUzIUvtDwstWwhGbda4-e/view?usp=sharing

---

## 📦 Dependencies & Versions

### Backend (Express API)

| Package            | Version | Purpose              |
| ------------------ | ------- | -------------------- |
| Node.js            | 20+     | JavaScript runtime   |
| TypeScript         | 5.9.3   | Type safety          |
| Express            | 5.2.1   | Web framework        |
| CORS               | 2.8.5   | Cross-origin support |
| Swagger UI Express | 5.0.1   | API documentation    |
| Jest               | 30.2.0  | Testing framework    |
| ts-node-dev        | 2.0.0   | Development server   |

### Frontend (React)

| Package     | Version | Purpose           |
| ----------- | ------- | ----------------- |
| React       | 19.2.0  | UI framework      |
| TypeScript  | 5.9.3   | Type safety       |
| Vite        | 7.2.4   | Build tool        |
| Emotion     | 11.14.0 | CSS-in-JS styling |
| React Icons | 5.5.0   | Icon library      |
| Vitest      | 4.0.16  | Testing framework |

### DevOps

| Tool           | Version | Purpose                          |
| -------------- | ------- | -------------------------------- |
| Docker         | Latest  | Containerization                 |
| Docker Compose | Latest  | Multi-container orchestration    |
| nginx          | Alpine  | Static file serving (production) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm
- **Docker** & Docker Compose (optional, for containerized setup)
- **Exchange Rates API Key** (free from [exchangeratesapi.io](https://exchangeratesapi.io/))

### Installation

#### Option 1: Quick Start with Scripts

```bash
# Clone the repository
git clone https://github.com/Ezzu/loopla-exchange-widget.git
cd loopla-exchange-widget

# Set up the project (installs dependencies, creates .env)
bash scripts/setup.sh
```

#### Option 2: Docker Compose

```bash
# Clone and navigate
git clone https://github.com/Ezzu/loopla-exchange-widget.git
cd loopla-exchange-widget

# Copy environment files
cp .env.example .env
cp client/.env.example client/.env

# Update .env with your API key
# EXCHANGE_RATES_API_KEY=your_actual_api_key

# Start with Docker Compose
docker-compose up --build
```

#### Option 3: Manual Setup

```bash
# Clone repository
git clone https://github.com/Ezzu/loopla-exchange-widget.git
cd loopla-exchange-widget

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Create environment files
cp .env.example .env
cp client/.env.example client/.env

# Update .env with your API key
# EXCHANGE_RATES_API_KEY=your_actual_api_key

# Start backend (in one terminal)
npm run dev

# Start frontend (in another terminal)
cd client
npm run dev
```

### Access the Application

**Local Development:**

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **API Documentation:** http://localhost:4000/api-docs

**Live Deployment (Railway):**

- **Frontend:** https://ideal-dream-production.up.railway.app
- **Backend API:** https://loopla-exchange-widget-production.up.railway.app/api/v1
- **API Documentation:** https://loopla-exchange-widget-production.up.railway.app/api-docs

If you encounter any issues during installation or startup, please refer to the [Troubleshooting](#-troubleshooting) section for common problems and solutions.

---

## 🧪 Testing

### Backend Tests

```bash
# Run all backend tests
npm test
```

### Frontend Tests

```bash
# Navigate to frontend
cd client

# Run all tests
npm test
```

## 📁 Project Structure

```
loopla-exchange-widget/
├── src/                          # Backend source code
│   ├── config/                   # Configuration files
│   │   ├── index.ts             # Environment config
│   │   └── swagger.config.ts    # Swagger/OpenAPI setup
│   ├── controllers/             # Request handlers
│   │   ├── exchange-rates.controller.ts
|   |   ├── exchange-rates.controller.spec.ts
│   │   └── index.ts
│   ├── services/                # Business logic
│   │   ├── exchange-rates.service.ts
|   |   ├── exchange-rates.service.spec.ts
│   │   ├── cache.service.ts
│   │   └── index.ts
│   ├── routes/                  # API routes
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── exchange-rates.routes.ts
│   │   └── index.ts
│   ├── middlewares/             # Express middlewares
│   │   ├── validate-currency.middleware.ts
│   │   └── index.ts
│   ├── errors/                  # Custom error classes
│   │   ├── api-error.ts
│   │   ├── validation-error.ts
│   │   ├── external-api-error.ts
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   ├── logger.utils.ts
│   │   ├── cache.utils.ts
│   │   └── index.ts
│   ├── types/                   # TypeScript types
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
│
├── client/                      # Frontend source code
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── buttons/
│   │   │   ├── cards/
│   │   │   ├── containers/
│   │   │   ├── currency-exchange/
│   │   │   ├── errors/
│   │   │   ├── forms/
│   │   │   ├── icons/
│   │   │   ├── loaders/
│   │   │   ├── messages/
│   │   │   ├── typography/
│   │   │   └── index.ts
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useExchangeRates.ts
|   |   |   ├── useExchangeRates.test.ts
│   │   │   └── index.ts
│   │   ├── services/            # API services
│   │   │   ├── api.ts
│   │   │   └── index.ts
│   │   ├── pages/               # Page components
│   │   │   ├── CurrencyExchangePage.tsx
│   │   │   └── index.ts
│   │   ├── constants/           # Constants & configs
│   │   │   ├── currencies.ts
│   │   │   ├── colors.ts
│   │   │   └── index.ts
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utility functions
│   │   ├── hocs/                # Higher-order components
│   │   ├── test/                # Test setup
│   │   ├── App.tsx              # Root component
│   │   └── main.tsx             # Entry point
│   ├── public/                  # Static assets
│   ├── Dockerfile               # Frontend Docker config
│   ├── vite.config.ts           # Vite configuration
│   └── package.json
│
├── shared/                      # Shared types between FE/BE
│   └── types/
│       ├── api-response.types.ts
│       └── index.ts
│
├── scripts/                     # Utility scripts
│   ├── setup.sh                 # Initial setup
│   ├── start.sh                 # Start services
│   ├── stop.sh                  # Stop services
│   ├── clean.sh                 # Clean containers
│   ├── rebuild.sh               # Rebuild services
│   ├── reload-env.sh            # Reload environment variables
│   └── logs.sh                  # View logs
│
├── lib/hooks/                   # Git hooks
│   └── pre-commit               # Pre-commit hook
│
├── docker-compose.yml           # Docker Compose config
├── Dockerfile                   # Backend Docker config
├── .env.example                 # Backend env template
├── .env.production.example      # Production env template
├── tsconfig.json                # TypeScript config
└── README.md                    # This file
```

---

## 🏗️ Architecture & Design Decisions

### Overall Architecture

The application follows a **monorepo structure** with separate backend and frontend, designed for scalability and maintainability.

```
┌─────────────┐         ┌──────────────┐         ┌─────────────────┐
│   Browser   │────────▶│   Frontend   │────────▶│    Backend      │
│   (React)   │◀────────│   (Vite)     │◀────────│   (Express)     │
└─────────────┘         └──────────────┘         └────────┬────────┘
                                                          │
                                                          ▼
                                                  ┌─────────────────┐
                                                  │  External API   │
                                                  │ (Exchange Rates)│
                                                  └─────────────────┘
```

### Design Principles

#### 1. **YAGNI (You Aren't Gonna Need It)**

- No over-engineering
- Features implemented only when needed
- Simple, focused components

#### 2. **KISS (Keep It Simple, Stupid)**

- Straightforward code
- Minimal abstractions
- Clear naming conventions

#### 3. **DRY (Don't Repeat Yourself)**

- Reusable components
- Shared types between FE/BE
- Utility functions for common operations

### Backend Architecture

**Pattern:** Layered Architecture (Controller → Service → External API)

```
Request → Routes → Middleware → Controller → Service → External API
                                     ↓
                                   Error Handler
```

**Key Decisions:**

1. **Error Handling**
   - `ApiError` (base class)
   - `ValidationError` (400) - Client input errors
   - `ExternalApiError` (503) - Dependency failures
   - Custom errors extend base classes
   - Ensures browsers can read error response bodies
   - Better UX with proper error messages

2. **Caching Strategy**
   - In-memory cache for exchange rates
   - 10-minutes TTL (configurable)
   - Reduces API calls and improves performance

3. **Logging**
   - Structured logging with timestamps
   - Context-aware (includes service/controller name)
   - Log levels: INFO, WARN, ERROR

### Frontend Architecture

**Pattern:** Container/Component Pattern with Custom Hooks

```
Page → Container Components → Presentational Components
         ↓
    Custom Hooks → API Service
```

**Key Decisions:**

1. **Component Structure**
   - **Atomic Design** approach (buttons, cards, containers)
   - Separation of concerns (presentation vs. logic)
   - Reusable, composable components

2. **State Management**
   - Custom hooks for data fetching
   - Local state with useState
   - No global state library (keeping it simple)

3. **Styling**
   - Emotion (CSS-in-JS) for component-scoped styles
   - Theme-based colors (constants)
   - Responsive design with flexbox/grid

4. **Type Safety**
   - Shared types between frontend/backend
   - Strict TypeScript configuration
   - Props validation

### Shared Types

**Decision:** Monorepo with shared types

- Single source of truth for API contracts
- Type safety across full stack
- Easier refactoring and maintenance

### Docker Strategy

**Multi-stage builds** for optimized images:

1. **Development** - Hot reload, source maps
2. **Build** - Compile TypeScript/Vite
3. **Production** - Minimal runtime, nginx for frontend

### Assumptions & Trade-offs

#### Assumptions

1. **API Availability** - Exchange Rates API is stable and available
2. **Browser Support** - Modern browsers (ES2020+)
3. **Network** - Users have stable internet connection
4. **Scale** - Small to medium traffic (no database required)

#### Trade-offs

| Decision            | Trade-off            | Reasoning                                |
| ------------------- | -------------------- | ---------------------------------------- |
| **In-memory cache** | Data lost on restart | Simple, fast, no external dependencies   |
| **No database**     | Stateless backend    | Reduces complexity for MVP               |
| **Monorepo**        | Larger repo size     | Easier management, shared types          |
| **Emotion CSS**     | Runtime overhead     | Better DX, scoped styles                 |
| **10-mins cache**   | Slightly stale data  | Balance between freshness and API limits |

### File Naming Conventions

Following industry best practices:

- **kebab-case** for files: `exchange-rates.service.ts`
- **PascalCase** for components: `CurrencyCard.tsx`
- **camelCase** for functions/variables
- **SCREAMING_SNAKE_CASE** for constants
- Purpose-driven names, not type-driven

---

## 📡 API Documentation

### Interactive Documentation

Access Swagger UI at: **http://localhost:4000/api-docs**

### Base URL

```
Development: http://localhost:4000/api/v1
Production: https://your-domain.railway.app/api/v1
```

### Endpoints

#### Get Latest Exchange Rates

```http
GET /api/v1/exchange-rates/latest
```

**Query Parameters:**

| Parameter      | Type    | Required | Description                         |
| -------------- | ------- | -------- | ----------------------------------- |
| `base`         | string  | Yes      | Base currency code (e.g., EUR, USD) |
| `forceRefresh` | boolean | No       | Bypass cache and fetch fresh data   |

**Example Request:**

```bash
curl 'http://localhost:4000/api/v1/exchange-rates/latest?base=EUR'
```

**Success Response (200):**

```json
{
  "success": true,
  "timestamp": 1704995437,
  "base": "EUR",
  "rates": {
    "USD": 1.0956,
    "GBP": 0.8589,
    "JPY": 156.84,
    "AUD": 1.6234,
    "CAD": 1.4523
  }
}
```

**Error Responses:**

```json
// 400 - Validation Error
{
  "error": {
    "message": "Base currency is required",
    "code": "validation_error"
  }
}

// 503 - External API Error
{
  "error": {
    "message": "Invalid API access key",
    "code": "invalid_access_key"
  }
}
```

### Error Codes

| Code                              | Status | Description                        |
| --------------------------------- | ------ | ---------------------------------- |
| `validation_error`                | 400    | Invalid request parameters         |
| `invalid_access_key`              | 503    | External API key is invalid        |
| `missing_access_key`              | 503    | External API key not configured    |
| `base_currency_access_restricted` | 503    | Currency not available in API plan |

---

## ⚠️ Known Limitations

1. **API Rate Limits**
   - Free tier: 250 requests/month
   - Cached responses mitigate this
   - Upgrade plan for higher limits

2. **Base Currency Restrictions**
   - Free tier only supports EUR as base
   - Premium features require paid plan

3. **Browser Support**
   - Requires modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
   - No IE11 support

4. **Cache Limitations**
   - In-memory cache clears on server restart
   - No persistence across deployments
   - Shared cache across all users

5. **No Authentication**
   - Public API endpoints
   - No user accounts or personalization
   - Rate limiting not implemented

6. **Single Region**
   - No multi-region deployment
   - Latency depends on user location

---

## 🚀 Future Enhancements

- [ ] Currency conversion calculator
- [ ] Frontend Caching to support offline mode (PWA mode)
- [ ] User authentication
- [ ] Paginated results to show all currencies
- [ ] Search field to search among the currencies
- [ ] Redis caching for scalability
- [ ] WebSocket real-time updates
- [ ] API rate limiting
- [ ] Linters like Sonarjs for the backend code
- [ ] Linters in the CI/CD pipeline of git repository
- [ ] Extensive testing across frontend and backend code
- [ ] Level up the logging using out of box solutions like Wingston etc
- [ ] Advanced error handling with stacktraces

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**

**Error:** `Port 4000 is already in use`

**Solution:**

```bash
# Find and kill the process
lsof -ti:4000 | xargs kill -9

# Or change port in .env
PORT=4001
```

#### 2. **Docker Build Fails**

**Error:** `Cannot connect to Docker daemon`

**Solution:**

```bash
# Start Docker Desktop/daemon
# Then rebuild
docker-compose down -v
docker-compose up --build
```

#### 3. **API Key Error**

**Error:** `Invalid API access key`

**Solution:**

```bash
# Get a free API key from https://exchangeratesapi.io/
# Update .env file
EXCHANGE_RATES_API_KEY=your_actual_key_here

# Reload environment
bash scripts/reload-env.sh
```

#### 4. **Frontend Shows "Failed to fetch"**

**Causes:**

- Backend not running
- CORS configuration
- Infinite loop (old build)

**Solution:**

```bash
# Check backend is running
curl http://localhost:4000/api/v1/exchange-rates/latest?base=EUR

# Rebuild frontend
cd client
npm run build
npm run dev

# Or use reload script
bash scripts/reload-env.sh frontend
```

#### 5. **Environment Variables Not Loading**

**Solution:**

```bash
# Docker Compose: Stop and restart
docker-compose down
docker-compose up

# Local: Use reload script
bash scripts/reload-env.sh
```

#### 6. **Tests Failing**

**Solution:**

```bash
# Clear cache and reinstall
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json
npm install
cd client && npm install

# Run tests
npm test
```

### Helpful Scripts

```bash
# View logs
bash scripts/logs.sh          # All services
bash scripts/logs.sh backend  # Backend only
bash scripts/logs.sh frontend # Frontend only

# Clean rebuild
bash scripts/rebuild.sh       # Rebuild all
bash scripts/rebuild.sh backend   # Backend only

# Fresh start
bash scripts/clean.sh         # Remove all containers
bash scripts/setup.sh         # Reinstall everything
```

### Debug Mode

Enable detailed logging:

```bash
# Backend
NODE_ENV=development npm run dev

# Frontend
npm run dev
```

### Getting Help

1. Check [Issues](https://github.com/Ezzu/loopla-exchange-widget/issues)
2. Review [API Documentation](http://localhost:4000/api-docs)
3. Enable debug logs
4. Create a [new issue](https://github.com/Ezzu/loopla-exchange-widget/issues/new)

---

## 🤝 Contributing

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

### Code Style

- **Backend:** Follow existing patterns, use TypeScript
- **Frontend:** React best practices, functional components
- **Formatting:** Prettier (runs on pre-commit)
- **Linting:** ESLint (runs on pre-commit)

---

## 🙏 Acknowledgments

### Technologies & Libraries

- [React](https://reactjs.org/) - UI framework
- [Express](https://expressjs.com/) - Backend framework
- [Vite](https://vitejs.dev/) - Frontend build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Emotion](https://emotion.sh/) - CSS-in-JS styling
- [Docker](https://www.docker.com/) - Containerization
- [Swagger](https://swagger.io/) - API documentation

### APIs & Services

- [Exchange Rates API](https://exchangeratesapi.io/) - Currency exchange rates data
- [Railway](https://railway.app/) - Deployment platform

### Inspiration

- Modern frontend architecture patterns
- Clean architecture principles
- Stripe/Shopify engineering best practices

### Special Thanks

- Open source community
- Contributors and testers
- Exchange Rates API team

---

<div align="center">

Made with ❤️ as a technical assessment for the Loopla team

</div>

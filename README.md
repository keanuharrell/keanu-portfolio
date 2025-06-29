# Keanu Portfolio

A modern portfolio template built with **Turborepo**, **Bun**, and **SST** for serverless deployment on AWS.

## Features

- 🚀 **Modern Stack**: React, TypeScript, Tailwind CSS
- 📦 **Monorepo**: Turborepo for efficient development
- ⚡ **Fast Runtime**: Bun for package management and bundling
- ☁️ **Cloud Ready**: SST for AWS serverless deployment
- 🎨 **Responsive Design**: Mobile-first design approach
- 🔧 **Developer Experience**: Hot reload, TypeScript, ESLint

## Project Structure

```
├── packages/          # Shared libraries
│   ├── core/         # Business logic (@portfolio/core)
│   ├── types/        # TypeScript definitions (@portfolio/types)
├── apps/
│   └── backend/      # API backend (@portfolio/backend)
├── infra/            # SST infrastructure configuration
└── sst.config.ts     # SST configuration
```

## Getting Started

### Prerequisites

- **Bun** >= 1.2.17
- **Node.js** >= 20.0.0 (for SST)
- **AWS CLI** configured (for deployment)

### Installation

```bash
bun install
```

### Development

Start the development server:

```bash
bun dev
```

This will start:
- Backend API server
- SST development environment

### Building

Build all packages and applications:

```bash
bun build
```

### Type Checking

Run TypeScript type checking across all packages:

```bash
bun typecheck
```

## Deployment

### Development Environment

```bash
bun dev
```

### Production Deployment

```bash
bun deploy
```

### AWS SSO Login

For development:
```bash
bun sso-dev
```

For production:
```bash
bun sso-prod
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /` - API status
- `GET /health` - Health check
- `GET /projects` - List all projects
- `GET /experience` - List work experience
- `POST /contact` - Contact form submission

## Customization

### Adding Your Information

1. Update personal information in the API endpoints (`apps/backend/src/functions/api.ts`)
2. Modify the project data in the `/projects` endpoint
3. Update experience information in the `/experience` endpoint
4. Customize contact information

### Styling

The project uses **Tailwind CSS** for styling. You can customize the design by:

1. Modifying the color scheme in your frontend components
2. Updating responsive breakpoints
3. Adding custom animations and transitions

### Infrastructure

SST configuration is located in:
- `sst.config.ts` - Main SST configuration
- `infra/` - Infrastructure definitions

## Tech Stack

- **Runtime**: Bun
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Hono.js (lightweight web framework)
- **Infrastructure**: SST (Serverless Stack)
- **Cloud**: AWS (Lambda, API Gateway, CloudFront)
- **Monorepo**: Turborepo

## Contributing

This is a personal portfolio template. Feel free to fork and customize it for your own use!

## License

MIT License - feel free to use this template for your own portfolio.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Keanu Portfolio Architecture

This is a **Turborepo monorepo** for a personal portfolio website showcasing projects, skills, and experience. The project uses **Bun** as the primary runtime and package manager.

### Workspace Structure

```
├── packages/          # Shared libraries
│   ├── core/         # Business logic (@portfolio/core)
│   ├── types/        # TypeScript definitions (@portfolio/types)  
│   ├── ui/           # UI components (@portfolio/ui)
│   └── utils/        # Utility functions (@portfolio/utils)
├── apps/
│   ├── portfolio/    # Main portfolio website
│   └── blog/         # Blog application (optional)
```

### Development Commands

**Root level commands** (run from project root):
- `bun install` - Install all workspace dependencies
- `bun dev` - Start all apps in development mode with hot reload
- `bun build` - Build all packages and apps in dependency order
- `bun test` - Run tests across all workspaces
- `bun type-check` - Type check all TypeScript files
- `bun lint` - Lint all code (when configured)

**Individual app development**:
- `cd apps/portfolio && bun dev` - Run only the portfolio app
- `cd apps/blog && bun dev` - Run only the blog app

### Package Dependencies

Packages follow a simplified dependency hierarchy:
- `@portfolio/types` (base, no dependencies)
- `@portfolio/core` depends on `@portfolio/types`
- `@portfolio/ui` depends on `@portfolio/types`
- `@portfolio/utils` depends on `@portfolio/types`
- Apps depend on relevant packages via `workspace:*`

### TypeScript Path Mapping

Import packages using path aliases:
```ts
import { ProjectType } from '@portfolio/types'
import { getProjects } from '@portfolio/core'
import { Button } from '@portfolio/ui'
import { formatDate } from '@portfolio/utils'
```

## Bun Runtime Guidelines

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/projects": {
      GET: (req) => {
        return new Response(JSON.stringify({ projects: [] }));
      },
    },
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Keanu's Portfolio</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";

// import .css files directly and it works
import './index.css';

import { createRoot } from "react-dom/client";

const root = createRoot(document.body);

export default function Portfolio() {
  return <h1>Welcome to my Portfolio!</h1>;
}

root.render(<Portfolio />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.

# Portfolio-Specific Guidelines

## Content Structure
- **Projects**: Showcase development projects with descriptions, tech stack, and links
- **Experience**: Professional experience and achievements
- **Skills**: Technical skills and competencies
- **About**: Personal introduction and background
- **Contact**: Contact information and social links

## Design Principles
- Clean, modern design
- Mobile-responsive layout
- Fast loading times
- Accessible to all users
- SEO optimized

## Technologies
- React/TypeScript for interactive components
- Tailwind CSS for styling
- Bun for runtime and bundling
- Modern web standards (CSS Grid, Flexbox)

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
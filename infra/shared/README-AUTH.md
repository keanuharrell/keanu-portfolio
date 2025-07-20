# Shared Authentication System

Ce système d'authentification partagé utilise **SST Auth** avec **OpenAuth** pour toutes les applications du portfolio Keanu.

## Architecture

```
auth.keanu.dev (SST Auth endpoint)
├── OpenAuth JWT issuer
├── Email + Google + GitHub providers  
└── Shared across all apps
```

## Configuration par app

### Pour une app Next.js

```ts
import { authConfig } from "../templates/app-auth";

const appUrl = $dev ? "http://localhost:3000" : `https://myapp.keanu.dev`;

export const myApp = new sst.aws.Nextjs("MyApp", {
  path: "apps/my-app",
  ...authConfig.nextjs(appUrl),
  environment: {
    // App-specific variables
    NEXT_PUBLIC_API_URL: myApi.url,
    // Auth variables automatically included
    ...authConfig.nextjs(appUrl).environment,
  },
});
```

### Pour une API function

```ts
import { authConfig } from "../templates/app-auth";

export const myFunction = new sst.aws.Function("MyFunction", {
  handler: "apps/my-app/api/src/index.handler",
  ...authConfig.api(),
  environment: {
    // App-specific variables
    TABLE_NAME: dynamo.name,
    // Auth variables automatically included
    ...authConfig.api().environment,
  },
});
```

## Variables d'environnement automatiques

### Frontend (Next.js)
- `NEXT_PUBLIC_AUTH_URL` - URL de l'endpoint OpenAuth
- `AUTH_PUBLIC_KEY` - Clé publique pour vérifier les JWT
- `APP_BASE_URL` - URL de base de l'app

### Backend (API)
- `AUTH_PUBLIC_KEY` - Clé publique pour vérifier les JWT

## Middleware d'authentification

```ts
import { requireAuth, optionalAuth, getUser, requireUser } from "@portfolio/core";

// Route protégée
app.post("/", requireAuth(), async (c) => {
  const user = requireUser(c);
  // user.id, user.email, user.name, user.picture
});

// Route optionnelle
app.get("/:id", optionalAuth(), async (c) => {
  const user = getUser(c); // peut être null
});
```

## Domaines autorisés

Les domaines suivants sont automatiquement autorisés pour les redirections :
- `keanu.dev` (portfolio principal)
- `short.keanu.dev` (URL shortener)
- `portfolio.keanu.dev` (portfolio alternatif)
- `blog.keanu.dev` (blog futur)
- `api.keanu.dev` (API globale future)
- `localhost` et `127.0.0.1` (développement)

## Providers configurés

1. **Email** - Codes PIN envoyés par SES
2. **Google** - OAuth avec Google Apps  
3. **GitHub** - OAuth avec GitHub

## Avantages

✅ **Authentification unifiée** - Un seul système pour toutes les apps
✅ **JWT natif** - Pas de base de données de sessions
✅ **Multi-providers** - Email, Google, GitHub
✅ **Coût optimisé** - Pas de service tiers comme Auth0
✅ **Contrôle total** - Infrastructure owned par vous
✅ **Performance** - Vérification JWT ultra-rapide
✅ **Scalabilité** - SST Auto-scaling natif
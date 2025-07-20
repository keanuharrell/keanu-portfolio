import { domain, dns } from "./dns";
import { secret } from "./secret";

/**
 * Shared authentication system for all apps in the Keanu Portfolio
 * 
 * This SST Auth component provides:
 * - OpenAuth-based authentication
 * - Email + Google + GitHub providers
 * - JWT tokens for API authentication
 * - Shared domain: auth.keanu.dev
 * 
 * Apps can reference this auth and get:
 * - auth.url (OpenAuth endpoint)
 * - auth.publicKey (for JWT verification)
 */
export const auth = new sst.aws.Auth("KeanuPortfolioAuth", {
  domain: {
    name: `auth.${domain}`,
    dns,
  },
  issuer: {
    dev: false,
    link: [secret.googleClientId, secret.googleClientSecret, secret.githubClientId, secret.githubClientSecret],
    handler: "packages/core/src/auth/issuer.handler",
    environment: {
      // Default to portfolio domain, apps can override
      AUTH_FRONTEND_URL: $dev ? "http://localhost:3000" : `https://${domain}`,
      ALLOWED_REDIRECT_DOMAINS: JSON.stringify([
        domain, // keanu.dev
        `portfolio.${domain}`, // portfolio.keanu.dev
        `short.${domain}`, // short.keanu.dev
        `blog.${domain}`, // blog.keanu.dev (future)
        `api.${domain}`, // api.keanu.dev (future)
        "localhost", // dev
        "127.0.0.1", // dev
      ]),
    },
  },
})
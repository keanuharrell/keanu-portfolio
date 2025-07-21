import { sharedDatabase } from "./database";
import { domain, dns } from "./dns";
import { sharedEmail } from "./email";
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
export const sharedAuth = new sst.aws.Auth("SharedAuth", {
  domain: {
    name: `openauth.${domain}`,
    dns,
  },
  issuer: {
    dev: false,
    link: [sharedDatabase, sharedEmail, secret.googleClientId, secret.githubClientId, secret.githubClientSecret],
    handler: "packages/core/src/auth/issuer.handler",
  },
})
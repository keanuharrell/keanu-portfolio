import { auth } from "../shared/auth";

/**
 * Helper to configure authentication for any app
 * 
 * Usage in app infrastructure:
 * ```ts
 * import { configureAppAuth } from "../templates/app-auth";
 * 
 * export const myApp = new sst.aws.Nextjs("MyApp", {
 *   ...configureAppAuth("https://myapp.keanu.dev"),
 *   // other config
 * });
 * ```
 */
export function configureAppAuth(appUrl: string) {
  return {
    link: [auth],
    environment: {
      NEXT_PUBLIC_AUTH_URL: auth.url,
      AUTH_PUBLIC_KEY: auth.publicKey,
    },
  };
}

/**
 * Helper to configure authentication for API functions
 */
export function configureApiAuth() {
  return {
    link: [auth],
    environment: {
      AUTH_PUBLIC_KEY: auth.publicKey,
    },
  };
}

/**
 * Get auth configuration for different app types
 */
export const authConfig = {
  // For Next.js apps
  nextjs: (appUrl: string) => ({
    link: [auth],
    environment: {
      NEXT_PUBLIC_AUTH_URL: auth.url,
      AUTH_PUBLIC_KEY: auth.publicKey,
      APP_BASE_URL: appUrl,
    },
  }),
  
  // For API functions  
  api: () => ({
    link: [auth],
    environment: {
      AUTH_PUBLIC_KEY: auth.publicKey,
    },
  }),
  
  // For static sites
  static: () => ({
    link: [auth],
    environment: {
      NEXT_PUBLIC_AUTH_URL: auth.url,
    },
  }),
};
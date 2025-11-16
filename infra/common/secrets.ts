export const secrets = {
  // BetterAuth Secret
  betterAuthSecret: new sst.Secret("BetterAuthSecret"),

  // Neon Secrets
  neonProjectId: new sst.Secret("NeonProjectId"),
  neonPassword: new sst.Secret("NeonPassword"),

  // OAuth Secrets
  googleClientId: new sst.Secret("GoogleClientId"),
  googleClientSecret: new sst.Secret("GoogleClientSecret"),
};

export const allOAuthSecrets = [
  secrets.googleClientId,
  secrets.googleClientSecret,
];

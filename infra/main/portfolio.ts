import { allOAuthSecrets, secrets } from "../common/secrets";
import { domain } from "../common/dns";
import { email } from "../common/email";
import { neon } from "./neon";
import { redis } from "./redis";

export const portfolio = new sst.aws.Astro("Portfolio", {
  path: "packages/portfolio",
  server: {
    memory: "256 MB",
    timeout: "30 seconds",
    architecture: "arm64",
  },
  link: [
    email,
    secrets.betterAuthSecret,
    neon.neonLink,
    redis,
    ...allOAuthSecrets,
  ],
  domain: {
    name: domain,
    redirects: [`www.${domain}`],
    dns: sst.cloudflare.dns({
      proxy: true,
    }),
  },
});

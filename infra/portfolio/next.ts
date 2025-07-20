import { domain, dns } from "../shared/dns";
import { authConfig } from "../templates/app-auth";

const appUrl = $dev ? "http://localhost:3001" : `https://${domain}`;

export const portfolio = new sst.aws.Nextjs("Portfolio", {
  path: "apps/portfolio",
  domain: {
    name: domain,
    redirects: ["www." + domain],
    dns,
  },
  ...authConfig.nextjs(appUrl),
  environment: {
    // Portfolio-specific environment variables
    NEXT_PUBLIC_SITE_NAME: "Keanu Portfolio",
    // Auth variables are handled by authConfig.nextjs()
    ...authConfig.nextjs(appUrl).environment,
  },
  dev: {
    url: "http://localhost:3001",
  }
});
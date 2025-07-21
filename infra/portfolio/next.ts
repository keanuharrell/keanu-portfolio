import { domain, dns } from "../shared/dns";
import { sharedAuth } from "../shared/auth";

const appUrl = $dev ? "http://localhost:3001" : `https://${domain}`;

export const portfolio = new sst.aws.Nextjs("Portfolio", {
  path: "apps/portfolio",
  domain: {
    name: domain,
    redirects: ["www." + domain],
    dns,
  },
  link: [sharedAuth],
  environment: {
    // Portfolio-specific environment variables
    NEXT_PUBLIC_SITE_NAME: "Keanu Portfolio",
    NEXT_PUBLIC_AUTH_URL: sharedAuth.url,
    NEXT_PUBLIC_APP_URL: appUrl,
  },
  dev: {
    url: "http://localhost:3001",
  }
});
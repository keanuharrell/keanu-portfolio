import { domain, dns } from "../shared/dns";
import { sharedAuth } from "../shared/auth";


export const portfolio = new sst.aws.Nextjs("Portfolio", {
  path: "apps/portfolio",
  domain: {
    name: `www.${domain}`,
    redirects: [domain],
    dns,
  },
  link: [sharedAuth],
  dev: {
    url: "http://localhost:3001",
  }
});
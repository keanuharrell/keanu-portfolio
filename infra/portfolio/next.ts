import { domain, dns } from "../shared/dns";
import { sharedAuth } from "../shared/auth";
import { sharedEmail } from "../shared/email";
import { sharedDatabase } from "../shared/database";
import { shortNext } from "../short/next";

export const portfolioNext = new sst.aws.Nextjs("PortfolioNext", {
  path: "apps/portfolio",
  domain: {
    name: `www.${domain}`,
    redirects: [domain],
    dns,
  },
  link: [sharedDatabase, sharedEmail, sharedAuth, shortNext],
  dev: {
    url: "http://localhost:3000",
  }
});
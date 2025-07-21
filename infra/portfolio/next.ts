import { domain, dns } from "../shared/dns";
import { sharedAuth } from "../shared/auth";
import { sharedEmail } from "../shared/email";
import { sharedDatabase } from "../shared/database";


export const portfolio = new sst.aws.Nextjs("Portfolio", {
  path: "apps/portfolio",
  domain: {
    name: `www.${domain}`,
    redirects: [domain],
    dns,
  },
  link: [sharedDatabase, sharedEmail, sharedAuth],
  dev: {
    url: "http://localhost:3000",
  }
});
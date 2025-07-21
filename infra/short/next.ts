import { sharedAuth } from "../shared/auth";
import { sharedDatabase } from "../shared/database";
import { domain, dns } from "../shared/dns";
import { sharedEmail } from "../shared/email";
import { isDev } from "../shared/stage";

export const shortNext = new sst.aws.Nextjs("ShortNext", {
  path: "apps/short",
  domain: {
    name: `short.${domain}`,
    dns,
  },
  link: [sharedDatabase, sharedEmail, sharedAuth],
  dev: {
    url: "http://localhost:3000",
  },
});

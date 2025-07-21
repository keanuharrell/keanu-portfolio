import { domain, dns } from "../shared/dns";
import { sharedAuth } from "../shared/auth";
import { sharedEmail } from "../shared/email";
import { sharedDatabase } from "../shared/database";

export const aiNext = new sst.aws.Nextjs("AiNext", {
  path: "apps/ai",
  domain: {
    name: `ai.${domain}`,
    dns,
  },
  link: [sharedDatabase, sharedEmail, sharedAuth],
  dev: {
    url: "http://localhost:3002",
  }
});
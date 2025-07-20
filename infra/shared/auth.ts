import { domain, dns } from "./dns";
import { sharedDatabase } from "./database";
import { sharedEmail } from "./email";

export const auth = new sst.aws.Auth("KeanuAuth", {
  domain: {
    name: `auth.${domain}`,
    dns,
  },
  issuer: {
    dev: false,
    link: [sharedDatabase, sharedEmail],
    handler: "packages/backend/src/function/auth/issuer.handler",
    environment: {
      AUTH_FRONTEND_URL: $dev ? "http://localhost:3000" : "https://" + domain,
    },
  },
})
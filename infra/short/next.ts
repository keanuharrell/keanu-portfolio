import { sharedAuth } from "../shared/auth";
import { domain, dns } from "../shared/dns";
import { sharedEmail } from "../shared/email";
import { secret } from "../shared/secret";
import { createDynamoMonotable } from "../templates/dynamo";

export const shortDynamo = createDynamoMonotable("ShortDynamo");

export const shortNext = new sst.aws.Nextjs("ShortNext", {
  path: "apps/short",
  domain: {
    name: `short.${domain}`,
    dns,
  },
  link: [shortDynamo, sharedEmail, sharedAuth],
  dev: {
    url: "http://localhost:3000",
  }
});

import { sharedAuth } from "../shared/auth";
import { domain, dns } from "../shared/dns";
import { sharedEmail } from "../shared/email";
import { createDynamoMonotable } from "../templates/dynamo";

export const urlShortenerDynamo = createDynamoMonotable("UrlShortenerDynamo");

export const urlShortenerNext = new sst.aws.Nextjs("UrlShortenerFrontend", {
  path: "apps/url-shortener",
  domain: {
    name: `short.${domain}`,
    dns,
  },
  link: [urlShortenerDynamo, sharedEmail, sharedAuth],
  dev: {
    url: "http://localhost:3000",
  }
});

import { domain, dns } from "../shared/dns";
import { authConfig } from "../templates/app-auth";
import { urlShortenerApi } from "./api";

const appUrl = $dev ? "http://localhost:3000" : `https://short.${domain}`;

export const urlShortenerNext = new sst.aws.Nextjs("UrlShortenerFrontend", {
  path: "apps/url-shortener/next",
  domain: {
    name: `short.${domain}`,
    dns,
  },
  ...authConfig.nextjs(appUrl),
  environment: {
    // App-specific environment variables
    NEXT_PUBLIC_API_URL: urlShortenerApi.url,
    // Auth variables are handled by authConfig.nextjs()
    ...authConfig.nextjs(appUrl).environment,
  },
  dev: {
    url: "http://localhost:3000",
  }
});

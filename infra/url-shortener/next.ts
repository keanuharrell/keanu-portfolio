import { domain, dns } from "../shared/dns";
import { urlShortenerApi } from "./api";

export const urlShortenerNext = new sst.aws.Nextjs("UrlShortenerFrontend", {
  path: "apps/url-shortener/next",
  domain: {
    name: `short.${domain}`,
    dns,
  },
  environment: {
    NEXT_PUBLIC_API_URL: urlShortenerApi.url,
    APP_BASE_URL: $dev ? "http://localhost:3000" : `https://short.${domain}`,
  },
  dev: {
    url: "http://localhost:3000",
  }
});

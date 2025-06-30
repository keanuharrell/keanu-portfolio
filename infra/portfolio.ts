import { api } from "./api";
import { domain } from "./dns";

export const portfolio = new sst.aws.Nextjs("Portfolio", {
  path: "apps/portfolio",
  domain: {
    name: domain,
    redirects: ["www." + domain ],
  },
  environment: {
    NEXT_PUBLIC_API_URL: api.url,
  }
});
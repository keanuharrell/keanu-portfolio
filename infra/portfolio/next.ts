import { domain } from "../shared/dns";

export const portfolio = new sst.aws.Nextjs("Portfolio", {
  path: "apps/portfolio",
  domain: {
    name: domain,
    redirects: ["www." + domain ],
  },
});
import { domain } from "./dns";
import { email } from "./email";

export const portfolio = new sst.aws.Astro("Portfolio", {
  path: "packages/portfolio",
  domain: {
    name: domain,
    redirects: [`www.${domain}`],
    dns: sst.cloudflare.dns(),
  },
  link: [email],
});

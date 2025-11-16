import { domain } from "./dns";

export const portfolio = new sst.aws.Astro("Portfolio", {
  path: "packages/portfolio",
  domain: {
    name: domain,
    redirects: [`www.${domain}`],
    dns: sst.cloudflare.dns({
      proxy: true,
    }),
  },
});

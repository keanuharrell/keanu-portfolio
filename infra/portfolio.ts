import { domain } from "./dns";

export const portfolio = new sst.aws.StaticSite("Portfolio", {
  build: {
    command: "bun run build",
    output: "dist",
  },
  path: "packages/portfolio",
  domain: {
    name: domain,
    redirects: [`www.${domain}`],
    dns: sst.cloudflare.dns(),
  },
});

/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "keanu-portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "sst",
          region: "eu-west-3",
        },
        cloudflare: {
          version: "6.3.1",
        },
      },
    };
  },
  async run() {
    await import("./infra/dns");
    await import("./infra/portfolio");
  },
});

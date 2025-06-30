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
        },
        cloudflare: {
          apiToken: process.env.CLOUDFLARE_API_TOKEN,
          version: "6.3.1",
        },
      },
    };
  },
  async run() {
    await import("./infra/dns");
    await import("./infra/stage");
    await import("./infra/api");
    await import("./infra/dynamo");
    await import("./infra/portfolio");
    // await import("./infra/secret");
    // await import("./infra/auth");
    // await import("./infra/network");
  },
});

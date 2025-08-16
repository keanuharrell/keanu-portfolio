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
          version: "6.3.1",
        },
      },
    };
  },
  async run() {
    await import("./infra/dns");
    await import("./infra/email");
    await import("./infra/portfolio");
  },
});

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
    // --- Core ---
    await import("./infra/shared/dns");
    await import("./infra/shared/stage");
    await import("./infra/shared/secret");
    await import("./infra/shared/auth");

    // --- Apps ---
    // Portfolio
    await import("./infra/portfolio/next");

    // Url Shortener
    await import("./infra/short/next");
  },
});

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
        neon: "0.9.0",
        "@upstash/pulumi": "0.5.0",
      },
    };
  },
  async run() {
    (await import("./infra/common")).startCommon();
    (await import("./infra/main")).startMain();
  },
});

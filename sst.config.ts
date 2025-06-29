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
      }
    };
  },
  async run() {
    $transform(sst.aws.Function, (input) => {
      input.runtime = "nodejs22.x";
    });
    // await import("./infra/dns");
    // await import("./infra/stage");
    // await import("./infra/postgres");
    await import("./infra/api");
    // await import("./infra/secret");
    // await import("./infra/auth");
    // await import("./infra/network");
  },
});

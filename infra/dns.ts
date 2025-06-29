const PRODUCTION = "keanuharrell.com";
const DEV = `dev.${PRODUCTION}`;

// DNS adapter pattern for SST Cloudflare DNS component
// Returns appropriate zone and domain configuration based on deployment stage
// See: https://sst.dev/docs/component/cloudflare/dns/
export const { zone, domain } = (() => {
  if ($app.stage === "production")
    return {
      zone: new aws.route53.Zone(
        "Zone",
        {
          name: PRODUCTION,
        },
        {
          retainOnDelete: true,
          import: "Z001790632MKQEXQUOINJ",
        },
      ),
      domain: PRODUCTION,
    };

  if ($app.stage === "dev")
    return {
      zone: new aws.route53.Zone(
        "Zone",
        {
          name: DEV,
        },
        {
          import: "Z04733193GHYW3SIO6DKT",
          ignoreChanges: ["*"],
        },
      ),
      domain: DEV,
    };

  return {
    zone: aws.route53.Zone.get("Zone", "Z04733193GHYW3SIO6DKT"),
    domain: `${$app.stage}.${DEV}`,
  };
})();
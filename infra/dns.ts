const PRODUCTION = "keanuharrell.com";
const DEV = `dev.${PRODUCTION}`;

export const { dns, domain } = (() => {
  if ($app.stage === "production")
    return {
      dns: sst.cloudflare.dns(),
      domain: PRODUCTION,
    };

  else
    return {
      dns: sst.cloudflare.dns(),
      domain: DEV,
    };
})();
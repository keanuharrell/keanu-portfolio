const PRODUCTION = "keanuharrell.com";
const DEV = `dev.${PRODUCTION}`;

export const { domain } = (() => {
  if ($app.stage === "production")
    return {
      domain: PRODUCTION,
    };

  if ($app.stage === "dev")
    return {
      domain: DEV,
    };

  return {
    domain: `${$app.stage}.${DEV}`,
  };
})();

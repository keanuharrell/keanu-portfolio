export const isPermanent = ["dev", "production"].includes($app.stage);
export const isDev = $app.stage !== "production";
import { createDynamoMonotable } from "../templates/dynamo";
import { domain } from "../shared/dns";
import { authConfig } from "../templates/app-auth";

export const dynamo = createDynamoMonotable("UrlShortenerDynamo");

export const urlShortenerFunction = new sst.aws.Function("UrlShortenerFunction", {
  handler: "apps/url-shortener/api/src/index.handler",
  runtime: "nodejs20.x",
  timeout: "30 seconds",
  memory: "512 MB",
  link: [dynamo, ...authConfig.api().link],
  environment: {
    TABLE_NAME: dynamo.name,
    NEXT_PUBLIC_APP_URL: `https://short.${domain}`,
    // Auth environment variables
    ...authConfig.api().environment,
  },
});

export const urlShortenerApi = new sst.aws.ApiGatewayV2("UrlShortenerApi", {
  domain: {
    name: `api.short.${domain}`,
    dns: sst.cloudflare.dns()
  },
  cors: {
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowOrigins: ["*"],
    allowHeaders: ["Content-Type", "Authorization"]
  }
});

// Toutes les routes vont vers l'API Hono unifiée
urlShortenerApi.route("ANY /{proxy+}", urlShortenerFunction.arn);
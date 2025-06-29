import { dns, domain } from "./dns";
import { dynamo } from "./dynamo";

export const api = new sst.aws.Function("Api", {
    handler: "apps/backend/src/functions/api.handler",
    timeout: "1 minute",
    memory: "256 MB",
    runtime: "nodejs22.x",
    link: [dynamo],
    streaming: !$dev,
    url: true,
});



export const apiRouter = new sst.aws.Router("ApiRouter", {
    routes: {
        "/*": api.url,
    },
    domain: {
        name: "api." + domain,
        dns
    }
});
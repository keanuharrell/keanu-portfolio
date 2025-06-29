// import { domain } from "./dns";
// import { postgres } from "./postgres";

export const api = new sst.aws.Function("Api", {
    handler: "apps/backend/src/functions/api.handler",
    timeout: "3 minutes",
    // link: [postgres],
    streaming: !$dev,
    url: true,
});

// export const apiRouter = new sst.aws.Router("ApiRouter", {
//     routes: {
//         "/*": api.url,
//     },
//     domain: "api." + domain,
// });